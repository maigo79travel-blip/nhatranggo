"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  activeNavigationHref,
  localizedNavLabel,
  navigationItems,
} from "@/lib/navigation";
import Link from "next/link";
import { useSiteData, useT } from "@/components/content";
import { LanguageSelector } from "./language-selector";
import {
  isLegacyServiceHref,
  serviceRoutes,
} from "@/modules/travel/service-routes";

const categoryLinks = [
  { href: serviceRoutes.hotel, label: "Khách sạn & Resort" },
  { href: serviceRoutes.tour, label: "Tour hằng ngày" },
  { href: serviceRoutes.transfer, label: "Xe đưa đón" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { content, locale } = useSiteData();
  const t = useT();
  const search = useSearchParams();
  const savedItems = navigationItems(content["site.mobile-navigation"]?.value);
  const firstLegacyItem = savedItems.findIndex((item) =>
    isLegacyServiceHref(item.href),
  );
  const missingCategories = categoryLinks.filter(
    ({ href }) => !savedItems.some((item) => item.href === href),
  );
  const items = savedItems.flatMap((item, index) =>
    isLegacyServiceHref(item.href)
      ? index === firstLegacyItem
        ? missingCategories
        : []
      : [item],
  );

  const activeHref = activeNavigationHref(items, pathname, search);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div ref={ref} className="xl:hidden relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? t.nav.mobileMenuClose : t.nav.mobileMenuOpen}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border-subtle bg-surface-muted text-on-surface hover:border-primary transition-colors"
      >
        <span aria-hidden="true" className="material-symbols-outlined">
          {open ? "close" : "menu"}
        </span>
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label={t.nav.mobileNavLabel}
          className="absolute right-0 mt-2 w-60 max-h-[calc(100dvh-6rem)] overflow-y-auto bg-surface border border-border-subtle rounded-2xl shadow-floating p-3 flex flex-col gap-1"
        >
          {items.map(({ href, label }) => (
            <Link
              className={`p-3 rounded-xl font-label-lg text-label-lg transition-colors ${
                activeHref === href
                  ? "bg-surface-tinted text-primary font-bold"
                  : "text-on-surface hover:bg-surface-muted"
              }`}
              key={href}
              href={href}
              aria-current={activeHref === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {localizedNavLabel(href, label, locale, t.nav)}
            </Link>
          ))}
          {!items.some((item) => item.href === "/tra-cuu") && (
            <Link
              className="p-3 rounded-xl text-on-surface hover:bg-surface-muted font-label-lg text-label-lg flex items-center gap-2 border-t border-border-subtle mt-1 pt-3"
              href="/tra-cuu"
              onClick={() => setOpen(false)}
            >
              <span
                className="material-symbols-outlined text-[18px] text-primary"
                aria-hidden="true"
              >
                search
              </span>
              <span>{t.nav.lookup}</span>
            </Link>
          )}
          <div className="sm:hidden px-3 pt-2">
            <LanguageSelector id="mobile-site-language" />
          </div>
        </nav>
      )}
    </div>
  );
}
