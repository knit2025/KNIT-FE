// 개발 환경에서는 프록시를 통해 CORS 우회
export const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://junhong.shop';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

/**
 * 현재 로그인한 사용자의 역할 가져오기
 * localStorage에서 'user_role' 값을 반환
 */
export const getCurrentUserRole = (): string | null => {
  return localStorage.getItem('user_role');
};