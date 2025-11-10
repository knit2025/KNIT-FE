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
      className="relative h-[calc(100vh-200px)] w-full overflow-hidden"
      {...swipeHandlers}
    >
      {focusedId && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setFocusedId(null)}
          aria-hidden
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center p-4">
        {questions.map((question, index) => {
          // 현재 카드부터 최대 3개까지만 렌더링 (성능 최적화)
          if (index < currentIndex || index > currentIndex + 2) {
            return null;
          }

          const offset = index - currentIndex;
          const isVisible = offset <= 2;
          // 겹침 간격 및 오버레이 진하기 설정
          const translateY = offset * 145; // px
          const overlayOpacity = Math.min(1, Math.max(0, offset * 0.25));
          const overlayColor = '#E1B799';
          const isFocused = focusedId === question.id;
          const baseZ = index;
          const zIndexOrder = isFocused ? 50 : baseZ; // 포커스 카드는 오버레이 위로
          const transform = `translateY(${translateY}px)` + (isFocused ? ' scale(1.02)' : '');

          return (
            <QuestionCard
              key={question.id}
              question={question}
              onClick={() => (focusedId === question.id ? onCardSelect(question) : setFocusedId(question.id))}
              onAnswerClick={() => onCardSelect(question)}
              style={{
                position: 'absolute',
                transform,
                zIndex: zIndexOrder,
                transition: 'all 0.3s ease-out',
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
