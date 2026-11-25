"use client";
import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5 p-8 text-center">
      <span
        aria-hidden="true"
        className="material-symbols-outlined text-5xl text-primary"
      >
        cloud_off
      </span>
      <h1 className="text-3xl font-bold">Chưa thể tải nội dung</h1>
      <p className="text-on-surface-variant">Vui lòng thử lại sau ít phút.</p>
      <button type="button" className="public-primary-button" onClick={reset}>
        Thử lại
      </button>
      <Link href="/" className="text-primary underline p-3">
        Về trang chủ
      </Link>
    </main>
  );
}
