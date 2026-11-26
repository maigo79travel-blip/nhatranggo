import "server-only";
import { cache } from "react";
import type { AdminUser } from "@/lib/types";
import { adminUser } from "./auth";
import { canAccess } from "./permissions";
import { adminPage } from "./routes";

export const getAdminPageUser = cache(adminUser);

export function canOpenAdminPage(user: AdminUser, href: string) {
  const page = adminPage(href);
  return Boolean(page && canAccess(user, page.resource));
}
