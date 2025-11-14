// src/lib/api/question.ts
import api from "./api";

// 질문 답변 조회
export const getQuestionAnswers = async (customQId: number) => {
  const response = await api.get(`/customqa/${customQId}/answers/`);
  return response.data;
};