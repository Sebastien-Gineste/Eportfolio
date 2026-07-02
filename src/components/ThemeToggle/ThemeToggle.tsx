import { useI18n } from '@/i18n/context';
import { useTheme } from '@/theme/context';
import { Button } from '@/components/ui';

/** Icon button toggling between light and dark themes. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  const isDark = theme === 'dark';
  const label = isDark ? t.theme.toLight : t.theme.toDark;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="w-9 px-0"
    >
      <span aria-hidden="true" className="text-base leading-none">
        {isDark ? '☀' : '☾'}
      </span>
    </Button>
  );
}
