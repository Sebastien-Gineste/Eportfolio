import type { JourneyEntry, Language } from '@/types';
import { Card, ExternalLinkIcon } from '@/components/ui';
import { cx } from '@/utils';

interface JourneyTimelineProps {
  entries: JourneyEntry[];
  language: Language;
  /** Localized label used for the end of an ongoing period (e.g. "present"). */
  presentLabel: string;
  /** Timeline direction. Horizontal lays entries out as a row of cards. */
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

function Dot({ isCurrent }: { isCurrent: boolean }) {
  return (
    <span
      className={cx(
        'size-3 shrink-0 rounded-full border-2 bg-background',
        isCurrent ? 'border-primary bg-primary' : 'border-primary',
      )}
    />
  );
}

interface EntryContentProps {
  entry: JourneyEntry;
  language: Language;
  presentLabel: string;
  isCurrent: boolean;
}

function EntryCard({ entry, language, presentLabel, isCurrent }: EntryContentProps) {
  const period = isCurrent ? `${entry.period} – ${presentLabel}` : entry.period;

  return (
    <Card
      className={cx(
        'h-full transition-colors',
        isCurrent && 'border-primary/40 bg-primary/5',
        entry.url && 'hover:border-primary/30',
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{period}</p>
      <h4 className="mt-2 text-base font-semibold leading-snug">
        {entry.url ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {entry.title[language]}
            <ExternalLinkIcon className="inline-block size-3.5 shrink-0 opacity-60" />
          </a>
        ) : (
          entry.title[language]
        )}
      </h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {entry.description[language]}
      </p>
    </Card>
  );
}

/** Timeline for education and experience entries (vertical or horizontal). */
export function JourneyTimeline({
  entries,
  language,
  presentLabel,
  orientation = 'vertical',
  className,
}: JourneyTimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <ol className={cx('grid gap-6 sm:grid-cols-2', className)}>
        {entries.map((entry) => {
          const isCurrent = Boolean(entry.current);

          return (
            <li key={entry.id} className="flex flex-col">
              <div aria-hidden="true" className="flex items-center gap-3">
                <Dot isCurrent={isCurrent} />
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-4 flex-1">
                <EntryCard
                  entry={entry}
                  language={language}
                  presentLabel={presentLabel}
                  isCurrent={isCurrent}
                />
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={className}>
      {entries.map((entry, index) => {
        const isLast = index === entries.length - 1;
        const isCurrent = Boolean(entry.current);

        return (
          <li
            key={entry.id}
            className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-5 sm:grid-cols-[1.5rem_minmax(0,1fr)]"
          >
            <div aria-hidden="true" className="flex flex-col items-center pt-6">
              <Dot isCurrent={isCurrent} />
              {!isLast ? <span className="mt-1 w-px flex-1 bg-border" /> : null}
            </div>

            <div className={cx(!isLast && 'pb-5')}>
              <EntryCard
                entry={entry}
                language={language}
                presentLabel={presentLabel}
                isCurrent={isCurrent}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
