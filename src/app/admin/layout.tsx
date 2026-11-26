import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/modules/admin/ui/admin.css";

export const metadata: Metadata = {
  title: { default: "Quản trị NhaTrangGo", template: "%s | NhaTrangGo Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
