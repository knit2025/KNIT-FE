// 가족 역할 타입
export type FamilyRole = '엄마' | '아빠' | '아들' | '딸' | '할머니' | '할아버지' | '기타';

// 질문 카테고리 (누구에게)
export type QuestionTarget = '엄마에게' | '아빠에게' | '아들에게' | '딸에게' | '할머니에게' | '할아버지에게' | '모두에게';

// 질문 인터페이스
export interface Question {
  id: string;
  authorRole: FamilyRole;           // 작성자 역할
  targetRole: QuestionTarget;       // 질문 대상
  title: string;                     // 질문 제목
  content: string;                   // 질문 내용
  revealAuthor: boolean;             // 나를 드러낼까요? (예/아니오)
  publicToAll: boolean;              // 질문을 모두에게 공개할까요? (예/아니오)
  answer?: string;                   // 답변 내용 (선택)
  answeredBy?: FamilyRole;           // 답변자 역할 (선택)
  createdAt: Date;                   // 작성 시간
  answeredAt?: Date;                 // 답변 시간 (선택)
  familyCode?: string;               // 가족 초대 코드
}

// 사용자 인터페이스
export interface User {
  id: string;
  name: string;
  role: FamilyRole;
  familyCode: string;
}

// 질문 작성 폼 데이터
export interface CreateQuestionForm {
  authorRole: FamilyRole;
  targetRole: QuestionTarget;
  revealAuthor: boolean;
  publicToAll: boolean;
  content: string;
}
