import { useEffect, useState } from 'react';
import { QuestionCardStack } from '../components/QuestionCard/QuestionCardStack';
import type { Question } from '../types/question';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlusIcon from '../assets/add 2.png'
import { PATHS } from '../routes';
import Footer from '../components/Footer/Footer';


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
    <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden">
      {/* 헤더 영역 */}
      <Header/>

      {/* 제목 */}
      <h1 className='absolute top-[132px] left-[32px] text-xl font-semibold text-[#3A290D]'>
        가족들에게 궁금한 점을 물어보아요
      </h1>

      {/* 답장할래요 라벨 */}
      <div className="absolute top-[174px] left-[308px] flex items-center text-[10px] text-[#A9927F]">
        <span className="w-[3px] h-[3px] rounded-full bg-[#A9927F] mr-1"></span>
        답장할래요
      </div>

      {/* 카드 스택 영역 */}
      <div className="absolute top-[191px] left-[25px] w-[340px] h-[443px]">
        {allQuestions.length > 0 ? (
          <QuestionCardStack questions={allQuestions} onCardSelect={handleAnswerClick} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">질문이 없습니다</p>
          </div>
        )}
      </div>

      {/* + 버튼 (질문 생성) */}
      <button
        type='button'
        className='absolute left-[317px] bottom-[110px] w-[34px] h-[34px] cursor-pointer z-50'
        onClick={handleCreateQuestion}>
        <img src={PlusIcon} alt="PlusIcon" className='w-full h-full'/>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};
