"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { BookingDraft } from "@/modules/travel/search";
import type { Product } from "@/lib/types";
import { ListingFilters } from "@/components/listing-filters";
import { useSiteData } from "@/components/content";
import { CatalogContext } from "./catalog-context";
import { BookingDialogContent } from "./booking-dialog";
import { ToastNotification } from "./toast-notification";
import { sortCatalogCards } from "./sort-cards";

export function CatalogProvider({
  products,
  children,
}: {
  products: Product[];
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<Product | null>(null);
  const [initialValues, setInitialValues] = useState<BookingDraft>({});
  const openProduct = useCallback(
    (product: Product, values: BookingDraft = {}) => {
      setInitialValues(values);
      setSelected(product);
    },
    [],
  );
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const { content } = useSiteData();
  const contact = content["site.contact"]?.value as
    { phone: string } | undefined;

  useEffect(() => {
    document.body.dataset.hydrated = "true";
    return () => {
      delete document.body.dataset.hydrated;
    };
  }, []);

  useEffect(() => {
    setSelected(null);
    setMessage("");
  }, [pathname]);

  useEffect(() => {
    if (selected) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    } else {
      dialog.current?.close();
    }
  }, [selected]);

  useEffect(() => {
    const click = (event: MouseEvent) => {
      const el = (event.target as HTMLElement).closest<HTMLElement>("button,a");
      if (!el) return;
      const text = el.textContent?.trim() || "";

      if (el.matches(".tour-cat-btn")) {
        document.querySelectorAll(".tour-cat-btn").forEach((b) => {
          b.setAttribute("aria-pressed", String(b === el));
          b.classList.toggle("bg-primary", b === el);
          b.classList.toggle("text-on-primary", b === el);
        });
        const category = el.dataset.category || "all";
        const categoryTerms: Record<string, string[]> = {
          "dao-nha-trang": ["đảo", "hòn mun", "hòn tằm"],
          "du-thuyen": ["du thuyền"],
          "lan-bien": ["lặn", "scuba", "seawalker"],
          "vinh-hy": ["vĩnh hy"],
          city: ["city", "tháp bà"],
          "da-lat": ["đà lạt"],
        };
        document
          .querySelectorAll<HTMLElement>("[data-product-id]")
          .forEach((card) => {
            const match =
              category === "all" ||
              (categoryTerms[category] || []).some((term) =>
                card.textContent?.toLowerCase().includes(term),
              );
            card.dataset.filterHidden = String(!match);
          });
      }

      if (el.closest("[data-product-id]")) return;

      if (
        pathname !== "/khach-san" &&
        /Giá thấp nhất|Đánh giá cao nhất|Ưu đãi tốt nhất/.test(text)
      ) {
        const cards = Array.from(
          document.querySelectorAll<HTMLElement>("[data-product-id]"),
        );
        sortCatalogCards(
          cards,
          products,
          text.includes("Giá")
            ? "price"
            : text.includes("Đánh giá")
              ? "rating"
              : "recommended",
        );
      }

      if (
        pathname !== "/" &&
        pathname !== "/khach-san" &&
        /Tìm kiếm|Tìm Kiếm|Tìm tour ngay/.test(text)
      ) {
        event.preventDefault();
        const form = el.closest("form") || document.querySelector("form");
        const query =
          form?.querySelector<HTMLInputElement>("input[type=text]")?.value ||
          "";
        const q = query.toLowerCase();
        let count = 0;
        document
          .querySelectorAll<HTMLElement>("[data-product-id]")
          .forEach((card) => {
            const product = products.find(
              (p) => p.id === card.dataset.productId,
            );
            const visible =
              !q ||
              q.includes("khánh hòa") ||
              q.includes("nha trang") ||
              `${product?.title} ${product?.location}`
                .toLowerCase()
                .includes(q);
            card.dataset.filterHidden = String(!visible);
            if (visible) count++;
          });
        setMessage(`Tìm thấy ${count} dịch vụ phù hợp.`);
      }

      if (el.matches(".faq-toggle")) {
        const item = el.closest(".faq-item");
        const content = item?.querySelector(".faq-content");
        content?.classList.toggle("hidden");
        el.setAttribute(
          "aria-expanded",
          String(!content?.classList.contains("hidden")),
        );
      }

      if (el.matches("a[data-action=details]")) {
        event.preventDefault();
        const card = el.closest("article");
        if (!card && contact?.phone) {
          setMessage(`Liên hệ ${contact.phone} để được tư vấn dịch vụ này.`);
        }
      }
    };

    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
    };
  }, [pathname, products, contact?.phone]);

  const closeDialog = () => {
    setSelected(null);
  };

  return (
    <CatalogContext.Provider value={{ products, open: openProduct }}>
      {children}
      <ListingFilters products={products} />
      <ToastNotification message={message} onClose={() => setMessage("")} />
      <dialog
        ref={dialog}
        aria-labelledby="catalog-dialog-title"
        onCancel={closeDialog}
        className="w-[calc(100%-2rem)] max-w-lg rounded-2xl p-6 text-on-surface shadow-2xl backdrop:bg-dialog-scrim/50"
      >
        <button
          aria-label="Đóng"
          className="float-right min-h-11 min-w-11 text-2xl"
          onClick={closeDialog}
        >
          ×
        </button>
        <h2 id="catalog-dialog-title" className="text-headline-md mb-4">
          Yêu cầu đặt chỗ
        </h2>
        {selected && (
          <BookingDialogContent
            key={selected.id}
            product={selected}
            initialValues={initialValues}
            onError={setMessage}
          />
        )}
      </dialog>
    </CatalogContext.Provider>
  );
}
