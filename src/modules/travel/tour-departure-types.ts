export type TourDeparture = {
  id: string;
  date: string;
  price_override: number | null;
  remaining_seats: number | null;
};

export type AdminTourDeparture = Omit<TourDeparture, "remaining_seats"> & {
  product_id: string;
  title: string;
  notes: string;
  active: boolean;
  capacity: number | null;
  booked_guests: number;
  base_price: number;
  product_active: boolean;
  revision: number;
};

export type AdminTourOption = {
  id: string;
  title: string;
  active: boolean;
};
