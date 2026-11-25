"use client";
import { useSiteData } from "@/components/content";
import { contactInfo } from "@/lib/content-values";
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
export function SiteFooter({
  informationLinks,
}: {
  informationLinks: ReactNode;
}) {
  const contact = contactInfo(useSiteData().content);
  return (
    <footer
      className="w-full bg-background text-on-surface pt-8 pb-24 md:pb-6"
      id="lien-he"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-surface-muted flex items-center justify-center">
                <img
                  src="/images/figma/logo-mark.png"
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-headline-sm text-base font-extrabold text-on-surface tracking-tight uppercase">
                  <ContentText contentKey="footer.text-023" />
                </span>
                <span className="font-label-sm text-xs text-on-surface-variant uppercase">
                  <ContentText contentKey="footer.text-024" />
                </span>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed max-w-xs">
              <ContentText contentKey="footer.text-025" />
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks
                .filter(({ key }) => /^https:\/\//i.test(contact[key] || ""))
                .map((item) => (
                  <a
                    key={item.label}
                    href={contact[item.key]}
                    aria-label={item.label}
                    className="grid h-11 w-11 place-items-center rounded-lg transition-colors hover:bg-surface-muted"
                  >
                    <img src={item.icon} alt="" className="w-5 h-5" />
                  </a>
                ))}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-title-md text-sm font-extrabold text-on-surface">
              <ContentText contentKey="footer.text-031" />
            </h4>
            <ul className="flex flex-col gap-2.5 font-body-md text-sm text-on-surface-variant">
              <li>
                <ContentElement
                  contentKey="footer.attributes-004"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="khach-san"
                >
                  <ContentText contentKey="footer.text-032" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-005"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="khach-san"
                >
                  <ContentText contentKey="footer.text-033" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-006"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="tour-hang-ngay"
                >
                  <ContentText contentKey="footer.text-034" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-007"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="combo-tron-goi"
                >
                  <ContentText contentKey="footer.text-035" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-008"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="dich-vu-ve"
                >
                  <ContentText contentKey="footer.text-036" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-009"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="dich-vu-ve"
                >
                  <ContentText contentKey="footer.text-037" />
                </ContentElement>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-title-md text-sm font-extrabold text-on-surface">
              <ContentText contentKey="footer.text-038" />
            </h4>
            <ul className="flex flex-col gap-2.5 font-body-md text-sm text-on-surface-variant">
              {informationLinks}
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-title-md text-sm font-extrabold text-on-surface">
              Liên hệ
            </h4>
            <div className="flex flex-col gap-3 font-body-md text-sm text-on-surface-variant">
              <ContentElement
                contentKey="footer.attributes-001"
                tag="a"
                className="hover:text-primary transition-colors flex items-center gap-2.5"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">
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
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {"mail"}
                  </span>
                  <span>
                    <ContentText contentKey="footer.text-029" />
                  </span>
                </ContentElement>
              )}
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
                  {"location_on"}
                </span>
                <span>
                  <ContentText contentKey="footer.text-026" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="font-body-sm text-sm text-on-surface">
          <p className="font-medium">
            <ContentText contentKey="footer.text-052" />
          </p>
        </div>
      </div>
    </footer>
  );
}
