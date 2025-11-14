import { API_BASE_URL, getAuthHeaders } from './config';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 현재 로그인한 사용자의 loginId 가져오기
 * localStorage에서 user.loginId를 파싱하여 반환
 */
const getCurrentUserLoginId = (): string | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return user.loginId || null;
  } catch (error) {
    console.error('사용자 정보 파싱 에러:', error);
    return null;
  }
};

/**
 * 서버 응답의 userSubmissions에서 현재 사용자가 제출했는지 확인
 * userName이 현재 loginId와 일치하고 isSubmitted가 true인 경우 제출한 것으로 판단
 *
 * @param userSubmissions - 서버에서 받은 제출 현황
 * @returns 현재 사용자가 제출했으면 true, 아니면 false
 */
export const checkCurrentUserSubmitted = (userSubmissions?: UserSubmission[]): boolean => {
  if (!userSubmissions || userSubmissions.length === 0) return false;

  const currentLoginId = getCurrentUserLoginId();
  if (!currentLoginId) return false;

  // userName이 현재 loginId와 일치하고 isSubmitted가 true인 경우
  return userSubmissions.some(
    submission => submission.userName === currentLoginId && submission.isSubmitted === true
  );
};

export interface UserMission {
  userId: number;
  userName?: string; // 서버 필드가 다양할 수 있어 유연하게
  username?: string;
  nickName?: string;
  nickname?: string;
  isSubmitted?: boolean;
  opinion?: string;
  image?: string;
  createdAt?: string;
  updateAt?: string;
}

export interface TodayMissionResponse {
  missionId: number;
  missionInstanceId: number;
  title: string;
  content: string;
  // 신규 스펙: userMissions 배열 제공 (userId 기반)
  userMissions?: UserMission[];
  // 구 스펙 호환: 일부 환경에서 userSubmissions를 사용할 수 있음
  userSubmissions?: UserSubmission[];
  // isCompleted는 가족 전체 완료 여부를 나타내므로 제거
  // 개인의 제출 여부는 userSubmissions의 isSubmitted로 확인
}

export interface CompletedMission {
  missionInstanceId: number;
  title: string;
  content: string;
  completedDate: string;
}

export interface MissionSubmitRequest {
  missionInstanceId: number;
  opinion: string;
  image: string | File;
}

export interface MissionSubmitResponse {
  message: string;
  // isCompleted 제거 - 개인의 제출 여부는 localStorage로 관리
}

export interface UserSubmission {
  userId: number;
  userName: string; // 서버에서 제공하는 loginId와 비교할 사용자명
  nickName?: string;
  isSubmitted?: boolean; // 해당 사용자의 제출 여부
  opinion: string;
  image: string;
  createdAt: string;
  updateAt?: string;
}

export interface MissionDetailResponse {
  missionInstanceId: number;
  title: string;
  content: string;
  completedDate: string;
  userSubmissions: UserSubmission[];
}

/**
 * 현재 사용자가 제출했는지(userId 기반) 확인
 */
export const checkCurrentUserSubmittedById = (items?: UserMission[]): boolean => {
  if (!items || items.length === 0) return false;
  // currentUserId 우선, 없으면 user.id 보조
  const idStr = localStorage.getItem('currentUserId');
  let currentId: number | undefined = idStr ? Number(idStr) : undefined;
  if (currentId == null) {
    try {
      const userRaw = localStorage.getItem('user');
      if (userRaw) {
        const u = JSON.parse(userRaw);
        if (u?.id != null) currentId = Number(u.id);
      }
    } catch {}
  }
  if (currentId == null) return false;
  return items.some((it) => it.userId === currentId && it.isSubmitted === true);
};

/**
 * 오늘의 미션 조회
 * 서버 응답의 userSubmissions에서 현재 사용자의 제출 여부를 확인합니다.
 * (userName === loginId && isSubmitted === true)
 *
 * @returns {Promise<TodayMissionResponse>} 오늘의 미션 정보
 * @throws {Error} 인증 실패, 미션 없음, 기타 에러
 */
