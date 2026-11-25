import { z } from "zod";
import type { ResourceDefinition } from "../admin/types";
import { title, text, url, money, date } from "@/lib/validation";
export const travelResources: Record<string, ResourceDefinition> = {
  destinations: {
    table: "destinations",
    label: "Địa phương / Điểm đến",
    icon: "location_on",
    roles: ["editor"],
    archive: true,
    columns: ["name", "code", "active"],
    schema: z.object({
      name: title,
      code: z.string().regex(/^[A-Z0-9_]{2,50}$/),
      active: z.boolean(),
    }),
    fields: [
      { name: "name", label: "Tên địa phương / điểm đến", required: true },
      {
        name: "code",
        label: "Mã (chữ in hoa, số, dấu gạch dưới)",
        required: true,
      },
      { name: "active", label: "Hiển thị", type: "checkbox" },
    ],
  },
  routes: {
    table: "transfer_routes",
    label: "Tuyến xe",
    icon: "route",
    roles: ["editor"],
    archive: true,
    columns: ["title", "code", "active"],
    schema: z
      .object({
        title,
        code: z.string().default(""),
        pickup_id: z.uuid(),
        dropoff_id: z.uuid(),
        active: z.boolean(),
      })
      .refine(
        (v) => v.pickup_id !== v.dropoff_id,
        "Điểm đón và trả phải khác nhau",
      ),
    fields: [
      { name: "title", label: "Tên tuyến", required: true },
      {
        name: "pickup_id",
        label: "Điểm đón",
        type: "select",
        resource: "destinations",
        required: true,
      },
      {
        name: "dropoff_id",
        label: "Điểm trả",
        type: "select",
        resource: "destinations",
        required: true,
      },
      { name: "active", label: "Hiển thị", type: "checkbox" },
    ],
  },
  rooms: {
    table: "rooms",
    label: "Loại phòng",
    icon: "bed",
    roles: ["editor"],
    archive: true,
    columns: ["title", "product_id", "price", "capacity", "active"],
    schema: z.object({
      product_id: title,
      title,
      price: money,
      capacity: z.coerce.number().int().min(1).max(100),
      image: url,
      description: text,
      active: z.boolean(),
    }),
    fields: [
      {
        name: "product_id",
        label: "Khách sạn",
        type: "select",
        resource: "products",
        required: true,
      },
      { name: "title", label: "Tên loại phòng", required: true },
      {
        name: "price",
        label: "Giá tham khảo / đêm",
        type: "number",
        required: true,
      },
      {
        name: "capacity",
        label: "Số khách tối đa",
        type: "number",
        required: true,
      },
      { name: "image", label: "Ảnh phòng" },
      { name: "description", label: "Mô tả", type: "textarea" },
      { name: "active", label: "Hiển thị", type: "checkbox" },
    ],
  },
  departures: {
    table: "departures",
    label: "Lịch khởi hành tour",
    icon: "calendar_month",
    roles: ["editor"],
    archive: true,
    columns: ["product_id", "date", "active"],
    schema: z.object({
      product_id: title,
      date,
      notes: text,
      active: z.boolean(),
    }),
    fields: [
      {
        name: "product_id",
        label: "Tour",
        type: "select",
        resource: "products",
        required: true,
      },
      { name: "date", label: "Ngày khởi hành", type: "date", required: true },
      { name: "notes", label: "Lịch trình / ghi chú", type: "textarea" },
      { name: "active", label: "Hiển thị", type: "checkbox" },
    ],
  },
};
