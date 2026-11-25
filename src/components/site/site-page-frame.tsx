import type { ReactNode } from "react";

export function SitePageFrame({ children }: { children: ReactNode }) {
  return (
    <main className="w-full pt-[76px] min-h-screen bg-background">
      <div className="flex flex-col w-full">{children}</div>
    </main>
  );
}
