import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type PrimaryButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function PrimaryButton({ className = '', disabled, children, ...rest }: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`
        w-full py-4 rounded-xl text-[15px] font-semibold transition-all
        ${disabled ? 'bg-[#523E1B]/30 text-white cursor-not-allowed' : 'bg-[#523E1B] text-white'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

