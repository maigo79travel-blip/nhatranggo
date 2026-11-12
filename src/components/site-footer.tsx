"use client";
import { useSiteData } from "@/components/content";
import { contactInfo } from "@/lib/content-values";
import { ContentText, ContentElement } from "@/components/content";
import type { ReactNode } from "react";
export function SiteFooter({
  informationLinks,
}: {
  informationLinks: ReactNode;
}) {
  const contact = contactInfo(useSiteData().content);
  return (
    <footer
      className="w-full bg-surface-container-low text-on-surface pt-16 pb-10 shadow-footer"
      id="lien-he"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[24px]">
                  {"tsunami"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
                  <ContentText contentKey="footer.text-023" />
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase">
                  <ContentText contentKey="footer.text-024" />
                </span>
              </div>
            </div>
            <div className="font-title-md text-title-md text-on-surface mt-1">
              <ContentText contentKey="footer.text-025" />
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <span className="material-symbols-outlined text-[16px] text-primary align-middle mr-1.5">
                {"location_on"}
              </span>
              <ContentText contentKey="footer.text-026" />
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <ContentElement
                contentKey="footer.attributes-001"
                tag="a"
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  {"call"}
                </span>
                <ContentText contentKey="footer.text-027" />
                <strong className="text-on-surface font-label-lg text-label-lg">
                  <ContentText contentKey="footer.text-028" />
                </strong>
              </ContentElement>
              {contact.email && (
                <ContentElement
                  contentKey="footer.attributes-002"
                  tag="a"
                  className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    {"mail"}
                  </span>
                  <ContentText contentKey="footer.text-029" />
                </ContentElement>
              )}
              <ContentElement
                contentKey="footer.attributes-003"
                tag="a"
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  {"public"}
                </span>
                <ContentText contentKey="footer.text-030" />
              </ContentElement>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-title-md text-title-md text-on-surface">
              <ContentText contentKey="footer.text-031" />
            </h4>
            <ul className="flex flex-col gap-2.5 font-body-md text-body-md text-on-surface-variant">
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
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-title-md text-title-md text-on-surface">
              <ContentText contentKey="footer.text-038" />
            </h4>
            <ul className="flex flex-col gap-2.5 font-body-md text-body-md text-on-surface-variant">
              {informationLinks}
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-title-md text-title-md text-on-surface">
              <ContentText contentKey="footer.text-045" />
            </h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-center text-label-sm font-label-sm text-primary shadow-sm">
                <ContentText contentKey="footer.text-046" />
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-center text-label-sm font-label-sm text-sale-crimson shadow-sm">
                <ContentText contentKey="footer.text-047" />
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-center text-label-sm font-label-sm text-primary shadow-sm">
                <ContentText contentKey="footer.text-048" />
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-center text-label-sm font-label-sm text-on-surface shadow-sm">
                <ContentText contentKey="footer.text-049" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <p>
            <ContentText contentKey="footer.text-052" />
          </p>
          <div className="flex items-center gap-4 text-body-sm font-body-sm">
            <ContentElement
              contentKey="footer.attributes-017"
              tag="a"
              className="hover:text-primary transition-colors"
              data-path="dieu-khoan-su-dung"
            >
              <ContentText contentKey="footer.text-053" />
            </ContentElement>
            <ContentElement
              contentKey="footer.attributes-018"
              tag="a"
              className="hover:text-primary transition-colors"
              data-path="chinh-sach-bao-mat"
            >
              <ContentText contentKey="footer.text-054" />
            </ContentElement>
            <ContentElement
              contentKey="footer.attributes-019"
              tag="a"
              className="hover:text-primary transition-colors"
              data-path="lien-he"
            >
              <ContentText contentKey="footer.text-055" />
            </ContentElement>
          </div>
        </div>
      </div>
    </footer>
  );
}
