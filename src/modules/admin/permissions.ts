import type { AdminUser } from "@/lib/types";
import { resources } from "./resources";
export function canAccess(user: AdminUser, resource: string) {
  if (user.role === "super_admin") return true;
  if (resource === "account" || resource === "overview") return true;
  if (resource === "bookings" || resource === "booking-export")
    return user.role === "booking";
  if (["products", "fares", "content"].includes(resource))
    return user.role === "editor";
  return (
    Object.hasOwn(resources, resource) &&
    resources[resource].roles.includes(user.role)
  );
}
