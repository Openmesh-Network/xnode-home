import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Text } from "../ui/Text";

interface InputModalProps {
  title: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  onConfirm?: (value: string) => void;
  onClose: () => void;
  onCreate?: (value: string) => void;
}

export function InputModal({
  title,
  label,
  placeholder,
  defaultValue = "",
  onConfirm,
  onClose,
  onCreate,
}: InputModalProps) {
  const [value, setValue] = useState(defaultValue);

  const handleConfirm = () => {
    if (value.trim() && onConfirm) {
      onConfirm(value.trim());
      onClose();
    }
  };

  const handleCreate = () => {
    if (value.trim() && onCreate) {
      onCreate(value.trim());
      onClose();
    }
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      confirmText="Create"
      onConfirm={onCreate ? handleCreate : handleConfirm}
    >
      <div className="space-y-3">
        <Text as="label" size="sm" color="muted">{label}</Text>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (onCreate) {
                handleCreate();
              } else {
                handleConfirm();
              }
            }
          }}
        />
      </div>
    </Modal>
  );
}
