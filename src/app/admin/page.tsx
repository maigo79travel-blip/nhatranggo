import { SiteDataProvider } from "@/components/content";
import { getSiteData } from "@/lib/catalog";
import { adminUser } from "@/modules/admin/auth";
import { AdminWorkspace } from "@/modules/admin/ui/workspace";
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
