"use client";
import { useEffect, useState } from "react";
import { Icon } from "./admin-icon";

export function useAdminNotice() {
  const [notice, setNotice] = useState<{ text: string; error: boolean } | null>(
    null,
  );
  useEffect(() => {
    if (!notice || notice.error) return;
    const timer = window.setTimeout(() => setNotice(null), 6500);
    return () => window.clearTimeout(timer);
  }, [notice]);
  return {
    notice,
    notify: (text: string, error = false) => setNotice({ text, error }),
    clearNotice: () => setNotice(null),
  };
}

export function AdminNotice({
  notice,
  dismiss,
}: {
  notice: { text: string; error: boolean } | null;
  dismiss: () => void;
}) {
  if (!notice) return null;
  return (
    <div
      role={notice.error ? "alert" : "status"}
      className={`ad-toast ${notice.error ? "ad-toast-error" : ""}`}
    >
      <Icon name={notice.error ? "error" : "check_circle"} />
      <span>{notice.text}</span>
      <button
        type="button"
        className="ad-icon-button"
        aria-label="Đóng thông báo"
        onClick={dismiss}
      >
        <Icon name="close" />
      </button>
    </div>
  );
}
