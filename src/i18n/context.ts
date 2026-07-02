import { createContext, useContext } from 'react';
import type { Language, Translation } from '@/types';

export interface I18nContextValue {
  /** The currently active language (derived from the URL). */
  language: Language;
  /** Translation dictionary for the active language. */
  t: Translation;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

/** Access the active language and its translation dictionary. */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
}
