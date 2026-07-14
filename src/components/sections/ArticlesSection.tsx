import { articles } from '@/data';
import { useI18n } from '@/i18n/context';
import { Section } from '@/components/ui';
import { ArticleCard } from '@/components/articles/ArticleCard';

export function ArticlesSection() {
  const { language, t } = useI18n();

  return (
    <Section id="articles" ariaLabelledby="articles-title">
      <h2 id="articles-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.articles.title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t.articles.subtitle}</p>

      <ul className="mt-8 flex flex-col gap-4">
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleCard
              article={article}
              language={language}
              readOnLabel={t.articles.readOn}
              contentLanguageLabel={t.articles.contentLanguage[article.contentLanguage]}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
