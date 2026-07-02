import type { Language, Project } from '@/types';
import { Badge, ButtonLink, ProjectImage } from '@/components/ui';
import { cx, localizedPath } from '@/utils';

interface ProjectCardProps {
  project: Project;
  language: Language;
  viewDetailsLabel: string;
  teamLabel: string;
  awardedLabel: string;
  isSelected?: boolean;
}

function TrophyIcon() {
  return (
    <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H5v1a3 3 0 0 0 3 3m8-4h3v1a3 3 0 0 1-3 3m-4 4v3m-3 3h6m-5 0 .5-3h3l.5 3"
      />
    </svg>
  );
}

/** Compact project row for the paginated explorer. */
export function ProjectCard({
  project,
  language,
  viewDetailsLabel,
  teamLabel,
  awardedLabel,
  isSelected = false,
}: ProjectCardProps) {
  const firstAward = project.awards?.[0];
  const awardLabel = firstAward ? (firstAward.short ?? firstAward.label)[language] : awardedLabel;
  const title = project.title[language];
  const to = localizedPath(language, `projects/${project.slug}`);

  return (
    <article
      className={cx(
        'flex flex-col gap-4 rounded-xl border bg-background p-4 transition-colors sm:flex-row sm:items-center',
        isSelected
          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
          : 'border-border hover:bg-muted/30',
      )}
    >
      {project.image && (
        <ProjectImage
          src={project.image}
          alt={project.title}
          language={language}
          className="aspect-16/10 w-full shrink-0 sm:w-36"
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge>{project.type[language]}</Badge>
          <span aria-hidden="true">·</span>
          <span>{project.context[language]}</span>
          <span aria-hidden="true">·</span>
          <span>
            {teamLabel}: {project.teamSize}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h3 className="font-semibold leading-snug">{title}</h3>
          {firstAward && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
              <TrophyIcon />
              {awardLabel}
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {project.summary[language]}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <li key={tech}>
              <Badge className="text-[11px]">{tech}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <ButtonLink
        to={to}
        state={{ skipProjectScroll: true }}
        preventScrollReset
        variant="secondary"
        size="sm"
        viewTransition
        aria-label={`${viewDetailsLabel} — ${title}`}
        aria-current={isSelected ? 'page' : undefined}
        className="shrink-0 self-start sm:self-center"
      >
        {viewDetailsLabel}
      </ButtonLink>
    </article>
  );
}
