import assert from "node:assert/strict";
import { X509Certificate } from "node:crypto";
import { connectionOptions } from "../../db/connection.mjs";
import certificate from "../../db/supabase-ca.json" with { type: "json" };
const local = "postgresql://local_user:example@localhost:5432/example";
assert.deepEqual(connectionOptions(local), { connectionString: local });
assert.deepEqual(connectionOptions(undefined), {});
const uri =
  "postgresql://postgres.example:example@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=no-verify";
const options = connectionOptions(uri);
assert.equal(options.ssl.rejectUnauthorized, true);
assert.equal(options.ssl.ca, certificate.pem);
assert.equal(
  new URL(options.connectionString).searchParams.has("sslmode"),
  false,
);
assert.equal(
  new URL(options.connectionString).searchParams.has("pgbouncer"),
  false,
);
assert.equal(new URL(options.connectionString).port, "6543");
assert.equal(new URL(options.connectionString).password, "example");
assert.equal(
  connectionOptions("postgresql://user:example@supabase.com.example.invalid/db")
    .ssl,
  undefined,
);
const ca = new X509Certificate(certificate.pem);
assert.ok(ca.ca && ca.subject.includes("Supabase"));
assert.ok(Date.parse(ca.validTo) > Date.now(), "Supabase CA expired");
console.log(
  "PASS database adapter: local compatibility, verified Supabase TLS, URI flag precedence, exact host matching and valid CA",
);
