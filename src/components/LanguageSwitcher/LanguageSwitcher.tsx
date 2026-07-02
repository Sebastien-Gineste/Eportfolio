import { useLocation, useNavigate } from 'react-router-dom';
import type { Language } from '@/types';
import { LANGUAGES, translations } from '@/i18n';
import { useI18n } from '@/i18n/context';
import { cx, switchLanguageInPath } from '@/utils';

/**
 * Switches the active language while preserving the current page: it only swaps
 * the `/:lang` segment of the pathname.
 */
export function LanguageSwitcher() {
  const { language, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (next: Language) => {
    if (next === language) return;
    const to = switchLanguageInPath(location.pathname, next) + location.search + location.hash;
    // `viewTransition` cross-fades all the translated text via the View
    // Transitions API. It degrades gracefully to an instant swap where the API
    // is unavailable, and is disabled under `prefers-reduced-motion` (see CSS).
    navigate(to, { viewTransition: true });
  };

  return (
    <div
      role="group"
      aria-label={t.languageSwitcher.label}
      className="inline-flex overflow-hidden rounded-lg border border-border"
    >
      {LANGUAGES.map((lng) => {
        const isActive = lng === language;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => changeLanguage(lng)}
            aria-pressed={isActive}
            className={cx(
              'px-2.5 py-1.5 text-xs font-semibold uppercase transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-transparent text-muted-foreground hover:bg-secondary',
            )}
            title={translations[lng].meta.languageName}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}
