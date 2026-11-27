import { getPublicPageCopy } from "@/lib/public-page-copy";
import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
import { getCurrentMessages } from "@/lib/i18n";

export default async function VisaPage() {
  const t = await getCurrentMessages();
  const copy = await getPublicPageCopy("evisa", t.pages.evisaTitle);
  return (
    <PublicPage {...copy}>
      <PublicForm kind="evisa" />
    </PublicPage>
  );
}
