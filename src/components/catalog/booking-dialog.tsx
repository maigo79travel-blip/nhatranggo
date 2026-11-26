"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { BookingDraft } from "@/modules/travel/search";
import { nextDate } from "@/modules/travel/search";
import type { Product } from "@/lib/types";
import { money } from "@/lib/types";
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
    departures: { date: string; notes: string }[];
    maxGuests?: number;
  }>({ rooms: [], departures: [] });
  const [loading, setLoading] = useState(initialValues.maxGuests == null);
  const [detailError, setDetailError] = useState("");
  const room = details.rooms.find((item) => item.id === roomId);
  const maxGuests =
    initialValues.maxGuests ?? details.maxGuests ?? room?.capacity;
  const referencePrice =
    (room?.price ?? product.price) + (initialValues.returnPrice ?? 0);
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
  }, [product.id, initialValues.maxGuests]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy || loading || detailError) return;
    setBusy(true);
    try {
      const values = Object.fromEntries(
        [...new FormData(event.currentTarget)].filter(
          ([, value]) => value !== "",
        ),
      );
      const result = await submitBooking({ ...values, productId: product.id });
      setSuccess(
        `${result.message}\nMã yêu cầu: ${result.id}\nHãy lưu mã này để tra cứu.`,
      );
    } catch (e) {
      onError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h3 className="text-title-md mb-2">{product.title}</h3>
      <p className="text-primary font-bold mb-3">
        Giá tham khảo: {money(referencePrice)} /{" "}
        {roundTrip
          ? "khứ hồi"
          : product.type === "hotel"
            ? "phòng/đêm"
            : product.type === "transfer"
              ? "chuyến"
              : "người"}
      </p>

      {detailError && (
        <p role="alert" className="text-error">
          {detailError}. Hãy đóng và mở lại yêu cầu.
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
            label="Họ và tên"
            name="name"
            autoComplete="name"
            required
            minLength={2}
          />
          <DialogField
            label="Số điện thoại"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern="(0|\+84)[0-9]{9,10}"
          />
          {product.type === "hotel" && !!details.rooms.length && (
            <div className="block">
              <span className="mb-1 block text-body-sm">Loại phòng</span>
              <CustomSelect
                name="roomId"
                ariaLabel="Loại phòng"
                required
                searchable={details.rooms.length > 5}
                searchPlaceholder="Tìm loại phòng…"
                value={roomId}
                onChange={setRoomId}
                placeholder="Chọn loại phòng"
                buttonClassName="w-full rounded-lg border border-border-default bg-white p-2 text-sm text-on-surface"
                options={[
                  { value: "", label: "Chọn loại phòng" },
                  ...details.rooms.map((room) => ({
                    value: room.id,
                    label: `${room.title} · ${money(room.price)} / đêm · tối đa ${room.capacity} khách`,
                  })),
                ]}
              />
            </div>
          )}
          {!!details.departures.length && (
            <p className="text-body-md">
              Lịch khởi hành: {details.departures.map((d) => d.date).join(", ")}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <DialogField
              label={
                product.type === "hotel" ? "Ngày nhận phòng" : "Ngày sử dụng"
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
            {product.type === "hotel" && (
              <DialogField
                label="Ngày trả phòng"
                defaultValue={initialValues.returnDate}
                min={date ? nextDate(date) : undefined}
                name="returnDate"
                type="date"
                required
              />
            )}
            {product.type === "transfer" && (
              <DialogField
                label="Giờ đón"
                name="departureTime"
                defaultValue={initialValues.departureTime}
                type="time"
                required
              />
            )}
            <div className={product.type === "hotel" ? "col-span-2" : ""}>
              <DialogField
                label="Số khách"
                name="guests"
                type="number"
                defaultValue={initialValues.guests ?? 2}
                required
                min="1"
                max={maxGuests ?? 100}
              />
            </div>
          </div>
          {roundTrip && (
            <div className="grid grid-cols-2 gap-3">
              <DialogField
                label="Ngày đón lượt về"
                type="date"
                name="returnDate"
                min={date}
                defaultValue={initialValues.returnDate}
                required
              />
              <DialogField
                label="Giờ đón lượt về"
                type="time"
                name="returnTime"
                defaultValue={initialValues.returnTime}
                required
              />
            </div>
          )}
          {product.type === "transfer" && (
            <DialogField
              label="Số hiệu chuyến bay"
              name="flightNumber"
              maxLength={30}
              pattern="[A-Za-z0-9 \-]*"
              defaultValue={initialValues.flightNumber}
            />
          )}
          <label className="block text-body-sm">
            Ghi chú (số phòng, điểm đón, giờ đón)
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
              ? "Đây là yêu cầu tư vấn. Nhân viên sẽ xác nhận chỗ trống và tổng giá trước khi thanh toán."
              : "Đơn mới sẽ ở trạng thái chờ xác nhận."}
          </p>
          <button
            disabled={busy || loading || Boolean(detailError)}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold disabled:opacity-50"
          >
            {busy
              ? "Đang gửi…"
              : submitBooking === submitPublicBooking
                ? "Gửi yêu cầu đặt chỗ"
                : "Tạo đơn đặt chỗ"}
          </button>
        </form>
      )}
    </>
  );
}
