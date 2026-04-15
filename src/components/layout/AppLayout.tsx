import type { ReactNode } from "react";
import { IconButton } from "../ui/IconButton";
import { Text } from "../ui/Text";

export function AppLayout({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-[var(--radius-app)] h-full flex flex-col overflow-hidden shadow-2xl border border-[var(--color-border)]">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
        <Text weight="semibold" className="text-lg">{title}</Text>
        {onClose && <IconButton icon="✕" onClick={onClose} title="Close" />}
      </div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}
