import type { ReactNode } from "react";
import { ContentText } from "@/components/content";
import { HomeLink } from "./home-link";

export function HomeHeading({
  contentKey,
  children,
}: {
  contentKey: string;
  children?: ReactNode;
}) {
  return (
    <div className="home-heading mb-6 flex flex-wrap items-start justify-between gap-x-5 gap-y-3 lg:mb-8">
      <div>
        <h2 className="text-[clamp(1.5rem,3.1vw,2.5rem)] font-extrabold leading-[1.2] tracking-tight text-on-surface">
          <ContentText contentKey={contentKey} />
        </h2>
        <div
          aria-hidden="true"
          className="mt-2 h-1 w-[60px] rounded-full bg-primary"
        />
      </div>
      {children}
    </div>
  );
}

export function HomeSectionLink({
  contentKey,
  href,
  children,
}: {
  contentKey?: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <HomeLink
      contentKey={contentKey}
      href={href}
      className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-primary lg:text-base"
    >
      <span className="underline-offset-4 group-hover:underline">
        {children}
      </span>
      <span
        className="material-symbols-outlined text-[22px] transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        arrow_forward
      </span>
    </HomeLink>
  );
}
