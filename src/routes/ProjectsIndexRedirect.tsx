import { Navigate, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE } from '@/i18n';

/** `/projects` without a slug redirects to the projects section on the landing page. */
export function ProjectsIndexRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const language = lang ?? DEFAULT_LANGUAGE;
  return <Navigate to={`/${language}#projects`} replace />;
}
