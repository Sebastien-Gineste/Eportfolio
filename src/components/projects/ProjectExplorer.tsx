import { useMemo, useState } from 'react';
import { useI18n } from '@/i18n/context';
import { projects } from '@/data';
import { cx } from '@/utils';
import {
  PROJECTS_PAGE_SIZE,
  filterProjects,
  getProjectTags,
  getProjectTypes,
  paginate,
  totalPages,
} from '@/utils/projects';
import { Pagination } from '@/components/ui/Pagination';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCardPlaceholder } from '@/components/projects/ProjectCardPlaceholder';

const inputClasses =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground ' +
  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

/** Native selects need a custom chevron — `appearance-none` hides the broken default one. */
const selectClasses =
  'h-10 w-full appearance-none rounded-lg border border-border bg-background py-2 pl-3 pr-10 ' +
  'text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

function FilterIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-5 w-5"
    >
      <path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round" />
    </svg>
  );
}

function SelectChevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface ProjectExplorerProps {
  /** Highlights the active card and jumps to its pagination page. */
  selectedSlug?: string;
}

/** Search, type/tag filters and paginated project results. */
export function ProjectExplorer({ selectedSlug }: ProjectExplorerProps) {
  const { language, t } = useI18n();

  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [previousSelectedSlug, setPreviousSelectedSlug] = useState(selectedSlug);

  const typeOptions = useMemo(() => getProjectTypes(projects, language), [language]);
  const tagOptions = useMemo(() => getProjectTags(projects), []);

  const filtered = useMemo(
    () => filterProjects(projects, language, { query, type, tags }),
    [language, query, type, tags],
  );

  if (selectedSlug !== previousSelectedSlug) {
    setPreviousSelectedSlug(selectedSlug);
    const index = filtered.findIndex((project) => project.slug === selectedSlug);
    if (index !== -1) {
      setPage(Math.floor(index / PROJECTS_PAGE_SIZE) + 1);
    }
  }

  const pages = totalPages(filtered.length, PROJECTS_PAGE_SIZE);
  const currentPage = Math.min(page, pages);
  const pageItems = useMemo(
    () => paginate(filtered, currentPage, PROJECTS_PAGE_SIZE),
    [filtered, currentPage],
  );

  /** Pad the visible page with invisible placeholders so the list always spans 3 rows. */
  const resultSlots = useMemo(() => {
    const placeholders = Math.max(0, PROJECTS_PAGE_SIZE - pageItems.length);
    return [...pageItems, ...Array.from({ length: placeholders }, () => null)];
  }, [pageItems]);

  const activeFilterCount = (type !== 'all' ? 1 : 0) + tags.length;
  const hasSecondaryFilters = activeFilterCount > 0;
  const hasActiveFilters = query.trim() !== '' || hasSecondaryFilters;

  const clearFilters = () => {
    setQuery('');
    setType('all');
    setTags([]);
    setPage(1);
  };

  const clearSecondaryFilters = () => {
    setType('all');
    setTags([]);
    setPage(1);
  };

  const toggleTag = (tag: string) => {
    setPage(1);
    setTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  };

  const resultsLabel =
    filtered.length === 1
      ? t.projects.resultsOne
      : t.projects.resultsMany.replace('{count}', String(filtered.length));

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="rounded-xl border border-border bg-muted/20 p-4 sm:p-5">
        <div className="flex gap-2">
          <div className="min-w-0 flex-1">
            <label htmlFor="project-search" className="sr-only">
              {t.projects.searchLabel}
            </label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => {
                setPage(1);
                setQuery(event.target.value);
              }}
              placeholder={t.projects.searchPlaceholder}
              className={inputClasses}
            />
          </div>

          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="project-filters-panel"
            aria-label={filtersOpen ? t.projects.hideFilters : t.projects.showFilters}
            onClick={() => setFiltersOpen((open) => !open)}
            className={cx(
              'relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-[colors,transform] duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              filtersOpen && 'scale-105',
              filtersOpen || hasSecondaryFilters
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            <FilterIcon />
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter accordion — animated expand/collapse */}
        <div
          aria-hidden={!filtersOpen}
          inert={!filtersOpen ? true : undefined}
          className={cx(
            'grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none motion-reduce:duration-0',
            filtersOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div
            id="project-filters-panel"
            className={cx(
              'min-h-0 overflow-hidden transition-opacity duration-300 ease-in-out motion-reduce:transition-none motion-reduce:duration-0',
              filtersOpen ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div className="mt-4 space-y-4 border-t border-border pt-4">
              <div className="sm:max-w-xs">
                <label
                  htmlFor="project-type"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                >
                  {t.projects.filterTypeLabel}
                </label>
                <div className="relative">
                  <select
                    id="project-type"
                    value={type}
                    onChange={(event) => {
                      setPage(1);
                      setType(event.target.value);
                    }}
                    className={selectClasses}
                    tabIndex={filtersOpen ? 0 : -1}
                  >
                    <option value="all">{t.projects.filterTypeAll}</option>
                    {typeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  {t.projects.filterTagsLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => {
                    const active = tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        aria-pressed={active}
                        tabIndex={filtersOpen ? 0 : -1}
                        onClick={() => toggleTag(tag)}
                        className={cx(
                          'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                          active
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {hasSecondaryFilters && (
                <button
                  type="button"
                  tabIndex={filtersOpen ? 0 : -1}
                  onClick={clearSecondaryFilters}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t.projects.clearFilters}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {resultsLabel}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t.projects.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="relative">
        {pageItems.length === 0 && (
          <p
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 text-center text-muted-foreground"
            role="status"
          >
            {t.projects.empty}
          </p>
        )}
        <ul className="space-y-3">
          {resultSlots.map((project, index) => (
            <li key={project?.slug ?? `placeholder-${index}`}>
              {project ? (
                <ProjectCard
                  project={project}
                  language={language}
                  viewDetailsLabel={t.projects.viewDetails}
                  teamLabel={t.projects.teamLabel}
                  isSelected={project.slug === selectedSlug}
                />
              ) : (
                <ProjectCardPlaceholder />
              )}
            </li>
          ))}
        </ul>
      </div>

      <Pagination
        page={currentPage}
        totalPages={pages}
        onPageChange={setPage}
        prevLabel={t.projects.paginationPrev}
        nextLabel={t.projects.paginationNext}
        pageLabel={(n, total) =>
          t.projects.paginationPage.replace('{page}', String(n)).replace('{total}', String(total))
        }
      />
    </div>
  );
}
