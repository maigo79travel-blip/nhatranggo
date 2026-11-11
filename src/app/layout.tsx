import { cookies } from "next/headers";
import { parseLocale } from "@/modules/settings/locale";
import "./globals.css";
import "./fonts.css";
export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = parseLocale((await cookies()).get("site_locale")?.value);
  return (
    <html lang={locale}>
      <body className="bg-background font-body-md text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
