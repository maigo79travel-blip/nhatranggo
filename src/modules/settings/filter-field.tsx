import type { ReactNode } from "react";
import { PublicIcon } from "./public-ui";

export function FilterField({
  label,
  icon,
  children,
  className = "",
}: {
  label: string;
  icon: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`catalog-filter-field ${className}`}>
      <PublicIcon name={icon} className="catalog-filter-icon" />
      <span className="catalog-filter-body">
        <span className="catalog-filter-label">{label}</span>
        {children}
      </span>
    </label>
  );
}
