import type { ReactNode } from 'react';
import { cx } from '@/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Bordered surface used to group related content. */
export function Card({ children, className }: CardProps) {
  return (
    <div className={cx('rounded-xl border border-border bg-muted/40 p-5', className)}>
      {children}
    </div>
  );
}
