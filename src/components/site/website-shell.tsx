"use client";
import { useEffect, type ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { FloatingContacts } from "@/modules/support/floating-contacts";
export function WebsiteShell({
  children,
  informationLinks,
}: {
  children: ReactNode;
  informationLinks: ReactNode;
}) {
  useEffect(() => {
    document.body.dataset.hydrated = "true";
    return () => {
      delete document.body.dataset.hydrated;
    };
  }, []);

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter informationLinks={informationLinks} />
      <FloatingContacts />
    </>
  );
}
