import { z } from "zod";
export const bookingSchema = z
  .object({
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
    returnDate: z.iso.date().optional(),
    departureTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
      .optional(),
    roomId: z.uuid().optional(),
    guests: z.coerce.number().int().min(1).max(100),
    notes: z.string().trim().max(2000).default(""),
  })
  .refine(
    (v) => !v.returnDate || v.returnDate > v.date,
    "Ngày trả phòng phải sau ngày nhận phòng",
  );
