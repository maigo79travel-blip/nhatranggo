"use client";
import {
  ContentText,
  ContentElement,
  ContentLink,
  useSiteData,
} from "@/components/content";
import Link from "next/link";
import type { ReactNode } from "react";
import { LanguageSelector } from "@/modules/settings/language-selector";
import { MobileNav } from "./catalog/mobile-nav";

import { usePathname } from "next/navigation";
function HeaderNavLink({
  children,
  href,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = href === pathname;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`px-3.5 py-2 rounded-full font-label-lg text-label-lg transition-colors action-link ${active ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"}`}
    >
      {children}
    </Link>
  );
}
export function SiteHeader() {
  const { content } = useSiteData();
  const navigation = content["site.navigation"]?.value as
    { href: string; label: string }[] | undefined;
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
            <Link href="/tra-cuu" className="hover:underline text-body-sm">
              Tra cứu
            </Link>
            <LanguageSelector />
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl">
        <div className="h-20 site-container flex items-center justify-between gap-3">
          <ContentLink
            contentKey="header.attributes-004"
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
          </ContentLink>
          <nav
            aria-label="Điều hướng chính"
            className="hidden xl:flex shrink-0 items-center gap-0 whitespace-nowrap [&>a]:px-2.5 [&>a]:text-[13px]"
          >
            {(navigation || [])
              .filter((item) => /^(\/[^/]|\/$|https?:\/\/|#)/.test(item.href))
              .map((item) => (
                <HeaderNavLink key={item.href} href={item.href}>
                  {item.label}
                </HeaderNavLink>
              ))}
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
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
