import { adminUser } from "@/lib/admin-auth";
import { AdminDashboard } from "@/components/admin/dashboard";
export default async function AdminPage() {
  const user = await adminUser();
  return <AdminDashboard user={user} />;
}
