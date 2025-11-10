import type { TextareaHTMLAttributes } from 'react';

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

export default function TextAreaField({ label, value, onChange, className = '', ...rest }: TextAreaFieldProps) {
  return (
    <div className="bg-transparent flex flex-col h-full">
      <p className="text-[11px] font-gabia text-[#3A290D] mb-2">{label}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 w-full text-[12px] text-[#3A290D] resize-none outline-none bg-transparent ${className}`}
        placeholder="질문 내용을 입력해주세요"
        {...rest}
      />
    </div>
  );
}

