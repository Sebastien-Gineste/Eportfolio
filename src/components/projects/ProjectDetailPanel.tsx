import { useState } from 'react';
import type { Project } from '@/types';
import { useI18n } from '@/i18n/context';
import { Drawer } from '@/components/ui/Drawer';
import { ProjectDetail } from '@/components/projects/ProjectDetail';

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

/** Project detail inside a right-side drawer (50% width on desktop). */
export function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      onClosed={onClose}
      closeLabel={t.projectDetails.close}
      labelledBy="project-drawer-title"
    >
      <ProjectDetail
        project={project}
        titleId="project-drawer-title"
        className="border-0 bg-transparent p-0"
      />
    </Drawer>
  );
}
