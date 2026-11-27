import type { ReactNode } from "react";

export function PublicIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
    >
      {name}
    </span>
  );
}

export function PublicEmptyState({
  children,
  heading = "Chưa tìm thấy kết quả",
}: {
  children: ReactNode;
  heading?: string;
}) {
  return (
    <div className="public-empty-state">
      <PublicIcon name="search_off" className="text-primary text-4xl" />
      <h2 className="font-bold text-lg">{heading}</h2>
      <p className="text-on-surface-variant">{children}</p>
    </div>
  );
}
