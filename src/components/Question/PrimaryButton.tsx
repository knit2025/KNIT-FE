import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type PrimaryButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function PrimaryButton({ className = '', disabled, children, ...rest }: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`
        w-full h-[40px] rounded-lg text-[15px] font-semibold transition-all
        ${disabled ? 'bg-brand/30 text-white cursor-not-allowed' : 'bg-brand text-white'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

