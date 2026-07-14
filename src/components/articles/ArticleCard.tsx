import type { Article, Language } from '@/types';
import { ArticleIcon, Badge, ExternalLinkIcon } from '@/components/ui';
import { buttonClasses } from '@/components/ui/styles';
import { cx } from '@/utils';

interface ArticleCardProps {
  article: Article;
  language: Language;
  readOnLabel: string;
  contentLanguageLabel: string;
}

/** Compact article row linking to an external publication. */
export function ArticleCard({
  article,
  language,
  readOnLabel,
  contentLanguageLabel,
}: ArticleCardProps) {
  const title = article.title[language];

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-14">
        <ArticleIcon className="size-6" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {article.topics.map((topic) => (
            <Badge key={topic} className="text-[11px]">
              {topic}
            </Badge>
          ))}
          <span aria-hidden="true">·</span>
          <span>{article.platform[language]}</span>
        </div>

        <h3 className="mt-2 font-semibold leading-snug">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {article.summary[language]}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            {contentLanguageLabel}
          </Badge>
          <span>{article.readingTime[language]}</span>
        </div>
      </div>

      <a
        href={article.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${readOnLabel} — ${title}`}
        className={cx(
          buttonClasses('secondary', 'sm'),
          'shrink-0 self-start sm:self-center',
        )}
      >
        {readOnLabel}
        <ExternalLinkIcon className="size-4" />
      </a>
    </article>
  );
}
