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
    if (
      process.env.NODE_ENV === "production" &&
      !process.env.ADMIN_INITIAL_PASSWORD
    )
      throw new Error(
        "Set ADMIN_INITIAL_PASSWORD when creating the first production admin.",
      );
    const password =
      process.env.ADMIN_INITIAL_PASSWORD ||
      randomBytes(18).toString("base64url");
    if (
      username.length < 3 ||
      username.length > 80 ||
      password.length < 12 ||
      password.length > 200
    )
      throw new Error(
        "Admin username must be 3–80 characters and password 12–200 characters.",
      );
    const salt = randomBytes(16).toString("hex");
    await db.query(
      "INSERT INTO admin_users(id,username,password_hash) VALUES($1,$2,$3)",
      [
        randomUUID(),
        username,
        `${salt}:${scryptSync(password, salt, 64).toString("hex")}`,
      ],
    );
    if (process.env.ADMIN_INITIAL_PASSWORD) {
      console.log(
        "Admin created using the supplied initial password. No credentials file was written.",
      );
    } else {
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
  }
} finally {
  await db.end();
}
