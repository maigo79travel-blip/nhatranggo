import { getPublicPageCopy } from "@/lib/public-page-copy";
import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
import { PublicIcon } from "@/components/site/public-ui";
import "./visa.css";

export default async function VisaPage() {
  const copy = await getPublicPageCopy("evisa", "E-Visa");
  return (
    <PublicPage
      {...copy}
      className="visa-page"
      hero={{
        image: "/images/figma/transfers/airport.webp",
        actions: (
          <a href="#yeu-cau-e-visa" className="public-primary-button">
            Gửi yêu cầu tư vấn
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
