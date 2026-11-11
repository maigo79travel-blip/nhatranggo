import { getFareQuote } from "@/lib/services/fare-service";

export async function GET(request: Request) {
  const p = new URL(request.url).searchParams;
  const pickup = p.get("pickup") || "";
  const dropoff = p.get("dropoff") || "";
  const vehicle = p.get("vehicle") || "4cho";

  try {
    const quote = await getFareQuote(pickup, dropoff, vehicle);
    if (!quote) {
      return Response.json(
        { error: "Tuyến này cần liên hệ để báo giá." },
        { status: 404 },
      );
    }
    return Response.json(quote);
  } catch {
    return Response.json(
      { error: "Không thể tải báo giá. Vui lòng liên hệ hotline." },
      { status: 503 },
    );
  }
}
