import { getPublicPageCopy } from "@/lib/public-page-copy";
import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
import { PublicIcon } from "@/components/site/public-ui";
import { getCurrentMessages, getMessages, getPublicLocale } from "@/lib/i18n";
import { getFastTrackRates } from "@/modules/support/service";
import { fastTrackPricingCopy } from "@/modules/support/fast-track-pricing-copy";
import { FastTrackPricing, fastTrackPricingId } from "./pricing";
import "./fast-track.css";

async function fastTrackCopy() {
  const t = await getCurrentMessages();
  const copy = await getPublicPageCopy("fast-track", t.pages.fastTrackTitle);
  const title =
    copy.title === getMessages("vi").pages.fastTrackTitle
      ? t.pages.fastTrackTitle
      : copy.title;
  return { ...copy, title, actionLabel: t.support.fastTrackAction };
}

export async function generateMetadata() {
  const { title, intro } = await fastTrackCopy();
  return { title, ...(intro ? { description: intro } : {}) };
}

export default async function FastTrackPage() {
  const [{ actionLabel, ...copy }, rates, locale] = await Promise.all([
    fastTrackCopy(),
    getFastTrackRates(),
    getPublicLocale(),
  ]);
  return (
    <PublicPage
      {...copy}
      className="fast-track-page"
      hero={{
        image: "/images/figma/transfers/airport.webp",
        actions: (
          <div className="flex flex-wrap gap-3">
            {rates && (
              <a
                href={`#${fastTrackPricingId}`}
                className="public-contact-link"
              >
                <PublicIcon name="price_check" className="text-xl" />
                {fastTrackPricingCopy[locale].viewRates}
              </a>
            )}
            <a href="#yeu-cau-fast-track" className="public-primary-button">
              {actionLabel}
              <PublicIcon name="arrow_downward" className="text-lg" />
            </a>
          </div>
        ),
      }}
    >
      {rates && <FastTrackPricing rates={rates} locale={locale} />}
      <div
        className={rates ? "mt-8 lg:mt-10" : "relative -mt-16 sm:-mt-20"}
        id="yeu-cau-fast-track"
        tabIndex={-1}
      >
        <PublicForm kind="fast-track" />
      </div>
    </PublicPage>
  );
}
