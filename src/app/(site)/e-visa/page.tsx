import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
export default function VisaPage() {
  return (
    <PublicPage title="E-Visa">
      <PublicForm kind="evisa" />
    </PublicPage>
  );
}
