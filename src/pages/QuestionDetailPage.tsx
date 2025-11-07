import { useState } from 'react';
import type { Question } from '../types/question';
import Header from '../components/Header/Header';
import { QuestionCard } from '../components/QuestionCard/QuestionCard';
import SelectableButton from '../components/common/SelectableButton';
import PrimaryButton from '../components/common/PrimaryButton';

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
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <Header/>
      <h1 className="text-2xl font-bold mb-8">
        당신의 이야기를 나눠주세요
      </h1>

      <div className="mb-6">
        <QuestionCard
          question={question}
          editable
          answerValue={answer}
          onChangeAnswer={setAnswer}
        />
      </div>

      <PrimaryButton onClick={handleSubmit} disabled={!answer?.trim()}>
        작성 완료
      </PrimaryButton>



      {/* 하단 네비게이션 - 실제 구현 시 별도 컴포넌트로 분리 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-200 flex justify-around p-4">
        <button onClick={onBack} className="p-2">뒤로</button>
      </nav>
    </div>
  );
};
