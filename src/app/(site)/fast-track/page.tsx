import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
export default function FastTrackPage() {
  return (
    <PublicPage title="Fast-track sân bay">
      <PublicForm kind="fast-track" />
    </PublicPage>
  );
}
