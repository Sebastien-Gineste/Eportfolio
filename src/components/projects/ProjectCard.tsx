import { Link } from 'react-router-dom';
import type { Language, Project } from '@/types';
import { Badge, ButtonLink, ProjectImage, TrophyIcon } from '@/components/ui';
import { cx, localizedPath } from '@/utils';

interface ProjectCardProps {
  project: Project;
  language: Language;
  viewDetailsLabel: string;
  teamLabel: string;
  awardedLabel: string;
  isSelected?: boolean;
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
        <Link
          to={to}
          state={{ skipProjectScroll: true }}
          preventScrollReset
          viewTransition
          aria-label={`${viewDetailsLabel} — ${title}`}
          className="shrink-0 cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ProjectImage
            src={project.image}
            alt={project.title}
            language={language}
            className="aspect-16/10 w-full sm:w-36"
          />
        </Link>
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
              <TrophyIcon className="size-3.5" />
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
