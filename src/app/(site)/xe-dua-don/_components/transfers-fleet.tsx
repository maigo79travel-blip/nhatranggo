"use client";
import { ContentText, ContentElement, FareValue } from "@/components/content";

const fleetVehicles = [
  {
    vehicle: "4cho",
    imgAttr: "transfers.attributes-015",
    badge: "transfers.text-106",
    title: "transfers.text-107",
    models: "transfers.text-108",
    specs: ["transfers.text-109", "transfers.text-110", "transfers.text-111", "transfers.text-112"],
    ctaAttr: "transfers.attributes-016",
    ctaText: "transfers.text-115",
  },
  {
    vehicle: "7cho",
    imgAttr: "transfers.attributes-017",
    badge: "transfers.text-116",
    title: "transfers.text-117",
    models: "transfers.text-118",
    specs: ["transfers.text-119", "transfers.text-120", "transfers.text-121", "transfers.text-122"],
    ctaAttr: "transfers.attributes-018",
    ctaText: "transfers.text-125",
  },
  {
    vehicle: "16cho",
    imgAttr: "transfers.attributes-021",
    badge: "transfers.text-136",
    title: "transfers.text-137",
    models: "transfers.text-138",
    specs: ["transfers.text-139", "transfers.text-140", "transfers.text-141", "transfers.text-142"],
    ctaAttr: "transfers.attributes-022",
    ctaText: "transfers.text-145",
  },
] as const;

export function TransfersFleet() {
  return (
    <section className="w-full py-16 bg-background">
      <div className="site-container">
        <div className="text-center mx-auto mb-12 max-w-2xl">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            <ContentText contentKey="transfers.text-103" />
          </span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface mt-1">
            <ContentText contentKey="transfers.text-104" />
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3">
            <ContentText contentKey="transfers.text-105" />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fleetVehicles.map((item) => (
            <div
              key={item.vehicle}
              className="bg-surface-container-lowest rounded-2xl border border-border-light shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
                <ContentElement
                  contentKey={item.imgAttr}
                  tag="img"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/95 font-label-sm text-label-sm text-primary font-bold shadow-sm">
                  <ContentText contentKey={item.badge} />
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-title-md text-lg text-on-surface font-extrabold">
                    <ContentText contentKey={item.title} />
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    <ContentText contentKey={item.models} />
                  </p>
                  <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-border-light/70 text-xs text-on-surface">
                    {item.specs.map((specKey) => (
                      <div key={specKey} className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-primary shrink-0">
                          check_circle
                        </span>
                        <span className="truncate">
                          <ContentText contentKey={specKey} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border-light/70 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-outline block">Chỉ từ</span>
                    <span className="text-lg text-primary font-extrabold">
                      <FareValue route="CXR_NT_CENTER" vehicle={item.vehicle} />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const chip = document.querySelector<HTMLButtonElement>(
                        `.vehicle-chip[data-veh="${item.vehicle}"]`,
                      );
                      chip?.click();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-4 py-2 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary font-label-md text-label-md font-bold text-on-surface transition-all"
                  >
                    <ContentText contentKey={item.ctaText} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
