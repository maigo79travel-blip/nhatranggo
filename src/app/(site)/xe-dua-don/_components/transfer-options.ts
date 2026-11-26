export const transferVehicles = [
  {
    id: "4cho",
    label: "Xe 4 chỗ",
    chip: "4 chỗ",
    detail: "Sedan 3 khách",
    icon: "directions_car",
    model: "Xe 4 chỗ Sedan (Vios, Accent, City)",
  },
  {
    id: "7cho",
    label: "Xe 7 chỗ",
    chip: "7 chỗ",
    detail: "SUV 5 khách",
    icon: "directions_car",
    model: "Xe 7 chỗ (MPV / SUV)",
  },
  {
    id: "16cho",
    label: "Xe 16 chỗ",
    chip: "16 chỗ",
    detail: "Transit 12–15 khách",
    icon: "airport_shuttle",
    model: "Xe 16 chỗ (Solati / Transit)",
  },
] as const;

export type TransferVehicle = (typeof transferVehicles)[number]["id"];

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
