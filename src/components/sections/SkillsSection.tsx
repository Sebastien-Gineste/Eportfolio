import { useI18n } from '@/i18n/context';
import { skillCategories } from '@/data';
import { Card, Section } from '@/components/ui';

export function SkillsSection() {
  const { language, t } = useI18n();

  return (
    <Section id="skills" ariaLabelledby="skills-title" fullHeight>
      <h2 id="skills-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.skills.title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t.skills.subtitle}</p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <li key={category.id}>
            <Card className="h-full">
              <h3 className="font-semibold">{category.name[language]}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{category.description[language]}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
