/** Width of the vertical scrollbar (0 when using overlay scrollbars). */
export function getScrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}

let lockCount = 0;
let savedHtmlOverflow = '';
let savedBodyPaddingRight = '';

/**
 * Prevent background scroll without layout shift when the scrollbar disappears.
 * Measured once before locking — do not combine with `scrollbar-gutter: stable`.
 */
export function lockPageScroll(): void {
  if (lockCount === 0) {
    const scrollbarWidth = getScrollbarWidth();
    savedHtmlOverflow = document.documentElement.style.overflow;
    savedBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  lockCount += 1;
}

export function unlockPageScroll(): void {
  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount > 0) return;

  document.documentElement.style.overflow = savedHtmlOverflow;
  document.body.style.paddingRight = savedBodyPaddingRight;
}
