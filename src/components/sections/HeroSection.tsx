import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { experience, profile } from '@/data';
import { localizedPath, scrollToSection } from '@/utils';
import { Button, GithubIcon, LinkedinIcon, Section, TrophyIcon } from '@/components/ui';
import { buttonClasses } from '@/components/ui/styles';

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
              <TrophyIcon className="size-4" />
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
