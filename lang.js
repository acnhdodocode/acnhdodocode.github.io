const translations = {
    // --- 繁體中文 (香港) ---
    hk: {
        // UI 介面
        title: "動森島嶼中心",
        lang_sel: "語言/Language",
        nav_host: "我的島嶼 (Host)",
        nav_refresh: "F5 更新列表",
        nav_login: "登入",
        nav_logout: "登出",
        
        // 卡片 & 列表
        status_loading: "載入中...",
        status_no_island: "暫無開放島嶼",
        card_host: "島主：",
        card_limit: "限制：",
        card_people: "人",
        card_note: "備註：",
        btn_go: "👉 進入排隊 / 詳情",
        queue_count: "👫 {n} 人排隊中",
        
        // 登入/註冊頁
        login_title: "🔑 登入",
        register_title: "📝 註冊帳號",
        reset_title: "🔐 重設密碼",
        lbl_email: "Email",
        lbl_nickname: "暱稱 (排隊時顯示)",
        lbl_dob: "生日 (找回密碼用)",
        lbl_pwd: "密碼",
        lbl_confirm_pwd: "確認密碼",
        lbl_new_pwd: "新密碼",
        ph_email: "user@example.com",
        ph_nickname: "例如：寶寶島島主",
        ph_pwd: "******",
        tips_email: "僅限 Gmail 或 Yahoo",
        tips_pwd: "需包含大寫、小寫、數字及符號 (8位+)",
        tips_reset: "請輸入註冊時的資料以驗證身分",
        btn_login: "登入",
        btn_register: "註冊",
        btn_reset: "重設密碼",
        link_forgot: "忘記密碼？",
        link_register: "註冊新帳號",
        link_login: "已有帳號？登入",
        link_home: "返回首頁",
        link_back_list: "← 返回列表",

        // Host 頁面
        host_title: "✈️ 管理我的島嶼",
        lbl_dodo: "Dodo Code™",
        lbl_island_name: "島嶼名稱",
        lbl_limit: "同時上島人數限制",
        lbl_notice: "⚠️ 進島注意事項 (顯示於排隊區)",
        lbl_note: "備註 (顯示於列表)",
        btn_open: "確認開島",
        btn_view_queue: "👁️ 查看排隊狀況",
        btn_close: "⚠️ 立即關島",
        ph_notice: "例如：僅限機場離開、禁止穿潛水衣...",
        ph_note: "例如：賣大頭菜 500！",
        status_open: "開放中...",

        // 排隊頁面
        queue_title: "排隊詳情",
        queue_list_title: "👫 排隊列表 (每5秒更新)",
        board_title: "💬 留言板",
        btn_send: "發送",
        ph_chat: "請輸入留言...",
        status_island_full: "島上已滿",
        status_island_avail: "有名額",
        status_waiting: "等待中",
        status_playing: "🏝️ 遊玩中",
        status_pending: "🔔 請入島！",
        status_timeout: "逾時",
        status_time_up: "時間到",
        msg_no_queue: "暫時無人排隊",
        msg_no_chat: "暫無留言",
        
        // 按鈕動作
        btn_join: "➕ 加入排隊",
        btn_leave: "❌ 取消排隊",
        btn_leave_island: "👋 我已離開",
        btn_enter: "✈️ 我已起飛",
        btn_please_login: "請先登入",
        btn_you_are_host: "您是島主",
        text_wait: "排隊中... 請等候通知",
        text_your_turn: "🎉 輪到您了！請於 {n} 秒內確認",
        text_playing: "計時中！請於 10 分鐘內離開",

        // Server 回傳訊息 (Error Codes)
        ERR_MISSING_FIELDS: "所有欄位皆為必填",
        ERR_EMAIL_FORMAT: "僅限使用 Gmail 或 Yahoo Email",
        ERR_PWD_FORMAT: "密碼需包含大寫、小寫、數字及符號，最少 8 位",
        ERR_EMAIL_TAKEN: "此 Email 已被註冊",
        SUCCESS_REGISTER: "註冊成功",
        ERR_LOGIN_FAIL: "帳號或密碼錯誤",
        SUCCESS_LOGIN: "登入成功",
        ERR_VERIFY_FAIL: "驗證失敗：Email 或生日不符",
        SUCCESS_RESET: "密碼已重設",
        ERR_ALREADY_HOST: "您已經開啟了一個島嶼",
        SUCCESS_HOST: "開島成功",
        SUCCESS_CLOSE: "已關閉",
        ERR_ISLAND_CLOSED: "島嶼已關閉",
        ERR_ALREADY_IN_QUEUE: "您已在隊伍中",
        SUCCESS_JOIN: "排隊成功",
        ERR_ISLAND_FULL: "島上已滿員",
        ERR_OP_FAIL: "操作失敗：可能已逾時或尚未輪到您",
        SUCCESS_ENTER: "計時開始",
        SUCCESS_LEAVE: "已離開",
        ERR_EMPTY_MSG: "留言內容不能為空",
        SUCCESS_MSG: "留言成功",
        ERR_CONNECT: "連線失敗"
    },

    // --- English ---
    en: {
        title: "ACNH Island Hub",
        lang_sel: "Language",
        nav_host: "Host Island",
        nav_refresh: "Refresh",
        nav_login: "Login",
        nav_logout: "Logout",
        status_loading: "Loading...",
        status_no_island: "No islands open currently",
        card_host: "Host:",
        card_limit: "Limit:",
        card_people: "",
        card_note: "Note:",
        btn_go: "👉 Join / Details",
        queue_count: "👫 {n} in queue",
        login_title: "🔑 Login",
        register_title: "📝 Register",
        reset_title: "🔐 Reset Password",
        lbl_email: "Email",
        lbl_nickname: "Nickname",
        lbl_dob: "Birthday (For Recovery)",
        lbl_pwd: "Password",
        lbl_confirm_pwd: "Confirm Password",
        lbl_new_pwd: "New Password",
        ph_email: "user@example.com",
        ph_nickname: "e.g. Island Owner",
        ph_pwd: "******",
        tips_email: "Gmail or Yahoo only",
        tips_pwd: "Upper, lower, number, symbol (8+ chars)",
        tips_reset: "Enter details to verify identity",
        btn_login: "Login",
        btn_register: "Register",
        btn_reset: "Reset Password",
        link_forgot: "Forgot Password?",
        link_register: "Create Account",
        link_login: "Login Here",
        link_home: "Back to Home",
        link_back_list: "← Back to List",
        host_title: "✈️ Manage My Island",
        lbl_dodo: "Dodo Code™",
        lbl_island_name: "Island Name",
        lbl_limit: "Visitor Limit",
        lbl_notice: "⚠️ Notice (Shown in Queue)",
        lbl_note: "Note (Shown in List)",
        btn_open: "Open Island",
        btn_view_queue: "👁️ View Queue",
        btn_close: "⚠️ Close Island",
        ph_notice: "e.g. No wetsuits, Leave via airport...",
        ph_note: "e.g. Turnips at 500!",
        status_open: "Island Open...",
        queue_title: "Queue Details",
        queue_list_title: "👫 Queue (Refresh 5s)",
        board_title: "💬 Chat",
        btn_send: "Send",
        ph_chat: "Type message...",
        status_island_full: "Full",
        status_island_avail: "Available",
        status_waiting: "Waiting",
        status_playing: "🏝️ Playing",
        status_pending: "🔔 Go Now!",
        status_timeout: "Timeout",
        status_time_up: "Time Up",
        msg_no_queue: "Queue is empty",
        msg_no_chat: "No messages",
        btn_join: "➕ Join Queue",
        btn_leave: "❌ Leave Queue",
        btn_leave_island: "👋 I Left",
        btn_enter: "✈️ I Departed",
        btn_please_login: "Login First",
        btn_you_are_host: "You are Host",
        text_wait: "Waiting... Please wait.",
        text_your_turn: "🎉 Your turn! Confirm in {n}s",
        text_playing: "Playing! Leave in 10 mins",
        
        // Error Codes
        ERR_MISSING_FIELDS: "All fields are required",
        ERR_EMAIL_FORMAT: "Gmail or Yahoo only",
        ERR_PWD_FORMAT: "Password too weak (needs upper, lower, num, symbol)",
        ERR_EMAIL_TAKEN: "Email already taken",
        SUCCESS_REGISTER: "Registration successful",
        ERR_LOGIN_FAIL: "Invalid email or password",
        SUCCESS_LOGIN: "Login successful",
        ERR_VERIFY_FAIL: "Verification failed",
        SUCCESS_RESET: "Password reset successful",
        ERR_ALREADY_HOST: "You are already hosting",
        SUCCESS_HOST: "Island opened",
        SUCCESS_CLOSE: "Island closed",
        ERR_ISLAND_CLOSED: "Island is closed",
        ERR_ALREADY_IN_QUEUE: "You are already in queue",
        SUCCESS_JOIN: "Joined queue",
        ERR_ISLAND_FULL: "Island is full",
        ERR_OP_FAIL: "Operation failed (Timeout)",
        SUCCESS_ENTER: "Timer started",
        SUCCESS_LEAVE: "Left successfully",
        ERR_EMPTY_MSG: "Message cannot be empty",
        SUCCESS_MSG: "Message sent",
        ERR_CONNECT: "Connection Failed"
    },

    // --- 日本語 ---
    jp: {
        title: "あつ森 島広場",
        lang_sel: "言語",
        nav_host: "島を開放 (Host)",
        nav_refresh: "更新",
        nav_login: "ログイン",
        nav_logout: "ログアウト",
        status_loading: "読み込み中...",
        status_no_island: "現在開放中の島はありません",
        card_host: "島主：",
        card_limit: "定員：",
        card_people: "人",
        card_note: "備考：",
        btn_go: "👉 並ぶ / 詳細",
        queue_count: "👫 待ち人数: {n}人",
        login_title: "🔑 ログイン",
        register_title: "📝 新規登録",
        reset_title: "🔐 パスワードリセット",
        lbl_email: "メールアドレス",
        lbl_nickname: "ニックネーム",
        lbl_dob: "生年月日 (復旧用)",
        lbl_pwd: "パスワード",
        lbl_confirm_pwd: "確認用パスワード",
        lbl_new_pwd: "新しいパスワード",
        ph_email: "user@example.com",
        ph_nickname: "例：たぬきち",
        ph_pwd: "******",
        tips_email: "Gmail または Yahoo のみ",
        tips_pwd: "英大文字・小文字・数字・記号を含む (8文字以上)",
        tips_reset: "登録時の情報を入力してください",
        btn_login: "ログイン",
        btn_register: "登録",
        btn_reset: "リセット",
        link_forgot: "パスワードを忘れた場合",
        link_register: "アカウント作成",
        link_login: "ログインはこちら",
        link_home: "ホームに戻る",
        link_back_list: "← 一覧に戻る",
        host_title: "✈️ 島の管理",
        lbl_dodo: "パスワード (Dodo Code™)",
        lbl_island_name: "島の名前",
        lbl_limit: "同時来島者数",
        lbl_notice: "⚠️ 注意事項 (列に表示)",
        lbl_note: "備考 (一覧に表示)",
        btn_open: "島を開ける",
        btn_view_queue: "👁️ 待機列を確認",
        btn_close: "⚠️ 島を閉じる",
        ph_notice: "例：マリンスーツ禁止、空港からお帰りください",
        ph_note: "例：カブ価500ベル！",
        status_open: "開放中...",
        queue_title: "待機列詳細",
        queue_list_title: "👫 待機リスト (5秒毎更新)",
        board_title: "💬 掲示板",
        btn_send: "送信",
        ph_chat: "メッセージを入力...",
        status_island_full: "満員",
        status_island_avail: "空きあり",
        status_waiting: "待機中",
        status_playing: "🏝️ 来島中",
        status_pending: "🔔 出発して！",
        status_timeout: "時間切れ",
        status_time_up: "終了",
        msg_no_queue: "待機列は空です",
        msg_no_chat: "メッセージはありません",
        btn_join: "➕ 列に並ぶ",
        btn_leave: "❌ 並ぶのをやめる",
        btn_leave_island: "👋 島を出ました",
        btn_enter: "✈️ 出発しました",
        btn_please_login: "ログインしてください",
        btn_you_are_host: "あなたは島主です",
        text_wait: "待機中... 通知をお待ちください",
        text_your_turn: "🎉 順番が来ました！ {n}秒以内に確認",
        text_playing: "プレイ中！ 10分以内に退出してください",
        
        // Error Codes
        ERR_MISSING_FIELDS: "必須項目が未入力です",
        ERR_EMAIL_FORMAT: "Gmail または Yahoo のみ使用可能です",
        ERR_PWD_FORMAT: "パスワードが脆弱です",
        ERR_EMAIL_TAKEN: "このメールは既に使用されています",
        SUCCESS_REGISTER: "登録が完了しました",
        ERR_LOGIN_FAIL: "メールまたはパスワードが違います",
        SUCCESS_LOGIN: "ログインしました",
        ERR_VERIFY_FAIL: "認証失敗：情報が一致しません",
        SUCCESS_RESET: "パスワードをリセットしました",
        ERR_ALREADY_HOST: "既に島を開放しています",
        SUCCESS_HOST: "島を開放しました",
        SUCCESS_CLOSE: "島を閉じました",
        ERR_ISLAND_CLOSED: "島は閉じています",
        ERR_ALREADY_IN_QUEUE: "既に並んでいます",
        SUCCESS_JOIN: "列に並びました",
        ERR_ISLAND_FULL: "島は満員です",
        ERR_OP_FAIL: "操作失敗：時間切れの可能性があります",
        SUCCESS_ENTER: "タイマーを開始しました",
        SUCCESS_LEAVE: "退出しました",
        ERR_EMPTY_MSG: "メッセージを入力してください",
        SUCCESS_MSG: "送信しました",
        ERR_CONNECT: "通信エラー"
    }
};

// --- 多語言處理核心邏輯 ---
let currentLang = localStorage.getItem('acnh_lang') || 'hk';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('acnh_lang', lang);
    updatePageText();
}

function t(key, param = null) {
    // 先找當前語言，找不到找 HK，再找不到就直接顯示 Key
    let text = translations[currentLang]?.[key] || translations['hk'][key] || key;
    if (param !== null) {
        text = text.replace('{n}', param);
    }
    return text;
}

function updatePageText() {
    // 1. 替換 InnerText
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerText = t(el.getAttribute('data-i18n'));
    });
    // 2. 替換 Placeholder
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        el.placeholder = t(el.getAttribute('data-i18n-ph'));
    });
    // 3. 更新下拉選單
    const selector = document.getElementById('lang-selector');
    if(selector) selector.value = currentLang;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updatePageText();
    
    // 自動綁定語言選擇器
    const selector = document.getElementById('lang-selector');
    if(selector) {
        selector.value = currentLang;
        selector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            // 有些動態生成的內容需要刷新頁面才能生效
            if(typeof loadIslands === 'function') loadIslands();
            if(typeof loadData === 'function') loadData();
        });
    }
});
