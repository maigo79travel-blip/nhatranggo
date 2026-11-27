import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { z } from "zod";
import { title, text, phone } from "@/lib/validation";
const contactSchema = z.object({
  name: title,
  phone: z.string().max(30).default(""),
  email: z.email().max(254),
  subject: title,
  message: z.string().trim().min(10).max(10000),
});
const requestSchema = z.object({
  kind: z.literal("evisa"),
  name: title,
  phone,
  email: z.email().max(254),
  arrival_at: z.iso
    .datetime({ offset: true })
    .refine(
      (v) => new Date(v).getTime() > Date.now(),
      "Ngày đến phải ở tương lai",
    ),
  airport: title,
  nationality: text,
  notes: text,
});
export async function sendContact(value: unknown) {
  const p = contactSchema.parse(value);
  const id = randomUUID();
  await db.query(
    "INSERT INTO contacts(id,name,phone,email,subject,message) VALUES($1,$2,$3,$4,$5,$6)",
    [id, p.name, p.phone, p.email, p.subject, p.message],
  );
  return id;
}
export async function sendServiceRequest(value: unknown) {
  const p = requestSchema.parse(value);
  const id = randomUUID();
  await db.query(
    "INSERT INTO service_requests(id,kind,name,phone,email,arrival_at,airport,nationality,notes) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      id,
      p.kind,
      p.name,
      p.phone,
      p.email,
      p.arrival_at,
      p.airport,
      p.nationality,
      p.notes,
    ],
  );
  return id;
}
