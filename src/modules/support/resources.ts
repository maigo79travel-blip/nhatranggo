import { z } from "zod";
import type { ResourceDefinition } from "../admin/types";
import { title, text, phone, status } from "@/lib/validation";
export const supportResources: Record<string, ResourceDefinition> = {
  requests: {
    table: "service_requests",
    label: "E-Visa & Fast-track",
    icon: "flight_land",
    roles: ["booking"],
    columns: ["kind", "name", "airport", "status"],
    schema: z.object({
      kind: z.enum(["evisa", "fast-track"]),
      name: title,
      phone,
      email: z.email(),
      arrival_at: z.iso.datetime({ offset: true }),
      airport: title,
      nationality: text,
      notes: text,
      status,
    }),
    fields: [
      {
        name: "kind",
        label: "Dịch vụ",
        type: "select",
        options: [
          { value: "evisa", label: "E-Visa" },
          { value: "fast-track", label: "Fast-track" },
        ],
      },
      { name: "name", label: "Họ tên", required: true },
      { name: "phone", label: "Điện thoại", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "arrival_at",
        label: "Ngày giờ đến",
        type: "datetime-local",
        required: true,
      },
      { name: "airport", label: "Sân bay", required: true },
      { name: "nationality", label: "Quốc tịch" },
      { name: "notes", label: "Ghi chú", type: "textarea" },
      {
        name: "status",
        label: "Trạng thái",
        type: "select",
        options: [
          { value: "pending", label: "Chờ xác nhận" },
          { value: "confirmed", label: "Đã xác nhận" },
          { value: "completed", label: "Hoàn tất" },
          { value: "cancelled", label: "Đã hủy" },
        ],
      },
    ],
  },
  contacts: {
    table: "contacts",
    label: "Liên hệ & Hỗ trợ",
    icon: "support_agent",
    roles: ["booking"],
    columns: ["name", "subject", "email", "status"],
    schema: z.object({
      name: title,
      phone: z.string().max(30).default(""),
      email: z.email(),
      subject: title,
      message: text,
      status: z.enum(["pending", "replied", "closed"]),
      admin_notes: text,
    }),
    fields: [
      { name: "name", label: "Họ tên", required: true },
      { name: "phone", label: "Điện thoại" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "subject", label: "Chủ đề", required: true },
      { name: "message", label: "Nội dung", type: "textarea" },
      {
        name: "status",
        label: "Trạng thái",
        type: "select",
        options: [
          { value: "pending", label: "Chưa trả lời" },
          { value: "replied", label: "Đã trả lời" },
          { value: "closed", label: "Đã đóng" },
        ],
      },
      { name: "admin_notes", label: "Ghi chú xử lý", type: "textarea" },
    ],
  },
};
