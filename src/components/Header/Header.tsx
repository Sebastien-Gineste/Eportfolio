import { useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { profile } from '@/data';
import { SECTIONS, SECTION_IDS } from '@/config/sections';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cx, localizedPath, pathWithoutLanguage, scrollToSection } from '@/utils';
import { Container } from '@/components/ui';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export function Header() {
  const { language, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = useScrollSpy(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const path = pathWithoutLanguage(location.pathname);
  const isOnLanding = path === '/' || path.startsWith('/projects/');

  const navItems = SECTIONS.map((section) => ({
    id: section.id,
    label: t.nav[section.navKey],
    href: `#${section.id}`,
  }));

  const isNavActive = (id: string) => isOnLanding && activeId === id;

  // Smooth-scroll to the section and keep the URL hash in sync for sharing.
  const goToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    closeMenu();
    scrollToSection(id);
    navigate({ pathname: localizedPath(language), hash: `#${id}` });
  };

  const linkClasses = (isActive: boolean) =>
    cx(
      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-secondary text-foreground'
        : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="#hero"
            onClick={(event) => goToSection(event, 'hero')}
            className="rounded-md text-base font-bold tracking-tight"
          >
            {profile.name}
          </a>

          <nav aria-label={t.nav.home} className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={isNavActive(item.id) ? 'true' : undefined}
                onClick={(event) => goToSection(event, item.id)}
                className={linkClasses(isNavActive(item.id))}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {menuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label={t.nav.openMenu}
            className="flex flex-col gap-1 pb-4 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={isNavActive(item.id) ? 'true' : undefined}
                onClick={(event) => goToSection(event, item.id)}
                className={linkClasses(isNavActive(item.id))}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 sm:hidden">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
