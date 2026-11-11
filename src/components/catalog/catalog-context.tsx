"use client";
import { createContext, useContext } from "react";
import type { BookingDraft } from "@/modules/travel/search";
import type { Product } from "@/lib/types";

type CatalogContextType = {
  products: Product[];
  open: (p: Product, initialValues?: BookingDraft) => void;
};

export const CatalogContext = createContext<CatalogContextType>({
  products: [],
  open: () => {},
});

export const useCatalog = () => useContext(CatalogContext);
