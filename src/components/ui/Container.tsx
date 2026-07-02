import type { ReactNode } from 'react';
import { cx } from '@/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centered, width-constrained wrapper with responsive horizontal padding. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cx('mx-auto w-full max-w-5xl px-4 sm:px-6', className)}>{children}</div>;
}
