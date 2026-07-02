import type { ButtonHTMLAttributes } from 'react';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** A real <button> element with themed variants. Use for actions, not navigation. */
export function Button({ variant, size, className, type, ...props }: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={buttonClasses(variant, size, className)}
      {...props}
    />
  );
}
