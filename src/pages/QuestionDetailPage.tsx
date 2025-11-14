import { useState, useEffect } from "react";
import type { Question } from "../types/question";
import Header from "../components/Header/Header";
import { QuestionCard } from "../components/QuestionCard/QuestionCard";
import PrimaryButton from "../components/Question/PrimaryButton";
import Footer from "../components/Footer/Footer";
import { createQuestionAnswer, getQuestionAnswer } from "../api/questions";

interface QuestionDetailPageProps {
  question: Question;
  onSubmit: (answer: string) => void;
  onBack: () => void;
}

export const QuestionDetailPage = ({
  question,
}: // onSubmit,
QuestionDetailPageProps) => {
  const [answer, setAnswer] = useState("");
  const [existingAnswer, setExistingAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 답변이 있으면 가져오기
  useEffect(() => {
    const fetchAnswer = async () => {
      // question에 이미 answer가 있으면 사용
      if (question.answer) {
        setExistingAnswer(question.answer);
        setAnswer(question.answer);
        setLoading(false);
        return;
      }

      // answer가 없으면 API 호출해서 가져오기
      try {
        const answerData = await getQuestionAnswer(question.id);
        setExistingAnswer(answerData.answerText);
        setAnswer(answerData.answerText);
      } catch (err) {
        // 답변이 없는 경우 에러가 발생할 수 있음 (정상)
        console.log("답변이 아직 없습니다:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [question]);

  const handleSubmit = () => {
    if (answer.trim()) {
      createQuestionAnswer(question.id, answer);
    }
  };

  if (loading) {
    return (
      <div className="relative w-[390px] min-h-screen mx-auto text-left bg-white">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-[#A9927F]">질문을 불러오는 중...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative w-[390px] min-h-screen mx-auto text-left bg-white">
      <Header />
      <div className="pointer-events-none absolute left-0 top-0 w-full h-[110px] bg-white z-40" />

      <div className="absolute inset-x-0 top-0 bottom-[140px] scroll-container">
        {/* 제목 */}
        <h1 className="absolute top-[136px] left-[26px] text-[20px] font-semibold text-[#3A290D]">
          {existingAnswer
            ? "가족의 소중한 이야기"
            : "당신의 이야기를 나눠주세요"}
        </h1>

        {/* 질문 카드 */}
        <div className="absolute top-[193px] left-[25px] w-[340px] h-[443px]">
          <QuestionCard
            question={question}
            editable={!existingAnswer} // 답변이 있으면 수정 불가
            answerValue={answer}
            onChangeAnswer={setAnswer}
          />
        </div>

        {/* 작성 완료 버튼 - 답변이 없을 때만 표시 */}
        {!existingAnswer && (
          <div className="absolute top-[680px] left-[46px] w-[298px]">
            <PrimaryButton onClick={handleSubmit} disabled={!answer?.trim()}>
              작성 완료
            </PrimaryButton>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
