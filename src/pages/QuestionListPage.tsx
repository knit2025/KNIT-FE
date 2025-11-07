import { useEffect, useState } from 'react';
import { QuestionCardStack } from '../components/QuestionCard/QuestionCardStack';
import type { Question } from '../types/question';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { AddBtnIcon } from '../assets/icons';
import { PATHS } from '../routes';

// 카테고리 UI가 비활성 상태이므로 상수는 제거하여 TS noUnusedLocals 경고를 피합니다.

export const QuestionListPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as any; // state + pathname 접근 단순 캐스팅

  // 샘플 데이터 - 실제로는 API/상태관리에서 가져옴
  const [allQuestions, setAllQuestions] = useState<Question[]>([
    {
      id: '1',
      authorRole: '아들',
      targetRole: '아빠에게',
      title: '아빠의 어린 시절',
      content: '아빠가 어렸을 때 가장 좋아했던 놀이는 무엇이었나요?',
      revealAuthor: true,
      publicToAll: true,
      createdAt: new Date(),
    },
    {
      id: '2',
      authorRole: '딸',
      targetRole: '엄마에게',
      title: '엄마의 꿈',
      content: '엄마가 어렸을 때 꿈꾸던 직업은 무엇이었나요?',
      revealAuthor: true,
      publicToAll: true,
      createdAt: new Date(),
    },
    {
      id: '3',
      authorRole: '엄마',
      targetRole: '모두에게',
      title: '가족의 추억',
      content: '우리 가족의 가장 행복했던 순간은 언제였나요?',
      revealAuthor: false,
      publicToAll: true,
      createdAt: new Date(),
    },
    {
      id: '4',
      authorRole: '아빠',
      targetRole: '딸에게',
      title: '미래의 모습',
      content: '10년 후 너는 어떤 모습일 것 같니?',
      revealAuthor: true,
      publicToAll: false,
      createdAt: new Date(),
    },
  ]);

  const handleAnswerClick = (question: Question) => {
    navigate(PATHS.answer(question.id), { state: { question } });
  };

  const handleCreateQuestion = () => {
    navigate(PATHS.createQuestion);
  };

  // CreateQuestionPage에서 넘어온 신규 질문을 리스트에 추가하고 state를 정리
  useEffect(() => {
    const incoming = location.state?.newQuestion;
    if (incoming) {
      setAllQuestions((prev) => [incoming, ...prev]);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <div className="min-h-screen p-6 bg-white pb-24">
      <Header />
        <h1 className='text-xl font-semibold'>가족들에게 궁금한 점을 물어보아요</h1>

      <div className="mt-4 relative">
        <span className="absolute top-2 right-4 z-10 text-[10px] before:content-['•'] before:mr-1 text-[#A9927F]">답장할래요</span>
        {allQuestions.length > 0 ? (
          <QuestionCardStack questions={allQuestions} onCardSelect={handleAnswerClick} />
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">질문이 없습니다</p>
          </div>
        )}
      </div>

      {/* + 버튼 (질문 생성) */}
      <button
        type='button'
        onClick={handleCreateQuestion}
        aria-label='질문 만들기'
        className='fixed z-40 right-3/24 bottom-1/8'
      >
        <AddBtnIcon size={60} aria-hidden="true" className='text-[#523E1B]'/>
      </button>
    </div>
  );
};
