import type { ReactNode } from 'react';
import { useI18n } from '@/i18n/context';
import { skillCategories } from '@/data';
import { Card, Section } from '@/components/ui';

function CloudIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 18a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.62-1.3A3.75 3.75 0 0 1 17.5 18H7Z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </svg>
  );
}

function PipelineIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h8" />
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
    </svg>
  );
}

function TestIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v5.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 8.5V3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14h9" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.5M21 20a6 6 0 0 0-4-5.65" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 15l.7 1.8L20.5 17.5 18.7 18.2 18 20l-.7-1.8L15.5 17.5l1.8-.7L18 15Z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 8-4 4 4 4m6-8 4 4-4 4" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </svg>
  );
}

const icons: Record<string, ReactNode> = {
  dev: <CodeIcon />,
  cloud: <CloudIcon />,
  cicd: <PipelineIcon />,
  data: <DatabaseIcon />,
  security: <ShieldIcon />,
  ai: <SparklesIcon />,
  architecture: <LayersIcon />,
  tests: <TestIcon />,
  methods: <UsersIcon />,
};

export function SkillsSection() {
  const { language, t } = useI18n();

  return (
    <Section id="skills" ariaLabelledby="skills-title" fullHeight alignTop>
      <h2 id="skills-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.skills.title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t.skills.subtitle}</p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <li key={category.id}>
            <Card className="h-full transition-colors hover:border-primary/30">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {icons[category.id]}
                </span>
                <h3 className="font-semibold">{category.name[language]}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.en}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground/80"
                  >
                    {skill[language]}
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
