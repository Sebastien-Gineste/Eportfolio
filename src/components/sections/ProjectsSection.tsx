import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { projects } from '@/data';
import { ProjectDetailPanel } from '@/components/projects/ProjectDetailPanel';
import { ProjectExplorer } from '@/components/projects/ProjectExplorer';
import { Section } from '@/components/ui';
import { localizedPath, pathWithoutLanguage, scrollToSection } from '@/utils';
import { findProjectBySlug } from '@/utils/projects';

export function ProjectsSection() {
  const { slug } = useParams<{ slug?: string }>();
  const { language, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const project = slug ? findProjectBySlug(slug, projects) : undefined;
  const isProjectRoute = pathWithoutLanguage(location.pathname).startsWith('/projects/');

  const closePanel = () => {
    navigate(localizedPath(language), { replace: true });
  };

  const handleDrawerClosed = () => {
    if (slug) {
      closePanel();
    }
  };

  useEffect(() => {
    if (slug && !project) {
      navigate(localizedPath(language), { replace: true });
    }
  }, [slug, project, navigate, language]);

  const wasOnProjectRouteRef = useRef(false);

  // Scroll only when landing on a project URL from outside (shared link / refresh).
  useEffect(() => {
    if (!isProjectRoute) {
      wasOnProjectRouteRef.current = false;
      return;
    }

    if (wasOnProjectRouteRef.current) return;
    wasOnProjectRouteRef.current = true;

    if (location.state?.skipProjectScroll) {
      navigate(
        { pathname: location.pathname, hash: location.hash, search: location.search },
        { replace: true, state: null },
      );
      return;
    }

    const scroll = () => scrollToSection('projects');
    requestAnimationFrame(() => requestAnimationFrame(scroll));

    if (document.readyState !== 'complete') {
      window.addEventListener('load', scroll, { once: true });
      return () => window.removeEventListener('load', scroll);
    }

    return undefined;
  }, [isProjectRoute, location.hash, location.pathname, location.search, location.state, navigate]);

  return (
    <Section id="projects" ariaLabelledby="projects-title" compactBottom scrollOffset={16}>
      <h2 id="projects-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.projects.title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t.projects.subtitle}</p>

      <div className="mt-8">
        <ProjectExplorer selectedSlug={slug} />
      </div>

      {project && (
        <ProjectDetailPanel key={project.slug} project={project} onClose={handleDrawerClosed} />
      )}
    </Section>
  );
}
