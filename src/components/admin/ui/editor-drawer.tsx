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
      onCancel={onClose}
    >
      <div className="ad-drawer-heading">
        <div>
          <span className="ad-eyebrow">QUẢN LÝ NỘI DUNG</span>
          <h2>{title}</h2>
        </div>
        <button
          type="button"
          className="ad-icon-button"
          aria-label="Đóng bảng chỉnh sửa"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="ad-drawer-body">{children}</div>
      <div className="ad-drawer-bottom">
        <Icon name="lock" />
        <span>Chỉ cập nhật khi bạn lưu thay đổi.</span>
        <button type="button" onClick={onClose}>
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
