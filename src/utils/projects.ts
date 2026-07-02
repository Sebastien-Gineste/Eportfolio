import type { Language, Project } from '@/types';

export const PROJECTS_PAGE_SIZE = 3;

export interface ProjectFilters {
  query: string;
  type: string;
  tags: string[];
  awarded: boolean;
}

/** Whether a project has at least one prize / distinction. */
export function projectHasAward(project: Project): boolean {
  return Boolean(project.awards && project.awards.length > 0);
}

/** Lowercased haystack used for free-text search. */
export function projectSearchIndex(project: Project, language: Language): string {
  return [
    project.title[language],
    project.type[language],
    project.summary[language],
    project.context[language],
    ...project.technologies,
    ...project.skills,
  ]
    .join(' ')
    .toLowerCase();
}

/** Distinct project types for the current language, sorted alphabetically. */
export function getProjectTypes(projects: Project[], language: Language): string[] {
  const types = new Set(projects.map((project) => project.type[language]));
  return Array.from(types).sort((a, b) => a.localeCompare(b, language));
}

/**
 * Technology tags sorted by how often they appear (most common first), so the
 * filter bar surfaces the most useful options.
 */
export function getProjectTags(projects: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.technologies) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export function projectMatchesTags(project: Project, tags: string[]): boolean {
  if (tags.length === 0) return true;
  const pool = new Set([...project.technologies, ...project.skills]);
  return tags.some((tag) => pool.has(tag));
}

/** Apply search, type and tag filters. Does not paginate. */
export function filterProjects(
  projects: Project[],
  language: Language,
  { query, type, tags, awarded }: ProjectFilters,
): Project[] {
  const term = query.trim().toLowerCase();

  return projects.filter((project) => {
    if (awarded && !projectHasAward(project)) return false;
    if (type !== 'all' && project.type[language] !== type) return false;
    if (!projectMatchesTags(project, tags)) return false;
    if (term && !projectSearchIndex(project, language).includes(term)) return false;
    return true;
  });
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function totalPages(count: number, pageSize: number): number {
  return Math.max(1, Math.ceil(count / pageSize));
}

export function findProjectBySlug(slug: string, list: Project[]): Project | undefined {
  return list.find((project) => project.slug === slug);
}
