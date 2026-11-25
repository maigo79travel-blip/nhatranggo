"use client";
import {
  ContentText,
  ContentElement,
  ContentLink,
  useSiteData,
} from "@/components/content";
import Link from "next/link";
import type { ReactNode } from "react";
import { LanguageSelector } from "./language-selector";
import { MobileNav } from "./mobile-nav";

import { usePathname } from "next/navigation";
import brand from "@/config/brand.json";
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
      className={`group relative flex flex-col items-center px-3 py-2 font-label-lg text-label-lg font-bold transition-colors action-link ${
        active ? "text-on-surface" : "text-on-surface/85 hover:text-primary"
      }`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`mt-1 h-[4px] rounded-full transition-all duration-200 ${
          active
            ? "w-10 bg-primary"
            : "w-2 bg-transparent group-hover:w-6 group-hover:bg-primary/40"
        }`}
      />
    </Link>
  );
}
export function SiteHeader() {
  const { content } = useSiteData();
  const navigation = content["site.navigation"]?.value as
    { href: string; label: string }[] | undefined;
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-header border-b border-border-light/70">
      <div className="h-[76px] site-container flex items-center justify-between gap-4">
        <ContentLink
          contentKey="header.attributes-004"
          className="flex items-center gap-3 shrink-0"
          data-path="trang-chu"
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-surface-container-low flex items-center justify-center">
            <img
              src="/images/figma/logo-mark.png"
              alt={brand.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-headline-sm text-[20px] font-extrabold text-on-surface tracking-tight uppercase">
              <ContentText contentKey="header.text-021" />
              <ContentText contentKey="header.text-022" />
            </span>
            <span className="font-label-sm text-[11px] font-normal text-outline tracking-wider uppercase">
              <ContentText contentKey="header.text-023" />
            </span>
          </div>
        </ContentLink>
        <nav
          aria-label="Điều hướng chính"
          className="hidden xl:flex shrink-0 items-center gap-1 whitespace-nowrap"
        >
          {(navigation || [])
            .filter((item) => /^(\/[^/]|\/$|https?:\/\/|#)/.test(item.href))
            .map((item) => (
              <HeaderNavLink key={item.href} href={item.href}>
                {item.label}
              </HeaderNavLink>
            ))}
        </nav>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/tra-cuu"
            className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container font-label-md text-label-md transition-colors action-link"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              search
            </span>
            <span>Tra cứu</span>
          </Link>
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <ContentElement
            contentKey="header.attributes-012"
            tag="a"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-surface-container-lowest border border-secondary-fixed-dim text-on-surface hover:border-primary hover:bg-surface-container-low font-label-lg text-label-lg font-bold transition-all duration-200 action-link"
            rel="noopener"
            target="_blank"
          >
            <span>
              <ContentText contentKey="header.text-031" />
            </span>
          </ContentElement>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
