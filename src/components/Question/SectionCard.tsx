import type { PropsWithChildren, ReactNode } from 'react';

type SectionCardProps = PropsWithChildren<{
  title: ReactNode;
  variant?: 'beige' | 'peach';
  className?: string;
}>;

export default function SectionCard({ title, variant = 'beige', className = '', children }: SectionCardProps) {
  const bg = variant === 'peach' ? 'bg-primary' : 'bg-secondary';
  return (
    <div className={`flex flex-col px-[18px] pt-[16px] pb-4 rounded-[14px] ${bg} ${className}`}>
      <h3 className={`text-[12px] tracking-[0.05em] text-[#3A290D] mb-3 ${variant === 'peach' ? 'font-semibold' : 'font-medium'}`}>
        {title}
      </h3>
      {children}
    </div>
  );
}
