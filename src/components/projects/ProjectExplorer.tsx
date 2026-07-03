import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { TrophyIcon } from '@/components/ui';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCardPlaceholder } from '@/components/projects/ProjectCardPlaceholder';

const inputClasses =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground ' +
  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const filterBadgeClasses = (active: boolean) =>
  cx(
    'cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
  );

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

interface ProjectExplorerProps {
  /** Highlights the active card and jumps to its pagination page. */
  selectedSlug?: string;
}

/** Search, type/tag filters and paginated project results. */
export function ProjectExplorer({ selectedSlug }: ProjectExplorerProps) {
  const { language, t } = useI18n();
  const [searchParams] = useSearchParams();
  const awardedParam = searchParams.get('awarded') === '1';

  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [tags, setTags] = useState<string[]>([]);
  const [awarded, setAwarded] = useState(awardedParam);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(awardedParam);
  const [previousSelectedSlug, setPreviousSelectedSlug] = useState(selectedSlug);
  const [previousAwardedParam, setPreviousAwardedParam] = useState(awardedParam);

  // React to the `?awarded=1` deep link (e.g. the hero "awarded projects" link)
  // by adjusting state during render rather than in an effect.
  if (awardedParam !== previousAwardedParam) {
    setPreviousAwardedParam(awardedParam);
    if (awardedParam) {
      setAwarded(true);
      setFiltersOpen(true);
      setPage(1);
    }
  }

  const typeOptions = useMemo(() => getProjectTypes(projects, language), [language]);
  const tagOptions = useMemo(() => getProjectTags(projects), []);

  const filtered = useMemo(
    () => filterProjects(projects, language, { query, type, tags, awarded }),
    [language, query, type, tags, awarded],
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

  const activeFilterCount = (type !== 'all' ? 1 : 0) + tags.length + (awarded ? 1 : 0);
  const hasSecondaryFilters = activeFilterCount > 0;
  const hasActiveFilters = query.trim() !== '' || hasSecondaryFilters;

  const clearFilters = () => {
    setQuery('');
    setType('all');
    setTags([]);
    setAwarded(false);
    setPage(1);
  };

  const clearSecondaryFilters = () => {
    setType('all');
    setTags([]);
    setAwarded(false);
    setPage(1);
  };

  const toggleAwarded = () => {
    setPage(1);
    setAwarded((current) => !current);
  };

  const toggleTag = (tag: string) => {
    setPage(1);
    setTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  };

  const selectType = (value: string) => {
    setPage(1);
    setType(value);
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
              'relative inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-[colors,transform] duration-200',
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
              <button
                type="button"
                role="switch"
                aria-checked={awarded}
                tabIndex={filtersOpen ? 0 : -1}
                onClick={toggleAwarded}
                className={cx(
                  'flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  awarded
                    ? 'border-amber-400/50 bg-amber-400/10'
                    : 'border-border bg-background hover:border-primary/40',
                )}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className={cx(awarded ? 'text-amber-500' : 'text-muted-foreground')}>
                    <TrophyIcon className="size-4" />
                  </span>
                  {t.projects.filterAwarded}
                </span>
                <span
                  aria-hidden="true"
                  className={cx(
                    'relative h-5 w-9 shrink-0 rounded-full transition-colors',
                    awarded ? 'bg-amber-500' : 'bg-border',
                  )}
                >
                  <span
                    className={cx(
                      'absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform',
                      awarded && 'translate-x-4',
                    )}
                  />
                </span>
              </button>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  {t.projects.filterTypeLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={type === 'all'}
                    tabIndex={filtersOpen ? 0 : -1}
                    onClick={() => selectType('all')}
                    className={filterBadgeClasses(type === 'all')}
                  >
                    {t.projects.filterTypeAll}
                  </button>
                  {typeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={type === option}
                      tabIndex={filtersOpen ? 0 : -1}
                      onClick={() => selectType(option)}
                      className={filterBadgeClasses(type === option)}
                    >
                      {option}
                    </button>
                  ))}
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
                        className={filterBadgeClasses(active)}
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
                  awardedLabel={t.projects.awarded}
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
