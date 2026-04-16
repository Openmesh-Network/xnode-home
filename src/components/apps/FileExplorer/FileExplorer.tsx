import { useState, useMemo } from "react";
import { AppLayout } from "../../layout/AppLayout";
import { Breadcrumb } from "../../layout/Breadcrumb";
import { Text } from "../../ui/Text";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { InputModal } from "../../ui/InputModal";
import { FileItem } from "../../ui/FileItem";
import { FileToolbar } from "../../ui/FileToolbar";
import { TextEditorModal } from "../../ui/TextEditorModal";
import { Modal } from "../../ui/Modal";
import { useXNodeClient } from "../../../providers";
import {
  useHostFileReadFolder,
  useHostFileRemove,
  useHostFileCreateFolder,
  useHostFileReadFile,
  useHostFileWriteFile,
} from "../../../../sdk/react/src";
import type { rust_types } from "../../../../sdk/package/src/common/utils";

type FileMetadata = { File: {} } | { Folder: {} } | { Link: {} } | { Unknown: {} };
type FolderItem = { name: rust_types.String; metadata: FileMetadata | null };

function getItemType(metadata: FileMetadata | null): "folder" | "file" {
  if (!metadata) return "file";
  if ("Folder" in metadata) return "folder";
  return "file";
}

type CreateModalState = {
  type: "file" | "folder";
  show: boolean;
};

export function FileExplorer({ onClose }: { onClose: () => void }) {
  const client = useXNodeClient();
  const [currentPath, setCurrentPath] = useState("/");
  const [createModal, setCreateModal] = useState<CreateModalState>({ type: "file", show: false });
  const [createName, setCreateName] = useState("");
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ path: string; name: string } | null>(null);

  const { data, isLoading, error } = useHostFileReadFolder({
    client,
    path: currentPath,
    metadata: true,
  });

  const editingFilePath = editingFile ? (currentPath === "/" ? `/${editingFile}` : `${currentPath}/${editingFile}`) : null;

  const { data: fileContent } = useHostFileReadFile({
    client,
    path: editingFilePath ?? "",
    overrides: { enabled: !!editingFilePath },
  });

  const removeMutation = useHostFileRemove();
  const createFolderMutation = useHostFileCreateFolder();
  const writeFileMutation = useHostFileWriteFile();

  const items: FolderItem[] = data ?? [];
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aIsFolder = getItemType(a.metadata) === "folder";
      const bIsFolder = getItemType(b.metadata) === "folder";
      if (aIsFolder && !bIsFolder) return -1;
      if (!aIsFolder && bIsFolder) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [items]);

  const pathSegments = useMemo(() => {
    if (currentPath === "/") return ["/"];
    return ["/", ...currentPath.split("/").filter(Boolean)];
  }, [currentPath]);

  const handleNavigate = (folder: string) => {
    if (folder === "/") {
      setCurrentPath("/");
    } else {
      setCurrentPath(currentPath === "/" ? `/${folder}` : `${currentPath}/${folder}`);
    }
  };

  const handleBreadcrumbNavigate = (index: number) => {
    if (index === 0) {
      setCurrentPath("/");
    } else {
      setCurrentPath("/" + pathSegments.slice(1, index + 1).join("/"));
    }
  };

  const handleDelete = (path: string, name: string) => {
    setDeleteTarget({ path, name });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      removeMutation.mutate({ client, query: { path: deleteTarget.path } });
      setDeleteTarget(null);
    }
  };

  const handleCreateFile = () => {
    setCreateModal({ type: "file", show: true });
    setCreateName("");
  };

  const handleCreateFolder = () => {
    setCreateModal({ type: "folder", show: true });
    setCreateName("");
  };

  const handleCreateConfirm = (name: string) => {
    if (!name.trim()) return;

    const itemPath = currentPath === "/" ? `/${name.trim()}` : `${currentPath}/${name.trim()}`;

    if (createModal.type === "folder") {
      createFolderMutation.mutate({ client, query: { path: itemPath } });
    } else {
      writeFileMutation.mutate({ client, query: { path: itemPath }, data: new Uint8Array() });
    }

    setCreateModal({ ...createModal, show: false });
    setCreateName("");
  };

  const handleEditFile = (name: string) => {
    setEditingFile(name);
  };

  const handleSaveFile = (content: string) => {
    if (editingFile) {
      const encoder = new TextEncoder();
      writeFileMutation.mutate({
        client,
        query: { path: editingFilePath! },
        data: encoder.encode(content),
      });
      setEditingFile(null);
    }
  };

  const getFileContent = (): string => {
    if (!fileContent) return "";
    if (fileContent instanceof Uint8Array) {
      return new TextDecoder().decode(fileContent);
    }
    return String(fileContent);
  };

  return (
    <AppLayout title="File Explorer" onClose={onClose}>
      <div className="flex flex-col h-full -m-4">
        <div className="flex items-center gap-2 p-4 border-b border-[var(--color-border)]">
          <Breadcrumb
            path={pathSegments}
            onNavigate={handleBreadcrumbNavigate}
          />
          <div className="ml-auto">
            <FileToolbar
              onCreateFile={handleCreateFile}
              onCreateFolder={handleCreateFolder}
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Text color="muted">Loading...</Text>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-full">
              <Text color="danger">Error: {String(error)}</Text>
            </div>
          )}
          {!isLoading && !error && sortedItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Text size="2xl" color="muted">📂</Text>
              <Text color="muted">This folder is empty</Text>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleCreateFile}>Create File</Button>
                <Button variant="secondary" onClick={handleCreateFolder}>Create Folder</Button>
              </div>
            </div>
          )}
          {!isLoading && !error && sortedItems.length > 0 && (
            <Card padding="none" className="mx-4 mb-4">
              {sortedItems.map((item) => (
                <FileItem
                  key={item.name}
                  name={item.name}
                  type={getItemType(item.metadata)}
                  onNavigate={handleNavigate}
                  onDelete={() => handleDelete(
                    currentPath === "/" ? `/${item.name}` : `${currentPath}/${item.name}`,
                    item.name
                  )}
                  onEdit={getItemType(item.metadata) === "file" ? () => handleEditFile(item.name) : undefined}
                />
              ))}
            </Card>
          )}
        </div>
      </div>

      {createModal.show && (
        <InputModal
          title={`Create New ${createModal.type === "folder" ? "Folder" : "File"}`}
          label={createModal.type === "folder" ? "Folder name" : "File name"}
          placeholder={`Enter ${createModal.type} name`}
          onCreate={handleCreateConfirm}
          onClose={() => setCreateModal({ ...createModal, show: false })}
        />
      )}

      {deleteTarget && (
        <Modal
          title="Confirm Delete"
          onClose={() => setDeleteTarget(null)}
          variant="danger"
          confirmText="Delete"
          onConfirm={confirmDelete}
        >
          <Text as="div">
            Are you sure you want to delete <strong>{deleteTarget.name}</strong>?
            <br />
            <Text size="sm" color="muted" as="span">This action cannot be undone.</Text>
          </Text>
        </Modal>
      )}

      {editingFile && (
        <TextEditorModal
          title={editingFile}
          initialContent={getFileContent()}
          onSave={handleSaveFile}
          onClose={() => setEditingFile(null)}
        />
      )}
    </AppLayout>
  );
}
