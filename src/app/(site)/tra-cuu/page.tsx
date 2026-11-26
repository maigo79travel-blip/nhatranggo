import { getPublicPageCopy } from "@/lib/public-page-copy";
import { BookingLookup } from "@/modules/support/lookup";
import { PublicPage } from "@/components/site/public-page";
export default async function LookupPage() {
  const copy = await getPublicPageCopy("lookup", "Tra cứu booking");
  return (
    <PublicPage {...copy}>
      <BookingLookup />
    </PublicPage>
  );
}
