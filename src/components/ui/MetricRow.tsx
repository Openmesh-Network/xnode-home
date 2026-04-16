import { Text } from "./Text";

interface MetricRowProps {
  label: string;
  value: string | number;
  mono?: boolean;
}

export function MetricRow({ label, value, mono = false }: MetricRowProps) {
  return (
    <div className="flex justify-between">
      <Text size="sm" color="secondary">
        {label}
      </Text>
      <Text
        size="sm"
        color="primary"
        weight="medium"
        className={mono ? "font-mono" : ""}
      >
        {value}
      </Text>
    </div>
  );
}
