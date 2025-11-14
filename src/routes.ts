export const PATHS = {
  Home: "/Home",
  questionList: '/question',
  createQuestion: '/question/create',
  temp: '/question/temp',
  answer: (id: string | number = ':id') => `/question/${id}/answer`,
  mission: '/mission',
  todayMission: '/mission/today',
  missionLog: "/mission-log",
  TodayKindness: "/TodayKindness"
} as const;

