import Link from "next/link";
import { getCurrentMessages } from "@/lib/i18n";

export default async function NotFound() {
  const t = await getCurrentMessages();
  return (
    <main className="pt-44 pb-24 text-center min-h-screen">
      <h1 className="text-headline-lg">{t.pages.notFoundTitle}</h1>
      <Link
        className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl"
        href="/"
      >
        {t.pages.backHome}
      </Link>
    </main>
  );
}
