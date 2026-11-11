import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/modules/settings/public-page";
export default function VisaPage() {
  return (
    <PublicPage title="E-Visa">
      <PublicForm kind="evisa" />
    </PublicPage>
  );
}
