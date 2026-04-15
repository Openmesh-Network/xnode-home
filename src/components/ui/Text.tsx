import type { ReactNode } from "react";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "danger"
  | "warning"
  | "success"
  | "yellow";

interface TextProps {
  children: ReactNode;
  size?: TextSize;
  color?: TextColor;
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "label";
}

const sizeClasses: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const colorClasses: Record<TextColor, string> = {
  primary: "text-[var(--color-text-primary)]",
  secondary: "text-[var(--color-text-secondary)]",
  muted: "text-[var(--color-text-muted)]",
  accent: "text-[var(--color-accent)]",
  danger: "text-red-500",
  warning: "text-yellow-500",
  success: "text-green-500",
  yellow: "text-yellow-400",
};

const weightClasses: Record<string, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function Text({
  children,
  size = "base",
  color = "primary",
  weight = "normal",
  className = "",
  as: Component = "p",
}: TextProps) {
  return (
    <Component
      className={`${sizeClasses[size]} ${colorClasses[color]} ${weightClasses[weight]} ${className}`}
    >
      {children}
    </Component>
  );
}
