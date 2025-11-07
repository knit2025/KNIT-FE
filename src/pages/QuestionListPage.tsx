import { useState, useMemo } from 'react';
import { QuestionCardStack } from '../components/QuestionCard/QuestionCardStack';
import type { Question, QuestionTarget } from '../types/question';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { AddBtnIcon } from '../assets/icons';

const categories: { label: string; value: QuestionTarget | 'all' }[] = [
  { label: '답장할래요', value: 'all' },
  { label: '아빠에게', value: '아빠에게' },
  { label: '엄마에게', value: '엄마에게' },
  { label: '모두에게', value: '모두에게' },
  { label: '엄마에게', value: '엄마에게' },
];

export const QuestionListPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<QuestionTarget | 'all'>('all');

  // 샘플 데이터 - 실제로는 API나 상태관리에서 가져옴
  const [allQuestions] = useState<Question[]>([
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

  // 카테고리별 필터링
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return allQuestions;
    return allQuestions.filter((q) => q.targetRole === selectedCategory);
  }, [allQuestions, selectedCategory]);

  const handleCardSelect = (question: Question) => {
    // 라우팅으로 답변 작성 화면으로 이동
    navigate(`/question/${question.id}/answer`, { state: { question } });
  };

  const handleCreateQuestion = () => {
    navigate('/question/create');
  };

  return (
    <div className="min-h-screen p-6 bg-white pb-20">
      <Header />
        <h1 className='text-xl font-semibold'>가족들에게 궁금한 점을 물어보아요</h1>
        <span className="block text-right text-[10px] before:content-['•'] before:mr-1 text-[#A9927F]">답장할래요</span>
        {/* 카테고리 필터 */}
        {/* <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${
                  selectedCategory === category.value
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div> */}

      {filteredQuestions.length > 0 ? (
        <QuestionCardStack
          questions={filteredQuestions}
          onCardSelect={handleCardSelect}
        />
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">질문이 없습니다</p>
        </div>
      )}

      {/* + 버튼 (질문 생성) */}
      <button
        type='button'
        onClick={handleCreateQuestion}
        aria-label='질문 만들기'
        className='fixed right-4 bottom-4'
      >
        <AddBtnIcon size={60} aria-hidden="true" className='text-[#523E1B]'/>
      </button>
    </div>
  );
};
