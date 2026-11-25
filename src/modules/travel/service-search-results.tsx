import {
  serviceSearchHref,
  type ServiceSearchParams,
  type ServiceType,
} from "./service-routes";
import { getPublicDestinations, getPublicLocale } from "@/lib/catalog";
import { db } from "@/lib/db";
import { PublicPage } from "@/components/site/public-page";
import { PublicEmptyState, PublicIcon } from "@/components/site/public-ui";
import { CatalogProvider } from "@/components/catalog";
import { listPublicProducts } from "./public-products";
import { ServiceCards } from "./catalog-list";
import { ServiceFilters } from "./service-filters";
import {
  bookingDraft,
  matchesSearch,
  productSearchBlob,
  vietnamToday,
} from "./search";
const searchTitles: Record<ServiceType, string> = {
  hotel: "Tìm khách sạn & resort",
  tour: "Tìm tour du lịch",
  combo: "Combo du lịch",
  transfer: "Tìm xe đưa đón",
};

export async function ServiceSearchResults({
  type,
  searchParams,
}: {
  type: ServiceType;
  searchParams: ServiceSearchParams;
}) {
  const params = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      typeof value === "string" ? value : "",
    ]),
  );
  const draft = bookingDraft(params);
  const locale = await getPublicLocale();
  const [availableProducts, destinations] = await Promise.all([
    listPublicProducts({ locale, types: [type] }),
    getPublicDestinations(),
  ]);
  const category = ["5 sao", "4 sao", "resort"].includes(params.category)
    ? params.category
    : "";
  const candidates = availableProducts.filter(
    (p) =>
      p.type === type &&
      (type !== "hotel" ||
        !category ||
        productSearchBlob(p).includes(category)) &&
      (!params.destination || p.destination_id === params.destination) &&
      matchesSearch(
        [
          p.title,
          p.location,
          ...(p.type === "transfer"
            ? destinations
                .filter((d) => p.location.includes(d.code))
                .map((d) => d.name)
            : []),
        ].join(" "),
        params.q || "",
      ),
  );
  const ids = candidates.map((p) => p.id);
  const [rooms, departures] = await Promise.all([
    type === "hotel" && draft.guests && ids.length
      ? db.query<{ product_id: string; capacity: number }>(
          "SELECT product_id,capacity FROM rooms WHERE active=true AND product_id=ANY($1::text[])",
          [ids],
        )
      : { rows: [] },
    type === "tour" && draft.date && ids.length
      ? db.query<{ product_id: string; date: string }>(
          "SELECT product_id,date::text FROM departures WHERE active=true AND product_id=ANY($1::text[])",
          [ids],
        )
      : { rows: [] },
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
    <PublicPage title={searchTitles[type]}>
      <ServiceFilters
        key={JSON.stringify(params)}
        type={type}
        params={params}
        resetHref={serviceSearchHref(type)}
        draft={draft}
        destinations={destinations}
        today={vietnamToday()}
      />
      <p role="status" className="text-xl font-bold mt-8 mb-5">
        {products.length} dịch vụ phù hợp
      </p>
      {(draft.date || draft.guests) && (
        <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex items-start gap-2">
          <PublicIcon name="info" className="text-lg shrink-0 mt-0.5" />
          Ngày và số khách được chuyển sang yêu cầu đặt chỗ. Nhân viên sẽ kiểm
          tra tình trạng chỗ và xác nhận với đối tác.
        </p>
      )}
      <CatalogProvider products={products}>
        <ServiceCards products={products} initialValues={draft} />
      </CatalogProvider>
      {!products.length && (
        <PublicEmptyState>
          Chưa có dịch vụ phù hợp. Hãy đổi từ khóa, điểm đến hoặc ngày sử dụng.
        </PublicEmptyState>
      )}
    </PublicPage>
  );
}
