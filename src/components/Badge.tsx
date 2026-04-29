import type { ReactNode } from 'react';

export type BadgeVariant = 'active' | 'inactive' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  inactive: 'bg-slate-100 text-slate-500 ring-1 ring-slate-200',
  neutral: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
};

const dotClasses: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-slate-400',
  neutral: 'bg-blue-500',
};

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      <span
        className={['h-1.5 w-1.5 rounded-full shrink-0', dotClasses[variant]].join(' ')}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
