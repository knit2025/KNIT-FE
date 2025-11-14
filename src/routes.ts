export const PATHS = {
  Home: "/Home",
  questionList: '/question',
  createQuestion: '/question/create',
  answer: (id: string | number = ':id') => `/question/${id}/answer`,
  mission: '/mission',
  todayMission: '/mission/today',
  missionDetail: (id: string | number = ':missionId') => `/MissionDetail/${id}`,
  missionLog: "/missionLog",
  TodayKindness: "/TodayKindness"
} as const;

