import Link from "next/link";

export default function AdminNotFound() {
  return (
    <section className="ad-panel ad-missing-page">
      <h1>Không tìm thấy trang</h1>
      <p>Kiểm tra đường dẫn hoặc quyền truy cập của tài khoản.</p>
      <Link href="/admin" className="ad-button ad-button-primary">
        Về tổng quan
      </Link>
    </section>
  );
}
