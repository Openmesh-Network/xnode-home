import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Text } from "./Text";

interface TextEditorModalProps {
  title: string;
  initialContent: string;
  onSave: (content: string) => void;
  onClose: () => void;
  readOnly?: boolean;
}

export function TextEditorModal({
  title,
  initialContent,
  onSave,
  onClose,
  readOnly = false,
}: TextEditorModalProps) {
  const [content, setContent] = useState(initialContent);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setContent(initialContent);
    setIsDirty(false);
  }, [initialContent]);

  const handleChange = (value: string) => {
    setContent(value);
    setIsDirty(value !== initialContent);
  };

  const handleSave = () => {
    onSave(content);
    setIsDirty(false);
  };

  const handleClose = () => {
    if (isDirty) {
      const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (!confirmClose) return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-2xl w-full max-w-3xl mx-4 h-[70vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <Text weight="semibold">{title}</Text>
            {isDirty && <Text size="sm" color="muted">(unsaved)</Text>}
          </div>
          {!readOnly && (
            <button
              onClick={handleClose}
              className="p-1.5 rounded-md hover:bg-[var(--color-bg-hover)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <Text>✕</Text>
            </button>
          )}
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <textarea
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            readOnly={readOnly}
            className="w-full h-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text-primary)] font-mono text-sm resize-none focus:outline-none focus:border-[var(--color-accent)]"
            placeholder="Enter file content..."
          />
        </div>
        <div className="flex justify-end gap-2 p-4 border-t border-[var(--color-border)]">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!readOnly && (
            <Button variant="primary" onClick={handleSave} disabled={!isDirty}>
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
