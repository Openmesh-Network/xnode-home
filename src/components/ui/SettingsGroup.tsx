export function SettingsGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-[var(--color-text-muted)] text-xs font-semibold uppercase tracking-wider mb-3">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
