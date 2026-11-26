"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./admin-icon";

export function EditorDrawer({
  open,
  title,
  onClose,
  children,
  compact = false,
  saveForm,
  busy = false,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  compact?: boolean;
  saveForm?: string;
  busy?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (open) {
      dialog?.showModal();
      return () => {
        dialog?.close();
      };
    }
    dialog?.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={`admin-ui ad-drawer ${compact ? "ad-drawer-compact" : ""}`}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
    >
      <div className="ad-drawer-heading">
        <h2>{title}</h2>
        <button
          type="button"
          className="ad-icon-button"
          aria-label="Đóng bảng chỉnh sửa"
          disabled={busy}
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="ad-drawer-body">{children}</div>
      <div className="ad-drawer-bottom">
        <button
          type="button"
          className="ad-button"
          disabled={busy}
          onClick={onClose}
        >
          Đóng
        </button>
        {saveForm && (
          <button
            type="submit"
            form={saveForm}
            disabled={busy}
            className="ad-button ad-button-primary"
          >
            <Icon name="check" />
            {busy ? "Đang lưu…" : "Lưu thay đổi"}
          </button>
        )}
      </div>
    </dialog>
  );
}
