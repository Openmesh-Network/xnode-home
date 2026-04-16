import { useState } from "react";
import { Text } from "../ui/Text";

export function Breadcrumb({
  path,
  onNavigate,
}: {
  path: string[];
  onNavigate: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {path.map((segment, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <Text color="muted" className="mx-1">/</Text>}
          <button
            onClick={() => onNavigate(index)}
            className="px-2 py-1 rounded hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {segment}
          </button>
        </div>
      ))}
    </div>
  );
}
