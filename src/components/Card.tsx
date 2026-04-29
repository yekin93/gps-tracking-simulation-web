import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
  children: ReactNode;
}

export function Card({ clickable = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-xl border border-slate-200/80 shadow-md',
        clickable
          ? 'cursor-pointer hover:shadow-lg hover:scale-[1.01] active:scale-[1.005] transition-all duration-200 ease-in-out motion-reduce:transition-none motion-reduce:transform-none'
          : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
