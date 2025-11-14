import type { Question } from '../../types/question';

// 받침 여부에 따라 '이/가' 선택
function josaIGA(word: string) {
  if (!word) return '이';
  const code = word.charCodeAt(word.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return '이';
  const jong = (code - 0xac00) % 28;
  return jong === 0 ? '가' : '이';
}

interface QuestionCardProps {
  question: Question;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  editable?: boolean;
  answerValue?: string;
  onChangeAnswer?: (value: string) => void;
  onAnswerClick?: () => void;
  showAnswerButton?: boolean; // 답변 버튼 표시 여부
}

export const QuestionCard = ({
  question,
  onClick,
  style,
  className = '',
  editable = false,
  answerValue,
  onChangeAnswer,
  onAnswerClick,
  showAnswerButton = true, // 기본값 true
}: QuestionCardProps) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        bg-primary rounded-[14px] w-full h-full px-[29px] pt-[25px]
        cursor-pointer transition-all
        relative overflow-hidden
        before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[14px] before:z-0
        before:bg-[var(--overlay-color,transparent)] before:opacity-[var(--overlay-opacity,0)]
        ${className}
      `}
    >
      <div className="relative z-10 h-full flex flex-col">
      {/* 헤더 */}
        <div className="flex justify-between mb-[25px]">
          <h3 className="text-[13px] font-semibold tracking-[0.05em] text-brand">
            {question.authorRole}
            {josaIGA(question.authorRole)} {question.targetRole} 궁금한 점
          </h3>
          {!editable && showAnswerButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                (onAnswerClick ?? onClick)?.();
              }}
              className='text-[10px] cursor-pointer rounded-md font-semibold bg-white px-4 py-1'
              aria-label='답장 하기'
            >
              답장 하기
            </button>
          )}
        </div>

        {/* 본문 영역 */}
        <div className="flex-1 flex flex-col">
          {/* 질문 내용 섹션 */}
          <section className="flex-2 flex flex-col pb-[15px]">
            <p className="text-[11px] text-left font-gabia mb-2 text-brand/70 select-none">질문 내용</p>
            <div className="flex-1 scroll-container">
              <p className="text-[12px] text-left text-brand/80 whitespace-pre-wrap select-none">
                {question.content || ''}
              </p>
            </div>
          </section>

          {/* 구분선 */}
          <hr className="border-[#A6A6A6]" />

          {/* 답변 내용 섹션 */}
          <section className="flex-3 flex flex-col pt-[15px]">
            <p className="text-[11px] text-left font-gabia mb-2 text-brand/70 select-none">답변 내용</p>
            {editable ? (
              <textarea
                value={answerValue ?? question.answer ?? ''}
                onChange={(e) => onChangeAnswer?.(e.target.value)}
                placeholder="여기를 눌러 답변을 입력해주세요!"
                className="flex-1 w-full text-[12px] text-left text-brand/80 bg-transparent resize-none outline-none scroll-container"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              (() => {
                const display = (answerValue ?? question.answer ?? '').trim();
                return (
                  <p className="flex-1 text-left text-[12px] text-brand/50 whitespace-pre-wrap scroll-container select-none">
                    {display || '아직 답변이 등록되지 않았어요.'}
                  </p>
                );
              })()
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
