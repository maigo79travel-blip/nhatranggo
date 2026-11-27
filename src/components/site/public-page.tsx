import Link from "next/link";
import type { ReactNode } from "react";
import { getCurrentMessages } from "@/lib/i18n";
import { PublicIcon } from "./public-ui";
export async function PublicPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const t = await getCurrentMessages();
  return (
    <main className="public-page">
      <div className="public-page-hero">
        <div className="public-container">
          <nav aria-label={t.nav.breadcrumbLabel} className="public-breadcrumb">
            <Link href="/">{t.nav.home}</Link>
            <PublicIcon name="chevron_right" />
            <span aria-current="page">{title}</span>
          </nav>
          <h1>{title}</h1>
          {intro && (
            <p className="mt-3 max-w-3xl text-on-surface-variant">{intro}</p>
          )}
        </div>
      </div>
      <div className="public-container public-page-body">{children}</div>
    </main>
  );
}
