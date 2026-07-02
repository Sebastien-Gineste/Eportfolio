import { useI18n } from '@/i18n/context';
import { interests, journey } from '@/data';
import { Badge, Card, Section } from '@/components/ui';

export function AboutSection() {
  const { language, t } = useI18n();

  return (
    <Section id="about" ariaLabelledby="about-title" fullHeight>
      <h2 id="about-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.about.title}
      </h2>
      <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
        {t.about.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h3 className="mt-12 text-xl font-semibold">{t.about.journeyTitle}</h3>
      <ol className="mt-6 space-y-4 border-l border-border pl-6">
        {journey.map((entry) => (
          <li key={entry.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background"
            />
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {entry.period}
            </p>
            <h4 className="mt-1 font-semibold">
              {entry.url ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {entry.title[language]}
                </a>
              ) : (
                entry.title[language]
              )}
            </h4>
            <p className="text-sm text-muted-foreground">{entry.description[language]}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-12 text-xl font-semibold">{t.about.interestsTitle}</h3>
      <Card className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <li key={interest.id}>
              <Badge>{interest.label[language]}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
