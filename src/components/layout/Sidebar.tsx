import { type ReactNode, useState } from "react";
import { IconButton } from "../ui/IconButton";
import { Text } from "../ui/Text";

export function Sidebar({
  title,
  items,
  activeItem,
  onSelect,
  onClose,
  children,
}: {
  title: string;
  items: { id: string; label: string }[];
  activeItem: string;
  onSelect: (id: string) => void;
  onClose?: () => void;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (id: string) => {
    onSelect(id);
    setMobileOpen(false);
  };

  const renderSidebarItems = (compact = false) => (
    <ul className={compact ? "space-y-1" : "space-y-2"}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => handleSelect(item.id)}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeItem === item.id
                ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-white"
            }`}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-[var(--radius-app)] h-full flex overflow-hidden shadow-2xl border border-[var(--color-border)]">
      <aside className="w-52 border-r border-[var(--color-border)] p-4 hidden md:block">
        <Text size="xs" color="muted" weight="semibold" className="uppercase tracking-wider mb-3">{title}</Text>
        {renderSidebarItems(true)}
      </aside>

      <div className={`fixed inset-0 bg-[var(--color-bg-secondary)] z-50 flex flex-col md:hidden transition-all duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <Text size="xs" color="muted" weight="semibold" className="uppercase tracking-wider">{title}</Text>
          <IconButton icon="✕" onClick={() => setMobileOpen(false)} />
        </div>
        <div className="p-4">{renderSidebarItems(false)}</div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden">
              <IconButton icon="☰" size="sm" />
            </button>
            <Text weight="semibold" className="text-lg">{title}</Text>
            <Text size="sm" color="muted" className="md:hidden">/ {items.find((i) => i.id === activeItem)?.label}</Text>
          </div>
          {onClose && <IconButton icon="✕" onClick={onClose} />}
        </div>
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
}
