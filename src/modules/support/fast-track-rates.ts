import { z } from "zod";

export const fastTrackRatesKey = "fast-track.rates";

export const fastTrackRateGroups = [
  {
    key: "arrival",
    icon: "flight_land",
    codes: [
      "passport-control",
      "arrival-fast-track",
      "vip-b-passport",
      "vip-b-fast-track",
      "vip-pro-passport",
      "vip-pro-fast-track",
    ],
  },
  {
    key: "departure",
    icon: "flight_takeoff",
    codes: ["departure-assistance", "departure-vip"],
  },
  {
    key: "extras",
    icon: "luggage",
    codes: ["luggage-assistance"],
  },
  {
    key: "surcharges",
    icon: "schedule",
    codes: ["night-arrival"],
  },
] as const;

type RateGroup = (typeof fastTrackRateGroups)[number];
export type FastTrackRateCode = RateGroup["codes"][number];
export type FastTrackRateGroupKey = RateGroup["key"];

const rateCodes = fastTrackRateGroups.flatMap<FastTrackRateCode>(
  ({ codes }) => codes,
);
export const fastTrackRateLimits = { usd: 1_000_000, vnd: 2_000_000_000 };
export const fastTrackRatesSchema = z.record(
  z.enum(rateCodes),
  z.object({
    usd: z.number().int().nonnegative().max(fastTrackRateLimits.usd),
    vnd: z.number().int().nonnegative().max(fastTrackRateLimits.vnd),
  }),
);

export type FastTrackRates = z.infer<typeof fastTrackRatesSchema>;
