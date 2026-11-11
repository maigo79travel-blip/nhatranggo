"use client";
import { createContext, useContext } from "react";
import type { Product } from "@/lib/types";

export type CatalogContextType = {
  products: Product[];
  open: (p: Product) => void;
  favorites: string[];
  toggle: (id: string) => void;
};

export const CatalogContext = createContext<CatalogContextType>({
  products: [],
  open: () => {},
  favorites: [],
  toggle: () => {},
});

export const useCatalog = () => useContext(CatalogContext);
