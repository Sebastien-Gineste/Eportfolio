import { experience, profile } from '@/data';
import { SITE_ORIGIN, absoluteUrl } from '@/config/site';
import type { Language, Project } from '@/types';
import { localizedPath, publicAsset } from '@/utils';

function absolutePublicUrl(publicPath: string): string {
  return `${SITE_ORIGIN}${publicAsset(publicPath)}`;
}

/** Schema.org Person for the portfolio owner. */
export function buildPersonSchema(language: Language) {
  const role = language === 'fr' ? 'Ingénieur logiciel' : 'Software engineer';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: role,
    email: profile.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montpellier',
      addressCountry: 'FR',
    },
    sameAs: [profile.links.github, profile.links.linkedin],
    url: absoluteUrl(localizedPath(language)),
    worksFor: experience[0]
      ? {
          '@type': 'Organization',
          name: experience[0].title[language].split('—').pop()?.trim() ?? undefined,
        }
      : undefined,
  };
}

/** Schema.org WebSite for the portfolio. */
export function buildWebSiteSchema(language: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: profile.name,
    url: absoluteUrl(localizedPath(language)),
    inLanguage: language,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
  };
}

/** Schema.org CreativeWork for a portfolio project. */
export function buildProjectSchema(project: Project, language: Language) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title[language],
    description: project.description[language],
    author: {
      '@type': 'Person',
      name: profile.name,
    },
    url: absoluteUrl(localizedPath(language, `projects/${project.slug}`)),
    keywords: [...project.technologies, ...project.skills].join(', '),
  };

  if (project.image) {
    schema.image = absolutePublicUrl(project.image);
  }

  if (project.awards?.length) {
    schema.award = project.awards.map((award) => award.label[language]);
  }

  return schema;
}
