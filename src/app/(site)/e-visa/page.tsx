import { getPublicPageCopy } from "@/lib/public-page-copy";
import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
export default async function VisaPage() {
  const copy = await getPublicPageCopy("evisa", "E-Visa");
  return (
    <PublicPage {...copy}>
      <PublicForm kind="evisa" />
    </PublicPage>
  );
}
