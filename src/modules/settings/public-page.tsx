import Link from "next/link";
import type { ReactNode } from "react";
import { PublicIcon } from "./public-ui";
export function PublicPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="public-page">
      <div className="public-page-hero">
        <div className="public-container">
          <nav aria-label="Đường dẫn" className="public-breadcrumb">
            <Link href="/">Trang chủ</Link>
            <PublicIcon name="chevron_right" />
            <span aria-current="page">{title}</span>
          </nav>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="public-container public-page-body">{children}</div>
    </main>
  );
}
