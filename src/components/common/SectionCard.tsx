import type { PropsWithChildren, ReactNode } from 'react';

type SectionCardProps = PropsWithChildren<{
  title: ReactNode;
  variant?: 'beige' | 'peach';
  className?: string;
}>;

export default function SectionCard({ title, variant = 'beige', className = '', children }: SectionCardProps) {
  const bg = variant === 'peach' ? 'bg-[#FEF1E8]' : 'bg-[#F6E6DA]';
  return (
    <div className={`flex flex-col p-6 rounded-3xl ${bg} ${className}`}>
      <h3 className={variant === 'peach' ? 'text-xs font-semibold mb-4' : 'text-sm font-medium mb-4'}>{title}</h3>
      {children}
    </div>
  );
}

