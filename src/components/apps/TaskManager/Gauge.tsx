interface GaugeProps {
  label: string;
  value: number;
  unit: string;
  color: string;
}

export function Gauge({ label, value, unit, color }: GaugeProps) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-[var(--color-text-primary)]">
            {value}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm text-[var(--color-text-secondary)]">
        {label}
      </span>
      <span className="text-xs text-[var(--color-text-muted)]">{unit}</span>
    </div>
  );
}
