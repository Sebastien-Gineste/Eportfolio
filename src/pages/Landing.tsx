import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { projects } from '@/data';
import { scrollToSection } from '@/utils';
import { findProjectBySlug } from '@/utils/projects';
import { Seo } from '@/components/Seo/Seo';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';

/** Single-page portfolio: all sections stacked, navigated via smooth scrolling. */
export function Landing() {
  const { slug } = useParams<{ slug?: string }>();
  const { language, t } = useI18n();
  const { hash } = useLocation();

  const project = slug ? findProjectBySlug(slug, projects) : undefined;

  // Scroll to the section referenced by the URL hash on load / hash change.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);

    const scroll = () => scrollToSection(id);

    const runScroll = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(scroll);
      });
    };

    runScroll();

    // Re-measure after images/fonts settle so tall sections are not misaligned.
    if (document.readyState !== 'complete') {
      window.addEventListener('load', scroll, { once: true });
      return () => window.removeEventListener('load', scroll);
    }

    return undefined;
  }, [hash]);

  const seoTitle = project ? project.title[language] : t.home.seoTitle;
  const seoDescription = project ? project.summary[language] : t.home.seoDescription;

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        ogType={project ? 'article' : 'website'}
      />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </>
  );
}
