"use client";
import { ContentText, ContentElement } from "@/components/content";

import { usePathname } from "next/navigation";
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-header">
      <div className="bg-primary text-on-primary text-body-sm font-body-sm">
        <div className="site-container h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <ContentElement
              contentKey="header.attributes-001"
              tag="a"
              className="flex items-center gap-1.5 hover:text-ocean-light transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">
                {"call"}
              </span>
              <span>
                <ContentText contentKey="header.text-014" />
                <strong className="font-label-md text-label-md">
                  <ContentText contentKey="header.text-015" />
                </strong>
              </span>
            </ContentElement>
            <ContentElement
              contentKey="header.attributes-002"
              tag="a"
              className="hidden sm:flex items-center gap-1.5 hover:text-ocean-light transition-colors"

              rel="noopener"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[15px]">
                {"support_agent"}
              </span>
              <span>
                <ContentText contentKey="header.text-016" />
              </span>
            </ContentElement>
          </div>
          <div className="flex items-center gap-5">
            <ContentElement
              contentKey="header.attributes-003"
              tag="a"
              className="flex items-center gap-1.5 hover:text-ocean-light transition-colors"
              data-path="danh-sach-yeu-thich"
            >
              <span className="material-symbols-outlined text-[15px] text-gold-amber">
                {"favorite"}
              </span>
              <span className="hidden md:inline">
                <ContentText contentKey="header.text-017" />
              </span>
            </ContentElement>
            <div className="flex items-center gap-1.5 bg-primary-container/40 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">
                {"language"}
              </span>
              <button
                className="font-label-sm text-label-sm uppercase hover:text-ocean-light transition-colors"
                type="button"
              >
                <ContentText contentKey="header.text-018" />
              </button>
              <span className="opacity-40 text-label-sm">
                <ContentText contentKey="header.text-019" />
              </span>
              <button
                className="font-label-sm text-label-sm uppercase text-on-primary/70 hover:text-on-primary transition-colors"
                type="button"
              >
                <ContentText contentKey="header.text-020" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl">
        <div className="h-20 site-container flex items-center justify-between gap-3">
          <ContentElement
            contentKey="header.attributes-004"
            tag="a"
            className="flex items-center gap-3 shrink-0"
            data-path="trang-chu"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-on-primary shadow-md">
              <span className="material-symbols-outlined text-[26px]">
                {"tsunami"}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
                <ContentText contentKey="header.text-021" />
                <span className="text-secondary">
                  <ContentText contentKey="header.text-022" />
                </span>
              </span>
              <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">
                <ContentText contentKey="header.text-023" />
              </span>
            </div>
          </ContentElement>
          <nav
            data-current={pathname}
            className="hidden xl:flex shrink-0 items-center gap-0 whitespace-nowrap [&>a]:px-2.5 [&>a]:text-[13px]"
            data-active-classes="bg-primary text-on-primary font-bold rounded-full shadow-sm"
          >
            <ContentElement
              contentKey="header.attributes-005"
              tag="a"
              className="px-3.5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all action-link"
              data-path="trang-chu"
            >
              <ContentText contentKey="header.text-024" />
            </ContentElement>
            <ContentElement
              contentKey="header.attributes-006"
              tag="a"
              className="px-3.5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all action-link"
              data-path="khach-san"
            >
              <ContentText contentKey="header.text-025" />
            </ContentElement>
            <ContentElement
              contentKey="header.attributes-007"
              tag="a"
              className="px-3.5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all action-link"
              data-path="tour-hang-ngay"
            >
              <ContentText contentKey="header.text-026" />
            </ContentElement>
            <ContentElement
              contentKey="header.attributes-008"
              tag="a"
              className="px-3.5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all action-link"
              data-path="combo-tron-goi"
            >
              <ContentText contentKey="header.text-027" />
            </ContentElement>
            <ContentElement
              contentKey="header.attributes-009"
              tag="a"
              className="px-3.5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all action-link"
              data-path="xe-dua-don"
            >
              <ContentText contentKey="header.text-028" />
            </ContentElement>
            <ContentElement
              contentKey="header.attributes-010"
              tag="a"
              className="px-3.5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all action-link"
              data-path="cam-nang-du-lich"
            >
              <ContentText contentKey="header.text-029" />
            </ContentElement>
            <ContentElement
              contentKey="header.attributes-011"
              tag="a"
              className="px-3.5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all action-link"
              data-path="lien-he"
            >
              <ContentText contentKey="header.text-030" />
            </ContentElement>
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <ContentElement
              contentKey="header.attributes-012"
              tag="a"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-ocean-deep text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 action-link"
              rel="noopener"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">
                {"chat"}
              </span>
              <span>
                <ContentText contentKey="header.text-031" />
              </span>
            </ContentElement>
          </div>
        </div>
      </div>
    </header>
  );
}
