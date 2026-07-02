import type { Translation } from '@/types';

/** English UI strings. Keep this in sync with `fr.ts` (enforced by the type). */
export const en: Translation = {
  meta: {
    languageName: 'English',
  },
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    skipToContent: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  languageSwitcher: {
    label: 'Change language',
  },
  home: {
    seoTitle: 'Home',
    seoDescription: 'Portfolio of Sébastien Gineste, software engineer.',
    greeting: 'Welcome',
    role: 'Software engineer',
    tagline:
      'I design and build modern, maintainable and user-focused web and mobile applications.',
    ctaProjects: 'View my projects',
    ctaContact: 'Get in touch',
  },
  about: {
    seoTitle: 'About',
    seoDescription: 'Background, education and interests of Sébastien Gineste.',
    title: 'About me',
    intro: [
      'Software engineer graduated from Polytech Montpellier, I build web and mobile applications end to end.',
      'I care about clean architecture, maintainable code and products that are genuinely useful to their users.',
    ],
    journeyTitle: 'My journey',
    interestsTitle: 'My interests',
  },
  projects: {
    seoTitle: 'Projects',
    seoDescription: 'A selection of software engineering projects and internships.',
    title: 'My projects',
    subtitle: 'A selection of projects and internships built throughout my journey.',
    searchPlaceholder: 'Search a project, a technology…',
    searchLabel: 'Search',
    filterTypeLabel: 'Type',
    filterTypeAll: 'All types',
    filterTagsLabel: 'Technologies',
    showFilters: 'Show filters',
    hideFilters: 'Hide filters',
    clearFilters: 'Clear filters',
    resultsOne: '1 result',
    resultsMany: '{count} results',
    viewDetails: 'View details',
    teamLabel: 'Team',
    empty: 'No project matches your criteria.',
    paginationPrev: 'Previous page',
    paginationNext: 'Next page',
    paginationPage: 'Page {page} of {total}',
  },
  projectDetails: {
    overview: 'Overview',
    technologies: 'Technologies',
    skills: 'Skills used',
    context: 'Context',
    teamLabel: 'Team size',
    backToList: 'Back to projects',
    selectPrompt: 'Select a project from the list to view its details.',
    close: 'Close',
  },
  skills: {
    seoTitle: 'Skills',
    seoDescription: 'Technical skills and areas of expertise.',
    title: 'My skills',
    subtitle: 'The technologies and methods I use on a daily basis.',
  },
  footer: {
    rights: 'All rights reserved.',
    builtWith: 'Built with React, TypeScript, Vite and Tailwind CSS.',
  },
  notFound: {
    seoTitle: 'Page not found',
    title: 'Page not found',
    body: 'The page you are looking for does not exist.',
    backHome: 'Back to home',
  },
};
