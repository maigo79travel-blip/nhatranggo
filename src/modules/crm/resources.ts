import { z } from "zod";
import type { ResourceDefinition } from "../admin/types";
import { title, text, phone } from "@/lib/validation";
export const crmResources: Record<string, ResourceDefinition> = {
  customers: {
    table: "customers",
    label: "Khách hàng",
    icon: "group",
    roles: ["booking"],
    columns: ["name", "phone", "email"],
    schema: z.object({
      name: title,
      phone,
      email: z.union([z.email(), z.literal("")]),
      notes: text,
    }),
    fields: [
      { name: "name", label: "Họ tên", required: true },
      { name: "phone", label: "Số điện thoại", required: true },
      { name: "email", label: "Email", type: "email" },
      { name: "notes", label: "Ghi chú", type: "textarea" },
    ],
  },
  partners: {
    table: "partners",
    label: "Đối tác & Tài xế",
    icon: "handshake",
    roles: ["booking", "editor"],
    archive: true,
    columns: ["name", "kind", "phone", "active"],
    schema: z.object({
      name: title,
      kind: z.enum(["driver", "hotel", "tour"]),
      phone,
      email: z.union([z.email(), z.literal("")]),
      notes: text,
      active: z.boolean(),
    }),
    fields: [
      { name: "name", label: "Tên đối tác", required: true },
      {
        name: "kind",
        label: "Loại đối tác",
        type: "select",
        options: [
          { value: "driver", label: "Tài xế" },
          { value: "hotel", label: "Khách sạn" },
          { value: "tour", label: "Nhà tour" },
        ],
      },
      { name: "phone", label: "Số điện thoại", required: true },
      { name: "email", label: "Email", type: "email" },
      { name: "notes", label: "Ghi chú", type: "textarea" },
      { name: "active", label: "Đang hoạt động", type: "checkbox" },
    ],
  },
};
