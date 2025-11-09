import type { TextareaHTMLAttributes } from 'react';

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

export default function TextAreaField({ label, value, onChange, className = '', ...rest }: TextAreaFieldProps) {
  return (
    <div className="bg-transparent">
      <p className="text-[11px] font-gabia">{label}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-30 resize-none outline-none ${className}`}
        {...rest}
      />
    </div>
  );
}

