import type { Question } from '../../types/question';

interface QuestionCardProps {
  question: Question;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const QuestionCard = ({
  question,
  onClick,
  style,
  className = ''
}: QuestionCardProps) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        bg-gray-300 rounded-3xl p-6
        cursor-pointer transition-all
        ${className}
      `}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {question.targetRole} 궁금한 점
        </h3>
        <p className="text-sm text-gray-600">
          {question.authorRole}가 물어봤어요
        </p>
      </div>

      <div className="border-t border-gray-400 pt-4">
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{question.content}</p>
      </div>
    </div>
  );
};
