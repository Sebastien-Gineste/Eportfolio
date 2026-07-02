import type { ReactNode } from 'react';
import { useI18n } from '@/i18n/context';
import { education, experience } from '@/data';
import { Section } from '@/components/ui';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';

function GraduationCapIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4 2 9l10 5 10-5-10-5Zm0 0v0M6 11.5V16c0 1.1 2.7 2 6 2s6-.9 6-2v-4.5M20 10v4"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm5 0V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
      />
    </svg>
  );
}

function SubHeader({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <h3 className="text-lg font-semibold">{children}</h3>
    </div>
  );
}

export function AboutSection() {
  const { language, t } = useI18n();

  return (
    <Section id="about" ariaLabelledby="about-title" fullHeight alignTop>
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        {t.about.journeyTitle}
      </p>
      <h2 id="about-title" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {t.about.title}
      </h2>

      <div className="mt-6 max-w-3xl space-y-3">
        {t.about.intro.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
        <div>
          <SubHeader icon={<GraduationCapIcon />}>{t.about.educationTitle}</SubHeader>
          <JourneyTimeline
            entries={education}
            language={language}
            presentLabel={t.about.present}
            className="mt-6"
          />
        </div>

        <div>
          <SubHeader icon={<BriefcaseIcon />}>{t.about.experienceTitle}</SubHeader>
          <JourneyTimeline
            entries={experience}
            language={language}
            presentLabel={t.about.present}
            className="mt-6"
          />
        </div>
      </div>
    </Section>
  );
}
