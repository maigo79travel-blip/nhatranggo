"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSiteData } from "@/components/content";
import { LanguageSelector } from "@/modules/settings/language-selector";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const items =
    (useSiteData().content["site.mobile-navigation"]?.value as {
      href: string;
      label: string;
    }[]) || [];

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
        aria-label={open ? "Đóng menu" : "Mở menu"}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border-light bg-surface-container-low text-on-surface hover:border-primary transition-colors"
      >
        <span aria-hidden="true" className="material-symbols-outlined">
          {open ? "close" : "menu"}
        </span>
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Điều hướng trên điện thoại"
          className="absolute right-0 mt-2 w-60 max-h-[calc(100dvh-6rem)] overflow-y-auto bg-surface-container-lowest border border-border-light rounded-2xl shadow-floating p-3 flex flex-col gap-1"
        >
          {items
            .filter((item) => /^(\/[^/]|\/$|https?:\/\/|#)/.test(item.href))
            .map(({ href, label }) => (
              <Link
                className={`p-3 rounded-xl font-label-lg text-label-lg transition-colors ${
                  pathname === href
                    ? "bg-surface-container text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          {!items.some((item) => item.href === "/tra-cuu") && (
            <Link
              className="p-3 rounded-xl text-on-surface hover:bg-surface-container-low font-label-lg text-label-lg flex items-center gap-2 border-t border-border-light mt-1 pt-3"
              href="/tra-cuu"
              onClick={() => setOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">
                search
              </span>
              <span>Tra cứu</span>
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
