import { z } from "zod";
export const title = z.string().trim().min(1).max(300);
export const text = z.string().max(20000).default("");
export const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(160);
export const phone = z
  .string()
  .trim()
  .regex(/^[+0-9 ().-]{7,30}$/);
export const id = z.uuid().nullable().default(null);
export const url = z
  .string()
  .max(2000)
  .refine(
    (v) => !v || /^(\/[^/]|https?:\/\/)/.test(v),
    "Đường dẫn ảnh không hợp lệ",
  )
  .default("");
export const money = z.coerce.number().int().min(0).max(2000000000);
export const date = z.iso.date();
export const publication = z.enum(["draft", "published", "hidden"]);
export const status = z.enum([
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);
export const publicationOptions = [
  { value: "draft", label: "Bản nháp" },
  { value: "published", label: "Đã đăng" },
  { value: "hidden", label: "Đã ẩn" },
];
