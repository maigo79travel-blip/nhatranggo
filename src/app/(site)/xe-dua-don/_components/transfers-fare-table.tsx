"use client";

import { useState } from "react";
import Link from "next/link";
import { useSiteData } from "@/components/content";
import { useCatalog } from "@/components/catalog/catalog-context";
import brand from "@/config/brand.json";
import { money } from "@/lib/types";
import { transferRoutes, transferVehicles } from "./transfer-options";
import { TransferHeading, TransferIcon } from "./transfers-ui";

type RouteCategory = (typeof transferRoutes)[number]["id"];

const fareRows: {
  category: RouteCategory;
  route: string;
  icon: string;
  title: string;
  subtitle: string;
}[] = [
  {
    category: "airport",
    route: "CXR_NT_CENTER",
    icon: "flight_takeoff",
    title: "Sân bay Cam Ranh ⇄ Trung tâm Nha Trang",
    subtitle: "Đón tiễn sân bay • Bao gồm phí cổng sân bay, cầu đường, VAT",
  },
  {
    category: "airport",
    route: "CXR_BAI_DAI",
    icon: "flight_takeoff",
    title: "Sân bay Cam Ranh ⇄ Resort Bãi Dài (Cam Lâm)",
    subtitle: "Mövenpick, Alma, Radisson Blu, The Anam…",
  },
  {
    category: "airport",
    route: "CXR_NT_NORTH_WEST",
    icon: "flight_land",
    title: "Sân bay Cam Ranh ⇄ Bắc Nha Trang / Tây Nha Trang",
    subtitle: "Khu vực Vĩnh Hải, Vĩnh Hòa, Diên Khánh • Bao gồm cầu đường, VAT",
  },
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
  const fareByProduct = new Map(
    fares.map((fare) => [`transfer-${fare.route}-${fare.vehicle}`, fare.price]),
  );
  const productById = new Map(products.map((product) => [product.id, product]));
  const visibleRows = fareRows.filter((row) => row.category === routeTab);

  return (
    <section className="transfer-section">
      <div className="site-container">
        <TransferHeading
          eyebrow="transfers.text-071"
          titleKey="transfers.text-072"
          accent="& Liên Tỉnh Niêm Yết"
          underline
        >
          <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
            Bảng giá bán lẻ đề xuất {brand.name}, tính theo chặng và loại xe.
          </p>
        </TransferHeading>

        <div
          className="my-7 flex flex-wrap gap-2 sm:my-8"
          role="group"
          aria-label="Nhóm tuyến đường"
        >
          {transferRoutes.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={routeTab === tab.id}
              onClick={() => setRouteTab(tab.id)}
              className="transfer-pill"
            >
              <TransferIcon className="text-lg">{tab.icon}</TransferIcon>
              {tab.tableLabel}
            </button>
          ))}
        </div>

        <div className="rounded-[22px] bg-surface p-3 sm:p-5">
          <p className="mb-2 px-2 text-xs text-on-surface-variant min-[1040px]:hidden">
            Cuộn ngang để xem giá từng loại xe.
          </p>
          <div
            className="overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="Bảng giá xe theo lộ trình"
          >
            <table className="transfer-fare-table w-full text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[45%] rounded-l-2xl text-left">
                    Lộ trình / Tuyến đường phổ biến
                  </th>
                  {transferVehicles.map((vehicle) => (
                    <th scope="col" key={vehicle.id}>
                      <TransferIcon className="mb-1 block text-lg">
                        {vehicle.icon}
                      </TransferIcon>
                      <span className="block">{vehicle.label}</span>
                      <span className="mt-1 block text-xs font-normal">
                        {vehicle.detail}
                      </span>
                    </th>
                  ))}
                  <th scope="col" className="rounded-r-2xl">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => {
                  const offers = transferVehicles.map((vehicle) => {
                    const id = `transfer-${row.route}-${vehicle.id}`;
                    const price = fareByProduct.get(id);
                    const product = productById.get(id);
                    return {
                      vehicle,
                      product:
                        product && price !== undefined
                          ? { ...product, price }
                          : null,
                    };
                  });
                  const offer = offers.find((option) => option.product);
                  const booking = offer?.product
                    ? {
                        ...offer.product,
                        title: `${row.title} · ${offer.vehicle.label}`,
                      }
                    : null;
                  return (
                    <tr key={row.route}>
                      <td>
                        <div className="flex items-center gap-3">
                          <TransferIcon className="transfer-feature-icon text-xl">
                            {row.icon}
                          </TransferIcon>
                          <div>
                            <p className="font-bold">{row.title}</p>
                            <p className="mt-1 text-sm text-on-surface-variant">
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </td>
                      {offers.map(({ vehicle, product }) => (
                        <td
                          key={vehicle.id}
                          className={
                            vehicle.id === "limo9" && product
                              ? "font-bold text-sale-price"
                              : "font-bold"
                          }
                        >
                          {product ? money(product.price) : "—"}
                        </td>
                      ))}
                      <td>
                        {booking ? (
                          <button
                            className="transfer-button"
                            type="button"
                            onClick={() => catalog.open(booking)}
                          >
                            Đặt xe{" "}
                            <TransferIcon className="text-base">
                              arrow_forward
                            </TransferIcon>
                          </button>
                        ) : (
                          <Link className="transfer-button" href="/lien-he">
                            Liên hệ
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-2 rounded-2xl bg-surface-muted px-5 py-4 text-sm text-on-surface-variant">
            <p>
              Giá bao gồm cầu đường và phí vào cổng sân bay. Đón/tiễn từ 21:00
              đến 06:00 phụ thu 50.000đ/xe/chiều.
            </p>
            <p className="font-semibold text-primary">
              Cập nhật bảng giá {brand.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
