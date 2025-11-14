/**
 * 미션 완료 상태를 로컬 스토리지에 저장하고 관리하는 유틸리티
 * 한국 시간 기준 자정에 자동으로 초기화됩니다.
 */

const MISSION_STORAGE_KEY = 'mission_completed_today';
const MISSION_DATE_KEY = 'mission_completion_date';

/**
 * 한국 시간 기준으로 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
const getKoreanToday = (): string => {
  const now = new Date();
  // UTC 시간에 9시간(한국 시간) 더하기
  const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return koreanTime.toISOString().split('T')[0];
};

/**
 * 오늘 미션을 완료했는지 확인
 * 자정이 지났으면 자동으로 false 반환 및 스토리지 초기화
 */
export const isMissionCompletedToday = (): boolean => {
  const savedDate = localStorage.getItem(MISSION_DATE_KEY);
  const today = getKoreanToday();

  // 저장된 날짜가 오늘이 아니면 초기화
  if (savedDate !== today) {
    localStorage.removeItem(MISSION_STORAGE_KEY);
    localStorage.removeItem(MISSION_DATE_KEY);
    return false;
  }

  const completed = localStorage.getItem(MISSION_STORAGE_KEY);
  return completed === 'true';
};

/**
 * 미션 완료 상태 저장
 */
export const setMissionCompleted = (): void => {
  const today = getKoreanToday();
  localStorage.setItem(MISSION_STORAGE_KEY, 'true');
  localStorage.setItem(MISSION_DATE_KEY, today);
};

/**
 * 미션 완료 상태 초기화 (테스트용)
 */
export const clearMissionCompletion = (): void => {
  localStorage.removeItem(MISSION_STORAGE_KEY);
  localStorage.removeItem(MISSION_DATE_KEY);
};
