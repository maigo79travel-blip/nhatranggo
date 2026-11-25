import { getSiteData } from "@/lib/catalog";
import { db } from "@/lib/db";
import { PublicPage } from "@/components/site/public-page";
import { PublicEmptyState, PublicIcon } from "@/components/site/public-ui";
import { ServiceCards } from "@/modules/travel/catalog-list";
import { ServiceFilters } from "@/modules/travel/service-filters";
import {
  bookingDraft,
  matchesSearch,
  vietnamToday,
} from "@/modules/travel/search";
export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const params = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [
      key,
      typeof value === "string" ? value : "",
    ]),
  );
  const draft = bookingDraft(params);
  const [data, destinations] = await Promise.all([
    getSiteData(),
    db.query(
      "SELECT id,name FROM destinations WHERE active=true ORDER BY name",
    ),
  ]);
  const candidates = data.products.filter(
    (p) =>
      (!params.type || p.type === params.type) &&
      (!params.destination || p.destination_id === params.destination) &&
      matchesSearch(
        [
          p.title,
          p.location,
          ...(p.type === "transfer"
            ? data.destinations
                .filter((d) => p.location.includes(d.code))
                .map((d) => d.name)
            : []),
        ].join(" "),
        params.q || "",
      ),
  );
  const ids = candidates.map((p) => p.id);
  const [rooms, departures] = await Promise.all([
    db.query<{ product_id: string; capacity: number }>(
      "SELECT product_id,capacity FROM rooms WHERE active=true AND product_id=ANY($1::text[])",
      [ids],
    ),
    db.query<{ product_id: string; date: string }>(
      "SELECT product_id,date::text FROM departures WHERE active=true AND product_id=ANY($1::text[])",
      [ids],
    ),
  ]);
  const products = candidates.filter((product) => {
    const availableRooms = rooms.rows.filter(
      (room) => room.product_id === product.id,
    );
    const scheduled = departures.rows.filter(
      (departure) => departure.product_id === product.id,
    );
    return (
      (product.type !== "hotel" ||
        !draft.guests ||
        !availableRooms.length ||
        availableRooms.some((room) => room.capacity >= draft.guests!)) &&
      (product.type !== "tour" ||
        !draft.date ||
        !scheduled.length ||
        scheduled.some((departure) => departure.date === draft.date))
    );
  });
  return (
    <PublicPage title="Xe, khách sạn & tour">
      <ServiceFilters
        key={JSON.stringify(params)}
        params={params}
        draft={draft}
        destinations={destinations.rows}
        today={vietnamToday()}
      />
      <p role="status" className="text-xl font-bold mt-8 mb-5">
        {products.length} dịch vụ phù hợp
      </p>
      {(draft.date || draft.guests) && (
        <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex items-start gap-2">
          <PublicIcon name="info" className="text-lg shrink-0 mt-0.5" />
          Ngày và số khách được chuyển sang yêu cầu đặt chỗ. Nhân viên sẽ kiểm
          tra tình trạng phòng và xác nhận với đối tác.
        </p>
      )}
      <ServiceCards products={products} initialValues={draft} />
      {!products.length && (
        <PublicEmptyState>
          Chưa có dịch vụ phù hợp. Hãy đổi từ khóa, loại dịch vụ hoặc ngày sử
          dụng.
        </PublicEmptyState>
      )}
    </PublicPage>
  );
}
