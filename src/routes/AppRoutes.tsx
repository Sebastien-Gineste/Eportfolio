import { useMemo } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isLanguage, translations } from '@/i18n';
import { I18nContext } from '@/i18n/context';
import { Layout } from '@/components/Layout/Layout';
import { Landing } from '@/pages/Landing';
import { ProjectsIndexRedirect } from '@/routes/ProjectsIndexRedirect';
import { NotFound } from '@/pages/NotFound';

/**
 * Validates the `:lang` route segment, exposes the matching translation
 * dictionary through context, and renders the app shell. Unknown languages
 * fall back to the default language.
 */
function LocalizedLayout() {
  const { lang } = useParams<{ lang: string }>();
  const value = useMemo(
    () => (isLanguage(lang) ? { language: lang, t: translations[lang] } : null),
    [lang],
  );

  if (!value) {
    return <Navigate to={`/${DEFAULT_LANGUAGE}`} replace />;
  }

  return (
    <I18nContext.Provider value={value}>
      <Layout />
    </I18nContext.Provider>
  );
}

/**
 * Localized route tree. The landing page stacks all sections; project details
 * deep-link to `/:lang/projects/:slug` while keeping the explorer on-page.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
      <Route path="/:lang" element={<LocalizedLayout />}>
        <Route index element={<Landing />} />
        <Route path="projects" element={<ProjectsIndexRedirect />} />
        <Route path="projects/:slug" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
    </Routes>
  );
}
