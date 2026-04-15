import { Text } from "../../ui/Text";
import { Card } from "../../ui/Card";

export function SystemTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        <SystemMetric label="CPU" value={23} unit="Intel i7" color="#6366f1" />
        <SystemMetric
          label="Memory"
          value={67}
          unit="10.7 / 16 GB"
          color="#22c55e"
        />
        <SystemMetric
          label="Storage"
          value={45}
          unit="450 / 1 TB"
          color="#f59e0b"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="md">
          <Text
            size="xs"
            color="muted"
            weight="semibold"
            className="uppercase tracking-wider mb-3"
          >
            Disk Bandwidth
          </Text>
          <MetricRow label="Read" value="523 MB/s" />
          <MetricRow label="Write" value="312 MB/s" />
        </Card>
        <Card padding="md">
          <Text
            size="xs"
            color="muted"
            weight="semibold"
            className="uppercase tracking-wider mb-3"
          >
            Network
          </Text>
          <MetricRow label="Download" value="45.2 Mbps" />
          <MetricRow label="Upload" value="12.8 Mbps" />
        </Card>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <Text size="sm" color="secondary">
        {label}
      </Text>
      <Text size="sm" color="primary" weight="medium" className="font-mono">
        {value}
      </Text>
    </div>
  );
}

function SystemMetric({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
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
      <Text size="sm" color="secondary" className="mt-2">
        {label}
      </Text>
      <Text size="xs" color="muted">
        {unit}
      </Text>
    </div>
  );
}
