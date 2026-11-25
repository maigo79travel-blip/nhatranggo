"use client";
import { ContentText, ContentLink, useSiteData } from "@/components/content";
import Link from "next/link";
import type { ReactNode } from "react";
import { LanguageSelector } from "./language-selector";
import { MobileNav } from "./mobile-nav";
import { isLegacyServiceHref } from "@/modules/travel/service-routes";

import { usePathname, useSearchParams } from "next/navigation";
import brand from "@/config/brand.json";
import { contentImageUrl } from "@/lib/content-values";
import { activeNavigationHref, navigationItems } from "@/lib/navigation";
function HeaderNavLink({
  children,
  href,
  active,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative flex min-h-11 flex-col items-center justify-center px-2 py-2 font-label-lg text-label-lg font-bold transition-colors action-link 2xl:px-3 ${
        active ? "text-on-surface" : "text-on-surface/85 hover:text-primary"
      }`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`mt-1 h-[4px] rounded-full transition-all duration-200 ${
          active ? "w-12 bg-primary" : "w-1.5 bg-primary group-hover:w-6"
        }`}
      />
    </Link>
  );
}
export function SiteHeader() {
  const { content } = useSiteData();
  const pathname = usePathname();
  const search = useSearchParams();
  const navigation = navigationItems(content["site.navigation"]?.value).filter(
    ({ href }) => !isLegacyServiceHref(href),
  );
  const contactLink = navigation.find((item) => item.href === "/lien-he");
  const activeHref = activeNavigationHref(
    [...navigation, { href: "/lien-he" }],
    pathname,
    search,
  );
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-header border-b border-border-subtle/70">
      <div className="h-[76px] site-container flex items-center justify-between gap-4">
        <ContentLink
          contentKey="header.attributes-004"
          className="flex items-center gap-3 shrink-0"
          data-path="trang-chu"
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-surface-muted flex items-center justify-center">
            <img
              src={contentImageUrl(
                content["site.logo"]?.value,
                "/images/figma/logo-mark.png",
              )}
              alt={brand.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-headline-sm text-[20px] font-extrabold text-on-surface tracking-tight uppercase">
              <ContentText contentKey="header.text-021" />
              <ContentText contentKey="header.text-022" />
            </span>
            <span className="font-label-sm text-[11px] font-normal text-on-surface-variant tracking-wider uppercase">
              <ContentText contentKey="header.text-023" />
            </span>
          </div>
        </ContentLink>
        <nav
          aria-label="Điều hướng chính"
          className="hidden xl:flex shrink-0 items-center gap-1 whitespace-nowrap"
        >
          {navigation
            .filter((item) => item.href !== "/lien-he")
            .map((item) => (
              <HeaderNavLink
                key={item.href}
                href={item.href}
                active={item.href === activeHref}
              >
                {item.label}
              </HeaderNavLink>
            ))}
        </nav>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/tra-cuu"
            className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-tinted font-label-md text-label-md transition-colors action-link"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              aria-hidden="true"
            >
              search
            </span>
            <span>Tra cứu</span>
          </Link>
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <Link
            href="/lien-he"
            aria-current={activeHref === "/lien-he" ? "page" : undefined}
            className="hidden min-h-11 items-center justify-center rounded-full border border-brand-light px-5 font-label-lg text-label-lg font-bold text-on-surface transition-colors hover:border-primary hover:bg-surface-muted sm:inline-flex"
          >
            {contactLink?.label || "Liên hệ"}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
