import axios from "axios";

// 미션 상세 조회
export const getMissionDetail = async (missionId: string) => {
  try {
    const response = await axios.get(`/missions`, {
      params: { missionId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("미션 상세 조회 실패:", error);
    throw error;
  }
};