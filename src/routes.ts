export const PATHS = {
  questionList: '/question',
  createQuestion: '/question/create',
  temp: '/question/temp',
  answer: (id: string | number = ':id') => `/question/${id}/answer`,
} as const;

