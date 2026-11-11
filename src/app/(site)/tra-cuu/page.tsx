import { BookingLookup } from "@/modules/support/lookup";
import { PublicPage } from "@/modules/settings/public-page";
export default function LookupPage() {
  return (
    <PublicPage title="Tra cứu booking">
      <BookingLookup />
    </PublicPage>
  );
}
