"use client";
import { useState } from "react";
import { useSiteData } from "@/components/content";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const items =
    (useSiteData().content["site.mobile-navigation"]?.value as {
      href: string;
      label: string;
    }[]) || [];

  return (
    <div className="xl:hidden fixed top-[85px] right-3 z-[60]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Mở menu"
        className="rounded-lg bg-primary text-white p-1 leading-none"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      {open && (
        <nav className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl p-3 flex flex-col">
          {items
            .filter((item) => /^(\/[^/]|\/$|https?:\/\/|#)/.test(item.href))
            .map(({ href, label }) => (
              <a
                className="p-3 hover:bg-surface-container rounded-lg"
                key={href}
                href={href}
              >
                {label}
              </a>
            ))}
        </nav>
      )}
    </div>
  );
}
