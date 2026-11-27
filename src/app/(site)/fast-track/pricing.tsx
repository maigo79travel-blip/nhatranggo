import { PublicIcon } from "@/components/site/public-ui";
import { intlLocaleFor } from "@/lib/i18n/format";
import type { Locale } from "@/lib/locale";
import { fastTrackPricingCopy } from "@/modules/support/fast-track-pricing-copy";
import {
  fastTrackRateGroups,
  type FastTrackRates,
} from "@/modules/support/fast-track-rates";

export const fastTrackPricingId = "bang-gia-fast-track";

export function FastTrackPricing({
  rates,
  locale,
}: {
  rates: FastTrackRates;
  locale: Locale;
}) {
  const copy = fastTrackPricingCopy[locale];
  const money = new Intl.NumberFormat(intlLocaleFor(locale));

  return (
    <section
      id={fastTrackPricingId}
      aria-labelledby="fast-track-rates-heading"
      className="fast-track-rate-panel"
      tabIndex={-1}
    >
      <div className="fast-track-pricing-heading">
        <h2 id="fast-track-rates-heading">{copy.heading}</h2>
        <nav className="fast-track-rate-links" aria-label={copy.heading}>
          {fastTrackRateGroups.map(({ key }) => (
            <a href={`#fast-track-${key}`} key={key}>
              {copy.links[key]}
            </a>
          ))}
        </nav>
      </div>
      {fastTrackRateGroups.map(({ key, icon, codes }) => (
        <section
          id={`fast-track-${key}`}
          key={key}
          aria-labelledby={`fast-track-${key}-title`}
          className="fast-track-rate-group"
        >
          <div className="fast-track-rate-group-heading">
            <h3 id={`fast-track-${key}-title`}>
              <PublicIcon name={icon} />
              {copy.groups[key]}
            </h3>
            <div className="fast-track-rate-currencies" aria-hidden="true">
              <span>USD</span>
              <span>VND</span>
            </div>
          </div>
          <ul role="list">
            {codes.map((code) => {
              const [title, description] = copy.rates[code];
              const { usd, vnd } = rates[code];
              const prefix = key === "surcharges" ? "+" : "";
              return (
                <li key={code} className="fast-track-rate-row" data-rate={code}>
                  <div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                  <dl className="fast-track-rate-values">
                    <div>
                      <dt className="md:sr-only">USD</dt>
                      <dd>
                        {prefix}
                        {money.format(usd)}
                      </dd>
                    </div>
                    <div>
                      <dt className="md:sr-only">VND</dt>
                      <dd>
                        {prefix}
                        {money.format(vnd)}
                      </dd>
                    </div>
                  </dl>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </section>
  );
}
