"use client";
import Link from "next/link";
import { useSiteData } from "@/components/content";
import { contactInfo, contentImageUrl } from "@/lib/content-values";
import { ContentText, ContentElement } from "@/components/content";
import type { ReactNode } from "react";
import brand from "@/config/brand.json";

const socialLinks = [
  {
    key: "facebook",
    label: "Facebook",
    icon: "/images/figma/icons/social-facebook.svg",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: "/images/figma/icons/social-instagram.svg",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: "/images/figma/icons/social-youtube.svg",
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: "/images/figma/icons/social-tiktok.svg",
  },
];

const serviceLinks = [
  { href: "/khach-san", textKey: "footer.text-032", fallback: "Khách sạn" },
  {
    href: "/tour-hang-ngay",
    textKey: "footer.text-033",
    fallback: "Tour du lịch",
  },
  { href: "/xe-dua-don", textKey: "footer.text-034", fallback: "Xe đưa đón" },
  { href: "/#combo", textKey: "footer.text-035", fallback: "Combo du lịch" },
  {
    href: "/tour-hang-ngay?type=combo",
    textKey: "footer.text-036",
    fallback: "Ưu đãi & khuyến mãi",
  },
] as const;

export function SiteFooter({
  informationLinks,
}: {
  informationLinks: ReactNode;
}) {
  const { content } = useSiteData();
  const contact = contactInfo(content);
  return (
    <footer
      className="w-full bg-background text-on-surface pt-10 pb-24 md:pb-8"
      id="lien-he"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-[60px] w-[60px] rounded-xl overflow-hidden shrink-0 bg-surface-muted flex items-center justify-center">
                <img
                  src={contentImageUrl(
                    content["site.logo"]?.value,
                    "/images/figma/logo-mark.png",
                  )}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-[20px]">
                <span className="text-sm font-extrabold text-on-surface tracking-tight uppercase">
                  <ContentText contentKey="footer.text-023" />
                </span>
                <span className="text-sm font-normal text-on-surface-variant uppercase">
                  <ContentText contentKey="footer.text-024" />
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-on-surface leading-[20px] max-w-[270px]">
              <ContentText contentKey="footer.text-025" />
            </p>
            <div className="flex items-center gap-4 pt-1">
              {socialLinks.map((item) => {
                const url = contact[item.key] || "";
                const external = /^https:\/\//i.test(url);
                return external ? (
                  <a
                    key={item.label}
                    href={url}
                    target="_blank"
                    rel="noopener"
                    aria-label={item.label}
                    className="grid h-8 w-8 place-items-center rounded-[8px] bg-white p-1 shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <img src={item.icon} alt="" className="h-[22px] w-[22px]" />
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href="/lien-he"
                    aria-label={item.label}
                    className="grid h-8 w-8 place-items-center rounded-[8px] bg-white p-1 shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <img src={item.icon} alt="" className="h-[22px] w-[22px]" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-extrabold leading-[20px] text-on-surface">
              <ContentText contentKey="footer.text-031" />
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium leading-[20px] text-on-surface-variant">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {content[item.textKey]?.value ? (
                      <ContentText contentKey={item.textKey} />
                    ) : (
                      item.fallback
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-extrabold leading-[20px] text-on-surface">
              <ContentText contentKey="footer.text-038" />
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium leading-[20px] text-on-surface-variant">
              {informationLinks}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-extrabold leading-[20px] text-on-surface">
              Liên hệ
            </h4>
            <div className="flex flex-col gap-3 text-sm font-medium leading-[20px] text-on-surface-variant">
              <ContentElement
                contentKey="footer.attributes-001"
                tag="a"
                className="hover:text-primary transition-colors flex items-center gap-2.5"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">
                  {"call"}
                </span>
                <span>
                  <ContentText contentKey="footer.text-027" />{" "}
                  <strong className="text-on-surface font-semibold">
                    <ContentText contentKey="footer.text-028" />
                  </strong>
                </span>
              </ContentElement>
              {contact.email && (
                <ContentElement
                  contentKey="footer.attributes-002"
                  tag="a"
                  className="hover:text-primary transition-colors flex items-center gap-2.5"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    {"mail"}
                  </span>
                  <span>
                    <ContentText contentKey="footer.text-029" />
                  </span>
                </ContentElement>
              )}
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                  {"location_on"}
                </span>
                <span>
                  <ContentText contentKey="footer.text-026" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-subtle/70 pt-5 text-sm font-medium text-on-surface">
          <p>
            <ContentText contentKey="footer.text-052" />
          </p>
        </div>
      </div>
    </footer>
  );
}
