import { useState, useRef } from "react";
import { Modal } from "../../ui/Modal";

export function FileRow({
  item,
  onNavigate,
}: {
  item: { name: string; size: string; type: "folder" | "file" };
  onNavigate: (folder: string) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    type: "info" | "delete";
    name: string;
    size: string;
  } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [openUp, setOpenUp] = useState(false);

  const toggleDropdown = () => {
    if (btnRef.current && !dropdownOpen) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUp(spaceBelow < 150);
    }
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <tr
        className="transition-colors"
        style={{
          backgroundColor: isHovered ? "rgb(34, 34, 46)" : "transparent",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <td
          className="p-3"
          onClick={() => item.type === "folder" && onNavigate(item.name)}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {item.type === "folder" ? "📁" : "📄"}
            </span>
            <span className="text-[var(--color-text-primary)]">
              {item.name}
            </span>
          </div>
        </td>
        <td className="p-3 w-12">
          <div
            className="relative flex justify-end"
            style={{ overflow: "visible" }}
          >
            <button
              ref={btnRef}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
              }}
              className="p-1.5 rounded-md bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] transition-all"
              style={{ opacity: isHovered ? 1 : 0.5 }}
            >
              <span className="text-lg leading-none">⋯</span>
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
                <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                  <button
                    onClick={() => {
                      setModalContent({
                        type: "info",
                        name: item.name,
                        size: item.size,
                      });
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    <span>❓</span>
                    <span>Info</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalContent({
                        type: "delete",
                        name: item.name,
                        size: item.size,
                      });
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-red-500/10 hover:text-red-500 transition-colors"
                  >
                    <span className="text-red-500">🗑️</span>
                    <span>Delete</span>
                  </button>
                </div>
                <div
                  className="fixed inset-0 z-[60]"
                  onClick={() => setDropdownOpen(false)}
                />
              </div>
            )}
          </div>
        </td>
      </tr>
      {modalContent &&
        (modalContent.type === "info" ? (
          <Modal title="File Info" onClose={() => setModalContent(null)}>
            <div className="space-y-2">
              <p>
                <span className="text-[var(--color-text-muted)]">Name:</span>{" "}
                {modalContent.name}
              </p>
              <p>
                <span className="text-[var(--color-text-muted)]">Size:</span>{" "}
                {modalContent.size}
              </p>
            </div>
          </Modal>
        ) : (
          <Modal
            title="Confirm Delete"
            onClose={() => setModalContent(null)}
            variant="danger"
            confirmText="Delete"
          >
            <p>
              Are you sure you want to delete{" "}
              <strong>{modalContent.name}</strong>? This action cannot be
              undone.
            </p>
          </Modal>
        ))}
    </>
  );
}
