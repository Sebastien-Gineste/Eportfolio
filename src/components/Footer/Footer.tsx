import { useI18n } from '@/i18n/context';
import { profile } from '@/data';
import { Container } from '@/components/ui';

const externalLinkClasses =
  'rounded-md text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container>
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-foreground">
              © {year} {profile.name}. {t.footer.rights}
            </p>
            <p className="text-xs text-muted-foreground">{t.footer.builtWith}</p>
          </div>
          <nav aria-label="Social links" className="flex items-center gap-4">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className={externalLinkClasses}
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className={externalLinkClasses}
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
