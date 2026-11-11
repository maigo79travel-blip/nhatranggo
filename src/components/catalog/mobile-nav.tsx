"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSiteData } from "@/components/content";

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
        className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-primary text-on-primary"
      >
        <span aria-hidden="true" className="material-symbols-outlined">
          {open ? "close" : "menu"}
        </span>
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Điều hướng trên điện thoại"
          className="absolute right-0 mt-2 w-56 max-h-[calc(100dvh-8rem)] overflow-y-auto bg-surface-container-lowest rounded-xl shadow-xl p-3 flex flex-col"
        >
          {items
            .filter((item) => /^(\/[^/]|\/$|https?:\/\/|#)/.test(item.href))
            .map(({ href, label }) => (
              <Link
                className="p-3 hover:bg-surface-container rounded-lg"
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
        </nav>
      )}
    </div>
  );
}
