import { notFound, redirect } from "next/navigation";
import { adminPage } from "@/modules/admin/routes";
import {
  canOpenAdminPage,
  getAdminPageUser,
} from "@/modules/admin/page-access";
import { AdminPageView } from "@/modules/admin/ui/admin-page-view";

type Props = PageProps<"/admin/[[...segments]]">;

async function path(params: Props["params"]) {
  const { segments } = await params;
  return segments ? "/admin/" + segments.join("/") : "/admin";
}

export async function generateMetadata({ params }: Props) {
  return { title: adminPage(await path(params))?.label };
}

export default async function AdminPage({ params, searchParams }: Props) {
  const href = await path(params);
  const page = adminPage(href);
  if (!page) notFound();
  const user = await getAdminPageUser();
  if (!user)
    redirect("/admin/dang-nhap?" + new URLSearchParams({ next: href }));
  if (!canOpenAdminPage(user, href)) notFound();
  const tour =
    page.resource === "departures" ? (await searchParams).tour : undefined;
  return (
    <AdminPageView
      key={href}
      href={href}
      page={page}
      user={user}
      initialTour={typeof tour === "string" ? tour.trim().slice(0, 100) : ""}
    />
  );
}
