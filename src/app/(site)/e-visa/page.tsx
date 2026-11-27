import { getPublicPageCopy } from "@/lib/public-page-copy";
import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
import { PublicIcon } from "@/components/site/public-ui";
import { getCurrentMessages } from "@/lib/i18n";
import "./visa.css";

export default async function VisaPage() {
  const t = await getCurrentMessages();
  const copy = await getPublicPageCopy("evisa", t.pages.evisaTitle);
  return (
    <PublicPage
      {...copy}
      className="visa-page"
      hero={{
        image: "/images/figma/transfers/airport.webp",
        actions: (
          <a href="#yeu-cau-e-visa" className="public-primary-button">
            {t.support.visaAction}
            <PublicIcon name="arrow_downward" className="text-lg" />
          </a>
        ),
      }}
    >
      <div
        className="relative -mt-16 sm:-mt-20"
        id="yeu-cau-e-visa"
        tabIndex={-1}
      >
        <PublicForm kind="evisa" />
      </div>
    </PublicPage>
  );
}
