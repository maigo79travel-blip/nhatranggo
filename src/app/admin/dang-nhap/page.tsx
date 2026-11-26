import { redirect } from "next/navigation";
import { adminPage } from "@/modules/admin/routes";
import {
  canOpenAdminPage,
  getAdminPageUser,
} from "@/modules/admin/page-access";
import { Login } from "@/modules/admin/ui/panels/login-form";

export const metadata = { title: "Đăng nhập" };

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/dang-nhap">) {
  const { next } = await searchParams;
  const requested =
    typeof next === "string" && adminPage(next) ? next : "/admin";
  const user = await getAdminPageUser();
  if (user) redirect(canOpenAdminPage(user, requested) ? requested : "/admin");
  return <Login />;
}
