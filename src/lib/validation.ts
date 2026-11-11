import { z } from "zod";
export const bookingSchema = z.object({
  productId: z.string().min(1).max(100),
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^(\+84|0)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((value) => {
      const date = new Date(value + "T00:00:00+07:00");
      return (
        !Number.isNaN(date.getTime()) &&
        date.toLocaleDateString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }) ===
          value &&
        value >=
          new Date().toLocaleDateString("sv-SE", {
            timeZone: "Asia/Ho_Chi_Minh",
          })
      );
    }, "Ngày đi phải từ hôm nay"),
  guests: z.coerce.number().int().min(1).max(100),
  notes: z.string().trim().max(2000).default(""),
});
export const subscribeSchema = z.object({ email: z.email().max(254) });
