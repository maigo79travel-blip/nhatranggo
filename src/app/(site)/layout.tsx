import { db } from "@/lib/db";
import type { Metadata } from "next";
import { getPublicLocale, getSiteContent } from "@/lib/catalog";
import { getMessages } from "@/lib/i18n";
import { SiteDataProvider } from "@/components/content";
import { WebsiteShell } from "@/components/site/website-shell";
import { contactInfo, resolveContent } from "@/lib/content-values";
import brand from "@/config/brand.json";
export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent("shared");
  const meta = resolveContent(
    content["site.metadata"]?.value,
    contactInfo(content),
  ) as Metadata | undefined;
  return {
    ...meta,
    title: {
      default: typeof meta?.title === "string" ? meta.title : brand.name,
      template: `%s | ${brand.name}`,
    },
  };
}
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getPublicLocale();
  const [content, pages] = await Promise.all([
    getSiteContent("shared"),
    db.query(
      `SELECT title, slug FROM (
         SELECT DISTINCT ON (slug) title, slug
         FROM information_pages
         WHERE status='published' AND locale IN ($1, 'vi')
         ORDER BY slug, (locale = $1) DESC
       ) pages
       ORDER BY title`,
      [locale],
    ),
  ]);
  const messages = getMessages(locale);
  const informationLinks = pages.rows.map((page) => (
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
    <SiteDataProvider data={{ content, locale, messages }}>
      <WebsiteShell informationLinks={informationLinks}>
        {children}
      </WebsiteShell>
    </SiteDataProvider>
  );
}
