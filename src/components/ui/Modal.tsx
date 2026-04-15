import type { ReactNode } from "react";

export function Modal({
  title,
  onClose,
  children,
  variant = "default",
  showCancel = true,
  cancelText = "Cancel",
  confirmText,
  onConfirm,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  variant?: "default" | "danger";
  showCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4">
        <h3
          className={`text-lg font-semibold mb-4 ${variant === "danger" ? "text-red-500" : "text-[var(--color-text-primary)]"}`}
        >
          {title}
        </h3>
        <div className="mb-6 text-[var(--color-text-secondary)]">
          {children}
        </div>
        <div className="flex justify-end gap-2">
          {showCancel && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-white transition-colors"
            >
              {cancelText}
            </button>
          )}
          {confirmText && onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                variant === "danger"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
              }`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
