const translations = {
    // --- 繁體中文 (預設) ---
    hk: {
        title: "動森島嶼中心",
        nav_host: "我的島嶼 (Host)",
        nav_refresh: "F5 更新列表",
        nav_login: "登入",
        nav_logout: "登出",
        status_loading: "載入中...",
        status_no_island: "暫無開放島嶼",
        card_host: "島主：",
        card_limit: "限制人數：",
        card_note: "備註：",
        btn_go: "👉 進入排隊 / 詳情",
        people_queue: "👫 {n} 人排隊中", // {n} 係變數
        login_title: "🔑 登入",
        email_placeholder: "Email",
        password_placeholder: "密碼",
        login_btn: "登入",
        forgot_pwd: "忘記密碼？",
        register_link: "註冊新帳號",
        back_home: "返回首頁",
        // ... 你可以繼續加其他頁面的字
    },
    
    // --- English ---
    en: {
        title: "ACNH Island Hub",
        nav_host: "My Island (Host)",
        nav_refresh: "Refresh",
        nav_login: "Login",
        nav_logout: "Logout",
        status_loading: "Loading...",
        status_no_island: "No islands open currently",
        card_host: "Host: ",
        card_limit: "Limit: ",
        card_note: "Note: ",
        btn_go: "👉 Join Queue / Details",
        people_queue: "👫 {n} in queue",
        login_title: "🔑 Login",
        email_placeholder: "Email",
        password_placeholder: "Password",
        login_btn: "Login",
        forgot_pwd: "Forgot Password?",
        register_link: "Register Account",
        back_home: "Back to Home",
    },

    // --- 日本語 ---
    jp: {
        title: "あつ森 島広場",
        nav_host: "島を開放 (Host)",
        nav_refresh: "更新",
        nav_login: "ログイン",
        nav_logout: "ログアウト",
        status_loading: "読み込み中...",
        status_no_island: "現在開放中の島はありません",
        card_host: "島主：",
        card_limit: "定員：",
        card_note: "備考：",
        btn_go: "👉 並ぶ / 詳細",
        people_queue: "👫 待ち人数: {n}人",
        login_title: "🔑 ログイン",
        email_placeholder: "メールアドレス",
        password_placeholder: "パスワード",
        login_btn: "ログイン",
        forgot_pwd: "パスワードを忘れた場合",
        register_link: "新規登録",
        back_home: "ホームに戻る",
    }
};

// --- 切換語言邏輯 ---
let currentLang = localStorage.getItem('acnh_lang') || 'hk';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('acnh_lang', lang);
    updatePageText();
}

function t(key, param = null) {
    let text = translations[currentLang][key] || translations['hk'][key] || key;
    if (param !== null) {
        text = text.replace('{n}', param);
    }
    return text;
}

function updatePageText() {
    // 1. 替換所有有 data-i18n 屬性的標籤文字
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = t(key);
    });

    // 2. 替換 input 的 placeholder (如果有 data-i18n-ph)
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        el.placeholder = t(key);
    });
    
    // 更新下拉選單狀態
    const selector = document.getElementById('lang-selector');
    if(selector) selector.value = currentLang;
}

// 頁面載入時自動執行
document.addEventListener('DOMContentLoaded', () => {
    // 如果頁面有語言選單，監聽變更
    const selector = document.getElementById('lang-selector');
    if(selector) {
        selector.addEventListener('change', (e) => setLanguage(e.target.value));
        selector.value = currentLang;
    }
    updatePageText();
});
