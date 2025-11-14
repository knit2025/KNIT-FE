import { API_BASE_URL, getAuthHeaders } from './config';

export interface FamilyMember {
  id: number;
  name: string;
  nickname: string;
  role: string;
  birth: string;
  loginId?: string; // 사용자의 로그인 ID
}

export interface FamilyResponse {
  id: number;
  code: string;
  created_at: string;
  status: string;
  points: number;
  users: FamilyMember[];
}

/**
 * 가족 정보 조회
 *
 * @returns {Promise<FamilyResponse>} 가족 정보
 * @throws {Error} 인증 실패, 기타 에러
 */
export const getFamily = async (): Promise<FamilyResponse> => {
  const url = `${API_BASE_URL}/accounts/family`;
  const headers = getAuthHeaders();

  console.log('가족 정보 조회 API 요청:', url);
  console.log('헤더:', headers);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    console.log('응답 상태:', response.status);

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');
      if (response.status === 404) throw new Error('가족 정보를 찾을 수 없습니다');
      throw new Error(`가족 정보를 불러오는데 실패했습니다 (${response.status})`);
    }

    const data = await response.json();
    console.log('가족 정보 데이터:', data);
    return data;
  } catch (error) {
    console.error('가족 정보 조회 에러:', error);
    throw error;
  }
};

/**
 * 현재 로그인한 사용자 정보 가져오기
 * localStorage에서 user 정보를 파싱하여 반환
 */
export const getCurrentUser = (): FamilyMember | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    const raw = JSON.parse(userStr) as Partial<FamilyMember> & { id?: number | string };
    // id 타입을 강제로 number로 정규화하여 비교 일치 보장
    const normalized: FamilyMember = {
      id: typeof raw.id === 'string' ? Number(raw.id) : (raw.id ?? NaN),
      name: raw.name ?? '',
      nickname: raw.nickname ?? '',
      role: raw.role ?? '',
      birth: raw.birth ?? '',
    };

    return normalized;
  } catch (error) {
    console.error('사용자 정보 파싱 에러:', error);
    return null;
  }
};
