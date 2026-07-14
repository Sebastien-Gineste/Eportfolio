/** Supported UI languages. */
export type Language = 'fr' | 'en';

/** Available color themes. */
export type Theme = 'light' | 'dark';

/**
 * Shape of a translation dictionary. Both `src/i18n/fr.ts` and `src/i18n/en.ts`
 * must satisfy this interface, which keeps the two languages in sync at compile
 * time (a missing key becomes a TypeScript error).
 */
export interface Translation {
  meta: {
    /** Human-readable language name, shown in the language switcher. */
    languageName: string;
  };
  nav: {
    home: string;
    about: string;
    articles: string;
    projects: string;
    skills: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
  };
  theme: {
    toLight: string;
    toDark: string;
  };
  languageSwitcher: {
    label: string;
  };
  home: {
    seoTitle: string;
    seoDescription: string;
    greeting: string;
    role: string;
    tagline: string;
    highlights: string[];
    focusLabel: string;
    ctaProjects: string;
    ctaContact: string;
    awardedProjects: string;
  };
  about: {
    seoTitle: string;
    seoDescription: string;
    title: string;
    intro: string[];
    journeyTitle: string;
    educationTitle: string;
    experienceTitle: string;
    present: string;
    interestsTitle: string;
  };
  projects: {
    seoTitle: string;
    seoDescription: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchLabel: string;
    filterTypeLabel: string;
    filterTypeAll: string;
    filterTagsLabel: string;
    filterAwardedLabel: string;
    filterAwarded: string;
    showFilters: string;
    hideFilters: string;
    clearFilters: string;
    resultsOne: string;
    resultsMany: string;
    viewDetails: string;
    teamLabel: string;
    awarded: string;
    empty: string;
    paginationPrev: string;
    paginationNext: string;
    paginationPage: string;
  };
  projectDetails: {
    overview: string;
    technologies: string;
    skills: string;
    context: string;
    teamLabel: string;
    awards: string;
    links: string;
    backToList: string;
    selectPrompt: string;
    close: string;
  };
  skills: {
    seoTitle: string;
    seoDescription: string;
    title: string;
    subtitle: string;
  };
  articles: {
    title: string;
    subtitle: string;
    readOn: string;
    contentLanguage: Record<Language, string>;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
  notFound: {
    seoTitle: string;
    title: string;
    body: string;
    backHome: string;
  };
}

/** A string translated into every supported language. */
export type LocalizedText = Record<Language, string>;

/** Portfolio timeline entry (education / experience). */
export interface JourneyEntry {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  period: string;
  /** When true, the entry is ongoing: the period end reads "present". */
  current?: boolean;
  url?: string;
}

/** A single interest / hobby shown on the About page. */
export interface Interest {
  id: string;
  label: LocalizedText;
}

/** A skill category displayed on the Skills page. */
export interface SkillCategory {
  id: string;
  name: LocalizedText;
  /** Individual skills / technologies shown as tags within the category. */
  skills: LocalizedText[];
}

/** External link attached to a project (repository, live demo, video...). */
export interface ProjectLink {
  url: string;
  label: LocalizedText;
}

/** A prize or distinction won by a project, optionally linking to its source. */
export interface ProjectAward {
  label: LocalizedText;
  /** Condensed label used on compact surfaces (project card badge). */
  short?: LocalizedText;
  url?: string;
}

/** An external article or blog post. */
export interface Article {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  url: string;
  platform: LocalizedText;
  topics: string[];
  readingTime: LocalizedText;
  publishedAt: string;
  /** Language of the external content (shown as a badge when it differs from the UI). */
  contentLanguage: Language;
}

/** A portfolio project or internship. */
export interface Project {
  /** URL-friendly identifier used in `/:lang/projects/:slug`. */
  slug: string;
  title: LocalizedText;
  type: LocalizedText;
  /** Short one-liner used in listings. */
  summary: LocalizedText;
  /** Full description shown on the details page. */
  description: LocalizedText;
  /** Free-form context: date, place, duration. */
  context: LocalizedText;
  teamSize: number;
  technologies: string[];
  skills: string[];
  /** Path in `public/` matching the project slug (e.g. `img/projects/findyourjob.png`). */
  image?: string;
  /** External links (repository, live demo, video, press...). */
  links?: ProjectLink[];
  /** Prizes and distinctions, highlighted on the card and detail view. */
  awards?: ProjectAward[];
}

/** Static profile information reused across pages. */
export interface Profile {
  name: string;
  location: string;
  links: {
    github: string;
    linkedin: string;
  };
}
