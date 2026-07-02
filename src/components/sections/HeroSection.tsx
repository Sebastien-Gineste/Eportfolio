import { useI18n } from '@/i18n/context';
import { profile } from '@/data';
import { scrollToSection } from '@/utils';
import { Button, Section } from '@/components/ui';
import { buttonClasses } from '@/components/ui/styles';

/** Landing hero: greeting, role and call-to-action buttons. */
export function HeroSection() {
  const { t } = useI18n();

  return (
    <Section id="hero" ariaLabelledby="hero-title" fullHeight>
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {t.home.greeting}
        </p>
        <h1 id="hero-title" className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {t.home.role}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{t.home.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={() => scrollToSection('projects')}>{t.home.ctaProjects}</Button>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonClasses('secondary')}
          >
            {t.home.ctaContact}
          </a>
        </div>
      </div>
    </Section>
  );
}
