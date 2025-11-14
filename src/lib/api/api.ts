import axios from "axios";

const api = axios.create({
  baseURL: "https://junhong.shop", // 백엔드 주소
  withCredentials: true,
});

// 모든 요청에 자동으로 토큰 붙이기
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
   console.log("Request token:", token); // ✅ 여기에 토큰 확인 로그 추가
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
