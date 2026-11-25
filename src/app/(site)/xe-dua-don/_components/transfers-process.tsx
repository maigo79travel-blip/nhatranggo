"use client";
import { useState } from "react";
import { ContentText } from "@/components/content";
import brand from "@/config/brand.json";
import {
  TransferCallout,
  TransferHeading,
  TransferIcon,
  TransferZaloLink,
} from "./transfers-ui";

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
    icon: "flight_land",
    category: "airport" as FaqCategory,
    titleKey: "transfers.text-165",
    body: ["transfers.text-166", "transfers.text-167", "transfers.text-168"],
  },
  {
    id: 2,
    icon: "directions_car",
    category: "airport" as FaqCategory,
    titleKey: "transfers.text-169",
    body: ["transfers.text-170", "transfers.text-171"],
  },
  {
    id: 3,
    icon: "sell",
    category: "payment" as FaqCategory,
    titleKey: "transfers.text-172",
    body: ["transfers.text-173", "transfers.text-174", "transfers.text-175"],
  },
  {
    id: 4,
    icon: "photo_camera",
    category: "rental" as FaqCategory,
    titleKey: "transfers.text-176",
    body: ["transfers.text-177"],
  },
  {
    id: 5,
    icon: "credit_card",
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
    <section className="transfer-section">
      <div className="site-container">
        <TransferHeading
          eyebrow="transfers.text-163"
          titleKey="transfers.text-164"
          accent="Khi Thuê Xe Đưa Đón"
          centered
        >
          <p className="mt-3 text-sm text-on-surface-variant">
            Câu hỏi phổ biến về dịch vụ đưa đón tại {brand.name}.
          </p>
        </TransferHeading>
        <div
          className="my-7 flex flex-wrap justify-center gap-3 sm:my-8"
          role="group"
          aria-label="Phân loại câu hỏi"
        >
          {faqTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={tab === item.id}
              onClick={() => setTab(item.id)}
              className="transfer-pill transfer-pill-white"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          {visible.map((item) => {
            const expanded = openId === item.id;
            const answer = `transfer-answer-${item.id}`;
            return (
              <div
                key={item.id}
                className={`rounded-[22px] ${expanded ? "" : "bg-surface"}`}
              >
                <h3 className="text-base font-bold sm:text-xl">
                  <button
                    type="button"
                    aria-controls={answer}
                    aria-expanded={expanded}
                    onClick={() => setOpenId(expanded ? null : item.id)}
                    className="flex min-h-[72px] w-full items-center gap-4 rounded-[22px] px-4 py-3 text-left [white-space:normal] sm:px-6"
                  >
                    <TransferIcon className="transfer-feature-icon text-xl">
                      {item.icon}
                    </TransferIcon>
                    <span className="flex-1">
                      <ContentText contentKey={item.titleKey} />
                    </span>
                    <TransferIcon className="text-xl text-primary">
                      {expanded ? "expand_less" : "expand_more"}
                    </TransferIcon>
                  </button>
                </h3>
                <p
                  id={answer}
                  hidden={!expanded}
                  className="pb-5 pl-[72px] pr-5 text-sm leading-relaxed text-on-surface-variant sm:pl-[82px] sm:text-base"
                >
                  {item.body.map((key) => (
                    <ContentText contentKey={key} key={key} />
                  ))}
                </p>
              </div>
            );
          })}
        </div>

        <TransferCallout
          className="mt-8 sm:px-8"
          title="Vẫn còn thắc mắc?"
          actions={<TransferZaloLink>Tư vấn ngay qua Zalo</TransferZaloLink>}
        >
          Liên hệ ngay với đội ngũ {brand.name} để được hỗ trợ nhanh nhất.
        </TransferCallout>
      </div>
    </section>
  );
}
