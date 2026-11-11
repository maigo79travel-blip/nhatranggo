export type ContentKind = "text" | "attributes" | "settings";

export type ContentEntry = {
  kind: ContentKind;
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
  active?: boolean;
  position?: number;
  content?: Record<string, ContentEntry>;
};

export type Fare = {
  route: string;
  vehicle: string;
  price: number;
};

export type SiteData = {
  products: Product[];
  content: Record<string, ContentEntry>;
  fares: Fare[];
};

export type BookingStatus = "pending" | "confirmed" | "cancelled" | string;

export type Booking = {
  id: string;
  product_id: string;
  customer_name: string;
  phone: string;
  departure_date: string;
  guests: number;
  unit_price: number;
  notes?: string;
  status: BookingStatus;
  created_at?: string;
  title?: string;
};

export type Subscriber = {
  email: string;
  created_at?: string;
};

export type AdminUser = {
  id: string;
  username: string;
};

export type AdminOverviewData = {
  stats: {
    services: number;
    active_services: number;
    bookings: number;
    pending: number;
    content: number;
    subscribers: number;
    fares: number;
  };
  categories: { type: string; count: number }[];
  bookings: Record<string, unknown>[];
  updates: Record<string, unknown>[];
};

export const money = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "đ";
