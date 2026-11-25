import { cloneElement, type ReactElement } from "react";
import { PublicIcon } from "./public-ui";

export function FilterField({
  label,
  icon,
  children,
  className = "",
}: {
  label: string;
  icon: string;
  children: ReactElement<{ "aria-label"?: string }>;
  className?: string;
}) {
  return (
    <label className={`catalog-filter-field ${className}`}>
      <PublicIcon name={icon} className="catalog-filter-icon" />
      <span className="catalog-filter-body">
        <span className="catalog-filter-label">{label}</span>
        {cloneElement(children, { "aria-label": label })}
      </span>
    </label>
  );
}
