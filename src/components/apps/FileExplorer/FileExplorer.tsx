import { useState } from "react";
import { AppLayout } from "../../layout/AppLayout";
import { Breadcrumb } from "../../layout/Breadcrumb";
import { FileRow } from "./FileRow";
import { Text } from "../../ui/Text";

const folders = [
  {
    name: "Documents",
    size: "1.2 GB",
    modified: "Today",
    type: "folder" as const,
  },
  {
    name: "Downloads",
    size: "4.5 GB",
    modified: "Yesterday",
    type: "folder" as const,
  },
  {
    name: "Pictures",
    size: "2.8 GB",
    modified: "3 days ago",
    type: "folder" as const,
  },
  {
    name: "Music",
    size: "890 MB",
    modified: "1 week ago",
    type: "folder" as const,
  },
  {
    name: "Videos",
    size: "12.4 GB",
    modified: "2 weeks ago",
    type: "folder" as const,
  },
  {
    name: "Desktop",
    size: "156 MB",
    modified: "Today",
    type: "folder" as const,
  },
];

export function FileExplorer({ onClose }: { onClose: () => void }) {
  const [currentPath, setCurrentPath] = useState(["Home"]);

  const handleNavigate = (folder: string) =>
    setCurrentPath([...currentPath, folder]);
  const handleBreadcrumbNavigate = (index: number) =>
    setCurrentPath(currentPath.slice(0, index + 1));

  return (
    <AppLayout title="File Explorer" onClose={onClose}>
      <div className="p-0 -m-4">
        <Breadcrumb
          path={currentPath}
          onNavigate={handleBreadcrumbNavigate}
          onCreateFile={() => {}}
          onCreateFolder={() => {}}
        />
        <div
          className="rounded-lg overflow-hidden border border-[var(--color-border)]"
          style={{ overflow: "visible" }}
        >
          <table className="w-full" style={{ overflow: "visible" }}>
            <thead>
              <tr className="bg-[var(--color-bg-elevated)] text-left">
                <th className="p-3"><Text size="xs" color="muted" weight="semibold" className="uppercase tracking-wider">Name</Text></th>
                <th className="p-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {folders.map((folder) => (
                <FileRow
                  key={folder.name}
                  item={folder}
                  onNavigate={handleNavigate}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
