import "server-only";
import { db } from "@/lib/db";

export async function addSubscriber(email: string): Promise<void> {
  await db.query(
    "INSERT INTO subscribers(email) VALUES($1) ON CONFLICT DO NOTHING",
    [email.toLowerCase()],
  );
}
