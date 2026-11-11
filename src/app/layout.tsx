import type { Metadata } from "next";
import { getSiteData } from "@/lib/catalog";
import { SiteDataProvider } from "@/components/content";
import { WebsiteShell } from "@/components/website-shell";
import "./globals.css";
import "./fonts.css";
export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  const meta = data.content["site.metadata"]?.value as
    { title?: string; description?: string } | undefined;
  return { title: meta?.title, description: meta?.description };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSiteData();
  return (
    <html lang="vi">
      <body className="bg-background font-body-md text-on-surface antialiased">
        <SiteDataProvider data={data}>
          <WebsiteShell>{children}</WebsiteShell>
        </SiteDataProvider>
      </body>
    </html>
  );
}
