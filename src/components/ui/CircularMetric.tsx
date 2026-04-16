interface CircularMetricProps {
  label: string;
  value: number;
  unit?: string;
  color: string;
  max?: number;
  onClick?: () => void;
}

export function CircularMetric({
  label,
  value,
  unit,
  color,
  max = 100,
  onClick,
}: CircularMetricProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-24 h-24 ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
        onClick={onClick}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--color-bg-elevated)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold text-[var(--color-text-primary)]">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <span className="text-sm text-[var(--color-text-secondary)] mt-2">
        {label}
      </span>
      {unit && (
        <span className="text-xs text-[var(--color-text-muted)]">{unit}</span>
      )}
    </div>
  );
}
