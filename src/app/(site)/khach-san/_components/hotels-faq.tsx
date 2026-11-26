"use client";
import { useRef, useState } from "react";
import { ContentLink, ContentText } from "@/components/content";
import brand from "@/config/brand.json";

const commitments = [
  {
    id: "price",
    icon: "sell",
    title: "Giá phòng và phụ phí",
    summary:
      "Giá trên website là giá tham khảo. Nhân viên sẽ xác nhận tổng chi phí theo hạng phòng và ngày lưu trú.",
    detailTitle: "Chính sách Giá phòng và phụ phí",
    detailPoints: [
      "Kiểm tra các khoản thuế, phí và phụ thu trong báo giá xác nhận.",
    ],
  },
  {
    id: "support",
    icon: "headset_mic",
    title: "Giữ Phòng & Chăm Sóc Zalo 24/7",
    summary:
      "Đội ngũ chuyên viên du lịch đồng hành 24/7, hỗ trợ đặt phòng, tư vấn hành trình và giải đáp mọi thắc mắc nhanh chóng, tận tâm.",
  },
  {
    id: "flexible",
    icon: "sync",
    title: "Đổi ngày và hủy phòng",
    summary:
      "Điều kiện đổi ngày, hủy phòng và hoàn tiền phụ thuộc gói phòng đã chọn.",
    detailTitle: "Chính sách Đổi ngày và hủy phòng",
    detailPoints: [
      "Xem điều kiện được xác nhận cho đơn trước khi yêu cầu thay đổi.",
    ],
  },
];

export function HotelsFaq() {
  const [activePolicy, setActivePolicy] = useState<
    (typeof commitments)[number] | null
  >(null);
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <section
      className="site-container hotel-commitments"
      aria-labelledby="hotel-commitments-title"
    >
      <div className="hotel-commitments-banner">
        <div className="inline-flex rounded-full bg-surface px-5 py-2 text-xs font-bold uppercase text-primary sm:text-sm">
          {brand.name} – dịch vụ du lịch
        </div>
        <h2
          id="hotel-commitments-title"
          className="mt-5 text-[clamp(1.65rem,3.4vw,3rem)] font-extrabold leading-tight tracking-tight"
        >
          Thông tin trước khi đặt phòng
        </h2>
        <p className="mx-auto mt-4 max-w-[78ch] text-sm leading-relaxed sm:text-base">
          Xem cách xác nhận giá, tình trạng phòng và điều kiện đổi ngày.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3 lg:gap-6">
          {commitments.map((item) => (
            <article key={item.id} className="hotel-commitment">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-surface-muted lg:h-[72px] lg:w-[72px]">
                <span
                  aria-hidden="true"
                  className={`material-symbols-outlined text-[30px] ${item.id === "flexible" ? "text-error" : "text-primary"}`}
                >
                  {item.icon}
                </span>
              </div>
              <div className="grid flex-1 content-end gap-4">
                <h3 className="text-lg font-extrabold sm:text-xl lg:text-[22px]">
                  {item.detailTitle ? (
                    <button
                      type="button"
                      className="rounded-lg whitespace-normal leading-snug hover:underline"
                      onClick={() => {
                        setActivePolicy(item);
                        dialog.current?.showModal();
                      }}
                    >
                      {item.title}
                    </button>
                  ) : (
                    <ContentLink
                      contentKey="hotels.attributes-042"
                      href="/lien-he"
                      target="_blank"
                      rel="noopener"
                      className="rounded-lg hover:underline"
                    >
                      {item.title}
                    </ContentLink>
                  )}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hotel-trust">
        <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
          <div>
            <p className="text-xs text-on-surface-variant">
              <ContentText contentKey="hotels.text-152" />
            </p>
            <ContentLink
              contentKey="hotels.attributes-041"
              className="text-xl font-extrabold text-primary hover:underline"
            >
              <ContentText contentKey="hotels.text-153" />
            </ContentLink>
          </div>
          <ContentLink
            contentKey="hotels.attributes-042"
            target="_blank"
            rel="noopener"
            className="hotel-button"
            href="/lien-he"
          >
            <ContentText contentKey="hotels.text-154" />
          </ContentLink>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="hotel-policy-dialog"
        aria-labelledby="hotel-policy-title"
        onClose={() => setActivePolicy(null)}
      >
        {activePolicy && (
          <>
            <h3 id="hotel-policy-title" className="text-xl font-extrabold">
              {activePolicy.detailTitle}
            </h3>
            <ul className="my-4 list-disc space-y-2 pl-5 text-sm text-on-surface-variant">
              {activePolicy.detailPoints?.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <form method="dialog" className="flex justify-end">
              <button type="submit" className="hotel-button">
                Đã hiểu
              </button>
            </form>
          </>
        )}
      </dialog>
    </section>
  );
}
