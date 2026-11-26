import type { Locale } from "./locale";

export type ContentEntry = {
  kind: "text" | "attributes" | "settings";
  label: string;
  value: unknown;
};

export type Product = {
  id: string;
  type: string;
  title: string;
  price: number;
  image: string;
  location: string;
  rating: number;
  description: string;
  original_price?: number | null;
  collection_id?: string | null;
  template_id?: string | null;
  featured?: boolean;
  active?: boolean;
  position?: number;
  destination_id?: string | null;
  partner_id?: string | null;
  content?: Record<string, ContentEntry>;
};

export type Fare = {
  route: string;
  vehicle: string;
  price: number;
};

export type TransferRoute = {
  code: string;
  title: string;
  category: "airport" | "local" | "intercity";
  pickup: string;
  dropoff: string;
};

export type TransferVehicleType = {
  code: string;
  seats: number;
  passenger_capacity: number;
};

export type SiteData = {
  products: Product[];
  content: Record<string, ContentEntry>;
  fares: Fare[];
  transferRoutes: TransferRoute[];
  transferVehicleTypes: TransferVehicleType[];
  hotelCapacities: Record<string, number>;
  destinations: { id: string; name: string; code: string }[];
  locale: Locale;
};

export type Booking = {
  id: string;
  product_id: string;
  customer_name: string;
  phone: string;
  departure_date: string;
  guests: number;
  unit_price: number;
  notes?: string;
  status: string;
  created_at?: string;
  title?: string;
};

export type AdminUser = {
  id: string;
  username: string;
  role: "super_admin" | "booking" | "editor";
};

export type AdminOverviewData = {
  stats: {
    services: number;
    active_services: number;
    bookings: number;
    new_today: number;
    pending: number;
    content: number;
    completed: number;
    revenue: number;
    fares: number;
  };
  categories: { type: string; count: number }[];
  bookings: Record<string, unknown>[];
  updates: Record<string, unknown>[];
};

export const money = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "đ";
