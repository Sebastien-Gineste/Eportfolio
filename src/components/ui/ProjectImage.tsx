import type { LocalizedText } from '@/types';
import { cx, publicAsset } from '@/utils';

interface ProjectImageProps {
  src: string;
  alt: LocalizedText;
  language: 'fr' | 'en';
  className?: string;
}

/** Project preview image with consistent sizing and accessible alt text. */
export function ProjectImage({ src, alt, language, className }: ProjectImageProps) {
  return (
    <div className={cx('overflow-hidden rounded-lg border border-border bg-muted', className)}>
      <img
        src={publicAsset(src)}
        alt={alt[language]}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}
