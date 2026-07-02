import type { Project } from '@/types';
import { useI18n } from '@/i18n/context';
import { Badge, ProjectImage } from '@/components/ui';
import { cx } from '@/utils';

interface ProjectDetailProps {
  project: Project;
  className?: string;
  titleId?: string;
}

function TrophyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-0.5 size-5 shrink-0 text-amber-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H5v1a3 3 0 0 0 3 3m8-4h3v1a3 3 0 0 1-3 3m-4 4v3m-3 3h6m-5 0 .5-3h3l.5 3"
      />
    </svg>
  );
}

/** Full project detail content. */
export function ProjectDetail({ project, className, titleId }: ProjectDetailProps) {
  const { language, t } = useI18n();

  return (
    <article className={cx('rounded-xl border border-border bg-background p-6', className)}>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{project.type[language]}</Badge>
        <span className="text-sm text-muted-foreground">{project.context[language]}</span>
      </div>

      <h1 id={titleId} className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        {project.title[language]}
      </h1>

      {project.awards && project.awards.length > 0 && (
        <ul className="mt-4 space-y-2">
          {project.awards.map((award) => (
            <li
              key={award.label.en}
              className="flex items-start gap-2.5 rounded-lg border border-amber-400/40 bg-amber-400/10 p-3"
            >
              <TrophyIcon />
              {award.url ? (
                <a
                  href={award.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {award.label[language]} ↗
                </a>
              ) : (
                <span className="text-sm font-medium">{award.label[language]}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {project.image && (
        <ProjectImage
          src={project.image}
          alt={project.title}
          language={language}
          className="mt-4 w-full [&>img]:max-h-[40dvh] [&>img]:w-full [&>img]:object-cover"
        />
      )}

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {t.projectDetails.overview}
      </h2>
      <p className="mt-2 text-muted-foreground">{project.description[language]}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold">{t.projectDetails.technologies}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{t.projectDetails.skills}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <li key={skill}>
                <Badge>{skill}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">{t.projectDetails.context}</dt>
          <dd className="mt-1">{project.context[language]}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">
            {t.projectDetails.teamLabel}
          </dt>
          <dd className="mt-1">{project.teamSize}</dd>
        </div>
      </dl>

      {project.links && project.links.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t.projectDetails.links}
          </h2>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            {project.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-md font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label[language]} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
