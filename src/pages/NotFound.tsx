import { useI18n } from '@/i18n/context';
import { localizedPath } from '@/utils';
import { ButtonLink, Section } from '@/components/ui';
import { Seo } from '@/components/Seo/Seo';

export function NotFound() {
  const { language, t } = useI18n();

  return (
    <>
      <Seo title={t.notFound.seoTitle} description={t.notFound.body} />
      <Section className="py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.notFound.title}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t.notFound.body}</p>
        <div className="mt-8">
          <ButtonLink to={localizedPath(language)}>{t.notFound.backHome}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
