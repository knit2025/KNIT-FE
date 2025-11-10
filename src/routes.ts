export const PATHS = {
  questionList: '/question',
  createQuestion: '/question/create',
  temp: '/question/temp',
  answer: (id: string | number = ':id') => `/question/${id}/answer`,
  mission: '/mission',
  todayMission: '/mission/today'
} as const;

