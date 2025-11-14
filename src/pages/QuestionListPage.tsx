import { useEffect, useState } from 'react';
import { QuestionCardStack } from '../components/QuestionCard/QuestionCardStack';
import type { Question, FamilyRole } from '../types/question';
import { useLocation, useNavigate, type Location } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlusIcon from '../assets/add 2.png'
import { PATHS } from '../routes';
import Footer from '../components/Footer/Footer';
import { getQuestionCards, mapApiToQuestion, getQuestionAnswer } from '../api/questions';
import { useMemo } from 'react';


export const QuestionListPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: { newQuestion?: Question } };

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortByAnswerable, setSortByAnswerable] = useState(false); // 답변 가능한 질문 정렬 상태

  const currentUserId = useMemo(() => {
    const v = localStorage.getItem('currentUserId');
    return v ? Number(v) : undefined;
  }, []);

  // 현재 사용자가 답변할 수 있는 질문인지 확인 (ID 기준)
  const canAnswerQuestion = (question: Question): boolean => {
    if (question.answer) return false; // 이미 답변됨
    if (currentUserId == null) return false;
    if (question.fromUserId != null && question.fromUserId === currentUserId) return false; // 작성자는 불가
    if (question.toUserId == null) return true; // 모두에게
    return question.toUserId === currentUserId; // 대상자가 현재 사용자
  };

  // API에서 질문 목록 불러오기
  // 서버는 비공개(isPublic=false) 질문을 자동으로 필터링하여 반환합니다
  // - 작성자 또는 대상인 경우에만 비공개 질문이 포함됨
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getQuestionCards();

        // 404: 질문이 없는 경우 빈 배열로 처리
        if (!data || data.length === 0) {
          setAllQuestions([]);
          return;
        }

        // API 데이터를 Question 타입으로 변환하고, 가능한 경우 답변을 조회하여 주입
        const questionsWithAnswers = await Promise.all(
          data.map(async (apiData) => {
            const question = mapApiToQuestion(apiData);

            try {
              const answerData = await getQuestionAnswer(question.id);
              if (answerData?.answerText) {
                question.answer = answerData.answerText;
                question.answeredBy = answerData.answerBy as FamilyRole;
              }
            } catch {
              // 404 등 답변이 없으면 무시하고 진행
              // console.debug(`답변 없음 또는 조회 실패(${question.id}):`, err);
            }

            return question;
          })
        );

        setAllQuestions(questionsWithAnswers);
      } catch (err) {
        console.error('질문 목록 조회 실패:', err);
        // 404 에러는 질문이 없는 것으로 처리
        if (err instanceof Error && err.message.includes('404')) {
          setAllQuestions([]);
          setError(null);
        } else {
          setError(err instanceof Error ? err.message : '질문을 불러오는데 실패했습니다');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // 답변 가능한 질문을 상단으로 정렬
  const sortedQuestions = sortByAnswerable
    ? [...allQuestions].sort((a, b) => {
        // 아직 답변 안했고(toUserId == currentUserId) 우선
        const aScore = (a.answer ? 0 : 1) + (a.toUserId === currentUserId ? 2 : 0);
        const bScore = (b.answer ? 0 : 1) + (b.toUserId === currentUserId ? 2 : 0);
        return bScore - aScore;
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
        className="absolute top-[191px] left-[25px] w-[340px] h-[570px] overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#A9927F]">질문을 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-400">{error}</p>
          </div>
        ) : sortedQuestions.length > 0 ? (
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
        className='absolute left-[317px] bottom-[110px] w-[34px] h-[34px] cursor-pointer z-50'
        onClick={handleCreateQuestion}>
        <img src={PlusIcon} alt="PlusIcon" className='w-full h-full'/>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};
