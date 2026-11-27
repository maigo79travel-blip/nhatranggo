import { fastTrackPricingCopy } from "@/modules/support/fast-track-pricing-copy";
import {
  fastTrackRateGroups,
  fastTrackRateLimits,
  fastTrackRatesSchema,
} from "@/modules/support/fast-track-rates";
import { inputClass } from "../api";

const currencies = ["usd", "vnd"] as const;
const copy = fastTrackPricingCopy.vi;

export function readFastTrackRateFields(form: FormData) {
  return Object.fromEntries(
    fastTrackRateGroups.flatMap(({ codes }) =>
      codes.map((code) => [
        code,
        {
          usd: Number(form.get(`${code}-usd`)),
          vnd: Number(form.get(`${code}-vnd`)),
        },
      ]),
    ),
  );
}

export function FastTrackRateFields({ value }: { value: unknown }) {
  const result = fastTrackRatesSchema.safeParse(value);
  const rates = result.success ? result.data : undefined;

  return (
    <div className="space-y-4">
      {fastTrackRateGroups.map(({ key, codes }) => (
        <fieldset
          key={key}
          className="min-w-0 rounded-xl border border-border-subtle p-3"
        >
          <legend className="px-1 text-sm font-bold">{copy.groups[key]}</legend>
          <div className="space-y-4">
            {codes.map((code) => {
              const [title] = copy.rates[code];
              return (
                <div key={code} className="space-y-1">
                  <p className="text-sm font-semibold">{title}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {currencies.map((currency) => (
                      <label key={currency} className="ad-field">
                        {currency.toUpperCase()}
                        <input
                          name={`${code}-${currency}`}
                          aria-label={`${title} · ${currency.toUpperCase()}`}
                          type="number"
                          min={0}
                          max={fastTrackRateLimits[currency]}
                          step={1}
                          required
                          className={inputClass}
                          defaultValue={rates?.[code][currency]}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
