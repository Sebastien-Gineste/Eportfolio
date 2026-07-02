import type { ReactNode } from 'react';

/**
 * Shared icon set. Every icon accepts a `className` (defaulting to `size-5`) so
 * callers control sizing and color via Tailwind utilities. Two small wrappers
 * factor out the repeated `<svg>` boilerplate: `StrokeIcon` for outline icons
 * and `FillIcon` for solid ones.
 */

export interface IconProps {
  className?: string;
}

function StrokeIcon({ className = 'size-5', children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function FillIcon({ className = 'size-5', children }: IconProps & { children: ReactNode }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
      {children}
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H5v1a3 3 0 0 0 3 3m8-4h3v1a3 3 0 0 1-3 3m-4 4v3m-3 3h6m-5 0 .5-3h3l.5 3" />
    </StrokeIcon>
  );
}

export function GraduationCapIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M12 4 2 9l10 5 10-5-10-5Zm0 0v0M6 11.5V16c0 1.1 2.7 2 6 2s6-.9 6-2v-4.5M20 10v4" />
    </StrokeIcon>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm5 0V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </StrokeIcon>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </StrokeIcon>
  );
}

export function CloudIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M7 18a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.62-1.3A3.75 3.75 0 0 1 17.5 18H7Z" />
    </StrokeIcon>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </StrokeIcon>
  );
}

export function PipelineIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M8 6h8a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h8" />
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
    </StrokeIcon>
  );
}

export function TestIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M9 3h6M10 3v5.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 8.5V3" />
      <path d="M7.5 14h9" />
    </StrokeIcon>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.5M21 20a6 6 0 0 0-4-5.65" />
    </StrokeIcon>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </StrokeIcon>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z" />
      <path d="M18 15l.7 1.8L20.5 17.5 18.7 18.2 18 20l-.7-1.8L15.5 17.5l1.8-.7L18 15Z" />
    </StrokeIcon>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="m9 8-4 4 4 4m6-8 4 4-4 4" />
    </StrokeIcon>
  );
}

export function DatabaseIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </StrokeIcon>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </StrokeIcon>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </StrokeIcon>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </StrokeIcon>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </StrokeIcon>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <FillIcon className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </FillIcon>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <FillIcon className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.37c0-1.28-.02-2.93-1.78-2.93-1.79 0-2.06 1.4-2.06 2.84V21H9V9Z" />
    </FillIcon>
  );
}
