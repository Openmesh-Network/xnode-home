export function StatCard({
  label,
  value,
  icon,
  className = "",
}: {
  label: string;
  value: string;
  icon?: string;
  className?: string;
}) {
  return (
    <div
      className={`p-4 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] ${className}`}
    >
      <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-[var(--color-text-primary)] font-medium flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {value}
      </p>
    </div>
  );
}
