import type { Language } from '@/types';

/** Canonical production URL (no trailing slash). */
export const SITE_URL = 'https://sebastien-gineste.github.io/Eportfolio';

/** Origin used to build absolute asset URLs. */
export const SITE_ORIGIN = 'https://sebastien-gineste.github.io';

export const SITE_NAME = 'Sébastien Gineste';

/** Default social sharing image in `public/`. */
export const OG_IMAGE_PATH = 'og-image.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Open Graph locale codes keyed by app language. */
export const LOCALE_BY_LANGUAGE: Record<Language, string> = {
  fr: 'fr_FR',
  en: 'en_US',
};

/**
 * Build an absolute URL for an app route (e.g. `/fr`, `/en/projects/slug`).
 * `appPath` is router-relative and must not include the Vite `base`.
 */
export function absoluteUrl(appPath: string): string {
  const siteBase = SITE_URL.replace(/\/$/, '');
  const path = appPath.startsWith('/') ? appPath : `/${appPath}`;
  return `${siteBase}${path}`;
}
