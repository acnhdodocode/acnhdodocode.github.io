const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const port = 9002;

app.use(cors());
app.use(bodyParser.json());

// 資料庫連線
const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '35076400TTc!', // *** 請輸入你的資料庫密碼 ***
  database: 'acnh_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// --- 排隊核心邏輯函數 ---

// 分配下一個入島者
function assignNextVisitor(hostEmail, callback) {
    db.query("SELECT max_visitors FROM islands WHERE user_email = ? AND status LIKE 'Open'", [hostEmail], (err, islandRes) => {
        if (err || islandRes.length === 0) return callback();
        const max = islandRes[0].max_visitors;

        // 計算目前佔用名額 (在島上 + 準備入島)
        const countSql = "SELECT COUNT(*) as count FROM queue WHERE island_host_email = ? AND status IN ('on_island', 'pending_entry')";
        db.query(countSql, [hostEmail], (err, countRes) => {
            if (err) return callback();
            // 如果有名額
            if (countRes[0].count < max) {
                // 找排最久的人
                const nextSql = "SELECT * FROM queue WHERE island_host_email = ? AND status = 'waiting' ORDER BY joined_at ASC LIMIT 1";
                db.query(nextSql, [hostEmail], (err, nextVisitor) => {
                    if (err || nextVisitor.length === 0) return callback();
                    // 升級為 pending_entry，開始 30 秒倒數
                    const updateSql = "UPDATE queue SET status = 'pending_entry', pending_start_time = NOW() WHERE id = ?";
                    db.query(updateSql, [nextVisitor[0].id], () => assignNextVisitor(hostEmail, callback));
                });
            } else { callback(); }
        });
    });
}

// 檢查 30 秒未確認的人 -> 踢回隊尾
function checkPendingTimeout(hostEmail, callback) {
    const timeoutSql = `
        UPDATE queue 
        SET status = 'waiting', joined_at = NOW(), pending_start_time = NULL 
        WHERE island_host_email = ? 
        AND status = 'pending_entry' 
        AND pending_start_time < (NOW() - INTERVAL 30 SECOND)
    `;
    db.query(timeoutSql, [hostEmail], (err, result) => {
        if (result && result.affectedRows > 0) assignNextVisitor(hostEmail, callback); // 有人被踢，可能有空位
        else callback();
    });
}

// --- AUTH API ---

app.post('/register', async (req, res) => {
  const { email, username, password, dob } = req.body;
  if (!email || !username || !password || !dob) return res.json({ status: 'error', message: '所有欄位必填' });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length > 0) return res.json({ status: 'error', message: 'Email 已被註冊' });
    const hash = await bcrypt.hash(password, 10);
    
    // 直接 is_verified = 1
    db.query('INSERT INTO users (email, username, password, dob, is_verified) VALUES (?, ?, ?, ?, 1)', 
      [email, username, hash, dob], (err) => {
      if (err) return res.status(500).json({ status: 'error', message: err.message });
      res.json({ status: 'success', message: '註冊成功！請登入' });
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.json({ status: 'error', message: '帳號或密碼錯誤' });
    }
    res.json({ status: 'success', user: { id: results[0].id, email: results[0].email, username: results[0].username } });
  });
});

app.post('/reset-password', async (req, res) => {
    const { email, dob, newPassword } = req.body;
    db.query("SELECT * FROM users WHERE email = ? AND dob = ?", [email, dob], async (err, results) => {
        if (results.length === 0) return res.json({ status: 'error', message: '資料不正確' });
        const hash = await bcrypt.hash(newPassword, 10);
        db.query("UPDATE users SET password = ? WHERE email = ?", [hash, email], (err) => {
            res.json({ status: 'success', message: '密碼已重設' });
        });
    });
});

// --- ISLAND & QUEUE API ---

// 首頁列表 (含排隊人數)
app.get('/islands', (req, res) => {
  const sql = `
    SELECT islands.*, 
    (SELECT COUNT(*) FROM queue WHERE queue.island_host_email = islands.user_email AND queue.status IN ('waiting', 'pending_entry', 'on_island')) as queue_count
    FROM islands 
    WHERE status LIKE 'Open' 
    ORDER BY created_at DESC
  `;
  db.query(sql, (err, results) => { res.json({ status: 'success', data: results }); });
});

app.get('/my-status', (req, res) => {
  const email = req.query.email;
  db.query("SELECT * FROM islands WHERE user_email = ? AND status LIKE 'Open' LIMIT 1", [email], (err, results) => {
    res.json({ status: 'success', data: results.length > 0 ? results[0] : null });
  });
});

app.post('/host', (req, res) => {
  const { email, islandName, dodoCode, note, maxVisitors, notice } = req.body;
  let limit = parseInt(maxVisitors) || 4; if (limit > 8) limit = 8; if (limit < 1) limit = 1;
  
  db.query("SELECT * FROM islands WHERE user_email = ? AND status LIKE 'Open'", [email], (err, results) => {
    if (results.length > 0) return res.json({ status: 'error', message: '已開島' });
    db.query("INSERT INTO islands (user_email, island_name, dodo_code, note, status, max_visitors, notice) VALUES (?, ?, ?, ?, 'Open', ?, ?)", 
      [email, islandName, dodoCode, note, limit, notice], (err) => res.json({ status: 'success', message: '開島成功' }));
  });
});

