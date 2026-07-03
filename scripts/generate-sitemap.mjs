import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getLanguageAlternates, getSitemapRoutes } from './routes.mjs';

const SITE_URL = 'https://sebastien-gineste.github.io/Eportfolio';
const DIST_DIR = 'dist';
const SITEMAP_PATH = join(DIST_DIR, 'sitemap.xml');
const ROBOTS_PUBLIC_PATH = 'public/robots.txt';
const ROBOTS_DIST_PATH = join(DIST_DIR, 'robots.txt');

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildSitemap() {
  const routes = getSitemapRoutes();
  const urls = routes
    .map((route) => {
      const loc = `${SITE_URL}${route}`;
      const alternates = getLanguageAlternates(route);
      const alternateLinks = Object.entries(alternates)
        .map(
          ([lang, path]) =>
            `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(`${SITE_URL}${path}`)}" />`,
        )
        .join('\n');

      const xDefault = alternates.fr ?? route;
      const xDefaultLink = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}${xDefault}`)}" />`;
      const lastmod = new Date().toISOString().split('T')[0];

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternateLinks}
${xDefaultLink}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.includes('/projects/') ? '0.7' : '1.0'}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

mkdirSync(DIST_DIR, { recursive: true });
writeFileSync(SITEMAP_PATH, buildSitemap(), 'utf8');
writeFileSync(ROBOTS_PUBLIC_PATH, buildRobotsTxt(), 'utf8');
copyFileSync(ROBOTS_PUBLIC_PATH, ROBOTS_DIST_PATH);

console.log(`Wrote ${SITEMAP_PATH} (${getSitemapRoutes().length} URLs)`);
console.log(`Updated ${ROBOTS_PUBLIC_PATH} and ${ROBOTS_DIST_PATH}`);
