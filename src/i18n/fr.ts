import type { Translation } from '@/types';

/** French UI strings. Keep this in sync with `en.ts` (enforced by the type). */
export const fr: Translation = {
  meta: {
    languageName: 'Français',
  },
  nav: {
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    skills: 'Compétences',
    skipToContent: 'Aller au contenu principal',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  theme: {
    toLight: 'Passer en thème clair',
    toDark: 'Passer en thème sombre',
  },
  languageSwitcher: {
    label: 'Changer de langue',
  },
  home: {
    seoTitle: 'Accueil',
    seoDescription: 'Portfolio de Sébastien Gineste, ingénieur logiciel.',
    greeting: 'Bienvenue',
    role: 'Ingénieur logiciel',
    tagline:
      'Je conçois et développe des applications web et mobiles modernes, maintenables et centrées sur l’utilisateur.',
    ctaProjects: 'Voir mes projets',
    ctaContact: 'Me contacter',
  },
  about: {
    seoTitle: 'À propos',
    seoDescription: 'Parcours, formation et centres d’intérêt de Sébastien Gineste.',
    title: 'À propos de moi',
    intro: [
      'Ingénieur logiciel diplômé de Polytech Montpellier, je conçois des applications web et mobiles de bout en bout.',
      'J’aime les architectures propres, le code maintenable et les produits qui rendent service à leurs utilisateurs.',
    ],
    journeyTitle: 'Mon parcours',
    interestsTitle: 'Mes centres d’intérêt',
  },
  projects: {
    seoTitle: 'Projets',
    seoDescription: 'Sélection de projets et stages en développement logiciel.',
    title: 'Mes projets',
    subtitle: 'Une sélection de projets et de stages réalisés au fil de mon parcours.',
    searchPlaceholder: 'Rechercher un projet, une techno…',
    searchLabel: 'Recherche',
    filterTypeLabel: 'Type',
    filterTypeAll: 'Tous les types',
    filterTagsLabel: 'Technologies',
    showFilters: 'Afficher les filtres',
    hideFilters: 'Masquer les filtres',
    clearFilters: 'Réinitialiser les filtres',
    resultsOne: '1 résultat',
    resultsMany: '{count} résultats',
    viewDetails: 'Voir le détail',
    teamLabel: 'Équipe',
    empty: 'Aucun projet ne correspond à vos critères.',
    paginationPrev: 'Page précédente',
    paginationNext: 'Page suivante',
    paginationPage: 'Page {page} sur {total}',
  },
  projectDetails: {
    overview: 'Aperçu',
    technologies: 'Technologies',
    skills: 'Compétences mobilisées',
    context: 'Contexte',
    teamLabel: 'Taille de l’équipe',
    backToList: 'Retour aux projets',
    selectPrompt: 'Sélectionnez un projet dans la liste pour afficher son détail.',
    close: 'Fermer',
  },
  skills: {
    seoTitle: 'Compétences',
    seoDescription: 'Compétences techniques et domaines de spécialité.',
    title: 'Mes compétences',
    subtitle: 'Les technologies et méthodes que j’utilise au quotidien.',
  },
  footer: {
    rights: 'Tous droits réservés.',
    builtWith: 'Construit avec React, TypeScript, Vite et Tailwind CSS.',
  },
  notFound: {
    seoTitle: 'Page introuvable',
    title: 'Page introuvable',
    body: 'La page que vous cherchez n’existe pas.',
    backHome: 'Retour à l’accueil',
  },
};
