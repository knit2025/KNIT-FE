// src/lib/api/post.ts
import api from "./api";

// 게시물 작성
export const createPost = async (
  text: string,
  date: string,
  image?: File
) => {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('date', date);
  
  if (image) {
    formData.append('image', image);
  }

  const response = await api.post('/memory/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// photoDetail 페이지 상세 조회
export const getPostDetail = async (postId: number) => {
  const response = await api.get(`/memory/post/${postId}`);
  return response.data;
};