import type { Language, Project } from '@/types';
import { Badge, ButtonLink, ProjectImage } from '@/components/ui';
import { cx, localizedPath } from '@/utils';

interface ProjectCardProps {
  project: Project;
  language: Language;
  viewDetailsLabel: string;
  teamLabel: string;
  isSelected?: boolean;
}

/** Compact project row for the paginated explorer. */
export function ProjectCard({
  project,
  language,
  viewDetailsLabel,
  teamLabel,
  isSelected = false,
}: ProjectCardProps) {
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
          className="aspect-[16/10] w-full shrink-0 sm:w-36"
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
        <h3 className="mt-2 font-semibold leading-snug">{title}</h3>
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
