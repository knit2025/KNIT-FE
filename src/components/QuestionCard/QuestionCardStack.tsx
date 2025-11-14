import { useState, useRef, useEffect, useCallback } from 'react';
import type { Question } from '../../types/question';
import { QuestionCard } from './QuestionCard';
import { useSwipe } from '../../hooks/useSwipe';

interface QuestionCardStackProps {
  questions: Question[];
  onCardSelect: (question: Question) => void;
  canAnswerQuestion?: (question: Question) => boolean; // 답변 가능 여부 확인 함수
}

export const QuestionCardStack = ({
  questions,
  onCardSelect,
  canAnswerQuestion
}: QuestionCardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // 스크롤 이벤트 핸들러
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    // 스크롤 중복 방지 (디바운싱)
    if (isScrollingRef.current) return;

    const deltaY = e.deltaY;

    // 스크롤 방향에 따라 카드 이동
    if (deltaY > 0) {
      // 아래로 스크롤 → 다음 카드
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        isScrollingRef.current = true;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 300); // 300ms 디바운스
      }
    } else if (deltaY < 0) {
      // 위로 스크롤 → 이전 카드
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        isScrollingRef.current = true;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 300);
      }
    }
  }, [currentIndex, questions.length]);

  // wheel 이벤트 리스너 등록
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

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
      ref={containerRef}
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
              showAnswerButton={canAnswerQuestion ? canAnswerQuestion(question) : true}
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
