import "server-only";
import { z } from "zod";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import {
  publicRouteDestinations,
  publicRouteWhere,
} from "./product-visibility";

import { vehicleCode } from "./transfer-values";
const fareKey = z.object({
  route: z.string().regex(/^[A-Z0-9_]{2,100}$/),
  vehicle: vehicleCode,
});
const pricedFare = fareKey.extend({
  price: z
    .union([z.number(), z.string().regex(/^\d+$/).transform(Number)])
    .pipe(z.number().int().min(0).max(2000000000)),
});

export async function writeFare(method: string, body: unknown) {
  const removing = method === "DELETE";
  const fare = removing
    ? { ...fareKey.parse(body), price: null }
    : pricedFare.parse(body);
  const { route, vehicle, price } = fare;
  const productId = `transfer-${route}-${vehicle}`;
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    let result;
    if (method === "POST") {
      const { rows } = await client.query(
        `SELECT r.title FROM transfer_routes r
         ${publicRouteDestinations}
         WHERE r.code=$1 AND ${publicRouteWhere}
         FOR UPDATE OF r`,
        [route],
      );
      if (!rows[0]) throw new AppError("Hãy tạo hoặc bật tuyến xe trước");
      const { title } = rows[0];
      result = await client.query(
        `INSERT INTO transfer_fares(route,vehicle,price) VALUES($1,$2,$3)
         ON CONFLICT (route,vehicle) DO UPDATE SET active=true,price=EXCLUDED.price
         WHERE NOT transfer_fares.active
         RETURNING route,vehicle,price`,
        [route, vehicle, price],
      );
      if (!result.rowCount)
        throw new AppError("Tuyến xe đã có mức giá cho loại xe này", 409);
      const product = await client.query(
        `INSERT INTO products(id,type,title,price,location,description)
           VALUES($1,'transfer',$2,$3,$4,'Giá tham khảo mỗi chuyến')
         ON CONFLICT(id) DO UPDATE SET price=EXCLUDED.price,title=EXCLUDED.title,
           location=EXCLUDED.location,active=true,updated_at=now()
         WHERE products.type='transfer'`,
        [productId, `${title} · ${vehicle}`, price, title],
      );
      if (!product.rowCount)
        throw new AppError("Mã dịch vụ đã được sử dụng", 409);
    } else {
      result = removing
        ? await client.query(
            "UPDATE transfer_fares SET active=false WHERE route=$1 AND vehicle=$2 AND active RETURNING route,vehicle",
            [route, vehicle],
          )
        : await client.query(
            "UPDATE transfer_fares SET price=$3 WHERE route=$1 AND vehicle=$2 AND active RETURNING route,vehicle,price",
            [route, vehicle, price],
          );
      if (!result.rowCount)
        throw new AppError("Không tìm thấy mức giá xe", 404);
      const product = removing
        ? await client.query(
            "UPDATE products SET active=false,updated_at=now() WHERE id=$1 AND type='transfer'",
            [productId],
          )
        : await client.query(
            "UPDATE products SET price=$2,updated_at=now() WHERE id=$1 AND type='transfer'",
            [productId, price],
          );
      if (!removing && !product.rowCount)
        throw new AppError("Không tìm thấy dịch vụ xe tương ứng", 409);
    }
    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    if ((error as { code?: string })?.code === "23505")
      throw new AppError("Tuyến xe đã có mức giá cho loại xe này", 409);
    throw error;
  } finally {
    client.release();
  }
}
