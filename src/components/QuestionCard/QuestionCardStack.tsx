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
  const [focusedId, setFocusedId] = useState<string | null>(null);

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
      className="relative w-full h-full overflow-visible"
      {...swipeHandlers}
    >
      {focusedId && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setFocusedId(null)}
          aria-hidden
        />
      )}

      <div className="relative w-full h-full">
        {questions.map((question, index) => {
          // 현재 카드부터 최대 4개까지 렌더링
          if (index < currentIndex || index > currentIndex + 3) {
            return null;
          }

          const offset = index - currentIndex;
          const isVisible = offset <= 3;
          // 디자인 시안 기준: 카드 간격 약 142~155px (평균 149px)
          const translateY = offset * 149; // px
          const overlayOpacity = Math.min(1, Math.max(0, offset * 0.2));
          const overlayColor = '#E1B799';
          const isFocused = focusedId === question.id;
          const baseZ = index;
          const zIndexOrder = isFocused ? 50 : baseZ;
          const transform = `translateY(${translateY}px)` + (isFocused ? ' scale(1.02)' : '');

          return (
            <QuestionCard
              key={question.id}
              question={question}
              onClick={() => (focusedId === question.id ? onCardSelect(question) : setFocusedId(question.id))}
              onAnswerClick={() => onCardSelect(question)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '340px',
                transform,
                zIndex: zIndexOrder,
                transition: 'all 0.2s ease-out',
                ['--overlay-opacity' as any]: isFocused ? '0' : String(overlayOpacity),
                ['--overlay-color' as any]: overlayColor,
              }}
              className={`
                ${isFocused ? 'shadow-2xl' : offset === 0 ? 'shadow-xl' : 'shadow-md'}
                ${!isVisible ? 'pointer-events-none' : ''}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};
