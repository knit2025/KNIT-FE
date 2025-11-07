import { useState } from 'react';
import type { Question } from '../types/question';
import Header from '../components/Header/Header';

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
        당신의 이야기를<br />
        나눠주세요
      </h1>

      <div className="flex-1 bg-gray-200 rounded-3xl p-6 mb-6 flex flex-col">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">
            {question.targetRole} 궁금한 점
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {question.authorRole}가 물어봤어요
          </p>
          <div className="min-h-32 mt-4">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{question.content}</p>
          </div>
        </div>

        <div className="border-t border-gray-400 pt-6 flex-1 flex flex-col">
          <p className="text-sm text-gray-600 mb-4">답변 내용</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full flex-1 bg-transparent resize-none outline-none text-gray-800"
            placeholder="답변을 입력하세요..."
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-gray-800 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
      >
        작성 완료
      </button>

      {/* 하단 네비게이션 - 실제 구현 시 별도 컴포넌트로 분리 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-200 flex justify-around p-4">
        <button onClick={onBack} className="p-2">뒤로</button>
      </nav>
    </div>
  );
};
