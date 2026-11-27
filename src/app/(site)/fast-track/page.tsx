import { getPublicPageCopy } from "@/lib/public-page-copy";
import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
import { getCurrentMessages } from "@/lib/i18n";

export default async function FastTrackPage() {
  const t = await getCurrentMessages();
  const copy = await getPublicPageCopy("fast-track", t.pages.fastTrackTitle);
  return (
    <PublicPage {...copy}>
      <PublicForm kind="fast-track" />
    </PublicPage>
  );
}
