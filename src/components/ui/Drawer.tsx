import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx, prefersReducedMotion } from '@/utils';
import { lockPageScroll, unlockPageScroll } from '@/utils/scrollLock';

const DRAWER_MS = 300;

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after the exit slide-out animation completes. */
  onClosed?: () => void;
  closeLabel: string;
  labelledBy?: string;
  children: ReactNode;
}

/**
 * Accessible right-side drawer: slides in over a dimmed backdrop, locks body
 * scroll while mounted, and animates out before calling `onClosed`.
 */
export function Drawer({
  open,
  onOpenChange,
  onClosed,
  closeLabel,
  labelledBy,
  children,
}: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const finishedRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  const finishClose = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onClosed?.();
  }, [onClosed]);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setVisible(false);
    }
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    closeButtonRef.current?.focus();
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('keydown', onKeyDown);
    lockPageScroll();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      unlockPageScroll();
    };
  }, [onOpenChange]);

  // Always complete the close flow — transitionend may not fire with reduced motion.
  useEffect(() => {
    if (open) return;

    if (prefersReducedMotion()) {
      finishClose();
      return;
    }

    const timer = window.setTimeout(finishClose, DRAWER_MS + 50);
    return () => window.clearTimeout(timer);
  }, [open, finishClose]);

  const handlePanelTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'transform' || visible || open) return;
    finishClose();
  };

  return createPortal(
    <div
      className={cx('fixed inset-0 z-50', !visible && 'pointer-events-none')}
      role="presentation"
    >
      <button
        type="button"
        aria-label={closeLabel}
        tabIndex={-1}
        onClick={() => onOpenChange(false)}
        className={cx(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none',
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onTransitionEnd={handlePanelTransitionEnd}
        className={cx(
          'absolute inset-y-0 right-0 flex w-full flex-col border-l border-border bg-background shadow-2xl',
          'transition-transform duration-300 ease-out motion-reduce:transition-none md:w-[50vw] md:max-w-[50vw]',
          visible ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex shrink-0 items-center justify-end border-b border-border px-4 py-3">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label={closeLabel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ✕
            </span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
