import { useEffect, useState } from 'react';
import { QuestionCardStack } from '../components/QuestionCard/QuestionCardStack';
import type { Question, FamilyRole } from '../types/question';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlusIcon from '../assets/add 2.png'
import { PATHS } from '../routes';
import Footer from '../components/Footer/Footer';
import { getQuestionCards, mapApiToQuestion, getQuestionAnswer } from '../api/questions';
import { getCurrentUserRole } from '../api/config';


export const QuestionListPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as any; // state + pathname 접근 단순 캐스팅

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortByAnswerable, setSortByAnswerable] = useState(false); // 답변 가능한 질문 정렬 상태

  // 현재 사용자가 답변할 수 있는 질문인지 확인하는 함수
  const canAnswerQuestion = (question: Question): boolean => {
    const currentUserRole = getCurrentUserRole();
    if (!currentUserRole) return false;

    // 이미 답변된 질문은 답변 불가
    if (question.answer) return false;

    // targetRole에서 "에게" 제거하여 비교 (예: "엄마에게" -> "엄마")
    const targetRole = question.targetRole.replace('에게', '');

    // "모두에게"인 경우 모두 답변 가능
    if (question.targetRole === '모두에게') return true;

    // 현재 사용자의 역할이 질문의 대상과 일치하는 경우에만 답변 가능
    return currentUserRole === targetRole;
  };

  // API에서 질문 목록 불러오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getQuestionCards();

        // API 데이터를 Question 타입으로 변환하고 답변 가져오기
        const questionsWithAnswers = await Promise.all(
          data.map(async (apiData) => {
            const question = mapApiToQuestion(apiData);

            // isAnswered가 true인 경우에만 답변 조회
            if (apiData.isAnswered) {
              try {
                const answerData = await getQuestionAnswer(question.id);
                question.answer = answerData.answerText;
                question.answeredBy = answerData.answerBy as FamilyRole;
              } catch (err) {
                console.error(`질문 ${question.id}의 답변 조회 실패:`, err);
              }
            }

            return question;
          })
        );

        setAllQuestions(questionsWithAnswers);
      } catch (err) {
        setError(err instanceof Error ? err.message : '질문을 불러오는데 실패했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // 답변 가능한 질문을 상단으로 정렬
  const sortedQuestions = sortByAnswerable
    ? [...allQuestions].sort((a, b) => {
        const aCanAnswer = canAnswerQuestion(a);
        const bCanAnswer = canAnswerQuestion(b);
        if (aCanAnswer && !bCanAnswer) return -1;
        if (!aCanAnswer && bCanAnswer) return 1;
        return 0;
      })
    : allQuestions;

  // "답변할래요" 라벨 클릭 핸들러
  const handleAnswerLabelClick = () => {
    setSortByAnswerable((prev) => !prev);
  };

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
    <div className="relative w-[390px] text-left h-screen mx-auto bg-white overflow-hidden">
      {/* 헤더 영역 */}
      <Header/>

      {/* 제목 */}
      <h1 className='absolute top-[132px] left-[32px] text-xl font-semibold text-[#3A290D]'>
        가족들에게 궁금한 점을 물어보아요
      </h1>

      {/* 답장할래요 라벨 */}
      <div
        className="absolute top-[174px] left-[308px] flex items-center text-[10px] text-[#A9927F] cursor-pointer hover:opacity-70 transition-opacity"
        onClick={handleAnswerLabelClick}
      >
        <span className="w-[3px] h-[3px] rounded-full bg-[#A9927F] mr-1"></span>
        답장할래요
      </div>

      {/* 카드 스택 영역: 스택 자체는 스와이프/휠로만 이동 (스크롤 X) */}
      <div
        className="absolute top-[191px] left-[25px] w-[340px] h-[443px] overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#A9927F]">질문을 불러오는 중...</p>
          </div>
        ) :
        // error ? (
        //   <div className="flex items-center justify-center h-full">
        //     <p className="text-red-400">{error}</p>
        //   </div>
        // ) :
        sortedQuestions.length > 0 ? (
          <QuestionCardStack
            questions={sortedQuestions}
            onCardSelect={handleAnswerClick}
            canAnswerQuestion={canAnswerQuestion}
          />
        )
        : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">질문이 없습니다</p>
          </div>
        )}
      </div>

      {/* + 버튼 (질문 생성) */}
      <button
        type='button'
        className='fixed left-[317px] bottom-[110px] w-[34px] h-[34px] cursor-pointer z-50'
        onClick={handleCreateQuestion}>
        <img src={PlusIcon} alt="PlusIcon" className='w-full h-full'/>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};
