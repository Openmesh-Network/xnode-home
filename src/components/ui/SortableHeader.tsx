import { Text } from "./Text";

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: { key: string; direction: "asc" | "desc" };
  onSort: (key: string) => void;
  className?: string;
  hideOnMobile?: boolean;
}

export function SortableHeader({
  label,
  sortKey,
  currentSort,
  onSort,
  className = "",
  hideOnMobile = false,
}: SortableHeaderProps) {
  const isActive = currentSort.key === sortKey;
  const isAsc = currentSort.direction === "asc";

  return (
    <th
      className={`text-left p-3 cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors select-none ${hideOnMobile ? "hidden md:table-cell" : ""} ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        <Text
          size="xs"
          color={isActive ? "primary" : "muted"}
          weight="semibold"
          className="uppercase tracking-wider"
        >
          {label}
        </Text>
        {isActive && (
          <Text size="xs" color="muted">
            {isAsc ? "↑" : "↓"}
          </Text>
        )}
      </div>
    </th>
  );
}
