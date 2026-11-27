"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { BookingDraft } from "@/modules/travel/search";
import type { TourDeparture } from "@/modules/travel/tour-departure-types";
import { nextDate } from "@/modules/travel/search";
import type { Product } from "@/lib/types";
import { formatMoney, intlLocaleFor } from "@/lib/i18n/format";
import { useSiteData, useT } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import { DialogField } from "./dialog-field";

type SubmitBooking = (values: Record<string, FormDataEntryValue>) => Promise<{
  id: string;
  message: string;
}>;

const submitPublicBooking: SubmitBooking = async (values) => {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.error);
  return result;
};

export function BookingDialogContent({
  product,
  onError,
  initialValues = {},
  submitBooking = submitPublicBooking,
}: {
  product: Product;
  initialValues?: BookingDraft;
  onError: (msg: string) => void;
  submitBooking?: SubmitBooking;
}) {
  const { locale } = useSiteData();
  const t = useT();
  const roundTrip =
    product.type === "transfer" && initialValues.returnPrice != null;
  const [date, setDate] = useState(initialValues.date || "");
  const [roomId, setRoomId] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [details, setDetails] = useState<{
    rooms: {
      id: string;
      title: string;
      price: number;
      capacity: number;
      description: string;
      image: string;
    }[];
    departures: TourDeparture[];
    tourScheduled?: boolean;
    basePrice?: number;
    maxGuests?: number;
  }>({ rooms: [], departures: [] });
  const [loading, setLoading] = useState(initialValues.maxGuests == null);
  const [detailError, setDetailError] = useState("");
  const [detailsRevision, setDetailsRevision] = useState(0);
  const room = details.rooms.find((item) => item.id === roomId);
  const departure = details.departures.find((item) => item.date === date);
  const dateFormatter = new Intl.DateTimeFormat(intlLocaleFor(locale), {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  const scheduled = Boolean(details.tourScheduled);
  const maxGuests =
    initialValues.maxGuests ??
    details.maxGuests ??
    room?.capacity ??
    Math.min(departure?.remaining_seats ?? 100, 100);
  const referencePrice =
    (room?.price ??
      departure?.price_override ??
      details.basePrice ??
      product.price) + (initialValues.returnPrice ?? 0);
  useEffect(() => {
    if (initialValues.maxGuests != null) return;
    const controller = new AbortController();
    setDetailError("");
    setLoading(true);
    void fetch("/api/products/" + encodeURIComponent(product.id), {
      signal: controller.signal,
    })
      .then(async (result) => {
        const body = await result.json();
        if (!result.ok) throw Error(body.error);
        if (!controller.signal.aborted) setDetails(body);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setDetailError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [product.id, initialValues.maxGuests, detailsRevision]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy || loading || detailError || (scheduled && !departure)) return;
    setBusy(true);
    try {
      const values = Object.fromEntries(
        [...new FormData(event.currentTarget)].filter(
          ([, value]) => value !== "",
        ),
      );
      const result = await submitBooking({ ...values, productId: product.id });
      setSuccess(
        `${result.message}\n${t.booking.requestCode} ${result.id}\n${t.booking.saveCodeHint}`,
      );
    } catch (e) {
      onError((e as Error).message);
      if (product.type === "tour")
        setDetailsRevision((previous) => previous + 1);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h3 className="text-title-md mb-2">{product.title}</h3>
      <p className="text-primary font-bold mb-3">
        {t.booking.refPrice} {formatMoney(referencePrice, locale)} /{" "}
        {roundTrip
          ? t.booking.unitRoundTrip
          : product.type === "hotel"
            ? t.booking.unitHotel
            : product.type === "transfer"
              ? t.booking.unitTransfer
              : t.booking.unitDefault}
      </p>

      {detailError && (
        <p role="alert" className="text-error">
          {detailError}. {t.booking.reopenHint}
        </p>
      )}
      {success ? (
        <div
          role="status"
          className="bg-secondary/10 rounded-xl p-4 whitespace-pre-line"
        >
          {success}
        </div>
      ) : (
        <form className="space-y-2.5" onSubmit={handleSubmit}>
          <DialogField
            label={t.booking.fullName}
            name="name"
            autoComplete="name"
            required
            minLength={2}
          />
          <DialogField
            label={t.booking.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern="(0|\+84)[0-9]{9,10}"
          />
          {product.type === "hotel" && !!details.rooms.length && (
            <div className="block">
              <span className="mb-1 block text-body-sm">
                {t.booking.roomType}
              </span>
              <CustomSelect
                name="roomId"
                ariaLabel={t.booking.roomType}
                required
                searchable={details.rooms.length > 5}
                searchPlaceholder={t.booking.searchRoom}
                value={roomId}
                onChange={setRoomId}
                placeholder={t.booking.selectRoom}
                buttonClassName="w-full rounded-lg border border-border-default bg-white p-2 text-sm text-on-surface"
                options={[
                  { value: "", label: t.booking.selectRoom },
                  ...details.rooms.map((room) => ({
                    value: room.id,
                    label: `${room.title} · ${formatMoney(room.price, locale)} ${t.booking.perNight} · ${t.booking.maxGuests} ${room.capacity} ${t.hotels.guestUnit}`,
                  })),
                ]}
              />
            </div>
          )}
          {scheduled && !details.departures.length && (
            <p className="text-error text-body-sm" role="status">
              {t.errors.tourNoOpenDates}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {scheduled ? (
              <label className="block min-w-0 text-body-sm">
                {t.booking.useDate}
                <select
                  className="mt-1 block min-h-11 w-full rounded-lg border border-border-default bg-white p-2"
                  name="date"
                  value={departure?.date ?? ""}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  disabled={!details.departures.length}
                >
                  <option value="" disabled>
                    {t.booking.selectDeparture}
                  </option>
                  {details.departures.map((item) => (
                    <option key={item.id} value={item.date}>
                      {dateFormatter.format(new Date(item.date))}
                      {item.remaining_seats !== null
                        ? ` · ${t.booking.tourSeatsLeft.replace("{count}", String(item.remaining_seats))}`
                        : ""}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <DialogField
                label={
                  product.type === "hotel"
                    ? t.booking.checkIn
                    : t.booking.useDate
                }
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name="date"
                type="date"
                required
                min={new Date().toLocaleDateString("sv-SE", {
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              />
            )}
            {product.type === "hotel" && (
              <DialogField
                label={t.booking.checkOut}
                defaultValue={initialValues.returnDate}
                min={date ? nextDate(date) : undefined}
                name="returnDate"
                type="date"
                required
              />
            )}
            {product.type === "transfer" && (
              <DialogField
                label={t.booking.pickupTime}
                name="departureTime"
                defaultValue={initialValues.departureTime}
                type="time"
                required
              />
            )}
            <div className={product.type === "hotel" ? "col-span-2" : ""}>
              <DialogField
                label={t.booking.guests}
                name="guests"
                type="number"
                defaultValue={initialValues.guests ?? 2}
                required
                min="1"
                max={maxGuests}
              />
            </div>
          </div>
          {roundTrip && (
            <div className="grid grid-cols-2 gap-3">
              <DialogField
                label={t.booking.returnDate}
                type="date"
                name="returnDate"
                min={date}
                defaultValue={initialValues.returnDate}
                required
              />
              <DialogField
                label={t.booking.returnTime}
                type="time"
                name="returnTime"
                defaultValue={initialValues.returnTime}
                required
              />
            </div>
          )}
          {product.type === "transfer" && (
            <DialogField
              label={t.booking.flightNumber}
              name="flightNumber"
              maxLength={30}
              pattern="[A-Za-z0-9 \-]*"
              defaultValue={initialValues.flightNumber}
            />
          )}
          <label className="block text-body-sm">
            {t.booking.notes}
            <textarea
              name="notes"
              rows={2}
              defaultValue={initialValues.notes}
              maxLength={2000}
              className="block w-full border border-border-default rounded-lg p-2 mt-1"
            />
          </label>
          <p className="text-body-sm text-on-surface-variant">
            {submitBooking === submitPublicBooking
              ? t.booking.publicHint
              : t.booking.adminHint}
          </p>
          <button
            disabled={
              busy ||
              loading ||
              Boolean(detailError) ||
              (scheduled && !departure)
            }
            className="w-full py-3 rounded-xl bg-primary text-white font-bold disabled:opacity-50"
          >
            {busy
              ? t.booking.submitting
              : submitBooking === submitPublicBooking
                ? t.booking.submitPublic
                : t.booking.submitAdmin}
          </button>
        </form>
      )}
    </>
  );
}
