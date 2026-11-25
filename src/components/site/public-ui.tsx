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

export function PublicEmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="public-empty-state">
      <PublicIcon name="search_off" className="text-primary text-4xl" />
      <h2 className="font-bold text-lg">Chưa tìm thấy kết quả</h2>
      <p className="text-outline">{children}</p>
    </div>
  );
}
