import { launchBrowser } from "./browser.mjs";
import fs from "node:fs/promises";
import pg from "pg";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { expect } from "@playwright/test";
const browser = await launchBrowser();
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const base = process.env.TEST_URL || "http://localhost:3001";
await fs.mkdir("test-results", { recursive: true });
const errors = [];
const tourId = "tour-qa-" + randomUUID();
const qaPhone = "09" + Date.now().toString().slice(-8);
const createdBookings = [];
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
  const hotelSearch = page.getByRole("form", { name: "Tìm khách sạn" });
  await hotelSearch.getByLabel("Điểm đến").fill("The Empyrean");
  await hotelSearch.getByLabel("Ngày nhận phòng").fill("2099-12-01");
  await hotelSearch.getByLabel("Ngày trả phòng").fill("2099-12-03");
  await hotelSearch.getByLabel("Số khách").click();
  await hotelSearch.getByRole("option", { name: "3 người" }).click();
  await hotelSearch
    .getByRole("button", { name: "Tìm kiếm", exact: true })
    .click();
  await page
    .locator("[data-product-id]")
    .first()
    .getByRole("button", { name: /Xem phòng/ })
    .click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await page.getByLabel("Họ và tên", { exact: true }).fill("Kiểm thử tự động");
  await page.getByLabel("Số điện thoại", { exact: true }).fill("0901234567");
  const hotelBooking = page.getByRole("dialog");
  assert.equal(
    await hotelBooking.getByLabel("Ngày nhận phòng").inputValue(),
    "2099-12-01",
  );
  assert.equal(
    await hotelBooking.getByLabel("Ngày trả phòng").inputValue(),
    "2099-12-03",
  );
  assert.equal(await hotelBooking.getByLabel("Số khách").inputValue(), "3");
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
  const airportFare = page
    .locator("tbody tr")
    .filter({ has: page.getByText(/^Sân bay Cam Ranh → Bãi Dài/) });
  await airportFare.getByRole("button", { name: /Đặt xe/ }).click();
  const transferDialog = page.getByRole("dialog");
  await transferDialog.waitFor({ state: "visible" });
  assert.match(await transferDialog.locator("h3").textContent(), /Bãi Dài/);
  assert.match(await transferDialog.locator("h3").textContent(), /7 chỗ/);
  assert.match(await transferDialog.textContent(), /180\.000đ/);
  await transferDialog
    .getByRole("button", { name: "Đóng", exact: true })
    .click();
  response = await fetch(
    `${base}/api/fares?pickup=CXR&dropoff=DALAT&vehicle=4cho`,
  );
  assert.equal(response.status, 404);
  const transferForm = page.getByRole("form", { name: "Tra cứu giá xe" });
  await transferForm.getByText("Khứ hồi (Round-trip)", { exact: true }).click();
  await transferForm.locator("#transfer-date").fill("2099-12-01");
  await transferForm.getByLabel("Giờ đón", { exact: true }).fill("10:00");
  await transferForm.locator("#transfer-return-date").fill("2099-12-01");
  await transferForm.locator("#transfer-return-time").fill("17:00");
  await transferForm.locator("#transfer-flight").fill("VN123");
  const [quoteResponse] = await Promise.all([
    page.waitForResponse(
      (result) =>
        result.url().includes("/api/fares?") &&
        result.url().includes("roundTrip=true"),
    ),
    transferForm.locator("#btn-search-fare").click(),
  ]);
  assert.equal(quoteResponse.status(), 200);
  const quote = await quoteResponse.json();
  assert.equal(quote.productId, "transfer-CXR_NT_CENTER-7cho");
  assert.equal(quote.maxGuests, 5);
  assert.equal(quote.returnPrice, 350000);
  await expect(
    transferDialog.getByLabel("Số khách", { exact: true }),
  ).toHaveAttribute("max", "5");
  await expect(transferDialog).toContainText("700.000đ");
  const overCapacity = await fetch(base + "/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: quote.productId,
      name: "Kiểm thử xe",
      phone: qaPhone,
      date: "2099-12-01",
      departureTime: "10:00",
      guests: quote.maxGuests + 1,
    }),
  });
  assert.equal(overCapacity.status, 400);
  await transferDialog
    .getByLabel("Họ và tên", { exact: true })
    .fill("Kiểm thử xe");
  await transferDialog
    .getByLabel("Số điện thoại", { exact: true })
    .fill(qaPhone);
  const [transferResponse] = await Promise.all([
    page.waitForResponse(
      (result) =>
        new URL(result.url()).pathname === "/api/bookings" &&
        result.request().method() === "POST",
    ),
    transferDialog.getByRole("button", { name: "Gửi yêu cầu đặt chỗ" }).click(),
  ]);
  assert.equal(transferResponse.status(), 201);
  const transfer = await transferResponse.json();
  createdBookings.push(transfer.id);
  const {
    rows: [trip],
  } = await db.query(
    "SELECT product_id,return_date::text,return_time::text,return_unit_price,flight_number FROM bookings WHERE id=$1",
    [transfer.id],
  );
  assert.deepEqual(trip, {
    product_id: quote.productId,
    return_date: "2099-12-01",
    return_time: "17:00:00",
    return_unit_price: quote.returnPrice,
    flight_number: "VN123",
  });
  console.log(
    "Transfer vehicle choice, server capacity, round-trip quote and booking passed",
  );

  await page.goto(base + "/tour-hang-ngay");
  await page.locator("body[data-hydrated=true]").waitFor();
  await page.locator('.tour-cat-btn[data-category="du-thuyen"]').click();
  await page.waitForURL("**/tour-hang-ngay?category=du-thuyen");
  assert.ok((await page.locator("[data-service-id]:visible").count()) > 0);
  await page.getByRole("link", { name: "Xóa bộ lọc" }).click();
  await expect(
    page.locator('.tour-cat-btn[data-category="all"]'),
  ).toBeVisible();

  await db.query(
    "INSERT INTO products(id,type,title,price,location,active) VALUES ($1,'tour',$2,200000,'Nha Trang',true)",
    [tourId, tourId],
  );
  await db.query(
    "INSERT INTO departures(id,product_id,date) VALUES ($1,$2,'2099-12-01')",
    [randomUUID(), tourId],
  );
  const unavailable = await fetch(
    base + `/api/products?type=tour&q=${tourId}&date=2099-12-02`,
  );
  assert.equal(unavailable.status, 200);
  assert.equal((await unavailable.json()).data.length, 0);
  const tourForm = page.locator("form:has(#tour-departure-date)");
  await tourForm.locator("#tour-departure-date").fill("2099-12-01");
  await tourForm.getByLabel("Số lượng khách", { exact: true }).fill("4");
  await tourForm.locator('button[type="submit"]').click();
  const searchResult = page.locator(`[data-service-id="${tourId}"]`);
  await searchResult
    .getByRole("button", { name: "Gửi yêu cầu đặt chỗ" })
    .click();
  const tourDialog = page.getByRole("dialog");
  await expect(
    tourDialog.getByLabel("Ngày sử dụng", { exact: true }),
  ).toHaveValue("2099-12-01");
  await expect(tourDialog.getByLabel("Số khách", { exact: true })).toHaveValue(
    "4",
  );
  console.log("Tour date search from PostgreSQL and booking prefill passed");
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
  if (createdBookings.length) {
    await db.query(
      "DELETE FROM booking_history WHERE booking_id=ANY($1::uuid[])",
      [createdBookings],
    );
    await db.query("DELETE FROM bookings WHERE id=ANY($1::uuid[])", [
      createdBookings,
    ]);
    await db.query("DELETE FROM customers WHERE phone=$1", [qaPhone]);
  }
  await db.query("DELETE FROM departures WHERE product_id=$1", [tourId]);
  await db.query("DELETE FROM products WHERE id=$1", [tourId]);
  await db.end();
}
