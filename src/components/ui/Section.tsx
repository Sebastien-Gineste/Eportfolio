import type { ReactNode } from 'react';
import { cx } from '@/utils';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Anchor id used for in-page navigation / smooth scrolling. */
  id?: string;
  /** Optional accessible label linking a heading id to the <section>. */
  ariaLabelledby?: string;
  /**
   * Make the section fill at least the viewport height and vertically center its
   * content. Taller content simply grows past the viewport and aligns to the top.
   */
  fullHeight?: boolean;
  /**
   * With `fullHeight`, align content to the top instead of vertically centering
   * it. Keeps content-heavy sections starting at a consistent vertical offset.
   */
  alignTop?: boolean;
  /** Tighter bottom padding (e.g. when content ends with pagination). */
  compactBottom?: boolean;
  /** Extra pixels to scroll above the target (fine-tunes anchor landing). */
  scrollOffset?: number;
}

/**
 * A landing-page section wrapped in a Container. When an `id` is given, the
 * section becomes a focusable scroll target. With `fullHeight`, it fills the
 * screen and vertically centers its content.
 */
export function Section({
  children,
  className,
  id,
  ariaLabelledby,
  fullHeight,
  alignTop,
  compactBottom,
  scrollOffset,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      data-full-height={fullHeight ? '' : undefined}
      data-scroll-offset={scrollOffset}
      tabIndex={id ? -1 : undefined}
      className={cx(
        'focus:outline-none',
        fullHeight
          ? cx('flex min-h-svh flex-col py-24', alignTop ? 'justify-start' : 'justify-center')
          : compactBottom
            ? 'pt-12 pb-6 sm:pt-16 sm:pb-8'
            : 'py-12 sm:py-16',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
