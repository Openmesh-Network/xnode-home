import { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { IconButton } from "../ui/IconButton";
import { Text } from "../ui/Text";

export function Breadcrumb({
  path,
  onNavigate,
  onCreateFile,
  onCreateFolder,
}: {
  path: string[];
  onNavigate: (index: number) => void;
  onCreateFile: () => void;
  onCreateFolder: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-center gap-1 mb-4 flex-wrap">
      {path.map((segment, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <Text color="muted" className="mx-1">/</Text>}
          <button
            onClick={() => onNavigate(index)}
            className="px-2 py-1 rounded hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {segment}
          </button>
        </div>
      ))}
      <div className="relative ml-auto">
        <IconButton icon="⋯" onClick={() => setDropdownOpen(!dropdownOpen)} />
        {dropdownOpen && (
          <Dropdown
            items={[
              { label: "Create File", icon: "📄", action: onCreateFile },
              { label: "Create Folder", icon: "📁", action: onCreateFolder },
            ]}
            onClose={() => setDropdownOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
