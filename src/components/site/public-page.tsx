import Link from "next/link";
import type { ReactNode } from "react";
import { PublicIcon } from "./public-ui";
export function PublicPage({
  title,
  intro,
  hero,
  parentBreadcrumb,
  className = "",
  children,
}: {
  title: string;
  intro?: string;
  hero?: { image: string; actions?: ReactNode };
  parentBreadcrumb?: { href: string; label: string };
  className?: string;
  children: ReactNode;
}) {
  return (
    <main className={`public-page ${className}`}>
      <div
        className={`public-page-hero${hero ? " public-page-hero-photo" : ""}`}
      >
        {hero && (
          <div className="public-page-hero-art" aria-hidden="true">
            <img src={hero.image} alt="" fetchPriority="high" />
          </div>
        )}
        <div className="public-container relative">
          <nav aria-label="Đường dẫn" className="public-breadcrumb">
            <Link href="/">Trang chủ</Link>
            <PublicIcon name="chevron_right" />
            {parentBreadcrumb && (
              <>
                <Link href={parentBreadcrumb.href}>
                  {parentBreadcrumb.label}
                </Link>
                <PublicIcon name="chevron_right" />
              </>
            )}
            <span aria-current="page">{title}</span>
          </nav>
          <h1>{title}</h1>
          {intro && (
            <p className="mt-3 max-w-3xl text-on-surface-variant">{intro}</p>
          )}
          {hero?.actions && <div className="mt-5">{hero.actions}</div>}
        </div>
      </div>
      <div className="public-container public-page-body">{children}</div>
    </main>
  );
}
