const problems = [];
try {
  const database = new URL(process.env.DATABASE_URL || "");
  if (!["postgres:", "postgresql:"].includes(database.protocol)) throw Error();
} catch {
  problems.push("DATABASE_URL phải là URL PostgreSQL hợp lệ.");
}
try {
  const site = new URL(process.env.APP_URL || "");
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(site.hostname);
  if (site.protocol !== "https:" && !(local && site.protocol === "http:"))
    throw Error();
  if (
    site.username ||
    site.password ||
    site.search ||
    site.hash ||
    site.pathname !== "/"
  )
    throw Error();
} catch {
  problems.push(
    "APP_URL phải là URL HTTPS công khai; HTTP chỉ dùng cho localhost.",
  );
}
if (
  process.env.TRUST_PROXY &&
  !["true", "false"].includes(process.env.TRUST_PROXY)
)
  problems.push("TRUST_PROXY phải là true hoặc false.");
if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else console.log("Production environment configuration valid.");
