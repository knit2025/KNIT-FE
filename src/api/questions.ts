import { API_BASE_URL, getAuthHeaders } from './config';
import type { Question, FamilyRole, QuestionTarget } from '../types/question';

interface QuestionCardResponse {
  customQId: number;
  // 새 API 대응: ID 우선, 문자열은 하위 호환
  fromUserId?: number;
  toUserId?: number | null;
  fromUser?: string; // ex) "딸"
  toUser?: string;   // ex) "엄마" or "모두"
  text: string;
  isAnswered: boolean;
  isPublic: boolean;
}

interface CreateQuestionRequest {
  toUser: number | null;
  text: string;
  isAnonymous: boolean;
  isPublic: boolean;
}

interface CreateQuestionResponse {
  message: string;
  customQId: number;
  createdAt: string;
}

/**
 * API 응답 데이터를 Question 타입으로 변환
 *
 * @param {QuestionCardResponse} apiData - API에서 받은 질문 데이터
 * @returns {Question} 변환된 Question 객체
 */
export const mapApiToQuestion = (apiData: QuestionCardResponse): Question => {
  // 로컬에 저장된 id→role 매핑을 우선 사용
  let roleMap: Record<number, string> = {};
  try {
    const raw = localStorage.getItem('userRoleMap');
    if (raw) roleMap = JSON.parse(raw);
  } catch {}

  const authorRoleName =
    (apiData.fromUserId != null ? roleMap[apiData.fromUserId] : undefined) || apiData.fromUser || '기타';
  const toRoleName =
    (apiData.toUserId != null ? roleMap[apiData.toUserId] : undefined) || apiData.toUser || '모두';

  const authorRole: FamilyRole = authorRoleName as FamilyRole;
  const targetRole: QuestionTarget =
    apiData.toUserId === null || toRoleName === '모두'
      ? '모두에게'
      : (`${toRoleName}에게` as QuestionTarget);

  return {
    id: apiData.customQId.toString(),
    authorRole,
    targetRole,
    title: '',
    content: apiData.text,
    answer: apiData.isAnswered ? '' : undefined,
    revealAuthor: true,
    publicToAll: apiData.isPublic,
    createdAt: new Date(),
    fromUserId: apiData.fromUserId,
    toUserId: apiData.toUserId,
  };
};

/**
 * 질문 카드 목록 조회
 *
 * @returns {Promise<QuestionCardResponse[]>} 질문 카드 배열
 * @throws {Error} 인증 실패, 질문 없음, 기타 에러
 */
export const getQuestionCards = async (): Promise<QuestionCardResponse[]> => {
  const url = `${API_BASE_URL}/customqa/list/`;
  const headers = getAuthHeaders();

  console.log('API 요청:', url);
  console.log('헤더:', headers);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    console.log('응답 상태:', response.status);
    console.log('응답 헤더:', response.headers);

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');
      if (response.status === 404) throw new Error('질문을 찾을 수 없습니다');
      throw new Error(`질문을 불러오는데 실패했습니다 (${response.status})`);
    }

    const data = await response.json();
    console.log('응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};

/**
 * 새로운 질문 카드 생성
 *
 * @param {number | null} toUser - 질문 대상 사용자 ID (예: 123, 456) 또는 null (모두에게)
 * @param {string} text - 질문 내용
 * @param {boolean} isAnonymous - 익명 여부
 * @param {boolean} isPublic - 공개 여부
 * @returns {Promise<CreateQuestionResponse>} 생성된 질문 정보
 * @throws {Error} 인증 실패, 유효성 검증 실패, 기타 에러
 *
 * @example
 * const result = await createQuestion(123, "오늘 기분 어땠어?", true, true);
 * console.log(result.customQId); // 10
 *
 * @example
 * const result = await createQuestion(null, "가족 모두에게 질문", false, true);
 */
export const createQuestion = async (
  toUser: number | null,
  text: string,
  isAnonymous: boolean,
  isPublic: boolean
): Promise<CreateQuestionResponse> => {
  const url = `${API_BASE_URL}/customqa/create/`;
  const headers = getAuthHeaders();

  const requestBody: CreateQuestionRequest = {
    toUser: toUser,
    text: text,
    isAnonymous: isAnonymous,
    isPublic: isPublic,
  };

  console.log('질문 생성 API 요청:', url);
  console.log('요청 Body:', requestBody);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    console.log('Header:', headers);
    console.log('응답 상태:', response.status);

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');
      if (response.status === 400) throw new Error('질문 내용이 비어있거나 대상 사용자가 없습니다');
      throw new Error(`질문 생성에 실패했습니다 (${response.status})`);
    }

    const data: CreateQuestionResponse = await response.json();
    console.log('생성 결과:', data);
    return data;
  } catch (error) {
    console.error('질문 생성 에러:', error);
    throw error;
  }
};

