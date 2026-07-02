import { useEffect } from 'react';
import { useI18n } from '@/i18n/context';

const SITE_NAME = 'Sébastien Gineste';

interface SeoProps {
  title: string;
  description: string;
  /** Open Graph type; defaults to 'website'. Use 'article' for detail pages. */
  ogType?: 'website' | 'article';
}

/** Upsert a `<meta name="...">` or `<meta property="...">` tag in <head>. */
function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Manages per-page document metadata without a heavy dependency: it writes the
 * title, description, Open Graph tags and the <html lang> attribute directly.
 */
export function Seo({ title, description, ogType = 'website' }: SeoProps) {
  const { language } = useI18n();
  const fullTitle = `${title} · ${SITE_NAME}`;

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = language;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
  }, [fullTitle, description, ogType, language]);

  return null;
}
