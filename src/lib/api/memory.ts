import api from "./axios";

export const getMemoryData = async () => {
  try {
    const response = await api.get("/memory");
    console.log("Memory 데이터 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("Memory 데이터 호출 실패:", error);
    throw error;
  }
};