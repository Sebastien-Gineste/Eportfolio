import type { Language, Translation } from '@/types';
import { en } from './en';
import { fr } from './fr';

/** All supported languages, in display order. */
export const LANGUAGES: readonly Language[] = ['fr', 'en'] as const;

/** Default language used for `/` and unknown language segments. */
export const DEFAULT_LANGUAGE: Language = 'fr';

/** Translation dictionaries keyed by language. */
export const translations: Record<Language, Translation> = { fr, en };

/** Type guard checking whether an arbitrary string is a supported language. */
export function isLanguage(value: string | undefined): value is Language {
  return value === 'fr' || value === 'en';
}

/** Resolve a route param to a valid language, falling back to the default. */
export function resolveLanguage(value: string | undefined): Language {
  return isLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export { en, fr };
