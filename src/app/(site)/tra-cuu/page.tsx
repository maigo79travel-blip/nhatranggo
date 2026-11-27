import { getPublicPageCopy } from "@/lib/public-page-copy";
import { BookingLookup } from "@/modules/support/lookup";
import { PublicPage } from "@/components/site/public-page";
import { getCurrentMessages } from "@/lib/i18n";

export default async function LookupPage() {
  const t = await getCurrentMessages();
  const copy = await getPublicPageCopy("lookup", t.pages.lookupTitle);
  return (
    <PublicPage {...copy}>
      <BookingLookup />
    </PublicPage>
  );
}
