import type { Language } from '@/types';
import { isLanguage } from '@/i18n';

/**
 * Tiny className combiner. Filters out falsy values so callers can write
 * `cx('base', isActive && 'active')` without ternaries returning empty strings.
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Build an app-relative, language-prefixed path.
 * `localizedPath('en', 'projects')` -> `/en/projects`.
 * Note: the router `basename` already handles the GitHub Pages base path, so
 * paths here are always relative to the app root.
 */
export function localizedPath(language: Language, subPath = ''): string {
  const clean = subPath.replace(/^\/+/, '');
  return clean ? `/${language}/${clean}` : `/${language}`;
}

/**
 * Return the pathname without its leading `/:lang` segment, so two URLs that
 * differ only by language compare as equal (e.g. `/fr/x` and `/en/x` → `/x`).
 */
export function pathWithoutLanguage(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLanguage(segments[0])) {
    segments.shift();
  }
  return `/${segments.join('/')}`;
}

/**
 * Resolve a path to a file in `public/`, respecting Vite's `base` (GitHub Pages
 * project sites serve assets under `/<repo>/`, not `/`).
 */
export function publicAsset(path: string): string {
  const clean = path.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL;
  return `${base}${clean}`;
}

/** Whether the user asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Sticky header height used for anchor scroll offsets. */
export function getHeaderOffset(): number {
  const header = document.querySelector('header');
  return header?.getBoundingClientRect().height ?? 64;
}

/**
 * Full-height sections scroll to the wrapper so the viewport fill is preserved.
 * Regular sections scroll to their heading to skip top padding.
 */
function resolveScrollTarget(id: string): HTMLElement | null {
  const element = document.getElementById(id);
  if (!element) return null;

  if (element.tagName === 'SECTION') {
    if (element.hasAttribute('data-full-height')) {
      return element;
    }

    const headingId = element.getAttribute('aria-labelledby');
    if (headingId) {
      return document.getElementById(headingId) ?? element;
    }
  }

  return element;
}

/**
 * Scroll a section into view below the sticky header. Targets the section
 * heading when available so top padding does not appear as empty space.
 */
export function scrollToSection(id: string): void {
  const section = document.getElementById(id);
  const scrollTarget = resolveScrollTarget(id);
  if (!scrollTarget) return;

  const extraOffset = section ? Number(section.dataset.scrollOffset || 0) : 0;
  const top =
    scrollTarget.getBoundingClientRect().top + window.scrollY - getHeaderOffset() - extraOffset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });

  (section ?? scrollTarget).focus({ preventScroll: true });
}

/**
 * Swap the language segment of the current pathname, preserving the rest of the
 * route (used by the LanguageSwitcher to stay on the same page after switching).
 */
export function switchLanguageInPath(pathname: string, next: Language): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isLanguage(segments[0])) {
    segments[0] = next;
  } else {
    segments.unshift(next);
  }

  return `/${segments.join('/')}`;
}
