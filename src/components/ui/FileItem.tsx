import { useState, useRef } from "react";
import { Dropdown } from "../ui/Dropdown";
import { Text } from "../ui/Text";

interface FileItemProps {
  name: string;
  type: "folder" | "file";
  onNavigate: (name: string) => void;
  onDelete: () => void;
  onEdit?: () => void;
}

export function FileItem({ name, type, onNavigate, onDelete, onEdit }: FileItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [openUp, setOpenUp] = useState(false);
  const dropdownActionRef = useRef(false);

  const toggleDropdown = () => {
    if (btnRef.current && !dropdownOpen) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUp(spaceBelow < 150);
    }
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownAction = (action: () => void) => {
    dropdownActionRef.current = true;
    action();
    setDropdownOpen(false);
  };

  const dropdownItems = [
    {
      label: "Delete",
      icon: "🗑️",
      action: () => handleDropdownAction(onDelete),
      variant: "danger" as const,
    },
  ];

  return (
    <div
      className="flex items-center justify-between px-3 py-2 hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (dropdownActionRef.current) {
          dropdownActionRef.current = false;
          return;
        }
        if (type === "folder") {
          onNavigate(name);
        } else if (onEdit) {
          onEdit();
        }
      }}
    >
      <div className="flex items-center gap-3">
        <Text size="xl">
          {type === "folder" ? "📁" : "📄"}
        </Text>
        <Text>{name}</Text>
      </div>
      <div className="relative">
        <button
          ref={btnRef}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
          className="p-1.5 rounded-md transition-all"
          style={{ opacity: isHovered ? 1 : 0.5 }}
        >
          <Text>⋯</Text>
        </button>
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: openUp ? "auto" : "100%",
              bottom: openUp ? "100%" : "auto",
              marginTop: openUp ? "0" : "4px",
              marginBottom: openUp ? "4px" : "0",
              right: 0,
              zIndex: 70,
            }}
          >
            <Dropdown
              items={dropdownItems}
              onClose={() => setDropdownOpen(false)}
              alignRight
            />
          </div>
        )}
      </div>
    </div>
  );
}
