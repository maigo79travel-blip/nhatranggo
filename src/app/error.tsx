"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="pt-44 pb-24 text-center">
      <h1 className="text-headline-md">Chưa tải được trang</h1>
      <button
        className="mt-6 bg-primary text-white px-6 py-3 rounded-xl"
        onClick={reset}
      >
        Thử lại
      </button>
    </main>
  );
}
