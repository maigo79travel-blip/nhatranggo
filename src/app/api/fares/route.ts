import { z } from "zod";
import { errorResponse } from "@/lib/http";
import { AppError } from "@/lib/errors";
import { vehicleCode } from "@/modules/travel/transfer-values";
import { getFareQuote } from "@/modules/travel/fare-service";

const code = z
  .string()
  .regex(/^[A-Z0-9_]{2,50}$/, "Mã điểm đón / trả không hợp lệ");
const quoteQuery = z.object({
  pickup: code,
  dropoff: code,
  vehicle: vehicleCode.default("4cho"),
  roundTrip: z.literal("true").optional(),
});

export async function GET(request: Request) {
  try {
    const { pickup, dropoff, vehicle, roundTrip } = quoteQuery.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    const quote = await getFareQuote(
      pickup,
      dropoff,
      vehicle,
      Boolean(roundTrip),
    );
    if (!quote) throw new AppError("Tuyến này cần liên hệ để báo giá.", 404);
    if (roundTrip && quote.returnPrice == null)
      throw new AppError(
        "Chưa có giá niêm yết cho lượt về. Vui lòng liên hệ.",
        404,
      );
    return Response.json(quote);
  } catch (error) {
    return errorResponse(error);
  }
}
