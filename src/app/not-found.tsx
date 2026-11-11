import Link from "next/link";
export default function NotFound() {
  return (
    <main className="pt-44 pb-24 text-center min-h-screen">
      <h1 className="text-headline-lg">Không tìm thấy trang</h1>
      <Link
        className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl"
        href="/"
      >
        Về trang chủ
      </Link>
    </main>
  );
}
