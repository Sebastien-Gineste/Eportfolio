import { cx } from '@/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevLabel: string;
  nextLabel: string;
  pageLabel: (page: number, total: number) => string;
}

/** Minimal, accessible pagination controls. */
export function Pagination({
  page,
  totalPages: pages,
  onPageChange,
  prevLabel,
  nextLabel,
  pageLabel,
}: PaginationProps) {
  if (pages <= 1) return null;

  const goTo = (next: number) => {
    if (next >= 1 && next <= pages) onPageChange(next);
  };

  return (
    <nav aria-label={pageLabel(page, pages)} className="flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        aria-label={prevLabel}
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        ←
      </button>

      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => goTo(number)}
          aria-current={number === page ? 'page' : undefined}
          aria-label={pageLabel(number, pages)}
          className={cx(
            'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors',
            number === page
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
          )}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page >= pages}
        aria-label={nextLabel}
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        →
      </button>
    </nav>
  );
}
