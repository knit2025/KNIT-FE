import api from "./api";

export const getMemoryData = async () => {
  try {
        // 임시 토큰 로그인 기능 구현 후 삭제
    localStorage.removeItem("access_token");
    localStorage.setItem("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");

    const token = localStorage.getItem("access");
    console.log(" 사용 중인 토큰:", token);

    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const response = await api.get("/memory");
    console.log(" Memory 데이터 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(" Memory 데이터 호출 실패:", error);
    
    // 에러 상세 정보 출력
    if (error.response) {
      console.error("서버 응답 에러:", error.response.status);
      console.error("에러 메시지:", error.response.data);
    }
    
    throw error;
  }
};