export const getTodayMission = async (): Promise<TodayMissionResponse> => {
  const url = `${API_BASE_URL}/missions/today`;
  const headers = getAuthHeaders();

  console.log('오늘의 미션 조회 API 요청:', url);
  console.log('헤더:', headers);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    console.log('응답 상태:', response.status);
    console.log('응답 헤더 Content-Type:', response.headers.get('content-type'));

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');
      if (response.status === 404) throw new Error('미션을 찾을 수 없습니다');

      const errorText = await response.text();
      console.error('에러 응답 내용:', errorText);
      throw new Error(`미션을 불러오는데 실패했습니다 (${response.status})`);
    }

    const data = await response.json();
    console.log('오늘의 미션 데이터:', data);

    return data;
  } catch (error) {
    console.error('오늘의 미션 조회 에러:', error);
    throw error;
  }
};

/**
 * 완료된 미션 목록 조회
 *
 * @returns {Promise<CompletedMission[]>} 완료된 미션 배열 (완료된 날짜순)
 * @throws {Error} 인증 실패, 기타 에러
 */
export const getCompletedMissions = async (): Promise<CompletedMission[]> => {
  const url = `${API_BASE_URL}/missions/completed`;
  const headers = getAuthHeaders();

  console.log('완료된 미션 조회 API 요청:', url);
  console.log('헤더:', headers);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    console.log('응답 상태:', response.status);
    console.log('응답 헤더 Content-Type:', response.headers.get('content-type'));

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');

      const errorText = await response.text();
      console.error('에러 응답 내용:', errorText);
      throw new Error(`미션 목록을 불러오는데 실패했습니다 (${response.status})`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('JSON이 아닌 응답:', text);
      throw new Error('서버가 JSON 형식이 아닌 응답을 반환했습니다');
    }

    const data = await response.json();
    console.log('완료된 미션 데이터:', data);
    return data;
  } catch (error) {
    console.error('완료된 미션 조회 에러:', error);
    throw error;
  }
};

/**
 * 미션 상세 조회
 *
 * @param {number} missionId - 미션 ID
 * @returns {Promise<MissionDetailResponse>} 미션 상세 정보
 * @throws {Error} 인증 실패, 미션 없음, 기타 에러
 */
export const getMissionDetail = async (missionId: number): Promise<MissionDetailResponse> => {
  const url = `${API_BASE_URL}/missions?missionId=${missionId}`;
  const headers = getAuthHeaders();

  console.log('미션 상세 조회 API 요청:', url);
  console.log('헤더:', headers);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    console.log('응답 상태:', response.status);
    console.log('응답 헤더 Content-Type:', response.headers.get('content-type'));

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');
      if (response.status === 404) throw new Error('미션을 찾을 수 없습니다');

      // 에러 응답 내용 확인
      const errorText = await response.text();
      console.error('에러 응답 내용:', errorText);
      throw new Error(`미션을 불러오는데 실패했습니다 (${response.status})`);
    }

    // Content-Type 확인
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('JSON이 아닌 응답:', text);
      throw new Error('서버가 JSON 형식이 아닌 응답을 반환했습니다');
    }

    const data = await response.json();
    console.log('미션 상세 데이터:', data);
    return data;
  } catch (error) {
    console.error('미션 상세 조회 에러:', error);
    throw error;
  }
};

/**
 * 미션 제출
 *
 * @param {number} missionInstanceId - 미션 인스턴스 ID
 * @param {string} opinion - 미션 후 소감
 * @param {File} image - 미션 사진
 * @returns {Promise<MissionSubmitResponse>} 제출 결과
 * @throws {Error} 인증 실패, 미션 없음, 기타 에러
 */
export const submitMission = async (
  missionInstanceId: number,
  opinion: string,
  image: File
): Promise<MissionSubmitResponse> => {
  const url = `${API_BASE_URL}/missions/submit`;
  const token = localStorage.getItem('accessToken');

  console.log('미션 제출 API 요청:', url);

  try {
    const formData = new FormData();
    formData.append('missionInstanceId', missionInstanceId.toString());
    formData.append('opinion', opinion);
    formData.append('image', image);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        // Content-Type은 FormData 사용 시 자동으로 설정됨
      },
      body: formData,
    });

    console.log('응답 상태:', response.status);

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');
      if (response.status === 404) throw new Error('미션을 찾을 수 없습니다');
      throw new Error(`미션 제출에 실패했습니다 (${response.status})`);
    }

    const data = await response.json();
    console.log('미션 제출 결과:', data);
    return data;
  } catch (error) {
    console.error('미션 제출 에러:', error);
    throw error;
  }
};
