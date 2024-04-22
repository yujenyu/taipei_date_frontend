// export const API_SERVER = `http://192.168.0.15:3001`;
export const API_SERVER = `http://localhost:3001`;

//account路徑:登入授權確認路徑 方法:GET
export const CHECK_AUTH = `${API_SERVER}/login-check`;

//account路徑:登入路徑 方法:POST  鍵值: email and password
export const LOGIN_POST = `${API_SERVER}/login`;

//account路徑:註冊路徑 方法:POST  鍵值: username email password
export const REGISTER_POST = `${API_SERVER}/register`;

//account路徑:google登入 方法:POST
export const GOOGLE_LOGIN = `${API_SERVER}/google-login`;

//account路徑:讀取個人資料 方法:GET
export const ACCOUNT_GET = `${API_SERVER}/account`;

//account路徑:編輯-讀取個人資料 方法:GET
export const ACCOUNT_EDIT_GET = `${API_SERVER}/account/edit`;

//account路徑:編輯 方法:PUT
export const ACCOUNT_EDIT_PUT = `${API_SERVER}/account/edit`;

//account路徑:編輯大頭照 方法:PUT
export const ACCOUNT_EDIT_AVATAR_PUT = `${API_SERVER}/account/try-upload`;

//account路徑:更改密碼 方法:PUT
export const ACCOUNT_CHANGE_PWD_PUT = `${API_SERVER}/account/change-password`;

//account路徑:上傳遊戲紀錄 方法:POST 鍵值: auth_id gameScore gameTime
export const ACCOUNT_GAME_RECORD_POST = `${API_SERVER}/account/game-record-upload`;

//account路徑:紀錄查訊-讀取POINT 方法:GET
export const ACCOUNT_RECORD_POINT_GET = `${API_SERVER}/account/record-point`;

//account路徑:紀錄查訊-讀取GAME 方法:GET
export const ACCOUNT_RECORD_GAME = `${API_SERVER}/account/record-game`;

// Date路徑，拿bar type 方法：GET
export const DATE_GET_BAR_TYPE = `${API_SERVER}/date/bar_type/api`;

// Date路徑，拿bar type 方法：GET
export const DATE_GET_MOVIE_TYPE = `${API_SERVER}/date/booking_movie_type/api`;

// Date路徑，用興趣找朋友 方法：GET
// Date路徑，送出交友邀請 方法：PUT
export const DATE_GET_FRIENDS_LIST = `${API_SERVER}/date/friends-list`;

// 編輯使用者喜愛的Bar類型
export const DATE_EDIT_BAR_TYPE = `${API_SERVER}/date/user_interest/edit_bar_type`;

// 編輯使用者喜愛的Movie類型
export const DATE_EDIT_MOVIE_TYPE = `${API_SERVER}/date/user_interest/edit_movie_type`;

// 拿到朋友傳送的訊息
export const DATE_FRIENDSHIPS_MESSAGE_SENDER = `${API_SERVER}/date/friendships_message/sender_id`;

// 拿到朋友訊息
export const DATE_FRIENDSHIPS_MESSAGE = `${API_SERVER}/date/friendships_message`;

// 新增一筆訊息 方法: POST
export const DATE_FRIENDSHIPS_MESSAGE_NEW_MSG = `${API_SERVER}/date/friendships_message/api`;

// 修改好友狀態 方法：POST
export const DATE_FRIENDSHIPS_EDIT = `${API_SERVER}/date/friends-list/edit`;

// 拿到好友狀態與資訊
export const DATE_FRIENDSHIPS = `${API_SERVER}/friends-list`;
