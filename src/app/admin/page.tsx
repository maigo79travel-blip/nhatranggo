import { SiteDataProvider } from "@/components/content";
import { getSiteContent } from "@/lib/catalog";
import { adminUser } from "@/modules/admin/auth";
import { AdminWorkspace } from "@/modules/admin/ui/workspace";
export default async function AdminPage() {
  const user = await adminUser();
  if (!user) return <AdminWorkspace user={null} />;
  const content = await getSiteContent("transfers");
  return (
    <SiteDataProvider data={{ content }}>
      <AdminWorkspace user={user} />
    </SiteDataProvider>
  );
}
