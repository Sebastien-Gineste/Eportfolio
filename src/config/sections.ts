import type { Translation } from '@/types';

/**
 * Single source of truth for the landing-page sections and their order.
 * Both the `Header` navigation and the `Landing` page read from this list, so
 * ids and ordering can never drift apart.
 *
 * `navKey` points to a label in `Translation['nav']`.
 */
export interface SectionDefinition {
  id: string;
  navKey: keyof Pick<Translation['nav'], 'home' | 'about' | 'projects' | 'skills'>;
}

export const SECTIONS: readonly SectionDefinition[] = [
  { id: 'hero', navKey: 'home' },
  { id: 'about', navKey: 'about' },
  { id: 'skills', navKey: 'skills' },
  { id: 'projects', navKey: 'projects' },
] as const;

/** Ids in document order, handy for scroll-spying. */
export const SECTION_IDS: readonly string[] = SECTIONS.map((section) => section.id);
