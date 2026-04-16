import type { ReactNode } from "react";
import { Text } from "./Text";

interface DetailModalProps {
  title: string;
  items: {
    label: string;
    value: string | number;
    subValue?: string;
  }[];
  onClose: () => void;
}

export function DetailModal({ title, items, onClose }: DetailModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[var(--color-bg-hover)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <Text>✕</Text>
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-[var(--color-bg-elevated)]"
              >
                <div className="flex flex-col">
                  <Text size="sm" color="primary" weight="medium">
                    {item.label}
                  </Text>
                  {item.subValue && (
                    <Text size="xs" color="muted">
                      {item.subValue}
                    </Text>
                  )}
                </div>
                <Text size="sm" color="secondary" className="font-mono">
                  {item.value}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
