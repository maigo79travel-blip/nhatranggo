import { launchBrowser } from "./browser.mjs";
import fs from "node:fs/promises";
import pg from "pg";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
const base = process.env.TEST_URL || "http://localhost:3001";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
const username = credentials.match(/^Username: (.+)$/m)[1];
const password = credentials.match(/^Password: (.+)$/m)[1];
const browser = await launchBrowser();
const product = (await db.query("SELECT * FROM products WHERE id='hotels-1'"))
  .rows[0];
const hero = (
  await db.query(
    "SELECT * FROM site_content WHERE scope='home' AND label LIKE '%Khám phá kỳ nghỉ%' LIMIT 1",
  )
).rows[0];
const fare = (
  await db.query(
    "SELECT * FROM transfer_fares WHERE route='CXR_NT_CENTER' AND vehicle='7cho'",
  )
).rows[0];
let cloneId;
try {
  for (const resource of [
    "overview",
    "products",
    "content",
    "fares",
    "bookings",
  ])
    assert.equal((await fetch(base + "/api/admin/" + resource)).status, 401);
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const site = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.setDefaultTimeout(10000);
  page.on("pageerror", (e) => errors.push(e.message));
  site.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/admin");
  await page.getByLabel("Tên đăng nhập").fill(username);
  await page.getByLabel("Mật khẩu", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Đăng nhập", exact: true }).click();
  await page.getByRole("heading", { name: "Tổng quan", exact: true }).waitFor();
  await page
    .getByRole("navigation", { name: "Điều hướng quản trị" })
    .getByRole("button", { name: "Dịch vụ", exact: true })
    .click();
  await page.getByLabel("Tìm dữ liệu").fill("hotels-1");
  await page.locator(".ad-row-title").first().click();
  await page
    .getByLabel("Tên dịch vụ", { exact: true })
    .fill(product.title + " [CMS QA]");
  await page.getByLabel("Giá bán (VND)", { exact: true }).fill("1234567");
  await page.getByLabel("Giá gốc (VND, bỏ trống để ẩn)").fill("1899000");
  await Promise.all([
    page.waitForResponse(
      (r) =>
        r.url().endsWith("/api/admin/products") &&
        r.request().method() === "PATCH",
    ),
    page.getByRole("button", { name: "Lưu thay đổi", exact: true }).click(),
  ]);
  await site.goto(base + "/khach-san");
  const card = site.locator('[data-product-id="hotels-1"]');
  await card.getByText(product.title + " [CMS QA]", { exact: true }).waitFor();
  assert.ok((await card.textContent()).includes("1.234.567đ"));
  assert.ok((await card.textContent()).includes("1.899.000đ"));
  console.log(
    "Admin UI product title, price and original price are reflected on the public page",
  );
  await page
    .getByRole("button", { name: "Nội dung website", exact: true })
    .click();
  await page.getByLabel("Tìm dữ liệu").fill(hero.key);
  await page.locator(".ad-row-title").first().click();
  await page
    .getByLabel("Nội dung", { exact: true })
    .fill("Kỳ nghỉ được quản lý qua PostgreSQL ");
  await Promise.all([
    page.waitForResponse(
      (r) =>
        r.url().endsWith("/api/admin/content") &&
        r.request().method() === "PATCH",
    ),
    page.getByRole("button", { name: "Lưu thay đổi", exact: true }).click(),
  ]);
  await site.goto(base);
  await site
    .getByRole("heading", { level: 1 })
    .filter({ hasText: "Kỳ nghỉ được quản lý qua PostgreSQL" })
    .waitFor();
  console.log("Admin page content edit is reflected in the hero");
  let res = await page.request.patch(base + "/api/admin/fares", {
    data: { ...fare, price: 329000 },
  });
  assert.equal(res.status(), 200);
  await site.goto(base + "/xe-dua-don");
  await site.locator('.vehicle-chip[data-veh="7cho"]').click();
  await site.locator("#route-price").filter({ hasText: "329.000đ" }).waitFor();
  assert.ok(
    (
      await site.locator("tbody tr").first().locator("td").nth(2).textContent()
    ).includes("329.000đ"),
  );
  assert.equal(
    (
      await db.query(
        "SELECT price FROM products WHERE id='transfer-CXR_NT_CENTER-7cho'",
      )
    ).rows[0].price,
    329000,
  );
  console.log(
    "Fare matrix, live quote and booking product price use the same database fare",
  );
  res = await page.request.post(base + "/api/admin/products", {
    data: { cloneId: "home-1", title: "Dịch vụ mới từ CMS QA" },
  });
  assert.equal(res.status(), 201);
  let clone = (await res.json()).data;
  cloneId = clone.id;
  assert.equal(clone.active, false);
  clone.active = true;
  clone.description = "Mô tả mới lưu trong database";
  const badge = Object.values(clone.content).find((e) =>
    e.label.includes("Trọn Gói All-In-One"),
  );
  if (badge) badge.value = "Ưu đãi từ CMS QA";
  res = await page.request.patch(base + "/api/admin/products", { data: clone });
  assert.equal(res.status(), 200);
  await site.goto(base);
  await site
    .locator(`[data-product-id="${cloneId}"]`)
    .getByText("Dịch vụ mới từ CMS QA", { exact: true })
    .waitFor();
  assert.ok(
    (
      await site.locator(`[data-product-id="${cloneId}"]`).textContent()
    ).includes("Mô tả mới lưu trong database"),
  );
  clone.active = false;
  assert.equal(
    (
      await page.request.patch(base + "/api/admin/products", { data: clone })
    ).status(),
    200,
  );
  await site.reload();
  assert.equal(await site.locator(`[data-product-id="${cloneId}"]`).count(), 0);
  console.log(
    "Create, publish and hide a new database service without adding JSX",
  );
  const bad = await page.request.patch(base + "/api/admin/content", {
    data: {
      key: hero.key,
      kind: "attributes",
      label: "Invalid link",
      value: { href: "javascript:alert(1)" },
    },
  });
  assert.equal(bad.status(), 400);
  execFileSync(
    process.execPath,
    ["--env-file=.env", "scripts/database.mjs", "seed"],
    { stdio: "pipe" },
  );
  assert.equal(
    (await db.query("SELECT price FROM products WHERE id='hotels-1'")).rows[0]
      .price,
    1234567,
  );
  assert.equal(
    (await db.query("SELECT value FROM site_content WHERE key=$1", [hero.key]))
      .rows[0].value,
    "Kỳ nghỉ được quản lý qua PostgreSQL ",
  );
  assert.equal(
    (
      await db.query(
        "SELECT price FROM transfer_fares WHERE route='CXR_NT_CENTER' AND vehicle='7cho'",
      )
    ).rows[0].price,
    329000,
  );
  console.log("Re-seeding preserves product, site content and fare edits");
  await page.getByRole("button", { name: "Đăng xuất", exact: true }).click();
  await page.getByRole("heading", { name: "Đăng nhập quản trị" }).waitFor();
  assert.equal(
    (await page.request.get(base + "/api/admin/products")).status(),
    401,
  );
  assert.deepEqual(errors, []);
  console.log(
    "Authentication, logout, content validation and all CMS checks passed",
  );
} finally {
  await db.query(
    "UPDATE products SET title=$2,price=$3,original_price=$4 WHERE id=$1",
    [product.id, product.title, product.price, product.original_price],
  );
  await db.query("UPDATE site_content SET value=$2 WHERE key=$1", [
    hero.key,
    JSON.stringify(hero.value),
  ]);
  await db.query(
    "UPDATE transfer_fares SET price=$3 WHERE route=$1 AND vehicle=$2",
    [fare.route, fare.vehicle, fare.price],
  );
  await db.query("UPDATE products SET price=$2 WHERE id=$1", [
    `transfer-${fare.route}-${fare.vehicle}`,
    fare.price,
  ]);
  if (cloneId) await db.query("DELETE FROM products WHERE id=$1", [cloneId]);
  await browser.close();
  await db.end();
}
