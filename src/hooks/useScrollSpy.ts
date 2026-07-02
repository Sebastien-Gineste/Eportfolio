import { useEffect, useState } from 'react';

/**
 * Track which section is currently in view, for highlighting nav links.
 * Observes the elements matching `ids` and returns the id of the top-most one
 * that is sufficiently visible.
 */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Pick the first section (in document order) that is currently visible.
        const current = ids.find((id) => visible.has(id));
        if (current) {
          setActiveId(current);
        }
      },
      // Bias the viewport upward so a section becomes "active" as its heading
      // reaches the area just below the sticky header.
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
