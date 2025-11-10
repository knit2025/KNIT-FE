import { useState } from 'react';
import type { Question } from '../types/question';
import Header from '../components/Header/Header';
import { QuestionCard } from '../components/QuestionCard/QuestionCard';
import PrimaryButton from '../components/Question/PrimaryButton';
import Footer from '../components/Footer/Footer';

interface QuestionDetailPageProps {
  question: Question;
  onSubmit: (answer: string) => void;
  onBack: () => void;
}

export const QuestionDetailPage = ({
  question,
  onSubmit,
  onBack
}: QuestionDetailPageProps) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
    }
  };

  return (
    <div className="relative w-[390px] min-h-screen mx-auto bg-white">
      <Header/>

      {/* 제목 */}
      <h1 className="absolute top-[136px] left-[26px] text-[20px] font-semibold text-[#3A290D]">
        당신의 이야기를 나눠주세요
      </h1>

      {/* 질문 카드 */}
      <div className="absolute top-[193px] left-[25px] w-[340px] h-[443px]">
        <QuestionCard
          question={question}
          editable
          answerValue={answer}
          onChangeAnswer={setAnswer}
        />
      </div>

      {/* 작성 완료 버튼 */}
      <div className="absolute top-[680px] left-[46px] w-[298px]">
        <PrimaryButton onClick={handleSubmit} disabled={!answer?.trim()}>
          작성 완료
        </PrimaryButton>
      </div>

      <Footer />
    </div>
  );
};
