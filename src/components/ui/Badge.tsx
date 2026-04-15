import type { ReactNode } from "react";

type BadgeVariant = "default" | "accent" | "success" | "warning" | "danger";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  icon?: string;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]",
  accent: "bg-[var(--color-accent)]/20 text-[var(--color-accent)]",
  success: "bg-green-500/20 text-green-500",
  warning: "bg-yellow-500/20 text-yellow-500",
  danger: "bg-red-500/20 text-red-500",
};

export function Badge({
  children,
  variant = "default",
  icon,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
