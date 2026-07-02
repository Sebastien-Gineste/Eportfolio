import { Outlet } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

/** App shell: skip link, sticky header, routed main content and footer. */
export function Layout() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        {t.nav.skipToContent}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
