import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/modules/settings/public-page";
export default function FastTrackPage() {
  return (
    <PublicPage title="Fast-track sân bay">
      <PublicForm kind="fast-track" />
    </PublicPage>
  );
}
