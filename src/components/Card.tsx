import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
  children: ReactNode;
}

export function Card({ clickable = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-xl border border-slate-200 shadow-sm',
        clickable
          ? 'cursor-pointer hover:shadow-md hover:scale-[1.015] active:scale-[1.005] transition-all duration-200'
          : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
