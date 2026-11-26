import type { TransferVehicleType } from "@/lib/types";

export const transferVehicles = [
  {
    id: "4cho",
    icon: "directions_car",
    model: "Sedan (Vios, Accent, City)",
  },
  {
    id: "7cho",
    icon: "directions_car",
    model: "MPV / SUV",
  },
  {
    id: "16cho",
    icon: "airport_shuttle",
    model: "Solati / Transit",
  },
] as const;

export type TransferVehicle = (typeof transferVehicles)[number]["id"];

export function transferVehicleOptions(types: TransferVehicleType[]) {
  return transferVehicles.flatMap((vehicle) => {
    const type = types.find((item) => item.code === vehicle.id);
    if (!type) return [];
    return [
      {
        ...vehicle,
        label: `Xe ${type.seats} chỗ`,
        chip: `${type.seats} chỗ`,
        maxGuests: type.passenger_capacity,
      },
    ];
  });
}

export const transferRoutes = [
  {
    id: "airport",
    label: "Đưa đón Sân bay Cam Ranh",
    tableLabel: "Xe đưa đón Sân bay",
    icon: "flight_takeoff",
    pickup: "CXR",
    dropoff: "NT_CENTER",
  },
  {
    id: "intercity",
    label: "Xe Liên Tỉnh (Đà Lạt – Phú Yên)",
    tableLabel: "Xe Liên Tỉnh (Đà Lạt – Phú Yên)",
    icon: "map",
    pickup: "NT_CENTER",
    dropoff: "DALAT",
  },
  {
    id: "local",
    label: "Thuê xe theo ngày / City Tour",
    tableLabel: "Thuê xe theo ngày / City Tour",
    icon: "calendar_today",
    pickup: "NT_CENTER",
    dropoff: "BAI_DAI",
  },
] as const;

export const defaultRoute = transferRoutes[0];
export const quoteAnchor = "#bao-gia-xe";
