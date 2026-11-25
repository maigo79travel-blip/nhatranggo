"use client";
import { useState, type FormEvent } from "react";

export function HomeFaq() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("busy");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Đăng ký nhận ưu đãi",
          email: email.trim(),
          message: "Đăng ký nhận ưu đãi độc quyền từ NhaTrangGo",
        }),
      });
      if (!response.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="site-container py-10 w-full mb-8">
      <div
        className="rounded-3xl bg-cover bg-center px-6 py-8 md:px-12 md:py-10 shadow-floating text-on-primary relative overflow-hidden min-h-[226px] flex items-center"
        style={{ backgroundImage: "url('/images/figma/newsletter-bg.png')" }}
      >
        <div className="relative z-10 w-full md:pl-[22%] max-w-4xl">
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Nhận ưu đãi độc quyền từ NhaTrangGo
          </h2>
          <p className="font-body-md text-sm sm:text-base text-white/95 mt-2">
            Đăng ký để không bỏ lỡ các chương trình khuyến mãi, tour hot và bí kíp du lịch.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl"
          >
            <label className="flex-1 min-w-0 bg-white rounded-full px-5 h-12 flex items-center gap-3 shadow-sm">
              <span className="material-symbols-outlined text-[20px] text-outline shrink-0" aria-hidden="true">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                aria-label="Nhập email của bạn"
                className="w-full min-w-0 bg-transparent text-on-surface placeholder:text-outline text-sm sm:text-base font-medium focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={status === "busy"}
              className="h-12 px-6 rounded-xl bg-primary hover:bg-ocean-deep text-white font-bold text-sm sm:text-base shadow-md transition-colors shrink-0 disabled:opacity-60"
            >
              {status === "busy" ? "Đang gửi..." : "Đăng ký ngay"}
            </button>
          </form>
          {status === "done" && (
            <p role="status" className="mt-2.5 text-sm font-semibold text-white">
              Đăng ký thành công! Chúng tôi sẽ gửi ưu đãi mới nhất đến email của bạn.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="mt-2.5 text-sm font-semibold text-gold-amber">
              Chưa gửi được đăng ký, vui lòng thử lại sau.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
