import { getPublicPageCopy } from "@/lib/public-page-copy";
import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
export default async function FastTrackPage() {
  const copy = await getPublicPageCopy("fast-track", "Fast-track sân bay");
  return (
    <PublicPage {...copy}>
      <PublicForm kind="fast-track" />
    </PublicPage>
  );
}
