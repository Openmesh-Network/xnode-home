export function IconButton({
  icon,
  onClick,
  size = "md",
  variant = "default",
  className = "",
  title,
}: {
  icon: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost";
  className?: string;
  title?: string;
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const variantClasses = {
    default:
      "bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-accent)]",
    ghost:
      "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]",
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        flex items-center justify-center rounded-xl transition-all duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {icon}
    </button>
  );
}
