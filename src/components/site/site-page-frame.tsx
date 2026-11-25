import type { ReactNode } from "react";

export function SitePageFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`w-full pt-[76px] min-h-screen bg-background ${className}`}
    >
      <div className="flex flex-col w-full">{children}</div>
    </main>
  );
}
