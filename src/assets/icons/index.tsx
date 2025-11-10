// React Component로 변환된 커스텀 아이콘들

export interface IconProps {
  className?: string;
  size?: number; // px, 기본: 원본 크기
}

/**
 * 추가 버튼 아이콘 (플로팅 버튼 등)
 * 원본: addBtn.svg (34x34)
 * - 색상은 currentColor를 따릅니다. 부모의 text-색상으로 제어하세요.
 */
export function AddBtnIcon({ className, size }: IconProps) {
  const dimension = size || 34;

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="17" cy="17" r="16" fill="currentColor" />
      <path d="M17 10v14M10 17h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

