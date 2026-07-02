import { useEffect, useRef } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { AppRoutes } from '@/routes/AppRoutes';
import { pathWithoutLanguage } from '@/utils';

// Vite injects the configured `base` here, so the router works both locally
// (base '/') and on a GitHub Pages project site (base '/<repo>/').
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

/**
 * Normalize a pathname for scroll-reset comparisons.
 * Project detail routes are part of the landing page and must not reset scroll.
 */
function scrollKey(pathname: string): string {
  const path = pathWithoutLanguage(pathname);
  if (path === '/' || path.startsWith('/projects/')) {
    return '/';
  }
  return path;
}

/**
 * Scroll to the top only when navigating to a genuinely different page.
 * A language switch (`/fr` ↔ `/en`), an in-page hash link, or a project slug
 * change within the projects hub must NOT reset the scroll position.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousKey = useRef<string | null>(null);

  useEffect(() => {
    const key = scrollKey(pathname);
    const changed = previousKey.current !== null && previousKey.current !== key;
    previousKey.current = key;

    if (changed && !hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
