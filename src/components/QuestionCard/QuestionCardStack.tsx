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
  // 애니메이션 중인지 추적
  const [isAnimating, setIsAnimating] = useState(false);

  // 스크롤 이벤트 핸들러
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    // 스크롤 중복 방지 (디바운싱)
    if (isScrollingRef.current || isAnimating) return;

    const deltaY = e.deltaY;

    // 스크롤 방향에 따라 카드 이동
    if (deltaY > 0) {
      // 아래로 스크롤 → 다음 카드
      if (currentIndex < questions.length - 1) {
        setIsAnimating(true);
        setCurrentIndex(prev => prev + 1);
        isScrollingRef.current = true;
        setTimeout(() => {
          isScrollingRef.current = false;
          setIsAnimating(false);
        }, 500); // 500ms 애니메이션 시간
      }
    } else if (deltaY < 0) {
      // 위로 스크롤 → 이전 카드
      if (currentIndex > 0) {
        setIsAnimating(true);
        setCurrentIndex(prev => prev - 1);
        isScrollingRef.current = true;
        setTimeout(() => {
          isScrollingRef.current = false;
          setIsAnimating(false);
        }, 500);
      }
    }
  }, [currentIndex, questions.length, isAnimating]);

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
      if (currentIndex < questions.length - 1 && !isAnimating) {
        setIsAnimating(true);
        setCurrentIndex(prev => prev + 1);
        setTimeout(() => setIsAnimating(false), 500);
      }
    },
    onSwipeDown: () => {
      if (currentIndex > 0 && !isAnimating) {
        setIsAnimating(true);
        setCurrentIndex(prev => prev - 1);
        setTimeout(() => setIsAnimating(false), 500);
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
          // 현재 카드 이전(-1) 또는 이후(+4)까지 렌더링 (opacity 애니메이션용)
          const minIndex = Math.max(0, currentIndex - 1);
          const maxIndex = Math.min(questions.length - 1, currentIndex + 4);

          if (index < minIndex || index > maxIndex) {
            return null;
          }

          const offset = index - currentIndex;
          const isVisible = offset >= 0 && offset <= 3;

          // 카드 간격: 화면 크기에 비례 (약 33-35% 높이)
          const translateY = offset * 149; // px (기본값 유지, 반응형은 CSS로 처리)

          // 오버레이 불투명도 계산
          const overlayOpacity = Math.min(1, Math.max(0, offset * 0.2));
          const overlayColor = '#E1B799';

          // 카드 opacity 계산 (나타나고 사라지는 효과)
          let cardOpacity = 1;
          if (offset === -1) {
            // 이전 카드 (사라지는 중)
            cardOpacity = 0;
          } else if (offset === 4) {
            // 새로 나타나는 카드
            cardOpacity = 0;
          } else if (offset >= 0 && offset <= 3) {
            // 보이는 카드들
            cardOpacity = 1;
          }

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
                width: '100%', // 흐름형 레이아웃: 부모 너비에 맞춤
                maxWidth: '340px', // 최대 너비 제한
                transform,
                zIndex: zIndexOrder,
                opacity: cardOpacity,
                transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)', // 더 부드러운 애니메이션
                ['--overlay-opacity' as any]: isFocused ? '0' : String(overlayOpacity),
                ['--overlay-color' as any]: overlayColor,
              }}
              className={`
                ${isFocused ? 'shadow-2xl' : offset === 0 ? 'shadow-xl' : 'shadow-md'}
                ${!isVisible && offset !== -1 && offset !== 4 ? 'pointer-events-none' : ''}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};
