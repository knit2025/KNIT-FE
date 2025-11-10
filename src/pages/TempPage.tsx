import { QuestionCard } from '../components/QuestionCard/QuestionCard';
import type { Question } from '../types/question';
import { useState } from 'react';

const sampleQuestion: Question = {
  id: 'preview-1',
  authorRole: '아들',
  targetRole: '아빠에게',
  title: '아빠의 어린 시절',
  content: '아빠가 어렸을 때 가장 좋아했던 놀이는 무엇이었나요?\n추억 이야기 들려주세요!',
  revealAuthor: true,
  publicToAll: true,
  createdAt: new Date(),
};

export const TempPage = () => {
  const [answer, setAnswer] = useState('');
  return (
    <div className="min-h-screen bg-white p-6 flex items-center justify-center">
      <QuestionCard
        question={sampleQuestion}
        className="max-w-md w-full"
        editable
        answerValue={answer}
        onChangeAnswer={setAnswer}
        style={{ position: 'relative' }}
      />
    </div>
  );
};
