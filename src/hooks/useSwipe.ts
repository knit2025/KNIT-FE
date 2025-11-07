import { useState } from 'react';

interface UseSwipeProps {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

export const useSwipe = ({
  onSwipeUp,
  onSwipeDown,
  threshold = 50
}: UseSwipeProps) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > threshold;
    const isSwipeDown = distance < -threshold;

    if (isSwipeUp && onSwipeUp) {
      onSwipeUp();
    }
    if (isSwipeDown && onSwipeDown) {
      onSwipeDown();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
