import "server-only";
import { Pool } from "pg";
const globalDb = globalThis as unknown as { bookingPool?: Pool };
export const db =
  globalDb.bookingPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 30000,
  });
if (process.env.NODE_ENV !== "production") globalDb.bookingPool = db;
