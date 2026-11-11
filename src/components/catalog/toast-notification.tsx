"use client";

export function ToastNotification({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 left-5 right-20 sm:right-auto sm:max-w-lg bg-inverse-surface text-white p-4 rounded-xl shadow-xl z-[80]"
    >
      {message}
      <button aria-label="Đóng thông báo" className="ml-3" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
