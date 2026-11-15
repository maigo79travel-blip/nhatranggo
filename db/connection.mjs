import certificate from "./supabase-ca.json" with { type: "json" };

/** @param {string | undefined} connectionString */
export function connectionOptions(connectionString) {
  if (!connectionString) return {};
  const url = new URL(connectionString);
  if (
    url.hostname.endsWith(".supabase.com") ||
    url.hostname.endsWith(".supabase.co")
  ) {
    // pg URI SSL flags override `ssl`; use the official CA and verify the hostname.
    for (const key of [
      "sslmode",
      "sslrootcert",
      "sslcert",
      "sslkey",
      "pgbouncer",
    ])
      url.searchParams.delete(key);
    return {
      connectionString: url.toString(),
      ssl: { ca: certificate.pem, rejectUnauthorized: true },
    };
  }
  return { connectionString };
}
