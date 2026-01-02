// 클라이언트(브라우저)용 API URL
export const API_URL = "http://localhost:3000";

// 서버 사이드용 API URL (Docker 내부 네트워크에서 사용)
export const SERVER_API_URL = process.env.SERVER_API_URL || API_URL;
