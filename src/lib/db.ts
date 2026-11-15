import "server-only";
import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";
import { connectionOptions } from "../../db/connection.mjs";
const globalDb = globalThis as unknown as { bookingPool?: Pool };
export const db =
  globalDb.bookingPool ??
  new Pool({
    ...connectionOptions(process.env.DATABASE_URL),
    max: process.env.VERCEL ? 3 : 10,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: process.env.VERCEL ? 5000 : 30000,
    query_timeout: 15000,
    application_name: "nhatranggo",
  });
if (process.env.VERCEL && !globalDb.bookingPool) attachDatabasePool(db);
if (process.env.NODE_ENV !== "production") globalDb.bookingPool = db;
