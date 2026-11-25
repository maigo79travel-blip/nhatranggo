import { z } from "zod";
import { status } from "@/lib/validation";

const filterSchema = z
  .object({
    q: z.string().trim().max(120).default(""),
    status: status.optional(),
    type: z.enum(["transfer", "hotel", "tour", "combo"]).optional(),
    from: z.iso.date().optional(),
    to: z.iso.date().optional(),
  })
  .refine(
    ({ from, to }) => !from || !to || from <= to,
    "Ngày sử dụng kết thúc phải bằng hoặc sau ngày bắt đầu",
  );

export type BookingFilters = z.infer<typeof filterSchema>;

export function readBookingFilters(params: URLSearchParams) {
  return filterSchema.parse({
    q: params.get("q") ?? "",
    status: params.get("status") || undefined,
    type: params.get("type") || undefined,
    from: params.get("from") || undefined,
    to: params.get("to") || undefined,
  });
}

export const bookingPageSchema = z.coerce.number().int().min(1).max(100000);
