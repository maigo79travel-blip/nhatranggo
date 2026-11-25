"use client";
import { useState } from "react";
import { ContentText, FareValue, useSiteData } from "@/components/content";
import { useCatalog } from "@/components/catalog/catalog-context";
import brand from "@/config/brand.json";

type RouteCategory = "airport" | "local" | "intercity";

const routeTabs: { id: RouteCategory; icon: string; label: string }[] = [
  { id: "airport", icon: "flight_takeoff", label: "Sân bay Cam Ranh" },
  { id: "local", icon: "directions_car", label: "Trong tỉnh & City Tour" },
  { id: "intercity", icon: "map", label: "Tuyến Liên Tỉnh" },
];

const fareRows: {
  category: RouteCategory;
  route: string;
  icon: string;
  title: string;
  subtitle: string;
}[] = [
  // 1. Sân bay Cam Ranh
  {
    category: "airport",
    route: "CXR_NT_CENTER",
    icon: "flight_takeoff",
    title: "Sân bay Cam Ranh ⇄ Trung tâm Nha Trang",
    subtitle: "Đón tiễn sân bay • Bao gồm phí cổng sân bay, cầu đường, VAT",
  },
  {
    category: "airport",
    route: "CXR_NT_NORTH_WEST",
    icon: "flight_land",
    title: "Sân bay Cam Ranh ⇄ Bắc Nha Trang / Tây Nha Trang",
    subtitle: "Khu vực Vĩnh Hải, Vĩnh Hòa, Diên Khánh • Bao gồm cầu đường, VAT",
  },
  // 2. Trong tỉnh Khánh Hòa & City Tour
  {
    category: "local",
    route: "NT_CENTER_VINWONDER",
    icon: "directions_boat",
    title: "Nha Trang ⇄ Cảng du lịch / VinWonders",
    subtitle: "Đưa đón tận nơi • Hỗ trợ chờ đón linh hoạt",
  },
  {
    category: "local",
    route: "NT_NORTH_WEST_VINWONDER",
    icon: "directions_boat",
    title: "Bắc, Tây Nha Trang ⇄ Cảng du lịch / VinWonders",
    subtitle: "Áp dụng khu vực Bắc & Tây Nha Trang",
  },
  {
    category: "local",
    route: "BAI_DAI_VINWONDER",
    icon: "beach_access",
    title: "Resort Bãi Dài / Sân bay ⇄ Cảng du lịch / VinWonders",
    subtitle: "Kết nối thẳng khu resort Bãi Dài & Cảng VinWonders",
  },
  {
    category: "local",
    route: "NT_CENTER_BAI_DAI",
    icon: "apartment",
    title: "Nha Trang ⇄ Resort Cam Ranh / Bãi Dài",
    subtitle: "Mövenpick, Alma, Fusion, Duyên Hà, The Anam...",
  },
  {
    category: "local",
    route: "NT_CENTER_BA_HO",
    icon: "landscape",
    title: "Nha Trang ⇄ Ba Hồ",
    subtitle: "Giá trọn gói 1 chiều • Chưa bao gồm vé vào cổng",
  },
  {
    category: "local",
    route: "NT_CENTER_DOC_LET",
    icon: "beach_access",
    title: "Nha Trang ⇄ Dốc Lết",
    subtitle: "Giá trọn gói 1 chiều • Bao gồm cầu đường, VAT",
  },
  {
    category: "local",
    route: "NT_CENTER_YANG_BAY",
    icon: "park",
    title: "Nha Trang ⇄ Yang Bay",
    subtitle: "Giá trọn gói 1 chiều • Chưa bao gồm vé khu du lịch",
  },
  {
    category: "local",
    route: "NT_CENTER_CITY_10H",
    icon: "schedule",
    title: "City tour Nha Trang trọn ngày (10 tiếng)",
    subtitle: "Tham quan nội thành theo lịch trình riêng",
  },
  {
    category: "local",
    route: "NT_CENTER_CITY_1H",
    icon: "timer",
    title: "City tour Nha Trang theo giờ (1 giờ)",
    subtitle: "Thuê xe linh hoạt theo giờ trong nội thành",
  },
  // 3. Tuyến Liên Tỉnh
  {
    category: "intercity",
    route: "NT_CENTER_TUY_HOA",
    icon: "map",
    title: "Nha Trang ⇄ Phú Yên (Tuy Hòa)",
    subtitle: "Xe riêng đón tận nơi • Bao gồm cầu đường",
  },
  {
    category: "intercity",
    route: "NT_CENTER_MUI_NE",
    icon: "beach_access",
    title: "Nha Trang / Cam Ranh ⇄ Mũi Né",
    subtitle: "Tuyến cao tốc / ven biển • Xe riêng 1 chiều",
  },
  {
    category: "intercity",
    route: "NT_CENTER_HCM",
    icon: "location_city",
    title: "Nha Trang / Cam Ranh ⇄ TP.HCM",
    subtitle: "Đưa đón tận nơi • Bao gồm phí cao tốc, cầu đường",
  },
  {
    category: "intercity",
    route: "NT_CENTER_DALAT",
    icon: "landscape",
    title: "Nha Trang ⇄ Đà Lạt",
    subtitle: "Cung đèo Khánh Lê • Xe riêng đời mới",
  },
  {
    category: "intercity",
    route: "NT_CENTER_QUY_NHON",
    icon: "directions_car",
    title: "Nha Trang / Sân bay Cam Ranh → Quy Nhơn",
    subtitle: "Tuyến 1 chiều • Bao gồm cầu đường",
  },
  {
    category: "intercity",
    route: "NT_CENTER_DANANG",
    icon: "location_city",
    title: "Nha Trang ⇄ Đà Nẵng",
    subtitle: "Xe riêng đường dài • Hỗ trợ dừng nghỉ theo yêu cầu",
  },
  {
    category: "intercity",
    route: "NT_CENTER_DALAT_2D1N",
    icon: "tour",
    title: "Tour Đà Lạt 2 ngày 1 đêm",
    subtitle: "Trọn gói xe phục vụ lịch trình 2N1Đ",
  },
  {
    category: "intercity",
    route: "NT_CENTER_DALAT_1D",
    icon: "tour",
    title: "Tour Đà Lạt trong ngày",
    subtitle: "Đi về trong ngày • Xe riêng đón tận nơi",
  },
  {
    category: "intercity",
    route: "HCM_MUI_NE",
    icon: "directions_car",
    title: "TP.HCM ⇄ Mũi Né",
    subtitle: "Cao tốc Dầu Giây – Phan Thiết • Bao gồm cầu đường",
  },
];

