import { useState, useEffect, useMemo } from "react";
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
  const [submitting, setSubmitting] = useState(false);
  const currentUserId = useMemo(() => {
    const v = localStorage.getItem('currentUserId');
    return v ? Number(v) : undefined;
  }, []);

  // 컴포넌트 마운트 시 답변이 있으면 가져오기
  useEffect(() => {
    const fetchAnswer = async () => {
      // question에 이미 answer가 있고 내용이 있으면 사용 (빈 문자열은 제외)
      if (question.answer && question.answer.trim()) {
        setExistingAnswer(question.answer);
        setAnswer(question.answer);
        setLoading(false);
        return;
      }

      // answer가 없거나 빈 문자열이면 API 호출해서 실제 답변 가져오기
      try {
        const answerData = await getQuestionAnswer(question.id);
        // 답변이 있는 경우에만 상태 업데이트
        if (answerData.answerText && answerData.answerText.trim()) {
          setExistingAnswer(answerData.answerText);
          setAnswer(answerData.answerText);
        }
      } catch (err) {
        // 답변이 없는 경우 에러가 발생할 수 있음 (정상)
        console.log("답변이 아직 없습니다:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [question]);

  const handleSubmit = async () => {
    const content = answer.trim();
    if (!content || submitting) return;

    try {
      setSubmitting(true);
      const body = { content };
      console.log('답변 전송 Body:', body);
      await createQuestionAnswer(question.id, content);
      // 성공 시 화면 상태 업데이트: 더 이상 편집 불가하도록 고정
      setExistingAnswer(content);
    } catch (err) {
      console.error('답변 등록 실패:', err);
      // 필요 시 토스트 또는 경고로 대체 가능
      alert(err instanceof Error ? err.message : '답변 등록에 실패했습니다');
    } finally {
      setSubmitting(false);
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
            editable={
              // 답변이 없고, 현재 사용자가 작성자가 아닌 경우에만 편집 가능
              !existingAnswer && !(currentUserId != null && question.fromUserId != null && currentUserId === question.fromUserId)
            }
            showAnswerButton={
              // 답변이 이미 있으면 버튼 숨김, 작성자 본인도 숨김
              !existingAnswer && !(currentUserId != null && question.fromUserId != null && currentUserId === question.fromUserId)
            }
            answerValue={answer}
            onChangeAnswer={setAnswer}
          />
        </div>

        {/* 작성 완료 버튼 - 답변이 없고, 작성자가 현재 사용자가 아닐 때만 표시 */}
        {!existingAnswer && !(currentUserId != null && question.fromUserId != null && currentUserId === question.fromUserId) && (
          <div className="absolute top-[680px] left-[46px] w-[298px]">
            <PrimaryButton onClick={handleSubmit} disabled={!answer?.trim() || submitting}>
              작성 완료
            </PrimaryButton>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
