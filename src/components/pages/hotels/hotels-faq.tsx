"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ContentText, ContentElement } from "@/components/content";
import brand from "@/config/brand.json";

const commitments = [
  {
    id: "price",
    icon: "/images/figma/icons/commit-price.svg",
    iconBg: "bg-surface-container",
    title: "Giá Minh Bạch – Không Phí Ẩn",
    summary:
      "Mức giá hiển thị là giá thanh toán cuối cùng, đã bao gồm 100% thuế VAT, phí dịch vụ và các khoản phụ thu (nếu có). Cam kết hoàn tiền chênh lệch nếu tìm thấy giá cùng dịch vụ thấp hơn.",
    cta: "Xem chi tiết",
    detailTitle: "Chính sách Giá Minh Bạch – Không Phí Ẩn",
    detailPoints: [
      "Giá công bố đã bao gồm thuế VAT và phí dịch vụ khách sạn.",
      "Không thu thêm phụ phí đặt phòng ngoài báo giá xác nhận.",
      "Cam kết đối chiếu hoàn chênh lệch khi có báo giá hợp lệ cùng hạng phòng và ngày lưu trú.",
    ],
  },
  {
    id: "support",
    icon: "/images/figma/icons/commit-support.svg",
    iconBg: "bg-surface-container",
    title: "Giữ Phòng & Chăm Sóc Zalo 24/7",
    summary:
      "Đội ngũ chuyên viên du lịch đồng hành 24/7, hỗ trợ đặt phòng, tư vấn hành trình và giải đáp mọi thắc mắc nhanh chóng, tận tâm.",
    cta: "Liên hệ hỗ trợ",
    href: "/lien-he",
  },
  {
    id: "flexible",
    icon: "/images/figma/icons/commit-flexible.svg",
    iconBg: "bg-gold-soft",
    title: "Đổi Ngày Linh Hoạt & Hoàn Tiền Nhanh",
    summary:
      "Hỗ trợ đổi ngày lưu trú linh hoạt, đảm bảo quyền lợi tối đa. Nếu cần, chúng tôi sẽ hoàn tiền nhanh theo chính sách trong 2–4 giờ làm việc.",
    cta: "Xem chính sách",
    detailTitle: "Chính sách Đổi Ngày Linh Hoạt & Hoàn Tiền Nhanh",
    detailPoints: [
      "Hỗ trợ đổi ngày nhận/trả phòng miễn phí theo điều kiện từng gói phòng.",
      "Miễn phí hủy phòng trước 48 giờ đối với các hạng phòng áp dụng chính sách linh hoạt.",
      "Xử lý hoàn tiền nhanh trong 2–4 giờ làm việc qua chuyển khoản.",
    ],
  },
];

export function HotelsFaq() {
  const [activeModal, setActiveModal] = useState<(typeof commitments)[number] | null>(
    null,
  );

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveModal(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeModal]);

  return (
    <section className="site-container py-10 w-full space-y-6">
      <div className="bg-gradient-to-br from-primary to-ocean-deep rounded-3xl p-8 lg:p-12 shadow-floating text-center text-white">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-xs font-extrabold uppercase tracking-wider mb-4">
          {brand.name} – DỊCH VỤ DU LỊCH
        </div>

        <h2 className="font-headline-lg text-2xl sm:text-4xl font-extrabold text-white">
          Cam Kết Chất Lượng Dịch Vụ Từ {brand.name}
        </h2>
        <p className="font-body-md text-sm sm:text-base text-white/90 mt-3 max-w-2xl mx-auto">
          Là đối tác chính thức hợp tác với các tập đoàn và chuỗi khách sạn lớn tại
          Nha Trang - Cam Ranh, chúng tôi mang lại trải nghiệm du lịch tốt nhất cho
          quý khách.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
          {commitments.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-3xl p-6 flex flex-col items-center text-center shadow-card"
            >
              <div
                className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center mb-4`}
              >
                <img src={item.icon} alt="" className="w-6 h-6" />
              </div>

              <h3 className="font-headline-sm text-lg font-extrabold text-on-surface mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed flex-1">
                {item.summary}
              </p>

              <div className="mt-5">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary text-xs font-bold transition-colors"
                  >
                    <span>{item.cta}</span>
                    <img
                      src="/images/figma/icons/arrow-right.svg"
                      alt=""
                      className="w-3.5 h-3.5"
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveModal(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary text-xs font-bold transition-colors"
                  >
                    <span>{item.cta}</span>
                    <img
                      src="/images/figma/icons/arrow-right.svg"
                      alt=""
                      className="w-3.5 h-3.5"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Trust & Hotline Bar */}
      <div className="hidden md:flex bg-surface-container-lowest rounded-2xl border border-border-light px-6 py-4 items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-on-surface-variant">
          <div className="flex items-center gap-2">
            <img
              src="/images/figma/icons/shield-check.svg"
              alt=""
              className="w-5 h-5"
            />
            <span>
              <ContentText contentKey="hotels.text-150" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/figma/icons/pci-dss.svg"
              alt=""
              className="w-5 h-5"
            />
            <span>
              <ContentText contentKey="hotels.text-151" />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[11px] text-outline block">
              <ContentText contentKey="hotels.text-152" />
            </span>
            <ContentElement
              contentKey="hotels.attributes-041"
              tag="a"
              className="text-lg font-extrabold text-primary hover:text-ocean-deep transition-colors"
            >
              <ContentText contentKey="hotels.text-153" />
            </ContentElement>
          </div>
          <ContentElement
            contentKey="hotels.attributes-042"
            tag="a"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-bold text-sm transition-colors action-link"
            rel="noopener"
            target="_blank"
          >
            <ContentText contentKey="hotels.text-154" />
          </ContentElement>
        </div>
      </div>

      {/* Commitment Detail Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModal.detailTitle}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
          className="fixed inset-0 z-50 bg-destination-scrim/50 flex items-center justify-center p-4"
        >
          <div className="bg-surface-container-lowest rounded-3xl border border-border-light shadow-floating max-w-lg w-full p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-extrabold text-on-surface">
                {activeModal.detailTitle}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-sm font-bold text-outline hover:text-on-surface"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2.5 text-sm text-on-surface-variant">
              {activeModal.detailPoints?.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                    check_circle
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-bold text-sm"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
