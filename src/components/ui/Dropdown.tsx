import type { ReactNode } from "react";

export function Dropdown({
  items,
  onClose,
  alignRight = false,
}: {
  items: {
    label: string;
    icon?: string;
    action: () => void;
    variant?: "default" | "danger";
  }[];
  onClose: () => void;
  alignRight?: boolean;
}) {
  return (
    <>
      <div className="fixed inset-0 z-[60]" onClick={onClose} />
      <div
        className={`absolute z-[70] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg shadow-xl overflow-hidden min-w-[140px] ${
          alignRight ? "right-0" : "left-0"
        }`}
        style={{ top: "100%", marginTop: "4px" }}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.action();
              onClose();
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
              item.variant === "danger"
                ? "hover:bg-red-500/10 text-[var(--color-text-secondary)] hover:text-red-500"
                : "hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {item.icon && (
              <span className={item.variant === "danger" ? "text-red-500" : ""}>
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
