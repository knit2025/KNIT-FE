import { useState } from 'react';
import type { Question } from '../../types/question';
import { QuestionCard } from './QuestionCard';
import { useSwipe } from '../../hooks/useSwipe';

interface QuestionCardStackProps {
  questions: Question[];
  onCardSelect: (question: Question) => void;
}

export const QuestionCardStack = ({
  questions,
  onCardSelect
}: QuestionCardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeHandlers = useSwipe({
    onSwipeUp: () => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    },
    onSwipeDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    },
  });

  return (
    <div
      className="relative h-[calc(100vh-200px)] w-full overflow-hidden"
      {...swipeHandlers}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {questions.map((question, index) => {
          // 현재 카드부터 최대 3개까지만 렌더링 (성능 최적화)
          if (index < currentIndex || index > currentIndex + 2) {
            return null;
          }

          const offset = index - currentIndex;
          const isVisible = offset <= 2;
          // 겹쳐 보이도록 Y 이동/스케일을 완만하게 적용 (음수 스케일 방지)
          const translateY = offset * 16; // px
          const scale = Math.max(1 - offset * 0.05, 0.9);
          const zIndexOrder = index; // 먼저 렌더된 카드가 뒤로 가도록 낮은 값부터 부여

          return (
            <QuestionCard
              key={question.id}
              question={question}
              onClick={() => onCardSelect(question)}
              style={{
                position: 'absolute',
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex: zIndexOrder,
                opacity: isVisible ? 1 - offset * 0.15 : 0,
                transition: 'all 0.3s ease-out',
                width: 'calc(100% - 2rem)',
                maxWidth: '400px',
              }}
              className={`
                ${offset === 0 ? 'shadow-xl' : 'shadow-md'}
                ${!isVisible ? 'pointer-events-none' : ''}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};
