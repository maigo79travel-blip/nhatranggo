"use client";
import Link from "next/link";
import { useT } from "@/components/content";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useT();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5 p-8 text-center">
      <span
        aria-hidden="true"
        className="material-symbols-outlined text-5xl text-primary"
      >
        cloud_off
      </span>
      <h1 className="text-3xl font-bold">{t.common.errorTitle}</h1>
      <p className="text-on-surface-variant">{t.common.errorSubtitle}</p>
      <button type="button" className="public-primary-button" onClick={reset}>
        {t.common.retry}
      </button>
      <Link href="/" className="text-primary underline p-3">
        {t.pages.backHome}
      </Link>
    </main>
  );
}
