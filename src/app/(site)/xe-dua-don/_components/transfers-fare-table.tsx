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

export function TransfersFareTable() {
  const [routeTab, setRouteTab] = useState<RouteCategory>("airport");
  const { products, fares, transferRoutes: routes } = useSiteData();
  const catalog = useCatalog();
  const fareByProduct = new Map(
    fares.map((fare) => [`transfer-${fare.route}-${fare.vehicle}`, fare.price]),
  );
  const productById = new Map(products.map((product) => [product.id, product]));
  const visibleRows = routes.filter((row) => row.category === routeTab);
  const routeIcon =
    transferRoutes.find((route) => route.id === routeTab)?.icon || "route";

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
                {!visibleRows.length && (
                  <tr>
                    <td colSpan={transferVehicles.length + 2}>
                      Chưa có tuyến xe trong nhóm này.
                    </td>
                  </tr>
                )}
                {visibleRows.map((row) => {
                  const offers = transferVehicles.map((vehicle) => {
                    const id = `transfer-${row.code}-${vehicle.id}`;
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
                    <tr key={row.code}>
                      <td>
                        <div className="flex items-center gap-3">
                          <TransferIcon className="transfer-feature-icon text-xl">
                            {routeIcon}
                          </TransferIcon>
                          <p className="font-bold">{row.title}</p>
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
