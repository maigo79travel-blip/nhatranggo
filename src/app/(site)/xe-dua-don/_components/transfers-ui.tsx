"use client";

import type { ReactNode } from "react";
import { ContentLink, ContentText, useContent } from "@/components/content";

export function TransferIcon({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined shrink-0 ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function TransferHeading({
  eyebrow,
  titleKey,
  accent,
  children,
  centered = false,
  underline = false,
  className = "",
}: {
  eyebrow: string;
  titleKey: string;
  accent: string;
  children?: ReactNode;
  centered?: boolean;
  underline?: boolean;
  className?: string;
}) {
  const value = useContent(titleKey);
  const heading = typeof value === "string" ? value.trim() : "";
  const usesAccent = heading.endsWith(accent);

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <p className="text-sm font-bold uppercase text-primary sm:text-base">
        <ContentText contentKey={eyebrow} />
      </p>
      <h2 className="transfer-title mt-3 font-extrabold tracking-tight">
        {usesAccent ? (
          <>
            {heading.slice(0, -accent.length).trimEnd()}{" "}
            <span className={`transfer-accent ${centered ? "block" : ""}`}>
              {accent}
            </span>
          </>
        ) : (
          heading
        )}
      </h2>
      {underline && (
        <div
          aria-hidden="true"
          className={`mt-3 h-1 rounded-full bg-primary ${centered ? "mx-auto w-[150px]" : "w-[60px]"}`}
        />
      )}
      {children}
    </div>
  );
}

export function TransferCallout({
  title,
  children,
  actions,
  className = "",
}: {
  title: ReactNode;
  children: ReactNode;
  actions: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={`flex flex-col items-start justify-between gap-5 rounded-[22px] bg-primary px-6 py-5 text-on-primary lg:flex-row lg:items-center ${className}`}
    >
      <div>
        <h3 className="text-xl font-bold leading-snug sm:text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">{children}</p>
      </div>
      <div className="flex flex-wrap gap-3 lg:shrink-0">{actions}</div>
    </aside>
  );
}

export function TransferZaloLink({
  contentKey = "transfers.attributes-009",
  children,
}: {
  contentKey?: string;
  children: ReactNode;
}) {
  return (
    <ContentLink
      contentKey={contentKey}
      target="_blank"
      rel="noopener"
      className="transfer-pill transfer-pill-white"
    >
      {children}
      <TransferIcon className="text-xl">arrow_forward</TransferIcon>
    </ContentLink>
  );
}
