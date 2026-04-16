export function GridItem({
  icon,
  label,
  subtitle,
  onClick,
}: {
  icon: string;
  label: string;
  subtitle?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center p-4 rounded-xl bg-[var(--color-bg-elevated)] cursor-pointer hover:bg-[var(--color-bg-hover)] hover:scale-105 hover:shadow-xl hover:shadow-black/20 transition-all duration-200"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <span className="text-sm text-[var(--color-text-secondary)] font-medium">
        {label}
      </span>
      {subtitle && (
        <span className="text-xs text-[var(--color-text-muted)] mt-1">
          {subtitle}
        </span>
      )}
    </div>
  );
}
