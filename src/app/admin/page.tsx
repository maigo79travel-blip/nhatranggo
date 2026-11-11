import { SiteDataProvider } from "@/components/content";
import { getSiteData } from "@/lib/catalog";
import { adminUser } from "@/lib/admin-auth";
import { AdminWorkspace } from "@/components/admin/workspace";
export default async function AdminPage() {
  const user = await adminUser();
  if (!user) return <AdminWorkspace user={null} />;
  const data = await getSiteData();
  return (
    <SiteDataProvider data={data}>
      <AdminWorkspace user={user} />
    </SiteDataProvider>
  );
}
