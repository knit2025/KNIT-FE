interface HeaderProps {
  className?: string;
  textSize?: string;
  topLoc?: string;
  leftLoc?: string;
}

/**
 * Knit 로고 헤더 컴포넌트
 *
 * @param {string} [className] - 추가 스타일 클래스 (positioning 포함 시 기본 위치 무시됨)
 * @param {string} [textSize='text-[40px]'] - 텍스트 크기 (예: 'text-[40px]', 'text-[60px]')
 * @returns {JSX.Element} Knit 로고
 *
 * @example
 * // 기본 사용
 * <Header />
 *
 * @example
 * // 커스텀 위치와 크기
 * <Header className="absolute top-[100px] left-[50px]" textSize="text-[60px]" />
 */
export default function Header({
  className = "",
  textSize = "text-[40px]",
  topLoc = "top-[50px]",
  leftLoc = "left-[28px]",
}: HeaderProps) {
  return (
    <div
      className={`relative z-50 font-roundfix text-[#826F5F] ${textSize} ${topLoc} ${leftLoc} ${className}`}
    >
      Knit
    </div>
  );
}
