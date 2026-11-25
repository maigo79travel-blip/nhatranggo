"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  ContentLink,
  ContentText,
  useContent,
  useSiteData,
} from "@/components/content";
import { useCatalog } from "@/components/catalog/catalog-context";
import { money } from "@/lib/types";
import { DestinationOptions } from "@/modules/travel/destination-options";
import { vietnamToday } from "@/modules/travel/search";
import {
  defaultRoute,
  transferRoutes,
  transferVehicles,
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
    <div className="transfer-field">
      <TransferIcon className="text-primary">{icon}</TransferIcon>
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="block text-xs text-on-surface-variant">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}

export function TransfersHero() {
  const { vehicle, selectVehicle } = useTransferVehicle();
  const { fares, products, destinations } = useSiteData();
  const catalog = useCatalog();
  const heroLabel = useContent("transfers.text-027");
  const heroSubtitle = useContent("transfers.text-029");
  const defaultLabel = "Dịch Vụ Xe Đưa Đón";
  const defaultSubtitle = "& Xe Hợp Đồng Du Lịch Uy Tín";
  const label = typeof heroLabel === "string" ? heroLabel.trim() : defaultLabel;
  const subtitle =
    typeof heroSubtitle === "string" ? heroSubtitle.trim() : defaultSubtitle;
  const [pickup, setPickup] = useState<string>(defaultRoute.pickup);
  const [dropoff, setDropoff] = useState<string>(defaultRoute.dropoff);
  const [trip, setTrip] = useState("one-way");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const route = `${pickup}_${dropoff}`;
  const productId = `transfer-${route}-${vehicle}`;
  const product = products.find((item) => item.id === productId);
  const fare =
    product &&
    fares.find((item) => item.route === route && item.vehicle === vehicle);
  const pickupName = destinations.find((item) => item.code === pickup)?.name;
  const dropoffName = destinations.find((item) => item.code === dropoff)?.name;
  const selectedVehicle = transferVehicles.find((item) => item.id === vehicle);

  async function openBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product || !fare || busy) return;
    const values = new FormData(event.currentTarget);
    const date = String(values.get("date") || "");
    const departureTime = String(values.get("departureTime") || "");
    const flight = String(values.get("flight") || "").trim();
    const notes = [
      trip === "round-trip" && "Yêu cầu tư vấn chuyến khứ hồi",
      flight && `Số hiệu chuyến bay: ${flight}`,
    ]
      .filter(Boolean)
      .join("\n");
    setBusy(true);
    setError("");
    try {
      const params = new URLSearchParams({ pickup, dropoff, vehicle });
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
          title: `${pickupName} → ${dropoffName} · ${selectedVehicle?.label}`,
          price: quote.price,
        },
        { date, departureTime, notes },
      );
    } catch {
      setError("Không thể tải báo giá. Vui lòng thử lại hoặc nhắn Zalo.");
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
            {label === defaultLabel ? "Dịch vụ xe đưa đón" : label}
          </span>
          <span className="transfer-accent mt-2 inline-block uppercase">
            <ContentText contentKey="transfers.text-028" />
            <br />
            {subtitle === defaultSubtitle ? "& xe hợp đồng uy tín" : subtitle}
          </span>
        </h1>

        <form
          id="bao-gia-xe"
          className="transfer-quote"
          onChange={() => setError("")}
          onSubmit={openBooking}
          aria-label="Tra cứu giá xe"
        >
          <fieldset
            className="grid min-w-0 gap-4 disabled:opacity-75"
            disabled={busy}
          >
            <legend className="sr-only">Thông tin chuyến xe</legend>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Dịch vụ xe"
              >
                {transferRoutes.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="transfer-pill transfer-pill-muted"
                    aria-pressed={
                      pickup === option.pickup && dropoff === option.dropoff
                    }
                    onClick={() => {
                      setPickup(option.pickup);
                      setDropoff(option.dropoff);
                      setError("");
                    }}
                  >
                    <TransferIcon className="text-lg">
                      {option.icon}
                    </TransferIcon>
                    {option.label}
                  </button>
                ))}
              </div>
              <div
                className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold"
                role="group"
                aria-label="Kiểu hành trình"
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
                  Một chiều (One-way)
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
                  Khứ hồi (Round-trip)
                </label>
              </div>
            </div>

            <div className="transfer-quote-fields">
              <QuoteField
                id="pickup-select"
                icon="location_on"
                label="Điểm đón"
              >
                <select
                  id="pickup-select"
                  className="transfer-control"
                  value={pickup}
                  onChange={(event) => setPickup(event.target.value)}
                  required
                >
                  <DestinationOptions />
                </select>
              </QuoteField>
              <QuoteField
                id="dropoff-select"
                icon="flag"
                label="Điểm đến / Khách sạn"
              >
                <select
                  id="dropoff-select"
                  className="transfer-control"
                  value={dropoff}
                  onChange={(event) => setDropoff(event.target.value)}
                  required
                >
                  <DestinationOptions />
                </select>
              </QuoteField>
              <QuoteField
                id="transfer-date"
                icon="calendar_today"
                label="Ngày & giờ đón"
              >
                <div className="grid grid-cols-[minmax(0,1.27fr)_minmax(0,1fr)] gap-1">
                  <input
                    className="transfer-control"
                    id="transfer-date"
                    aria-label="Ngày đón"
                    name="date"
                    type="date"
                    min={vietnamToday()}
                  />
                  <input
                    className="transfer-control"
                    aria-label="Giờ đón"
                    name="departureTime"
                    type="time"
                  />
                </div>
              </QuoteField>
              <QuoteField
                id="transfer-flight"
                icon="flight_takeoff"
                label="Số hiệu chuyến bay (tùy chọn)"
              >
                <input
                  id="transfer-flight"
                  name="flight"
                  className="transfer-control placeholder:text-on-surface-variant"
                  type="text"
                  placeholder="VD: VN1340, VJ772…"
                  maxLength={30}
                />
              </QuoteField>
              <button
                className="transfer-button"
                id="btn-search-fare"
                type="submit"
                disabled={!fare}
              >
                <TransferIcon className="text-lg">search</TransferIcon>
                {busy ? "Đang tra cứu…" : "Tra cứu giá & Đặt xe ngay"}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="text-on-surface-variant">Dòng xe phục vụ</span>
              <strong className="text-primary">{selectedVehicle?.model}</strong>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Dòng xe"
              >
                {transferVehicles.map((item) => (
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
                    {item.chip}
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
                  Tuyến đề xuất · {pickupName} → {dropoffName}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                  <ContentText contentKey="transfers.text-063" />
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div aria-live="polite">
                <p className="text-xs font-semibold">
                  {trip === "round-trip"
                    ? "Giá một chiều · Lượt về sẽ được tư vấn"
                    : "Giá trọn gói một chiều"}
                </p>
                <p
                  id="route-price"
                  className={
                    fare && !error
                      ? "text-2xl font-bold text-primary sm:text-[28px]"
                      : "text-sm text-on-surface-variant"
                  }
                >
                  {error ||
                    (fare
                      ? money(fare.price)
                      : "Tuyến này cần liên hệ để báo giá.")}
                </p>
              </div>
              <ContentLink
                contentKey="transfers.attributes-009"
                target="_blank"
                rel="noopener"
                className="transfer-button"
              >
                Đặt nhanh qua Zalo
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
