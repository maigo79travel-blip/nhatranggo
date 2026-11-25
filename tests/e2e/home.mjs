import { expect } from "@playwright/test";
import { launchBrowser } from "./browser.mjs";
import fs from "node:fs/promises";
import pg from "pg";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
const base = process.env.TEST_URL || "http://localhost:3001";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const tag = "homeqa-" + Date.now(),
  hotelId = tag + "-hotel",
  tourId = tag + "-tour",
  articleId = randomUUID(),
  draftId = randomUUID(),
  roomId = randomUUID();
const phone = "09" + Date.now().toString().slice(-8);
let browser;
try {
  await db.query(
    "INSERT INTO products(id,type,title,price,location,active) VALUES($1,'hotel',$2,500000,'Cam Ranh',true),($3,'tour',$4,200000,'Nha Trang',true)",
    [hotelId, tag + " hotel", tourId, tag + " tour"],
  );
  await db.query(
    "INSERT INTO rooms(id,product_id,title,price,capacity) VALUES($1,$2,'Phòng bốn khách',750000,4)",
    [roomId, hotelId],
  );
  await db.query(
    "INSERT INTO departures(id,product_id,date) VALUES($1,$2,'2099-12-01')",
    [randomUUID(), tourId],
  );
  await db.query(
    "INSERT INTO articles(id,title,slug,locale,body,status) VALUES($1,$2,$3,'vi','Nội dung bài viết kiểm tra trang chủ.','published'),($4,$5,$6,'vi','Bản nháp kiểm tra.','draft')",
    [
      articleId,
      "Bài kiểm tra Home " + tag,
      tag,
      draftId,
      "Nháp " + tag,
      tag + "-draft",
    ],
  );
  browser = await launchBrowser();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  async function home() {
    await page.goto(base + "/");
    await page.locator("body[data-hydrated=true]").waitFor();
  }
  await home();
  const search = page.locator("[data-home-search]");
  await expect(search.locator('[data-service-type="hotel"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  // Search buttons, active state, destination matching and correct service type.
  for (const type of ["hotel", "tour", "combo", "transfer"]) {
    await home();
    await search.locator(`[data-service-type="${type}"]`).click();
    await expect(search.locator('[aria-pressed="true"]')).toHaveCount(1);
    await search.getByRole("button", { name: "Tìm kiếm", exact: true }).click();
    await page.waitForURL("**/dich-vu?*");
    assert.equal(new URL(page.url()).searchParams.get("type"), type);
    const serviceIds = await page
      .locator("[data-service-id]")
      .evaluateAll((cards) => cards.map((card) => card.dataset.serviceId));
    assert.ok(
      serviceIds.length > 0,
      `${type}: default region must return matching services`,
    );
    const rows = (
      await db.query("SELECT type FROM products WHERE id=ANY($1::text[])", [
        serviceIds,
      ])
    ).rows;
    assert.ok(rows.every((row) => row.type === type));
  }
  await home();
  await search
    .getByLabel("Điểm đến hoặc tên dịch vụ", { exact: true })
    .fill("cam ranh");
  await search
    .getByLabel("Điểm đến hoặc tên dịch vụ", { exact: true })
    .press("Enter");
  await page.waitForURL("**/dich-vu?*");
  const regionIds = await page
    .locator("[data-service-id]")
    .evaluateAll((cards) => cards.map((card) => card.dataset.serviceId));
  assert.ok(regionIds.length > 0);
  await expect(
    page.getByRole("radio", { name: "Khách sạn", exact: true }),
  ).toBeChecked();
  await home();
  await search
    .getByLabel("Ngày nhận phòng", { exact: true })
    .fill("2099-12-01");
  await search.getByLabel("Ngày trả phòng", { exact: true }).fill("2099-11-30");
  await search.getByRole("button", { name: "Tìm kiếm", exact: true }).click();
  assert.equal(new URL(page.url()).pathname, "/");
  assert.equal(
    await search.locator("form").evaluate((form) => form.checkValidity()),
    false,
  );
  // All five hotel filters, reset, scope isolation and selected-state feedback.
  await home();
  const hotels = page.locator("#home-hotels");
  const originalIds = await hotels
    .locator("[data-product-id]")
    .evaluateAll((cards) => cards.map((card) => card.dataset.productId));
  assert.ok(originalIds.includes("hotels-1") && originalIds.includes("hotels-2"));
  const otherCount =
    (await page.locator("main [data-product-id]").count()) - originalIds.length;
  for (const [filter, present, absent] of [
    ["near-beach", "hotels-1", null],
    ["family", "hotels-2", "hotels-1"],
    ["resort", "hotels-2", "hotels-1"],
    ["special-deal", "hotels-1", null],
    ["all", "hotels-1", null],
  ]) {
    await hotels.locator(`[data-hotel-filter="${filter}"]`).click();
    await expect(
      hotels.locator(`[data-hotel-filter="${filter}"]`),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      hotels.locator('.hotel-filter[aria-pressed="true"]'),
    ).toHaveCount(1);
    const ids = await hotels
      .locator("[data-product-id]")
      .evaluateAll((cards) => cards.map((card) => card.dataset.productId));
    assert.ok(ids.includes(present), filter);
    if (absent) assert.ok(!ids.includes(absent), filter);
    assert.equal(
      (await page.locator("main [data-product-id]").count()) - ids.length,
      otherCount,
    );
  }
  assert.deepEqual(
    await hotels
      .locator("[data-product-id]")
      .evaluateAll((cards) => cards.map((card) => card.dataset.productId)),
    originalIds,
  );
  // Every service-card action on Home must open its own booking dialog.
  const cardIds = await page
    .locator("main [data-product-id]")
    .evaluateAll((cards) => cards.map((card) => card.dataset.productId));
  for (const id of cardIds) {
    const card = page.locator(`[data-product-id="${id}"]`);
    const action = card.getByRole("link", { name: /Đặt (phòng|tour|combo)/i });
    await expect(action).toHaveCount(1);
    await action.click();
    await expect(
      page.getByRole("dialog", { name: "Yêu cầu đặt chỗ", exact: true }),
    ).toBeVisible();
    const title = (
      await db.query("SELECT title FROM products WHERE id=$1", [id])
    ).rows[0].title;
    await expect(
      page.getByRole("dialog").getByRole("heading", { level: 3 }),
    ).toHaveText(title);
    await page.getByRole("button", { name: "Đóng", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  // Internal links, suggestions, destination cards and published articles.
  const internal = await page
    .locator("a")
    .evaluateAll((links) => [
      ...new Set(
        links
          .filter(
            (link) =>
              link.href.startsWith(location.origin) &&
              !link.closest("[data-product-id]"),
          )
          .map((link) => link.pathname + link.search + link.hash),
      ),
    ]);
  assert.ok(internal.every((link) => link !== "/#" && link !== "#"));
  for (const path of internal) {
    const response = await page.request.get(base + path);
    assert.equal(response.status(), 200, path);
    if (path.startsWith("/#") && path.length > 2)
      assert.equal(await page.locator(path.slice(1)).count(), 1, path);
  }
  await expect(
    page.locator("#cam-nang").getByText("Nháp " + tag, { exact: true }),
  ).toHaveCount(0);
  await page
    .locator("#cam-nang")
    .getByRole("link", {
      name: new RegExp("Đọc tiếp.*" + tag),
    })
    .click();
  await page.waitForURL("**/blog/" + tag);
  await expect(page.locator("h1")).toHaveText("Bài kiểm tra Home " + tag);
  await home();
  await page
    .getByRole("link", { name: "Resort Bãi Dài Cam Ranh", exact: true })
    .click();
  await page.waitForURL("**/dich-vu?*");
  assert.equal(new URL(page.url()).searchParams.get("type"), "hotel");
  assert.equal(new URL(page.url()).searchParams.get("q"), "Bãi Dài");
  await home();
  const cityLink = page.locator("main a").filter({
    has: page.getByRole("heading", { name: "Đà Lạt", exact: true }),
  });
  await cityLink.click();
  await page.waitForURL("**/dich-vu?*");
  assert.equal(new URL(page.url()).searchParams.get("q"), "Đà Lạt");
  // Search selections flow into a real booking and the database snapshot.
  await home();
  await search
    .getByLabel("Điểm đến hoặc tên dịch vụ", { exact: true })
    .fill(tag + " hotel");
  await search
    .getByLabel("Ngày nhận phòng", { exact: true })
    .fill("2099-12-01");
  await search.getByLabel("Ngày trả phòng", { exact: true }).fill("2099-12-03");
  await search.getByLabel("Số khách", { exact: true }).fill("3");
  await search.getByRole("button", { name: "Tìm kiếm", exact: true }).click();
  await page.waitForURL("**/dich-vu?*");
  await expect(page.locator("[data-service-id]")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Gửi yêu cầu đặt chỗ", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByLabel("Ngày nhận phòng", { exact: true }),
  ).toHaveValue("2099-12-01");
  await expect(
    dialog.getByLabel("Ngày trả phòng", { exact: true }),
  ).toHaveValue("2099-12-03");
  await expect(dialog.getByLabel("Số khách", { exact: true })).toHaveValue("3");
  await dialog
    .getByLabel("Họ và tên", { exact: true })
    .fill("Kiểm tra nút Home");
  await dialog.getByLabel("Số điện thoại", { exact: true }).fill(phone);
  await dialog.getByLabel("Loại phòng").selectOption(roomId);
  await dialog
    .getByRole("button", { name: "Gửi yêu cầu đặt chỗ", exact: true })
    .click();
  await expect(dialog.getByRole("status")).toContainText("Mã yêu cầu:");
  const booking = (
    await db.query(
      "SELECT return_date::text,departure_date::text,guests,unit_price FROM bookings WHERE product_id=$1",
      [hotelId],
    )
  ).rows[0];
  assert.deepEqual(booking, {
    return_date: "2099-12-03",
    departure_date: "2099-12-01",
    guests: 3,
    unit_price: 750000,
  });
  // Category pills apply the current fields and keep client navigation/history.
  await page.goto(
    base +
      "/dich-vu?type=hotel&q=" +
      tag +
      "&date=2099-12-01&returnDate=2099-12-03&guests=3",
  );
  await page.locator("body[data-hydrated=true]").waitFor();
  await page.evaluate(() => {
    window.__filterToken = "client-filter";
  });
  const serviceFilter = page.getByRole("form", {
    name: "Lọc dịch vụ",
    exact: true,
  });
  await serviceFilter.getByRole("radio", { name: "Tour", exact: true }).check();
  await page.waitForURL((url) => url.searchParams.get("type") === "tour");
  await expect(page.locator("[data-service-id]")).toHaveAttribute(
    "data-service-id",
    tourId,
  );
  for (const [name, value] of Object.entries({
    q: tag,
    date: "2099-12-01",
    returnDate: "2099-12-03",
    guests: "3",
  }))
    assert.equal(new URL(page.url()).searchParams.get(name), value);
  assert.equal(
    await page.evaluate(() => window.__filterToken),
    "client-filter",
  );
  await page.goBack();
  await expect(
    serviceFilter.getByRole("radio", { name: "Khách sạn", exact: true }),
  ).toBeChecked();
  await expect(
    serviceFilter.getByLabel("Từ khóa", { exact: true }),
  ).toHaveValue(tag);
  await serviceFilter
    .getByLabel("Từ khóa", { exact: true })
    .fill("zzzz-khong-co-ket-qua");
  await serviceFilter
    .getByRole("button", { name: "Lọc dịch vụ", exact: true })
    .click();
  await page.waitForURL(
    (url) => url.searchParams.get("q") === "zzzz-khong-co-ket-qua",
  );
  await expect(page.locator("[data-service-id]")).toHaveCount(0);
  assert.equal(
    await page.evaluate(() => window.__filterToken),
    "client-filter",
  );
  await serviceFilter
    .getByRole("link", { name: "Xóa bộ lọc", exact: true })
    .click();
  await page.waitForURL("**/dich-vu");
  await expect(
    serviceFilter.getByRole("radio", { name: "Tất cả", exact: true }),
  ).toBeChecked();
  await expect(
    serviceFilter.getByLabel("Từ khóa", { exact: true }),
  ).toHaveValue("");
  await page.goto(base + "/dich-vu?type=hotel&q=" + tag + "&guests=5");
  await expect(page.locator("[data-service-id]")).toHaveCount(0);
  await expect(page.getByText(/Chưa có dịch vụ phù hợp/)).toBeVisible();
  await page.getByRole("link", { name: "Xóa bộ lọc", exact: true }).click();
  await page.waitForURL("**/dich-vu");
  assert.ok((await page.locator("[data-service-id]").count()) > 0);
  await page.goto(base + "/dich-vu?type=tour&q=" + tag + "&date=2099-12-02");
  await expect(page.locator("[data-service-id]")).toHaveCount(0);
  await page.goto(base + "/dich-vu?type=tour&q=" + tag + "&date=2099-12-01");
  await expect(page.locator("[data-service-id]")).toHaveCount(1);
  await page.goto(base + "/dich-vu?q=zzzz-khong-co-ket-qua");
  await expect(page.locator("[data-service-id]")).toHaveCount(0);
  await expect(page.getByText(/Chưa có dịch vụ phù hợp/)).toBeVisible();
  await fs.mkdir("test-results/home", { recursive: true });
  for (const width of [1920, 1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await home();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `Home overflow ${width}`,
    );
    await search.locator('[data-service-type="combo"]').click();
    await expect(search.locator('[data-service-type="combo"]')).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await hotels.locator('[data-hotel-filter="cam-ranh"]').click();
    await expect(hotels.locator('[data-product-id="home-4"]')).toHaveCount(0);
    await page.evaluate(() => window.scrollTo(0, 0));
    if (width === 1440 || width === 390)
      await page.screenshot({ path: `test-results/home/after-${width}.png` });
  }
  assert.deepEqual(errors, []);
  console.log(
    `PASS Home: 4 search types, Enter, date validation, 5 scoped hotel filters, ${cardIds.length} booking buttons, ${internal.length} internal links, destinations, CMS articles, booking prefill/persistence, category pills, filter state/history without reload, empty/reset, capacity/departure filters and 5 responsive widths`,
  );
} finally {
  if (browser) await browser.close();
  await db.query(
    "DELETE FROM booking_history WHERE booking_id IN(SELECT id FROM bookings WHERE product_id=ANY($1::text[]))",
    [[hotelId, tourId]],
  );
  await db.query("DELETE FROM bookings WHERE product_id=ANY($1::text[])", [
    [hotelId, tourId],
  ]);
  await db.query("DELETE FROM rooms WHERE product_id=$1", [hotelId]);
  await db.query("DELETE FROM departures WHERE product_id=$1", [tourId]);
  await db.query("DELETE FROM products WHERE id=ANY($1::text[])", [
    [hotelId, tourId],
  ]);
  await db.query("DELETE FROM customers WHERE phone=$1", [phone]);
  await db.query("DELETE FROM articles WHERE id=ANY($1::uuid[])", [
    [articleId, draftId],
  ]);
  await db.end();
}
