import { readFileSync } from 'node:fs';

/** Supported languages, kept in sync with `src/i18n/index.ts`. */
export const LANGUAGES = ['fr', 'en'];

const dataSource = readFileSync(new URL('../src/data/index.ts', import.meta.url), 'utf8');

/** Project slugs extracted from `src/data/index.ts`. */
export const PROJECT_SLUGS = [...dataSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);

/**
 * Routes to pre-render and include in the sitemap.
 * `/` is the SPA shell; localized landing pages and project deep links get
 * their own `index.html` files.
 */
export function getPrerenderRoutes() {
  const routes = ['/', '/fr', '/en'];

  for (const language of LANGUAGES) {
    for (const slug of PROJECT_SLUGS) {
      routes.push(`/${language}/projects/${slug}`);
    }
  }

  return routes;
}

/** Sitemap entries (excludes the `/` shell redirect target). */
export function getSitemapRoutes() {
  return getPrerenderRoutes().filter((route) => route !== '/');
}

/**
 * Build the language alternate paths for a given localized route.
 * e.g. `/fr/projects/foo` -> { fr: '/fr/projects/foo', en: '/en/projects/foo' }
 */
export function getLanguageAlternates(route) {
  const segments = route.split('/').filter(Boolean);
  const language = segments[0];
  const rest = segments.slice(1).join('/');

  return Object.fromEntries(
    LANGUAGES.map((lang) => [lang, rest ? `/${lang}/${rest}` : `/${lang}`]),
  );
}
