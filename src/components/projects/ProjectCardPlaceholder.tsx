/** Invisible spacer matching `ProjectCard` layout — keeps the results list height stable. */
export function ProjectCardPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none flex flex-col gap-4 rounded-xl border border-transparent p-4 opacity-0 sm:flex-row sm:items-center"
    >
      <div className="aspect-16/10 w-full shrink-0 sm:w-36" />
      <div className="min-h-22 min-w-0 flex-1" />
      <div className="h-9 w-24 shrink-0 self-start sm:self-center" />
    </div>
  );
}
