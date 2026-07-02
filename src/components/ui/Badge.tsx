import type { ReactNode } from 'react';
import { cx } from '@/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Small pill used for technologies and skills tags. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}