/**
 * 질문 카드 답변 작성
 *
 */
export const createQuestionAnswer = async(customQId: string, content: string) => {
  const url = `${API_BASE_URL}/customqa/${customQId}/answer/`;
  const headers = getAuthHeaders();

  console.log('API 요청:', url);
  console.log('헤더:', headers);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ content }),
    });

    console.log('응답 상태:', response.status);
    console.log('응답 헤더:', response.headers);

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');
      if (response.status === 404) throw new Error('Not found CustomQId');
      throw new Error(`질문을 불러오는데 실패했습니다 (${response.status})`);
    }

    const data = await response.json();
    console.log('응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};

interface QuestionAnswerResponse {
  answerText: string;
  answerBy: string;
  answeredAt: string;
}

/**
 * 질문 카드 답변 조회
 *
 * @param {string} customQId - 질문 카드 ID
 * @returns {Promise<QuestionAnswerResponse>} 답변 정보
 * @throws {Error} 인증 실패, 질문 없음, 기타 에러
 */
export const getQuestionAnswer = async(customQId: string): Promise<QuestionAnswerResponse> => {
  const url = `${API_BASE_URL}/customqa/${customQId}/answers/`;
  const headers = getAuthHeaders();

  console.log('답변 조회 API 요청:', url);
  console.log('헤더:', headers);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    console.log('응답 상태:', response.status);

    if (!response.ok) {
      if (response.status === 403) throw new Error('인증이 필요합니다');
      if (response.status === 404) throw new Error('답변을 찾을 수 없습니다');
      throw new Error(`답변을 불러오는데 실패했습니다 (${response.status})`);
    }

    const raw = await response.json();
    console.log('답변 데이터(raw):', raw);

    // 다양한 응답 포맷을 지원하도록 정규화
    let normalized: QuestionAnswerResponse;

    // 1. 직접 answerId, content 등이 있는 경우 (이미지의 형식)
    if (raw?.answerId != null && raw?.content != null) {
      normalized = {
        answerText: String(raw.content),
        answerBy: String(raw.displayName ?? raw.nickname ?? raw.username ?? ''),
        answeredAt: String(raw.updatedAt ?? raw.createdAt ?? ''),
      };
    }
    // 2. items 배열 스펙
    else if (Array.isArray(raw?.items) && raw.items.length > 0) {
      // 가장 최근 항목을 사용 (updatedAt/createdAt 기준)
      const items = raw.items as Array<any>;
      const pick = [...items].sort((a, b) => {
        const ta = Date.parse(a?.updatedAt ?? a?.createdAt ?? 0);
        const tb = Date.parse(b?.updatedAt ?? b?.createdAt ?? 0);
        return tb - ta;
      })[0];
      normalized = {
        answerText: String(pick?.content ?? ''),
        answerBy: String(pick?.displayName ?? pick?.nickname ?? pick?.username ?? ''),
        answeredAt: String(pick?.updatedAt ?? pick?.createdAt ?? ''),
      };
    }
    // 3. 기타 형식 (하위 호환)
    else {
      normalized = {
        answerText: raw?.answerText ?? raw?.content ?? raw?.text ?? '',
        answerBy: raw?.answerBy ?? raw?.answeredBy ?? raw?.userName ?? '',
        answeredAt: raw?.answeredAt ?? raw?.createdAt ?? '',
      };
    }
    return normalized;
  } catch (error) {
    console.error('답변 조회 에러:', error);
    throw error;
  }
};
