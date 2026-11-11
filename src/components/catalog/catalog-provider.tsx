"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { ListingFilters } from "@/components/listing-filters";
import { useSiteData } from "@/components/content";
import { CatalogContext } from "./catalog-context";
import { BookingDialogContent } from "./booking-dialog";
import { FavoritesDialogContent } from "./favorites-dialog";
import { ToastNotification } from "./toast-notification";
import { MobileNav } from "./mobile-nav";
import { TransferLogic } from "./transfer-logic";

export function CatalogProvider({
  products,
  children,
}: {
  products: Product[];
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesReady, setFavoritesReady] = useState(false);
  const [panel, setPanel] = useState<"" | "favorites">("");
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { content } = useSiteData();
  const contact = content["site.contact"]?.value as
    { phone: string } | undefined;

  async function postJson(url: string, body: unknown) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw Error(data.error);
    return data;
  }

  const toggle = async (id: string) => {
    try {
      const result = await postJson("/api/favorites", {
        productId: id,
        favorite: !favorites.includes(id),
      });
      setFavorites(result.ids);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  useEffect(() => {
    document.body.dataset.hydrated = "true";
    let live = true;
    void (async () => {
      try {
        const response = await fetch("/api/favorites");
        const result = await response.json();
        if (!response.ok) throw Error(result.error);
        if (!live) return;
        setFavorites(result.ids);

        // Import preferences from legacy browser-only storage once
        const legacy: unknown = JSON.parse(
          localStorage.getItem("booking-favorites") || "[]",
        );
        if (Array.isArray(legacy)) {
          for (const id of legacy
            .filter((id) => typeof id === "string")
            .slice(0, 100)) {
            if (!result.ids.includes(id)) {
              const imported = await postJson("/api/favorites", {
                productId: id,
                favorite: true,
              });
              result.ids = imported.ids;
            }
          }
          localStorage.removeItem("booking-favorites");
        }
        if (live) setFavorites(result.ids);
      } catch (error) {
        if (live) setMessage((error as Error).message);
      } finally {
        if (live) {
          setFavoritesReady(true);
          document.body.dataset.favoritesReady = "true";
        }
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    setSelected(null);
    setPanel("");
    setMessage("");
  }, [pathname]);

  useEffect(() => {
    if (selected || panel) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [selected, panel]);

  useEffect(() => {
    const header = document.querySelector("header nav");
    header?.querySelectorAll("a").forEach((a) => {
      const active = a.getAttribute("href") === pathname;
      a.classList.toggle("bg-primary", active);
      a.classList.toggle("text-on-primary", active);
      a.classList.toggle("text-on-surface-variant", !active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    const click = async (event: MouseEvent) => {
      const el = (event.target as HTMLElement).closest<HTMLElement>("button,a");
      if (!el) return;
      const href = el.getAttribute("href");
      const text = el.textContent?.trim() || "";

      if (href === "#yeu-thich") {
        event.preventDefault();
        setPanel("favorites");
      }

      if (el.closest("footer") && text === "Gửi") {
        const input = el.parentElement?.querySelector("input");
        if (!input) return;
        event.preventDefault();
        if (!input.value || !input.checkValidity()) {
          input.reportValidity();
          return;
        }
        try {
          await postJson("/api/subscribe", { email: input.value });
          setMessage("Đã đăng ký nhận ưu đãi!");
          input.value = "";
        } catch (e) {
          setMessage((e as Error).message);
        }
      }

      if (el.matches(".search-tab-btn")) {
        document.querySelectorAll(".search-tab-btn").forEach((b) => {
          const active = b === el;
          b.classList.toggle("bg-primary", active);
          b.classList.toggle("text-on-primary", active);
          b.classList.toggle("bg-surface-container", !active);
          b.classList.toggle("text-on-surface-variant", !active);
          b.setAttribute("aria-selected", String(active));
        });
      }

      if (el.matches(".tour-cat-btn")) {
        document.querySelectorAll(".tour-cat-btn").forEach((b) => {
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

      if (/Giá thấp nhất|Đánh giá cao nhất|Ưu đãi tốt nhất/.test(text)) {
        const cards = Array.from(
          document.querySelectorAll<HTMLElement>("[data-product-id]"),
        );
        const groups = new Map<HTMLElement, HTMLElement[]>();
        for (const card of cards) {
          if (card.parentElement) {
            const group = groups.get(card.parentElement) || [];
            group.push(card);
            groups.set(card.parentElement, group);
          }
        }
        for (const [parent, list] of groups) {
          list.sort((a, b) => {
            const x = products.find((p) => p.id === a.dataset.productId)!;
            const y = products.find((p) => p.id === b.dataset.productId)!;
            return text.includes("Giá")
              ? x.price - y.price
              : text.includes("Đánh giá")
                ? y.rating - x.rating
                : products.indexOf(x) - products.indexOf(y);
          });
          list.forEach((card) => parent.appendChild(card));
        }
      }

      if (/Tìm kiếm|Tìm Kiếm|Tìm tour ngay/.test(text)) {
        event.preventDefault();
        const form = el.closest("form") || document.querySelector("form");
        const query =
          form?.querySelector<HTMLInputElement>("input[type=text]")?.value ||
          "";
        if (pathname === "/") {
          const target = document
            .querySelector(".search-tab-btn[aria-selected=true]")
            ?.getAttribute("data-target");
          router.push(
            `${target === "tour-tab" || target === "ticket-tab" ? "/tour-hang-ngay" : "/khach-san"}?q=${encodeURIComponent(query)}`,
          );
        } else {
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

      if (el.matches("header button") && text === "EN" && contact?.phone) {
        setMessage(
          `Hiện tại website hỗ trợ tiếng Việt. Hotline hỗ trợ tiếng Anh: ${contact.phone}.`,
        );
      }
    };

    const submit = (event: SubmitEvent) => event.preventDefault();
    document.addEventListener("click", click);
    document.addEventListener("submit", submit);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("submit", submit);
    };
  }, [pathname, products, router, contact?.phone]);

  const closeDialog = () => {
    setSelected(null);
    setPanel("");
  };

  return (
    <CatalogContext.Provider
      value={{ products, open: setSelected, favorites, toggle }}
    >
      {children}
      <ListingFilters products={products} />
      <MobileNav />
      {pathname === "/xe-dua-don" && (
        <TransferLogic onBook={setSelected} onMessage={setMessage} />
      )}
      <ToastNotification message={message} onClose={() => setMessage("")} />
      <dialog
        ref={dialog}
        onCancel={closeDialog}
        className="w-[calc(100%-2rem)] max-w-lg rounded-2xl p-6 text-on-surface shadow-2xl backdrop:bg-on-background/50"
      >
        <button
          aria-label="Đóng"
          className="float-right text-2xl px-2"
          onClick={closeDialog}
        >
          ×
        </button>
        <h2 className="text-headline-md mb-4">
          {selected ? "Yêu cầu đặt chỗ" : "Danh sách yêu thích"}
        </h2>
        {selected && (
          <BookingDialogContent product={selected} onError={setMessage} />
        )}
        {panel === "favorites" && (
          <FavoritesDialogContent
            products={products}
            favorites={favorites}
            favoritesReady={favoritesReady}
            onSelectProduct={(p) => {
              setPanel("");
              setSelected(p);
            }}
          />
        )}
      </dialog>
    </CatalogContext.Provider>
  );
}
