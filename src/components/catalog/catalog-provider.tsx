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
import { CatalogContext } from "./catalog-context";
import { BookingDialogContent } from "./booking-dialog";
import { ToastNotification } from "./toast-notification";

export function CatalogProvider({ children }: { children: ReactNode }) {
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

  const closeDialog = () => {
    setSelected(null);
  };

  return (
    <CatalogContext.Provider value={{ open: openProduct }}>
      {children}
      <ToastNotification message={message} onClose={() => setMessage("")} />
      <dialog
        ref={dialog}
        aria-labelledby="catalog-dialog-title"
        onCancel={closeDialog}
        className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl p-5 text-on-surface shadow-2xl backdrop:bg-dialog-scrim/50 sm:p-6"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id="catalog-dialog-title" className="text-headline-md">
            Yêu cầu đặt chỗ
          </h2>
          <button
            type="button"
            aria-label="Đóng"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl text-on-surface-variant transition-colors hover:bg-surface-muted hover:text-on-surface"
            onClick={closeDialog}
          >
            ×
          </button>
        </div>
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
