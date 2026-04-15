export function ListItem({
  icon,
  children,
  onClick,
  selected,
}: {
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
        onClick ? "hover:bg-[var(--color-bg-hover)]" : ""
      } ${
        selected
          ? "bg-[var(--color-bg-hover)] text-[var(--color-text-primary)]"
          : "text-[var(--color-text-secondary)]"
      }`}
    >
      {icon && <span className="mr-3 text-lg">{icon}</span>}
      {children}
    </li>
  );
}
