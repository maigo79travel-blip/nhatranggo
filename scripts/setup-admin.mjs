import fs from "node:fs";
import { randomBytes, randomUUID, scryptSync } from "node:crypto";
import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  const username = process.env.ADMIN_USERNAME || "admin";
  if (
    (await db.query("SELECT id FROM admin_users WHERE username=$1", [username]))
      .rowCount
  ) {
    console.log("Admin already exists; credentials preserved.");
  } else {
    const password =
      process.env.ADMIN_INITIAL_PASSWORD ||
      randomBytes(18).toString("base64url");
    const salt = randomBytes(16).toString("hex");
    await db.query(
      "INSERT INTO admin_users(id,username,password_hash) VALUES($1,$2,$3)",
      [
        randomUUID(),
        username,
        `${salt}:${scryptSync(password, salt, 64).toString("hex")}`,
      ],
    );
    fs.mkdirSync(".local", { recursive: true });
    fs.writeFileSync(
      ".local/admin-access.txt",
      `URL: http://localhost:3001/admin\nUsername: ${username}\nPassword: ${password}\n\nChange this password in the admin account tab. Do not commit or share this file.\n`,
      { mode: 0o600 },
    );
    console.log(
      "Admin created. Credentials saved in .local/admin-access.txt (ignored by Git).",
    );
  }
} finally {
  await db.end();
}
