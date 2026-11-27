import Link from "next/link";
import type { AdminUser } from "@/lib/types";
import { canAccess } from "../permissions";
import { adminContentHref, adminPage, scopedContent } from "../routes";
import { Icon } from "./primitives/admin-icon";
import { AdminPageHeading } from "./primitives/admin-page-heading";
import {
  AdminAccount,
  AdminBookings,
  AdminOverview,
} from "./panels/operations";
import { CatalogAdminPanel } from "./panels/catalog-admin-panel";
import { ModulePanel } from "./module-panel";

const scopedRelated = {
  home: ["/admin/khach-san", "/admin/tour", "/admin/combo"],
  hotels: ["/admin/khach-san"],
  tours: ["/admin/tour", "/admin/combo"],
  transfers: ["/admin/xe-dua-don"],
  evisa: ["/admin/e-visa"],
  contact: ["/admin/lien-he"],
  lookup: ["/admin/dat-cho"],
  blog: ["/admin/bai-viet"],
  shared: ["/admin/trang-thong-tin"],
};

export function AdminPageView({
  href,
  page,
  user,
}: {
  href: string;
  page: NonNullable<ReturnType<typeof adminPage>>;
  user: AdminUser;
}) {
  const { resource, label, description, scope, product } = page;
  const related = [
    ...(scope
      ? ["/admin/noi-dung", ...scopedRelated[scope]]
      : (page.related ?? [])),
  ].flatMap((href) => {
    const target = adminPage(href);
    return target && canAccess(user, target.resource) ? [{ href, target }] : [];
  });

  if (resource === "overview")
    return (
      <AdminOverview
        canManageBookings={canAccess(user, "bookings")}
        canManageProducts={canAccess(user, "products")}
      />
    );
  if (resource === "bookings")
    return <AdminBookings description={description} />;
  if (resource === "account") return <AdminAccount user={user} />;
  if (resource === "content" && !scope)
    return (
      <>
        <AdminPageHeading title={label} description={description} />
        <div className="ad-content-directory">
          {scopedContent.map(([scope, entry]) => (
            <Link
              className="ad-panel ad-content-destination"
              key={scope}
              href={adminContentHref(scope)}
              prefetch={false}
            >
              <span className="ad-heading-icon">
                <Icon name={entry.icon} />
              </span>
              <strong>{entry.label}</strong>
              <Icon name="chevron_right" />
            </Link>
          ))}
        </div>
      </>
    );
  return (
    <>
      {related.length > 0 && (
        <nav aria-label="Mục liên quan" className="ad-related-links">
          {related.map(({ href: targetHref, target }) => (
            <Link
              key={targetHref}
              href={targetHref}
              prefetch={false}
              className="ad-related-link"
            >
              <Icon
                name={
                  targetHref === "/admin/noi-dung" ? "arrow_back" : target.icon
                }
              />
              {target.scope ? "Nội dung trang" : target.label}
            </Link>
          ))}
        </nav>
      )}
      {resource === "products" ||
      resource === "content" ||
      resource === "fares" ? (
        <CatalogAdminPanel
          resource={resource}
          title={scope ? `Nội dung ${label}` : label}
          description={description}
          product={product}
          scope={scope}
        />
      ) : (
        <>
          <AdminPageHeading title={label} description={description} />
          <ModulePanel key={href} resource={resource} />
        </>
      )}
    </>
  );
}
