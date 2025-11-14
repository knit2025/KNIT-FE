import { API_BASE_URL, getAuthHeaders } from './config';
import type { Question, FamilyRole, QuestionTarget } from '../types/question';

interface QuestionCardResponse {
  customQId: number;
  fromUser: string;
  toUser: string;
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
  // fromUser를 FamilyRole로 매핑 (익명은 기타로 처리)
  const authorRole: FamilyRole = apiData.fromUser === '익명'
    ? '기타'
    : (apiData.fromUser as FamilyRole);

  // toUser를 QuestionTarget으로 변환 (예: "엄마" → "엄마에게")
  const targetRole: QuestionTarget = apiData.toUser === '모두'
    ? '모두에게'
    : `${apiData.toUser}에게` as QuestionTarget;

  return {
    id: apiData.customQId.toString(),
    authorRole: authorRole,
    targetRole: targetRole,
    title: '', // API에 title 필드가 없으므로 빈 문자열
    content: apiData.text,
    answer: apiData.isAnswered ? '' : undefined, // 답변 여부만 표시
    revealAuthor: apiData.fromUser !== '익명', // 익명이 아니면 true
    publicToAll: apiData.isPublic,
    createdAt: new Date(),
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

    const data = await response.json();
    console.log('답변 데이터:', data);
    return data;
  } catch (error) {
    console.error('답변 조회 에러:', error);
    throw error;
  }
};
