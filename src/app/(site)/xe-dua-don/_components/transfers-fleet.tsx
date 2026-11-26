"use client";

import { ContentText, ContentElement, FareValue } from "@/components/content";
import { defaultRoute, quoteAnchor } from "./transfer-options";
import { TransferHeading, TransferIcon } from "./transfers-ui";
import { useTransferVehicle } from "./transfers-vehicle-selection";

const fleetVehicles = [
  {
    vehicle: "4cho",
    imgAttr: "transfers.attributes-015",
    badge: "transfers.text-106",
    title: "transfers.text-107",
    models: "transfers.text-108",
    specs: [
      "transfers.text-109",
      "transfers.text-110",
      "transfers.text-111",
      "transfers.text-112",
    ],
  },
  {
    vehicle: "7cho",
    imgAttr: "transfers.attributes-017",
    badge: "transfers.text-116",
    title: "transfers.text-117",
    models: "transfers.text-118",
    specs: [
      "transfers.text-119",
      "transfers.text-120",
      "transfers.text-121",
      "transfers.text-122",
    ],
  },
  {
    vehicle: "16cho",
    imgAttr: "transfers.attributes-021",
    badge: "transfers.text-136",
    title: "transfers.text-137",
    models: "transfers.text-138",
    specs: [
      "transfers.text-139",
      "transfers.text-140",
      "transfers.text-141",
      "transfers.text-142",
    ],
  },
] as const;

export function TransfersFleet() {
  const { selectVehicle } = useTransferVehicle();
  return (
    <section className="transfer-section transfer-fleet">
      <div className="site-container">
        <TransferHeading
          eyebrow="transfers.text-103"
          titleKey="transfers.text-104"
          accent="Đời Mới Cao Cấp"
          centered
          underline
        >
          <p className="mx-auto mt-5 max-w-[66ch] text-base leading-relaxed text-on-surface-variant sm:text-lg">
            <ContentText contentKey="transfers.text-105" />
          </p>
        </TransferHeading>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {fleetVehicles.map((item) => (
            <article
              key={item.vehicle}
              className="flex flex-col overflow-hidden rounded-[20px] border border-brand-light bg-surface"
            >
              <div className="relative aspect-[1.75] overflow-hidden bg-surface-tinted">
                <ContentElement
                  contentKey={item.imgAttr}
                  tag="img"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 text-xs font-bold text-primary sm:text-sm">
                  <ContentText contentKey={item.badge} />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-[18px]">
                <h3 className="text-lg font-bold">
                  <ContentText contentKey={item.title} />
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  <ContentText contentKey={item.models} />
                </p>
                <ul className="my-4 grid grid-cols-2 gap-2 text-xs">
                  {item.specs.map((specKey) => (
                    <li key={specKey} className="flex items-start gap-1">
                      <TransferIcon className="text-sm text-primary">
                        check
                      </TransferIcon>
                      <ContentText contentKey={specKey} />
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <span className="block text-sm text-on-surface-variant">
                      Giá tuyến sân bay
                    </span>
                    <span className="text-xl font-bold text-primary">
                      <FareValue
                        route={`${defaultRoute.pickup}_${defaultRoute.dropoff}`}
                        vehicle={item.vehicle}
                      />
                    </span>
                  </div>
                  <a
                    href={quoteAnchor}
                    onClick={() => selectVehicle(item.vehicle)}
                    className="transfer-pill transfer-pill-muted px-3"
                  >
                    Chọn xe này
                    <span className="sr-only">
                      {" "}
                      — <ContentText contentKey={item.title} />
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
