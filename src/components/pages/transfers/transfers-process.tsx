"use client";
import { useState } from "react";
import { ContentText, ContentElement } from "@/components/content";

type FaqCategory = "all" | "rental" | "airport" | "payment" | "other";

const faqTabs: { id: FaqCategory; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "rental", label: "Thuê xe" },
  { id: "airport", label: "Đón tại sân bay" },
  { id: "payment", label: "Thanh toán" },
  { id: "other", label: "Khác" },
];

const faqItems = [
  {
    id: 1,
    category: "airport" as FaqCategory,
    titleKey: "transfers.text-165",
    body: ["transfers.text-166", "transfers.text-167", "transfers.text-168"],
  },
  {
    id: 2,
    category: "airport" as FaqCategory,
    titleKey: "transfers.text-169",
    body: ["transfers.text-170", "transfers.text-171"],
  },
  {
    id: 3,
    category: "payment" as FaqCategory,
    titleKey: "transfers.text-172",
    body: ["transfers.text-173", "transfers.text-174", "transfers.text-175"],
  },
  {
    id: 4,
    category: "rental" as FaqCategory,
    titleKey: "transfers.text-176",
    body: ["transfers.text-177"],
  },
  {
    id: 5,
    category: "other" as FaqCategory,
    titleKey: "transfers.text-178",
    body: ["transfers.text-179"],
  },
];

export function TransfersProcess() {
  const [tab, setTab] = useState<FaqCategory>("all");
  const [openId, setOpenId] = useState<number | null>(1);
  const visible =
    tab === "all" ? faqItems : faqItems.filter((item) => item.category === tab);

  return (
    <section className="w-full py-16 bg-background">
      <div className="site-container max-w-4xl">
        <div className="text-center mb-8">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            <ContentText contentKey="transfers.text-163" />
          </span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface mt-1">
            <ContentText contentKey="transfers.text-164" />
          </h2>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
          role="group"
          aria-label="Phân loại câu hỏi"
        >
          {faqTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                tab === item.id
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-lowest border border-border-light text-on-surface hover:border-primary/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3" id="faq-accordion">
          {visible.map((item, idx) => {
            const expanded = openId === item.id;
            return (
              <div
                key={item.id}
                className="faq-item bg-surface-container-lowest rounded-2xl border border-border-light shadow-card overflow-hidden transition-all"
              >
                <button
                  aria-expanded={expanded}
                  onClick={() => setOpenId(expanded ? null : item.id)}
                  className="faq-toggle whitespace-normal w-full p-5 text-left flex items-center justify-between gap-4"
                  type="button"
                >
                  <span className="font-title-md text-base font-bold text-on-surface">
                    {idx + 1}. <ContentText contentKey={item.titleKey} />
                  </span>
                  <span
                    className={`material-symbols-outlined text-outline transition-transform duration-200 ${
                      expanded ? "rotate-180 text-primary" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {expanded && (
                  <div className="faq-content px-5 pb-5 text-on-surface-variant font-body-md text-sm border-t border-border-light/60 pt-4 leading-relaxed">
                    {item.body.map((key) => (
                      <span key={key} className="mr-1">
                        <ContentText contentKey={key} />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-primary to-ocean-deep p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
          <div>
            <h3 className="text-lg font-extrabold">Vẫn còn thắc mắc?</h3>
            <p className="text-sm text-white/90">
              Liên hệ ngay với đội ngũ hỗ trợ để được tư vấn nhanh nhất.
            </p>
          </div>
          <ContentElement
            contentKey="transfers.attributes-009"
            tag="a"
            target="_blank"
            rel="noopener"
            className="px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-ocean-light font-bold text-sm inline-flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <span>Tư vấn ngay qua Zalo</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </ContentElement>
        </div>
      </div>
    </section>
  );
}
