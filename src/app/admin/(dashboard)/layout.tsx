import type { ReactNode } from "react";
import {
  canOpenAdminPage,
  getAdminPageUser,
} from "@/modules/admin/page-access";
import { adminNav } from "@/modules/admin/routes";
import { AdminShell } from "@/modules/admin/ui/admin-shell";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getAdminPageUser();
  if (!user) return children;
  const visiblePaths = adminNav
    .flatMap(({ paths }) => paths)
    .filter((href) => canOpenAdminPage(user, href));
  return (
    <AdminShell user={user} visiblePaths={visiblePaths}>
      {children}
    </AdminShell>
  );
}
