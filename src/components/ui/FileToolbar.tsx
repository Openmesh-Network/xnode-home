import { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { IconButton } from "../ui/IconButton";

interface FileToolbarProps {
  onCreateFile: () => void;
  onCreateFolder: () => void;
}

export function FileToolbar({ onCreateFile, onCreateFolder }: FileToolbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <IconButton
        icon="+"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        title="Create new"
      />
      {dropdownOpen && (
        <Dropdown
          items={[
            { label: "New File", icon: "📄", action: onCreateFile },
            { label: "New Folder", icon: "📁", action: onCreateFolder },
          ]}
          onClose={() => setDropdownOpen(false)}
          alignRight
        />
      )}
    </div>
  );
}
