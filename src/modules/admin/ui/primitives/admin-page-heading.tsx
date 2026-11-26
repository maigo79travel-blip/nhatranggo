import type { ReactNode } from "react";

export function AdminPageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="ad-page-heading">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="ad-heading-actions">{children}</div>}
    </header>
  );
}