export function TransfersFareTable() {
  const [routeTab, setRouteTab] = useState<RouteCategory>("airport");
  const { products, fares } = useSiteData();
  const catalog = useCatalog();
  const visibleRows = fareRows.filter((row) => row.category === routeTab);

  const openRouteBooking = (route: string, title: string) => {
    const product = products.find(
      (p) => p.id === `transfer-${route}-4cho`,
    ) || {
      id: `transfer-${route}-4cho`,
      type: "transfer" as const,
      title,
      price:
        fares.find((f) => f.route === route && f.vehicle === "4cho")?.price ||
        300000,
      image: "",
      location: title,
      rating: 5,
      description: "",
    };
    catalog.open(product);
  };

  return (
    <section className="w-full py-16 bg-surface-container-low/50">
      <div className="site-container">
        <div className="mb-6">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            <ContentText contentKey="transfers.text-071" />
          </span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface mt-1">
            <ContentText contentKey="transfers.text-072" />
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Áp dụng theo bảng giá bán lẻ đề xuất {brand.name} (Đơn vị: VNĐ/chặng/xe).
          </p>
        </div>

        <div
          className="flex flex-wrap items-center gap-2.5 mb-6"
          role="group"
          aria-label="Nhóm tuyến đường"
        >
          {routeTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={routeTab === tab.id}
              onClick={() => setRouteTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-label-lg text-label-lg font-bold transition-colors ${
                routeTab === tab.id
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-lowest border border-border-light text-on-surface hover:border-primary/50"
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="w-full bg-surface-container-lowest rounded-3xl border border-border-light shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-on-surface font-label-lg text-label-lg">
                  <th className="py-4 px-6">Lộ trình / dịch vụ</th>
                  <th className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[18px] text-primary"
                        aria-hidden="true"
                      >
                        directions_car
                      </span>
                      <span>Xe 4–5 chỗ</span>
                      <span className="font-body-sm text-body-sm text-outline font-normal">
                        Sedan 3 khách
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[18px] text-primary"
                        aria-hidden="true"
                      >
                        airport_shuttle
                      </span>
                      <span>Xe 7 chỗ</span>
                      <span className="font-body-sm text-body-sm text-outline font-normal">
                        MPV / SUV 5 khách
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[18px] text-primary"
                        aria-hidden="true"
                      >
                        directions_bus
                      </span>
                      <span>Xe 16 chỗ</span>
                      <span className="font-body-sm text-body-sm text-outline font-normal">
                        Transit / Solati
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light/50 font-body-md text-body-md">
                {visibleRows.map((row) => (
                  <tr
                    key={row.route}
                    className="hover:bg-surface-subtle transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0"
                          aria-hidden="true"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {row.icon}
                          </span>
                        </span>
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md text-on-surface">
                            {row.title}
                          </span>
                          <span className="font-body-sm text-body-sm text-outline">
                            {row.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-on-surface">
                      <FareValue route={row.route} vehicle="4cho" />
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-on-surface">
                      <FareValue route={row.route} vehicle="7cho" />
                    </td>
                    <td className="py-4 px-6 text-center font-extrabold text-sale-crimson">
                      <FareValue route={row.route} vehicle="16cho" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => openRouteBooking(row.route, row.title)}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold transition-all shadow-sm action-link"
                      >
                        <span>Đặt xe</span>
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-surface-container px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-on-surface-variant font-body-sm text-body-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">
                info
              </span>
              <span>
                <strong>Ghi chú:</strong> Giá bán lẻ đề xuất đã bao gồm cầu
                đường, phí vào cổng sân bay. Đón/tiễn từ 21:00–06:00 phụ thu
                50.000đ/xe/chiều.
              </span>
            </div>
            <span className="text-secondary font-semibold shrink-0">
              Cập nhật bảng giá {brand.name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
