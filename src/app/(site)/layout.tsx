import { db } from "@/lib/db";
import type { Metadata } from "next";
import { getSiteData } from "@/lib/catalog";
import { SiteDataProvider } from "@/components/content";
import { WebsiteShell } from "@/components/website-shell";
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  const meta = data.content["site.metadata"]?.value as Metadata | undefined;
  return meta || {};
}
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSiteData();
  const pages = (
    await db.query(
      "SELECT title,slug FROM information_pages WHERE status='published' AND locale=$1 ORDER BY title",
      [data.locale],
    )
  ).rows;
  const informationLinks = pages.map((page) => (
    <li key={page.slug}>
      <a
        className="hover:text-primary transition-colors"
        href={"/thong-tin/" + page.slug}
      >
        {page.title}
      </a>
    </li>
  ));
  return (
    <SiteDataProvider data={data}>
      <WebsiteShell informationLinks={informationLinks}>
        {children}
      </WebsiteShell>
    </SiteDataProvider>
  );
}
