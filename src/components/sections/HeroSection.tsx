import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { experience, profile } from '@/data';
import { localizedPath, scrollToSection } from '@/utils';
import { Button, Section } from '@/components/ui';
import { buttonClasses } from '@/components/ui/styles';

function TrophyIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H5v1a3 3 0 0 0 3 3m8-4h3v1a3 3 0 0 1-3 3m-4 4v3m-3 3h6m-5 0 .5-3h3l.5 3"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.37c0-1.28-.02-2.93-1.78-2.93-1.79 0-2.06 1.4-2.06 2.84V21H9V9Z" />
    </svg>
  );
}

/** Landing hero: identity, positioning, current focus and calls to action. */
export function HeroSection() {
  const { language, t } = useI18n();
  const navigate = useNavigate();
  const current = experience[0];

  const goToAwarded = () => {
    navigate({ pathname: localizedPath(language), search: '?awarded=1', hash: '#projects' });
    scrollToSection('projects');
  };
  const currentPeriod = current
    ? current.current
      ? `${current.period} – ${t.about.present}`
      : current.period
    : '';

  return (
    <Section id="hero" ariaLabelledby="hero-title" fullHeight>
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t.home.greeting}
          </p>
          <h1
            id="hero-title"
            className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-muted-foreground sm:text-2xl">
            {t.home.role}
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t.home.tagline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {t.home.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-full border border-border bg-muted/40 px-3 py-1 text-sm text-foreground/80"
              >
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button onClick={() => scrollToSection('projects')}>{t.home.ctaProjects}</Button>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonClasses('secondary')}
            >
              {t.home.ctaContact}
            </a>
            <div className="flex items-center gap-1">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <GithubIcon />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>{profile.location}</span>
            <span aria-hidden="true" className="text-border">·</span>
            <button
              type="button"
              onClick={goToAwarded}
              className="inline-flex items-center gap-1.5 rounded font-medium text-amber-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-amber-400"
            >
              <TrophyIcon />
              {t.home.awardedProjects}
            </button>
          </div>
        </div>

        {current ? (
          <div className="relative hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-4xl bg-linear-to-br from-primary/10 via-transparent to-accent/10 blur-2xl"
            />
            <div className="rounded-2xl border border-border bg-muted/40 p-6 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.home.focusLabel}
              </p>
              <h2 className="mt-3 text-base font-semibold leading-snug">
                {current.title[language]}
              </h2>
              <p className="mt-1 text-sm font-medium text-primary">{currentPeriod}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {current.description[language]}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
