import { z } from "zod";
import {
  contentAttributeKeys,
  isPublicLink,
  isPublicImageUrl,
  isPublicBackgroundImage,
} from "@/lib/content-attributes";

const contactLink =
  /^(?:\{\{contact\.(?:zalo|website|whatsapp|telegram|facebook)\}\}(?:[?#][^\s\\]*)?|tel:\{\{contact\.telephone\}\}|mailto:\{\{contact\.email\}\})$/;
const entry = z
  .object({
    kind: z.enum(["text", "attributes", "settings"]),
    label: z.string().max(200),
    value: z.unknown(),
  })
  .superRefine((value, ctx) => {
    if (JSON.stringify(value.value)?.length > 100000)
      ctx.addIssue({ code: "custom", message: "Nội dung quá dài" });
    if (value.kind === "text" && typeof value.value !== "string")
      ctx.addIssue({ code: "custom", message: "Nội dung phải là văn bản" });
    if (value.kind === "attributes") {
      if (
        !value.value ||
        typeof value.value !== "object" ||
        Array.isArray(value.value)
      ) {
        ctx.addIssue({ code: "custom", message: "Thuộc tính không hợp lệ" });
        return;
      }
      for (const [key, val] of Object.entries(value.value)) {
        if (!contentAttributeKeys.has(key) || typeof val !== "string")
          ctx.addIssue({
            code: "custom",
            message: "Thuộc tính không được hỗ trợ",
          });
        if (
          typeof val === "string" &&
          val &&
          ((key === "href" && !isPublicLink(val) && !contactLink.test(val)) ||
            (key === "src" && !isPublicImageUrl(val)))
        )
          ctx.addIssue({ code: "custom", message: "Liên kết không an toàn" });
        if (
          key === "backgroundImage" &&
          typeof val === "string" &&
          !isPublicBackgroundImage(val)
        )
          ctx.addIssue({
            code: "custom",
            message: "Ảnh nền phải dùng một đường dẫn ảnh hợp lệ",
          });
      }
    }
  });
export const contentSchema = entry;
export const productSchema = z
  .object({
    id: z.string().min(1).max(100),
    title: z.string().trim().min(2).max(300),
    type: z.enum(["hotel", "tour", "combo", "transfer"]),
    price: z.coerce.number().int().min(0).max(2000000000),
    original_price: z.coerce.number().int().min(0).max(2000000000).nullable(),
    image: z
      .string()
      .max(2000)
      .refine(
        (value) => !value || isPublicImageUrl(value),
        "Đường dẫn ảnh không hợp lệ",
      ),
    location: z.string().max(1000),
    description: z.string().max(10000),
    rating: z.coerce.number().min(0).max(5),
    position: z.coerce.number().int().min(0).max(2147483647),
    active: z.boolean(),
    featured: z.boolean().optional(),
    content: z.record(z.string(), entry),
    destination_id: z.uuid().nullable().default(null),
    partner_id: z.uuid().nullable().default(null),
  })
  .refine((p) => p.original_price == null || p.original_price >= p.price, {
    message: "Giá gốc phải lớn hơn hoặc bằng giá bán",
    path: ["original_price"],
  });
