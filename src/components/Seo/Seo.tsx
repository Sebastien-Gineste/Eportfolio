import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/i18n';
import { useI18n } from '@/i18n/context';
import {
  LOCALE_BY_LANGUAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_ORIGIN,
  absoluteUrl,
} from '@/config/site';
import { publicAsset, switchLanguageInPath } from '@/utils';

const SEO_MARKER = 'data-seo-managed';

interface SeoProps {
  title: string;
  description: string;
  /** Open Graph type; defaults to 'website'. Use 'article' for detail pages. */
  ogType?: 'website' | 'article';
  /** Public asset path or absolute URL for social sharing. */
  image?: string;
  /** Router-relative canonical path (e.g. `/fr/projects/slug`). */
  canonicalPath?: string;
  /** JSON-LD object(s) serialized into a script tag. */
  jsonLd?: object | object[];
  /** When true, adds `noindex, nofollow` for error pages. */
  noindex?: boolean;
}

function resolveImageUrl(image?: string): string {
  if (image?.startsWith('http://') || image?.startsWith('https://')) {
    return image;
  }
  const path = (image ?? OG_IMAGE_PATH).replace(/^\/+/, '');
  return `${SITE_ORIGIN}${publicAsset(path)}`;
}

/** Upsert a single-value meta tag. */
function upsertMeta(attr: 'name' | 'property', key: string, content: string): HTMLElement {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    element.setAttribute(SEO_MARKER, 'true');
    document.head.appendChild(element);
  } else {
    element.setAttribute(SEO_MARKER, 'true');
  }
  element.setAttribute('content', content);
  return element;
}

/** Replace all managed meta tags sharing the same key (e.g. og:locale:alternate). */
function setMetaTags(attr: 'name' | 'property', key: string, values: string[]): void {
  document.head
    .querySelectorAll(`meta[${attr}="${key}"][${SEO_MARKER}]`)
    .forEach((node) => node.remove());

  for (const content of values) {
    const element = document.createElement('meta');
    element.setAttribute(attr, key);
    element.setAttribute('content', content);
    element.setAttribute(SEO_MARKER, 'true');
    document.head.appendChild(element);
  }
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>): HTMLLinkElement {
  const selectorParts = [`link[rel="${rel}"]`];
  if (extra?.hreflang) selectorParts.push(`[hreflang="${extra.hreflang}"]`);
  const selector = selectorParts.join('');

  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute(SEO_MARKER, 'true');
    if (extra) {
      for (const [name, value] of Object.entries(extra)) {
        element.setAttribute(name, value);
      }
    }
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  return element;
}

function upsertJsonLd(data: object | object[]): HTMLScriptElement {
  let element = document.head.querySelector<HTMLScriptElement>(
    `script[type="application/ld+json"][${SEO_MARKER}]`,
  );
  if (!element) {
    element = document.createElement('script');
    element.setAttribute('type', 'application/ld+json');
    element.setAttribute(SEO_MARKER, 'true');
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
  return element;
}

function removeManagedElements(): void {
  document.head.querySelectorAll(`[${SEO_MARKER}]`).forEach((node) => node.remove());
}

/**
 * Manages per-page document metadata: title, description, canonical, Open Graph,
 * Twitter cards, hreflang alternates and JSON-LD. Tags are cleaned up on unmount
 * so client-side navigations do not accumulate stale head entries.
 */
export function Seo({
  title,
  description,
  ogType = 'website',
  image,
  canonicalPath,
  jsonLd,
  noindex = false,
}: SeoProps) {
  const { language } = useI18n();
  const { pathname } = useLocation();
  const fullTitle = `${title} · ${SITE_NAME}`;
  const resolvedCanonicalPath = canonicalPath ?? pathname;
  const canonicalUrl = absoluteUrl(resolvedCanonicalPath);
  const imageUrl = resolveImageUrl(image);

  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : undefined;

  useEffect(() => {
    removeManagedElements();

    document.title = fullTitle;
    document.documentElement.lang = language;

    upsertMeta('name', 'description', description);
    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      document.head.querySelector(`meta[name="robots"][${SEO_MARKER}]`)?.remove();
    }

    upsertLink('canonical', canonicalUrl);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', LOCALE_BY_LANGUAGE[language]);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:width', String(OG_IMAGE_WIDTH));
    upsertMeta('property', 'og:image:height', String(OG_IMAGE_HEIGHT));
    upsertMeta('property', 'og:image:alt', fullTitle);

    const alternateLocales: string[] = [];
    for (const lang of LANGUAGES) {
      if (lang !== language) {
        alternateLocales.push(LOCALE_BY_LANGUAGE[lang]);
      }
    }
    setMetaTags('property', 'og:locale:alternate', alternateLocales);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    for (const lang of LANGUAGES) {
      const href = absoluteUrl(switchLanguageInPath(resolvedCanonicalPath, lang));
      upsertLink('alternate', href, { hreflang: lang });
    }
    upsertLink('alternate', absoluteUrl(localizedDefaultPath(resolvedCanonicalPath)), {
      hreflang: 'x-default',
    });

    if (jsonLdKey) {
      upsertJsonLd(JSON.parse(jsonLdKey));
    }
  }, [
    fullTitle,
    description,
    ogType,
    language,
    canonicalUrl,
    imageUrl,
    jsonLdKey,
    noindex,
    resolvedCanonicalPath,
  ]);

  return null;
}

function localizedDefaultPath(path: string): string {
  return switchLanguageInPath(path, DEFAULT_LANGUAGE);
}
