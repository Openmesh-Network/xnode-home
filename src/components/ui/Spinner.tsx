export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 border-2 border-[var(--color-border)] rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-[var(--color-accent)] rounded-full animate-spin" />
      </div>
    </div>
  );
}