app.post('/close', (req, res) => {
  const { email } = req.body;
  db.query("UPDATE islands SET status = 'Closed' WHERE user_email = ? AND status LIKE 'Open'", [email], (err, result) => {
    if (result.affectedRows > 0) {
        // 關島時清空排隊與留言
        db.query("UPDATE queue SET status = 'finished' WHERE island_host_email = ? AND status != 'finished'", [email]);
        db.query("DELETE FROM comments WHERE island_host_email = ?", [email]);
    }
    res.json({ status: 'success', message: '島嶼已關閉' });
  });
});

// 島嶼詳情 (隱藏 Dodo Code + 排隊邏輯)
app.get('/island-detail', (req, res) => {
  const hostEmail = req.query.hostEmail;
  const visitorEmail = req.query.visitorEmail;

  db.query("SELECT * FROM islands WHERE user_email = ? AND status LIKE 'Open'", [hostEmail], (err, islandRes) => {
    if (islandRes.length === 0) return res.json({ status: 'error', message: '島嶼已關閉' });

    let island = islandRes[0];
    const realDodo = island.dodo_code;
    island.dodo_code = "******"; // 預設隱藏

    // 島主可見
    if (visitorEmail && visitorEmail === hostEmail) island.dodo_code = realDodo;

    // 自動踢人 (10分鐘)
    const cleanSql = "UPDATE queue SET status = 'finished' WHERE island_host_email = ? AND status = 'on_island' AND start_time < (NOW() - INTERVAL 10 MINUTE)";
    db.query(cleanSql, [hostEmail], () => {
        // 檢查 Pending (30秒)
        checkPendingTimeout(hostEmail, () => {
            // 分配名額
            assignNextVisitor(hostEmail, () => {
                const queueSql = "SELECT * FROM queue WHERE island_host_email = ? AND status IN ('waiting', 'pending_entry', 'on_island') ORDER BY FIELD(status, 'on_island', 'pending_entry', 'waiting'), joined_at ASC";
                db.query(queueSql, [hostEmail], (err, queueRes) => {
                    // 輪到的人可見
                    if (visitorEmail) {
                        const myQueue = queueRes.find(q => q.visitor_email === visitorEmail);
                        if (myQueue && (myQueue.status === 'pending_entry' || myQueue.status === 'on_island')) {
                            island.dodo_code = realDodo;
                        }
                    }
                    db.query("SELECT * FROM comments WHERE island_host_email = ? ORDER BY created_at ASC", [hostEmail], (err, commentRes) => {
                        res.json({ status: 'success', island: island, queue: queueRes, comments: commentRes, serverTime: new Date() });
                    });
                });
            });
        });
    });
  });
});

app.post('/queue/join', (req, res) => {
  const { hostEmail, visitorEmail, visitorName } = req.body;
  db.query("SELECT * FROM queue WHERE island_host_email = ? AND visitor_email = ? AND status != 'finished'", [hostEmail, visitorEmail], (err, resCheck) => {
      if (resCheck.length > 0) return res.json({ status: 'error', message: '已在隊伍中' });
      db.query("INSERT INTO queue (island_host_email, visitor_email, visitor_name, status) VALUES (?, ?, ?, 'waiting')", 
      [hostEmail, visitorEmail, visitorName], (err) => {
          assignNextVisitor(hostEmail, () => res.json({ status: 'success', message: '排隊成功' }));
      });
  });
});

// 確認入島 (只有 pending_entry 可以)
app.post('/queue/enter', (req, res) => {
  const { hostEmail, visitorEmail } = req.body;
  const sql = "UPDATE queue SET status = 'on_island', start_time = NOW(), pending_start_time = NULL WHERE island_host_email = ? AND visitor_email = ? AND status = 'pending_entry'";
  db.query(sql, [hostEmail, visitorEmail], (err, result) => {
      if (result.affectedRows === 0) return res.json({ status: 'error', message: '操作失敗 (可能已超時)' });
      res.json({ status: 'success', message: '計時開始' });
  });
});

app.post('/queue/leave', (req, res) => {
  const { hostEmail, visitorEmail } = req.body;
  db.query("DELETE FROM queue WHERE island_host_email = ? AND visitor_email = ?", [hostEmail, visitorEmail], (err) => {
      assignNextVisitor(hostEmail, () => res.json({ status: 'success', message: '已離開' }));
  });
});

app.post('/comment', (req, res) => {
    const { hostEmail, userEmail, userName, message } = req.body;
    if (!message) return res.json({ status: 'error', message: '留言為空' });
    db.query("INSERT INTO comments (island_host_email, user_email, user_name, message) VALUES (?, ?, ?, ?)", [hostEmail, userEmail, userName, message], (err) => {
        res.json({ status: 'success', message: '留言成功' });
    });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});