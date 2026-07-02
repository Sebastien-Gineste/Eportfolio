import type { ReactNode } from 'react';
import { useI18n } from '@/i18n/context';
import { skillCategories } from '@/data';
import {
  Card,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  LayersIcon,
  PipelineIcon,
  Section,
  ShieldIcon,
  SparklesIcon,
  TestIcon,
  UsersIcon,
} from '@/components/ui';

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
