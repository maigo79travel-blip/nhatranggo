"use client";
import { useEffect } from "react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/types";

export function TransferLogic({
  onBook,
  onMessage,
}: {
  onBook: (p: Product) => void;
  onMessage: (m: string) => void;
}) {
  useEffect(() => {
    let vehicle = "4cho";
    let current: Product | null = null;
    let sequence = 0;
    const pickup = document.querySelector<HTMLSelectElement>("#pickup-select");
    const dropoff =
      document.querySelector<HTMLSelectElement>("#dropoff-select");

    const update = async () => {
      if (!pickup || !dropoff) return;
      const request = ++sequence;
      current = null;
      const price = document.querySelector("#route-price");
      if (price) price.textContent = "Đang tải…";

      try {
        const res = await fetch(
          `/api/fares?${new URLSearchParams({ pickup: pickup.value, dropoff: dropoff.value, vehicle })}`,
        );
        const data = await res.json();
        if (request !== sequence) return;
        if (!res.ok) throw Error(data.error);

        const title = `${pickup.selectedOptions[0].text} ⇄ ${dropoff.selectedOptions[0].text}`;
        const route = document.querySelector("#route-text");
        if (route) route.textContent = title;
        if (price) price.textContent = money(data.price);

        current = {
          id: data.productId,
          type: "transfer",
          title,
          price: data.price,
          image: "",
          location: title,
          rating: 5,
          description: "",
        };
      } catch (e) {
        if (request === sequence && price) {
          price.textContent = (e as Error).message;
        }
      }
    };

    const click = async (event: MouseEvent) => {
      const el = (event.target as HTMLElement).closest<HTMLElement>("button,a");
      if (!el) return;

      if (el.matches(".vehicle-chip")) {
        vehicle = el.dataset.veh || "4cho";
        document.querySelectorAll(".vehicle-chip").forEach((b) => {
          b.setAttribute("aria-pressed", String(b === el));
          b.classList.toggle("bg-primary", b === el);
          b.classList.toggle("text-on-primary", b === el);
          b.classList.toggle("bg-surface-container", b !== el);
        });
        const label = document.querySelector("#selected-vehicle-label");
        if (label) label.textContent = el.dataset.name || "";
        void update();
      }

      if (el.matches(".tab-btn") && pickup && dropoff) {
        document.querySelectorAll(".tab-btn").forEach((button) => {
          const active = button === el;
          button.setAttribute("aria-pressed", String(active));
          button.classList.toggle("bg-primary", active);
          button.classList.toggle("text-on-primary", active);
          button.classList.toggle("bg-surface-container", !active);
          button.classList.toggle("text-on-surface-variant", !active);
        });
        pickup.value = el.dataset.tab === "tab-airport" ? "CXR" : "NT_CENTER";
        dropoff.value =
          el.dataset.tab === "tab-intercity"
            ? "DALAT"
            : el.dataset.tab === "tab-airport"
              ? "NT_CENTER"
              : "BAI_DAI";
        void update();
      }

      if (el.id === "btn-search-fare") {
        event.preventDefault();
        await update();
        if (current) onBook(current);
        return;
      }

      if (
        el.tagName === "A" &&
        el.getAttribute("href")?.startsWith("https://")
      ) {
        return;
      }

      if (
        /Đặt xe|Đặt Xe|Đặt Ngay|Đặt ngay|Giữ chỗ/.test(el.textContent || "")
      ) {
        event.preventDefault();
        if (current) onBook(current);
        else onMessage("Vui lòng chọn tuyến có báo giá trước khi đặt xe.");
      }
    };

    pickup?.addEventListener("change", update);
    dropoff?.addEventListener("change", update);
    document.addEventListener("click", click);
    void update();

    return () => {
      sequence++;
      pickup?.removeEventListener("change", update);
      dropoff?.removeEventListener("change", update);
      document.removeEventListener("click", click);
    };
  }, [onBook, onMessage]);

  return null;
}
