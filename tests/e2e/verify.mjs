import { launchBrowser } from "./browser.mjs";
import fs from "node:fs/promises";
import pg from "pg";
import assert from "node:assert/strict";
const browser = await launchBrowser();
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const base = process.env.TEST_URL || "http://localhost:3001";
await fs.mkdir("test-results", { recursive: true });
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.setDefaultTimeout(10000);
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/", "/khach-san", "/tour-hang-ngay", "/xe-dua-don"]) {
    const res = await page.goto(base + route);
    assert.equal(res.status(), 200);
    await page.locator("h1").waitFor();
    await page.locator("body[data-hydrated=true]").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      document
        .querySelectorAll("img")
        .forEach((img) => (img.loading = "eager"));
      await Promise.all(
        Array.from(document.images).map((img) => img.decode().catch(() => {})),
      );
    });
    await page.screenshot({
      path: `test-results/${route.slice(1) || "home"}-desktop.png`,
      fullPage: true,
    });
    assert.equal(await page.locator("header").count(), 1);
    assert.equal(await page.locator("footer").count(), 1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    assert.equal(overflow, false, `${route}: desktop overflow`);
    console.log("Desktop route verified:", route);
  }
  await page.goto(base + "/khach-san");
  await page.locator("body[data-hydrated=true]").waitFor();
  await page
    .locator("[data-product-id]")
    .first()
    .getByRole("button", { name: /Xem phòng/ })
    .click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await page.getByLabel("Họ và tên", { exact: true }).fill("Kiểm thử tự động");
  await page.getByLabel("Số điện thoại", { exact: true }).fill("0901234567");
  await page.getByLabel("Ngày nhận phòng", { exact: true }).fill("2099-12-01");
  await page.getByLabel("Ngày trả phòng", { exact: true }).fill("2099-12-03");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Gửi yêu cầu đặt chỗ", exact: true })
    .click();
  await page.getByText("Mã yêu cầu:", { exact: false }).waitFor();
  const resultText = await page.getByRole("dialog").textContent();
  const id = resultText.match(/[0-9a-f]{8}-[0-9a-f-]{27}/)[0];
  const saved = await db.query("SELECT * FROM bookings WHERE id=$1", [id]);
  assert.equal(saved.rows[0].customer_name, "Kiểm thử tự động");
  assert.equal(saved.rows[0].unit_price, 1091000);
  let response = await fetch(`${base}/api/bookings?id=${id}&phone=0901234567`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).departure_date, "2099-12-01");
  response = await fetch(`${base}/api/bookings?id=${id}&phone=0900000000`);
  assert.equal(response.status, 404);
  response = await fetch(`${base}/api/bookings`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      productId: "hotels-1",
      name: "Invalid",
      phone: "0901234567",
      date: "2020-01-01",
      returnDate: "2020-01-02",
      guests: 2,
    }),
  });
  assert.equal(response.status, 400);
  await db.query("DELETE FROM booking_history WHERE booking_id=$1", [id]);
  await db.query("DELETE FROM bookings WHERE id=$1", [id]);
  console.log(
    "Booking UI, persistence, lookup privacy, date validation passed",
  );
  await page.goto(base + "/xe-dua-don");
  await page.locator("#route-price").filter({ hasText: "300.000đ" }).waitFor();
  await page.locator('.vehicle-chip[data-veh="7cho"]').click();
  await page.locator("#route-price").filter({ hasText: "350.000đ" }).waitFor();
  response = await fetch(
    `${base}/api/fares?pickup=CXR&dropoff=DALAT&vehicle=4cho`,
  );
  assert.equal(response.status, 404);
  console.log("PostgreSQL transfer pricing and unsupported route passed");
  await page.goto(base + "/tour-hang-ngay");
  await page.locator("body[data-hydrated=true]").waitFor();
  await page.locator('.tour-cat-btn[data-category="du-thuyen"]').click();
  assert.equal(await page.locator("[data-product-id]:visible").count(), 1);
  await page.locator('.tour-cat-btn[data-category="all"]').click();
  assert.equal(await page.locator("[data-product-id]:visible").count(), 9);
  await page.goto(base + "/khach-san");
  await page.locator("body[data-hydrated=true]").waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/khach-san", "/tour-hang-ngay", "/xe-dua-don"]) {
    await page.goto(base + route);
    await page.locator("h1").waitFor();
    await page.locator("body[data-hydrated=true]").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `test-results/${route.slice(1) || "home"}-mobile.png`,
      fullPage: true,
    });
    const metrics = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    assert.ok(
      metrics.scroll <= metrics.width,
      `${route}: mobile overflow ${JSON.stringify(metrics)}`,
    );
    console.log("Mobile route verified:", route);
  }
  assert.deepEqual(errors, []);
  console.log("All checks passed.");
} finally {
  await browser.close();
  await db.end();
}
