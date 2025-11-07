import type { Question } from '../../types/question';

interface QuestionCardProps {
  question: Question;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  editable?: boolean;
  answerValue?: string;
  onChangeAnswer?: (value: string) => void;
}

export const QuestionCard = ({
  question,
  onClick,
  style,
  className = '',
  editable = false,
  answerValue,
  onChangeAnswer,
}: QuestionCardProps) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        bg-primary rounded-[14px] min-w-11/12 p-6
        cursor-pointer transition-all
        relative overflow-hidden
        before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[14px] before:z-0
        before:bg-[var(--overlay-color,transparent)] before:opacity-[var(--overlay-opacity,0)]
        ${className}
      `}
    >
      <div className="relative z-10">
      {/* 헤더 */}
      
      <div className="flex justify-between mb-4">
        <h3 className="text-sm font-semibold text-brand">
          {question.targetRole} {question.authorRole}이 궁금한 점
        </h3>
        {!editable && 
          <button 
            onClick={onClick}
            className='text-[10px] cursor-pointer rounded-md font-semibold bg-white px-4'>
            답장 하기
          </button>
          }
      </div>
      
      {/* 답변하기 버튼 */}
      {/* 본문 영역: 라벨/구분선 고정 노출 */}
      <div className="space-y-4">
        {/* 질문 내용 */}
        <section>
          <p className="text-[11px] font-gabia py-3 text-brand/70">질문 내용</p>
          <p className="mt-1 text-sm  text-brand/80 whitespace-pre-wrap min-h-48">
            {question.content || ''}
          </p>
        </section>

        <hr className="border-brand/20" />

        {/* 답변 내용 */}
        <section>
          <p className="text-[11px] font-gabia py-3 text-brand/70">답변 내용</p>
          {editable ? (
            <textarea
              value={answerValue ?? question.answer ?? ''}
              onChange={(e) => onChangeAnswer?.(e.target.value)}
              placeholder="여기를 눌러 답변을 입력해주세요!"
              className="mt-1 w-full text-sm text-brand/80 min-h-48 bg-transparent resize-none outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className="mt-1 text-sm text-brand/50 whitespace-pre-wrap min-h-48">
              {question.answer?.trim() ? question.answer : '아직 답변을 작성되지 않았어요.'}
            </p>
          )}
        </section>
      </div>
      </div>
    </div>
  );
};
