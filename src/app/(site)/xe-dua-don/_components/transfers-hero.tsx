"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  ContentLink,
  ContentText,
  useContent,
  useSiteData,
  useT,
} from "@/components/content";
import { useCatalog } from "@/components/catalog/catalog-context";
import { CustomSelect } from "@/components/ui/custom-select";
import { formatMoney } from "@/lib/i18n/format";
import { vietnamToday } from "@/modules/travel/search";
import {
  defaultRoute,
  transferRoutes,
  transferVehicleOptions,
} from "./transfer-options";
import { TransferIcon } from "./transfers-ui";
import { useTransferVehicle } from "./transfers-vehicle-selection";

const highlights = [
  ["flight_land", "transfers.text-067"],
  ["badge", "transfers.text-068"],
  ["event_available", "transfers.text-069"],
  ["schedule", "transfers.text-070"],
] as const;

function QuoteField({
  id,
  icon,
  label,
  children,
}: {
  id: string;
  icon: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="transfer-field cursor-pointer">
      <TransferIcon className="text-primary">{icon}</TransferIcon>
      <div className="min-w-0 flex-1">
        <span className="block text-xs text-on-surface-variant">{label}</span>
        {children}
      </div>
    </label>
  );
}

export function TransfersHero() {
  const { vehicle, selectVehicle } = useTransferVehicle();
  const {
    fares,
    products,
    destinations,
    transferRoutes: routes,
    transferVehicleTypes,
    locale,
  } = useSiteData();
  const catalog = useCatalog();
  const t = useT();
  const heroLabel = useContent("transfers.text-027");
  const heroSubtitle = useContent("transfers.text-029");
  const defaultLabel = "Dịch Vụ Xe Đưa Đón";
  const defaultSubtitle = "& Xe Hợp Đồng Du Lịch Uy Tín";
  const label = typeof heroLabel === "string" ? heroLabel.trim() : defaultLabel;
  const subtitle =
    typeof heroSubtitle === "string" ? heroSubtitle.trim() : defaultSubtitle;
  const routeChoices = transferRoutes.map((option) => ({
    ...option,
    route:
      routes.find(
        (route) =>
          route.category === option.id &&
          route.pickup === option.pickup &&
          route.dropoff === option.dropoff,
      ) || routes.find((route) => route.category === option.id),
  }));
  const initialRoute =
    routeChoices.find((option) => option.id === defaultRoute.id)?.route ||
    routes[0];
  const [pickup, setPickup] = useState(
    initialRoute?.pickup ?? destinations[0]?.code ?? "",
  );
  const [dropoff, setDropoff] = useState(
    initialRoute?.dropoff ?? destinations[1]?.code ?? "",
  );
  const [trip, setTrip] = useState("one-way");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const destinationOptions = destinations.map((d) => ({
    value: d.code,
    label: t.destinations[d.code] ?? d.name,
  }));
  const route = `${pickup}_${dropoff}`;
  const productId = `transfer-${route}-${vehicle}`;
  const product = products.find((item) => item.id === productId);
  const fare =
    product &&
    fares.find((item) => item.route === route && item.vehicle === vehicle);
  const pickupName =
    t.destinations[pickup] ??
    destinations.find((item) => item.code === pickup)?.name;
  const dropoffName =
    t.destinations[dropoff] ??
    destinations.find((item) => item.code === dropoff)?.name;
  const vehicles = transferVehicleOptions(transferVehicleTypes);
  const roundTrip = trip === "round-trip";
  const reverseRoute = roundTrip
    ? routes.find((item) => item.pickup === dropoff && item.dropoff === pickup)
    : undefined;
  const returnFare =
    reverseRoute &&
    fares.find(
      (item) => item.route === reverseRoute.code && item.vehicle === vehicle,
    );
  const price =
    fare && (!roundTrip || returnFare)
      ? fare.price + (returnFare?.price ?? 0)
      : null;

  async function openBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product || price == null || busy) return;
    const values = new FormData(event.currentTarget);
    const date = String(values.get("date") || "");
    const departureTime = String(values.get("departureTime") || "");
    const flightNumber = String(values.get("flight") || "").trim();
    const returnDate = roundTrip ? String(values.get("returnDate") || "") : "";
    const returnTime = roundTrip ? String(values.get("returnTime") || "") : "";
    if (
      roundTrip &&
      `${returnDate}T${returnTime}` <= `${date}T${departureTime}`
    ) {
      setError(t.transfers.returnAfterDepartureError);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const params = new URLSearchParams({ pickup, dropoff, vehicle });
      if (roundTrip) params.set("roundTrip", "true");
      const response = await fetch(`/api/fares?${params}`);
      if (!response.ok) {
        const body = await response.json();
        setError(body.error);
        return;
      }
      const quote = await response.json();
      catalog.open(
        {
          ...product,
          title: `${pickupName} → ${dropoffName} · ${t.transfers.vehicles[vehicle].label}`,
          price: quote.price,
        },
        {
          date,
          departureTime,
          flightNumber,
          returnDate: returnDate || undefined,
          returnTime: returnTime || undefined,
          returnPrice: quote.returnPrice ?? undefined,
          maxGuests: quote.maxGuests,
        },
      );
    } catch {
      setError(t.errors.submitFailed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className="transfer-hero relative"
      aria-labelledby="transfer-title"
    >
      <div className="transfer-hero-picture" aria-hidden="true" />
      <div className="site-container relative">
        <h1
          id="transfer-title"
          className="transfer-hero-heading tracking-tight font-extrabold"
        >
          <span className="block">
            {label === t.transfers.defaultHeroLabel ? t.transfers.defaultHeroTitle : label}
          </span>
          <span className="transfer-accent mt-2 inline-block uppercase">
            <ContentText contentKey="transfers.text-028" />
            <br />
            {subtitle === t.transfers.defaultHeroSubtitle ? t.transfers.defaultHeroSubtitle : subtitle}
          </span>
        </h1>

        <form
          id="bao-gia-xe"
          className="transfer-quote"
          onChange={() => setError("")}
          onSubmit={openBooking}
          aria-label={t.transfers.quoteFormAria}
        >
          <fieldset
            className="grid min-w-0 gap-4 disabled:opacity-75"
            disabled={busy}
          >
            <legend className="sr-only">{t.transfers.tripInfoLegend}</legend>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label={t.transfers.fleetLabel}
              >
                {routeChoices.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="transfer-pill transfer-pill-muted disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!option.route}
                    aria-pressed={
                      pickup === option.route?.pickup &&
                      dropoff === option.route?.dropoff
                    }
                    onClick={() => {
                      if (!option.route) return;
                      setPickup(option.route.pickup);
                      setDropoff(option.route.dropoff);
                      setError("");
                    }}
                  >
                    <TransferIcon className="text-lg">
                      {option.icon}
                    </TransferIcon>
                    {t.transfers.routes[option.id as keyof typeof t.transfers.routes]?.label ?? option.label}
                  </button>
                ))}
              </div>
              <div
                className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold"
                role="group"
                aria-label={t.transfers.tripTypeAria}
              >
                <label className="inline-flex min-h-10 cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="trip"
                    value="one-way"
                    className="h-4 w-4 accent-primary"
                    checked={trip === "one-way"}
                    onChange={() => setTrip("one-way")}
                  />
                  {t.transfers.oneWay}
                </label>
                <label className="inline-flex min-h-10 cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="trip"
                    value="round-trip"
                    className="h-4 w-4 accent-primary"
                    checked={trip === "round-trip"}
                    onChange={() => setTrip("round-trip")}
                  />
                  {t.transfers.roundTrip}
                </label>
              </div>
            </div>

            <div className="transfer-quote-fields">
              <div className="transfer-field">
                <TransferIcon className="text-primary">
                  location_on
                </TransferIcon>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs text-on-surface-variant">
                    {t.transfers.pickup}
                  </span>
                  <CustomSelect
                    id="pickup-select"
                    ariaLabel={t.transfers.pickup}
                    searchable
                    required
                    searchPlaceholder={t.transfers.searchPickup}
                    buttonClassName="transfer-control cursor-pointer"
                    value={pickup}
                    onChange={setPickup}
                    options={destinationOptions}
                  />
                </div>
              </div>
              <div className="transfer-field">
                <TransferIcon className="text-primary">flag</TransferIcon>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs text-on-surface-variant">
                    {t.transfers.dropoff}
                  </span>
                  <CustomSelect
                    id="dropoff-select"
                    ariaLabel={t.transfers.dropoff}
                    searchable
                    required
                    searchPlaceholder={t.transfers.searchDropoff}
                    buttonClassName="transfer-control cursor-pointer"
                    value={dropoff}
                    onChange={setDropoff}
                    options={destinationOptions}
                  />
                </div>
              </div>
              <QuoteField
                id="transfer-date"
                icon="calendar_today"
                label={t.transfers.dateTime}
              >
                <div className="grid grid-cols-[minmax(0,1.27fr)_minmax(0,1fr)] gap-1">
                  <input
                    className="transfer-control"
                    id="transfer-date"
                    aria-label={t.transfers.dateLabel}
                    name="date"
                    type="date"
                    min={vietnamToday()}
                    required
                  />
                  <input
                    className="transfer-control"
                    aria-label={t.transfers.timeLabel}
                    name="departureTime"
                    type="time"
                    required
                  />
                </div>
              </QuoteField>
              <QuoteField
                id="transfer-flight"
                icon="flight_takeoff"
                label={t.transfers.flightLabel}
              >
                <input
                  id="transfer-flight"
                  name="flight"
                  className="transfer-control placeholder:text-on-surface-variant"
                  type="text"
                  placeholder={t.transfers.flightPlaceholder}
                  maxLength={30}
                  pattern="[A-Za-z0-9 \-]*"
                />
              </QuoteField>
              <button
                className="transfer-button"
                id="btn-search-fare"
                type="submit"
                disabled={price == null || busy}
              >
                <TransferIcon className="text-lg">search</TransferIcon>
                {busy ? t.transfers.searching : t.transfers.searchSubmit}
              </button>
            </div>

            {roundTrip && (
              <div className="grid grid-cols-2 gap-3">
                <QuoteField
                  id="transfer-return-date"
                  icon="event_available"
                  label={t.booking.returnDate}
                >
                  <input
                    id="transfer-return-date"
                    className="transfer-control"
                    name="returnDate"
                    type="date"
                    min={vietnamToday()}
                    required
                  />
                </QuoteField>
                <QuoteField
                  id="transfer-return-time"
                  icon="schedule"
                  label={t.booking.returnTime}
                >
                  <input
                    id="transfer-return-time"
                    className="transfer-control"
                    name="returnTime"
                    type="time"
                    required
                  />
                </QuoteField>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="text-on-surface-variant">
                {t.transfers.fleetLabel}
              </span>
              <strong className="text-primary">
                {t.transfers.vehicles[vehicle].model}
              </strong>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label={t.transfers.fleetLabel}
              >
                {vehicles.map((item) => (
                  <button
                    className="transfer-pill transfer-pill-muted vehicle-chip"
                    key={item.id}
                    type="button"
                    data-veh={item.id}
                    aria-pressed={vehicle === item.id}
                    onClick={() => {
                      selectVehicle(item.id);
                      setError("");
                    }}
                  >
                    {t.transfers.vehicles[item.id].chip}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>

          <div className="transfer-quote-result">
            <div className="flex items-start gap-3">
              <TransferIcon className="mt-1 text-lg text-primary">
                sell
              </TransferIcon>
              <div>
                <p className="text-sm font-bold">
                  {t.transfers.suggestedRoute} · {pickupName} → {dropoffName}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                  <ContentText contentKey="transfers.text-063" />
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div aria-live="polite">
                <p className="text-xs font-semibold">
                  {roundTrip
                    ? t.transfers.roundTripNote
                    : t.transfers.oneWayNote}
                </p>
                <p
                  id="route-price"
                  className={
                    price != null && !error
                      ? "text-2xl font-bold text-primary sm:text-[28px]"
                      : "text-sm text-on-surface-variant"
                  }
                >
                  {error ||
                    (price != null
                      ? formatMoney(price, locale)
                      : roundTrip && fare
                        ? t.transfers.missingReturnFare
                        : t.transfers.contactForQuote)}
                </p>
              </div>
              <ContentLink
                contentKey="transfers.attributes-009"
                target="_blank"
                rel="noopener"
                className="transfer-button"
              >
                {t.transfers.quickZalo}
              </ContentLink>
            </div>
          </div>
        </form>

        <ul className="transfer-highlights">
          {highlights.map(([icon, key]) => (
            <li
              key={key}
              className="flex min-w-0 items-center gap-3 text-sm font-bold sm:text-base"
            >
              <TransferIcon className="transfer-feature-icon">
                {icon}
              </TransferIcon>
              <ContentText contentKey={key} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
