import { launchBrowser } from "./browser.mjs";
import { request, expect } from "@playwright/test";
import fs from "node:fs/promises";
import pg from "pg";
import sharp from "sharp";
import assert from "node:assert/strict";
const baseURL = process.env.TEST_URL || "http://localhost:3001";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
const username = credentials.match(/^Username: (.+)$/m)[1];
const password = credentials.match(/^Password: (.+)$/m)[1];
const anonymous = await request.newContext({ baseURL }),
  admin = await request.newContext({ baseURL });
const stamp = Date.now().toString(),
  tag = "modules-qa-" + stamp,
  phone = "09" + stamp.slice(-8);
const created = {};
let browser;
const resources = [
  "articles",
  "categories",
  "customers",
  "partners",
  "destinations",
  "routes",
  "rooms",
  "departures",
  "requests",
  "contacts",
  "pages",
  "translations",
  "users",
];
async function call(client, method, path, data, expected = 200) {
  const response = await client.fetch(path, { method, data });
  const body = await response.json();
  assert.equal(
    response.status(),
    expected,
    `${method} ${path}: ${JSON.stringify(body)}`,
  );
  return body;
}
async function create(resource, data) {
  const result = await call(admin, "POST", "/api/admin/" + resource, data, 201);
  (created[resource] ??= []).push(result.data.id);
  return result.data;
}
try {
  for (const resource of resources)
    assert.equal((await anonymous.get("/api/admin/" + resource)).status(), 401);
  await call(admin, "POST", "/api/admin/session", { username, password });
  const image = await sharp({
    create: {
      width: 17,
      height: 17,
      channels: 3,
      background: "#" + stamp.slice(-6),
    },
  })
    .png()
    .toBuffer();
  const uploaded = await admin.post("/api/admin/media", {
    data: image,
    headers: { "Content-Type": "image/png" },
  });
  assert.equal(uploaded.status(), 201);
  const { url: imageUrl } = await uploaded.json();
  assert.match(imageUrl, /^\/api\/media\/[a-f0-9]{64}$/);
  created.image = imageUrl.split("/").at(-1);
  const downloaded = await anonymous.get(imageUrl);
  assert.equal(downloaded.status(), 200);
  assert.equal(downloaded.headers()["content-type"], "image/webp");
  assert.equal((await sharp(await downloaded.body()).metadata()).width, 17);
  const category = await create("categories", {
    title: tag,
    slug: tag,
    active: true,
  });
  let article = await create("articles", {
    title: tag,
    slug: tag,
    locale: "vi",
    category_id: category.id,
    excerpt: "Bài kiểm tra module",
    body: `## Nội dung\n\n**Bài viết** có ảnh và liên kết.\n\n![Ảnh kiểm thử](${imageUrl})`,
    image: imageUrl,
    status: "draft",
  });
  assert.equal((await anonymous.get("/blog/" + tag)).status(), 404);
  article = (
    await call(admin, "PATCH", "/api/admin/articles", {
      ...article,
      status: "published",
    })
  ).data;
  assert.ok((await (await anonymous.get("/blog/" + tag)).text()).includes(tag));
  assert.ok(
    (await (await anonymous.get("/blog?category=" + tag)).text()).includes(tag),
  );
  const page = await create("pages", {
    title: "Chính sách " + tag,
    slug: tag,
    locale: "vi",
    body: "Thông tin chính sách để kiểm tra.",
    status: "published",
  });
  assert.ok(
    (await (await anonymous.get("/thong-tin/" + page.slug)).text()).includes(
      "Thông tin chính sách",
    ),
  );
  assert.ok(
    (await (await anonymous.get("/")).text()).includes(
      "/thong-tin/" + page.slug,
    ),
  );
  const destination = await create("destinations", {
    name: tag,
    code: "QA" + stamp,
    active: true,
  });
  const destinations = (await call(admin, "GET", "/api/admin/destinations"))
    .data;
  const pickup = destinations.find((d) => d.code === "CXR");
  const route = await create("routes", {
    title: tag,
    pickup_id: pickup.id,
    dropoff_id: destination.id,
    active: true,
  });
  assert.equal(route.code, pickup.code + "_" + destination.code);
  await call(
    admin,
    "POST",
    "/api/admin/fares",
    { route: route.code, vehicle: "4cho", price: 987000 },
    201,
  );
  const quote = await call(
    anonymous,
    "GET",
    `/api/fares?pickup=${pickup.code}&dropoff=${destination.code}&vehicle=4cho`,
  );
  assert.equal(quote.price, 987000);
  const fare = { route: route.code, vehicle: "4cho", price: 988000 };
  const quotePath = `/api/fares?pickup=${pickup.code}&dropoff=${destination.code}&vehicle=4cho`;
  const transferResults = `/api/products?type=transfer&q=${encodeURIComponent(tag)}`;
  const transferDetails = `/api/products/${quote.productId}`;
  assert.equal(route.category, "airport");
  await call(anonymous, "DELETE", "/api/admin/fares", fare, 401);
  await call(admin, "POST", "/api/admin/fares", fare, 409);
  await call(admin, "PATCH", "/api/admin/fares", fare);
  assert.equal((await call(anonymous, "GET", quotePath)).price, fare.price);
  const list = await call(anonymous, "GET", transferResults);
  assert.deepEqual(
    list.data.map(({ id, price }) => ({ id, price })),
    [{ id: quote.productId, price: fare.price }],
  );
  assert.equal(Object.hasOwn(list.data[0], "partner_id"), false);
  await call(anonymous, "GET", "/api/products?limit=101", undefined, 400);
  await call(anonymous, "GET", quotePath + "&vehicle=invalid", undefined, 400);
  assert.ok((await (await anonymous.get("/xe-dua-don")).text()).includes(tag));

  const renamed = `${tag} route-updated`;
  await call(admin, "PATCH", "/api/admin/routes", {
    ...route,
    title: renamed,
    active: false,
  });
  assert.deepEqual((await call(anonymous, "GET", transferResults)).data, []);
  await call(anonymous, "GET", quotePath, undefined, 404);
  await call(anonymous, "GET", transferDetails, undefined, 404);
  assert.ok(
    !(await (await anonymous.get("/xe-dua-don")).text()).includes(renamed),
  );

  await call(admin, "PATCH", "/api/admin/routes", {
    ...route,
    title: renamed,
    active: true,
  });
  assert.ok(
    (await (await anonymous.get("/xe-dua-don")).text()).includes(renamed),
  );
  assert.ok(
    (await call(anonymous, "GET", transferResults)).data[0].title.startsWith(
      renamed,
    ),
  );

  await call(admin, "DELETE", "/api/admin/fares", {
    route: route.code,
    vehicle: "4cho",
  });
  await call(anonymous, "GET", quotePath, undefined, 404);
  await call(anonymous, "GET", transferDetails, undefined, 404);
  assert.equal(
    (
      await db.query("SELECT active FROM products WHERE id=$1", [
        quote.productId,
      ])
    ).rows[0].active,
    false,
  );
  await call(admin, "POST", "/api/admin/fares", fare, 201);
  assert.equal((await call(anonymous, "GET", quotePath)).price, fare.price);
  await call(
    admin,
    "DELETE",
    "/api/admin/products",
    { id: quote.productId },
    404,
  );
  assert.equal((await call(anonymous, "GET", quotePath)).price, fare.price);
  const homeHtml = await (await anonymous.get("/")).text();
  assert.ok(!homeHtml.includes(quote.productId));
  assert.ok(!homeHtml.includes("hotels.text-046"));
  console.log(
    "PASS public route and fare creation, update, hiding, reactivation, API validation and scoped Home payload",
  );

  const partner = await create("partners", {
    name: tag,
    kind: "driver",
    phone,
    email: "qa@example.test",
    notes: "",
    active: true,
  });
  const product = (
    await call(
      admin,
      "POST",
      "/api/admin/products",
      { title: tag, type: "hotel" },
      201,
    )
  ).data;
  created.products = [product.id];
  const published = (
    await call(admin, "PATCH", "/api/admin/products", {
      ...product,
      price: 500000,
      original_price: null,
      destination_id: destination.id,
      partner_id: null,
      active: true,
    })
  ).data;
  assert.ok(
    (
      await (
        await anonymous.get("/khach-san?destination=" + destination.id)
      ).text()
    ).includes(tag),
  );
  const room = await create("rooms", {
    product_id: product.id,
    title: tag,
    price: 750000,
    capacity: 4,
    active: true,
  });
  await call(
    admin,
    "POST",
    "/api/admin/departures",
    { product_id: product.id, date: "2099-12-01", active: true },
    400,
  );
  const tour = (
    await call(
      admin,
      "POST",
      "/api/admin/products",
      { title: tag + " tour", type: "tour" },
      201,
    )
  ).data;
  created.products.push(tour.id);
  await call(admin, "PATCH", "/api/admin/products", {
    ...tour,
    price: 250000,
    original_price: null,
    active: true,
  });
  await create("departures", {
    product_id: tour.id,
    date: "2099-12-01",
    notes: "Lịch trình QA",
    active: true,
  });
  await call(
    anonymous,
    "POST",
    "/api/bookings",
    { productId: tour.id, name: tag, phone, date: "2099-12-02", guests: 2 },
    400,
  );
  await call(
    anonymous,
    "POST",
    "/api/bookings",
    {
      productId: published.id,
      name: tag,
      phone,
      date: "2099-12-01",
      guests: 2,
    },
    400,
  );
  const booking = await call(
    anonymous,
    "POST",
    "/api/bookings",
    {
      productId: product.id,
      roomId: room.id,
      name: tag,
      phone,
      date: "2099-12-01",
      returnDate: "2099-12-03",
      guests: 2,
    },
    201,
  );
  created.booking = booking.id;
  const snapshot = (
    await db.query("SELECT unit_price,status FROM bookings WHERE id=$1", [
      booking.id,
    ])
  ).rows[0];
  assert.equal(snapshot.unit_price, 750000);
  assert.equal(snapshot.status, "pending");
  assert.equal(
    (
      await anonymous.get(`/api/bookings?id=${booking.id}&phone=0900000000`)
    ).status(),
    404,
  );
  assert.equal(
    (
      await call(
        anonymous,
        "GET",
        `/api/bookings?id=${booking.id}&phone=${phone}`,
      )
    ).status,
    "pending",
  );
  await call(admin, "PATCH", "/api/admin/bookings", {
    id: booking.id,
    status: "confirmed",
    partner_id: partner.id,
    internal_notes: "Phân tài xế QA",
  });
  await call(admin, "PATCH", "/api/admin/bookings", {
    id: booking.id,
    status: "completed",
    partner_id: partner.id,
    internal_notes: "Hoàn tất QA",
  });
  assert.equal(
    (await call(admin, "GET", "/api/admin/bookings?history=" + booking.id)).data
      .length,
    3,
  );
  await call(admin, "DELETE", "/api/admin/bookings", { id: booking.id }, 400);
  assert.ok(
    (await (await admin.get("/api/admin/booking-export")).text()).includes(
      booking.id,
    ),
  );
  assert.ok(
    (await call(admin, "GET", "/api/admin/customers")).data.some(
      (c) => c.phone === phone,
    ),
  );
  const matching = await call(
    admin,
    "GET",
    `/api/admin/bookings?page=1&q=${booking.id}&status=completed&type=hotel&from=2099-12-01&to=2099-12-01`,
  );
  assert.equal(matching.total, 1);
  assert.equal(matching.data[0].id, booking.id);
  assert.equal(matching.data[0].room_title, room.title);
  const excluded = await call(
    admin,
    "GET",
    `/api/admin/bookings?page=1&q=${booking.id}&status=cancelled`,
  );
  assert.equal(excluded.total, 0);
  const workbook = await admin.get(
    `/api/admin/booking-export?format=xlsx&q=${booking.id}`,
  );
  assert.equal(workbook.status(), 200);
  assert.match(workbook.headers()["content-disposition"], /bookings\.xlsx/);
  assert.equal(
    (await workbook.body()).subarray(0, 4).toString("hex"),
    "504b0304",
  );
  for (const kind of ["evisa", "fast-track"]) {
    const result = await call(
      anonymous,
      "POST",
      "/api/requests",
      {
        kind,
        name: tag,
        phone,
        email: "qa@example.test",
        airport: "Cam Ranh",
        arrival_at: "2099-12-01T10:00:00+07:00",
        nationality: "VN",
      },
      201,
    );
    (created.requests ??= []).push(result.id);
  }
  const contact = await call(
    anonymous,
    "POST",
    "/api/contact",
    {
      name: tag,
      phone,
      email: "qa@example.test",
      subject: tag,
      message: "Yêu cầu hỗ trợ từ bài kiểm tra module.",
    },
    201,
  );
  created.contacts = [contact.id];
  await call(
    anonymous,
    "POST",
    "/api/contact",
    { name: tag, email: "invalid", subject: tag, message: "Nội dung kiểm tra" },
    400,
  );
  const translation = await create("translations", {
    entity: "product",
    entity_key: product.id,
    locale: "en",
    value: { title: "Translated " + tag },
  });
  assert.ok(translation.id);
  await call(anonymous, "POST", "/api/locale", { locale: "en" });
  const translated = await (
    await anonymous.get("/khach-san?destination=" + destination.id)
  ).text();
  assert.ok(translated.includes("Translated " + tag));
  assert.ok(translated.includes('lang="en"'));
  await call(anonymous, "POST", "/api/locale", { locale: "vi" });
  for (const role of ["booking", "editor"]) {
    const account = await create("users", {
      username: tag + "-" + role,
      password: "ModuleQA!" + stamp,
      role,
      active: true,
    });
    assert.equal(account.password_hash, undefined);
    const context = await request.newContext({ baseURL });
    await call(context, "POST", "/api/admin/session", {
      username: account.username,
      password: "ModuleQA!" + stamp,
    });
    assert.equal((await context.get("/api/admin/users")).status(), 403);
    assert.equal(
      (
        await context.get(
          "/api/admin/" + (role === "booking" ? "bookings" : "articles"),
        )
      ).status(),
      200,
    );
    assert.equal(
      (
        await context.get(
          "/api/admin/" + (role === "booking" ? "articles" : "bookings"),
        )
      ).status(),
      403,
    );
    assert.equal(
      (
        await context.patch("/api/admin/products", { data: { id: product.id } })
      ).status(),
      role === "booking" ? 403 : 400,
    );
    await context.dispose();
  }
  const current = (await call(admin, "GET", "/api/admin/session")).user;
  await call(
    admin,
    "PATCH",
    "/api/admin/users",
    {
      id: current.id,
      username: current.username,
      role: "editor",
      active: true,
    },
    400,
  );
  assert.equal((await anonymous.get("/api/favorites")).status(), 404);
  assert.equal(
    (
      await anonymous.post("/api/subscribe", {
        data: { email: "x@example.test" },
      })
    ).status(),
    404,
  );
  console.log(
    "PASS module APIs: CRUD, publication, destinations/routes/fares, rooms/departures, bookings/history/export, CRM, requests/contact, translation, 3 roles and removed modules",
  );
  browser = await launchBrowser();
  const context = await browser.newContext({
    storageState: await admin.storageState(),
    viewport: { width: 1440, height: 1000 },
  });
  const ui = await context.newPage();
  ui.setDefaultTimeout(10000);
  const errors = [];
  const failedStyles = [];
  ui.on("pageerror", (e) => errors.push(e.message));
  ui.on("response", (response) => {
    if (
      ["stylesheet", "font"].includes(response.request().resourceType()) &&
      response.status() >= 400
    )
      failedStyles.push(response.url());
  });
  await ui.goto(baseURL + "/admin");
  await ui.getByRole("heading", { name: "Tổng quan", exact: true }).waitFor();
  const nav = ui.getByRole("navigation", { name: "Điều hướng quản trị" });
  for (const label of [
    "Blog & Tin tức",
    "Loại phòng",
    "Lịch khởi hành tour",
    "E-Visa & Fast-track",
    "Khách hàng",
    "Đối tác & Tài xế",
    "Liên hệ & Hỗ trợ",
    "Giới thiệu & Chính sách",
    "Ngôn ngữ website",
    "Tài khoản & Phân quyền",
  ]) {
    await nav.getByRole("button", { name: label, exact: true }).click();
    await expect(ui.getByRole("heading", { level: 1 })).toHaveText(label);
    await expect(
      ui.getByRole("button", {
        name: label === "Blog & Tin tức" ? "Viết bài mới" : "Thêm mới",
        exact: true,
      }),
    ).toBeVisible();
  }
  await nav.getByRole("button", { name: /^Đặt chỗ/ }).click();
  await ui
    .getByRole("button", { name: "Tạo đơn thủ công", exact: true })
    .click();
  const manual = ui.getByRole("dialog");
  await manual.getByLabel("Dịch vụ", { exact: true }).selectOption(tour.id);
  await manual.getByLabel("Họ và tên").fill(`Thủ công ${tag}`);
  await manual.getByLabel("Số điện thoại").fill(phone);
  await manual.getByLabel("Ngày sử dụng").fill("2099-12-01");
  await manual
    .getByRole("button", { name: "Tạo đơn đặt chỗ", exact: true })
    .click();
  await expect(manual).toHaveCount(0);
  await ui.getByLabel("Tìm dữ liệu").fill(`Thủ công ${tag}`);
  await ui.getByRole("button", { name: "Lọc đơn", exact: true }).click();
  await ui
    .getByRole("button", { name: `Thủ công ${tag}`, exact: true })
    .click();
  await expect(ui.getByRole("dialog")).toContainText(
    "Nhân viên tạo đơn thủ công",
  );
  await ui.keyboard.press("Escape");
  await expect(ui.getByRole("link", { name: "Xuất Excel" })).toHaveAttribute(
    "href",
    /format=xlsx/,
  );
  console.log(
    "PASS admin manual booking, dated filters, XLSX and uploaded WebP",
  );
  await nav
    .getByRole("button", { name: "Blog & Tin tức", exact: true })
    .click();
  await expect(
    ui.getByRole("columnheader", { name: "Cập nhật", exact: true }),
  ).toBeVisible();
  await expect(
    ui
      .getByRole("row")
      .filter({ has: ui.getByRole("cell", { name: tag, exact: true }) })
      .getByRole("cell", { name: "Đã đăng", exact: true }),
  ).toBeVisible();
  await ui.getByRole("button", { name: "Viết bài mới", exact: true }).click();
  await expect(ui.getByRole("dialog")).toBeVisible();
  await ui.getByRole("button", { name: "Xem trước", exact: true }).click();
  await ui.keyboard.press("Escape");
  await fs.mkdir("test-results/modules", { recursive: true });
  await ui.screenshot({ path: "test-results/modules/admin-blog.png" });
  assert.equal(
    await ui
      .locator(".ad-content")
      .evaluate((element) => getComputedStyle(element).maxWidth),
    "none",
    "Admin content width is capped",
  );
  for (const width of [1920, 1440, 768, 390, 320]) {
    await ui.setViewportSize({ width, height: 900 });
    for (const path of [
      "/khach-san?q=Bãi%20Dài",
      "/blog",
      "/e-visa",
      "/fast-track",
      "/lien-he",
      "/tra-cuu",
      "/blog/" + article.slug,
      "/thong-tin/" + page.slug,
    ]) {
      assert.equal((await ui.goto(baseURL + path)).status(), 200);
      await ui.locator("h1").waitFor();
      await expect(ui.locator(".public-page-hero p")).toHaveCount(0);
      await ui.evaluate(() => document.fonts.ready);
      assert.equal(
        await ui.evaluate(() =>
          document.fonts.check('16px "Plus Jakarta Sans"'),
        ),
        true,
      );
      const styling = await ui.locator("main").evaluate((main) => {
        const heading = main.querySelector("h1");
        const controls = [
          ...main.querySelectorAll(
            "input:not([type=radio]),select,button[type=submit]",
          ),
        ];
        return {
          headingSize: parseFloat(getComputedStyle(heading).fontSize),
          controlsUsable: controls.every(
            (control) => control.getBoundingClientRect().height >= 44,
          ),
          controlsStyled: controls.every(
            (control) =>
              parseFloat(getComputedStyle(control).borderRadius) >= 8,
          ),
          adminClasses: main.querySelectorAll(
            '[class*="ad-input"],[class*="ad-badge"]',
          ).length,
        };
      });
      assert.ok(styling.headingSize >= 28, `${path} heading CSS missing`);
      assert.ok(
        styling.controlsUsable && styling.controlsStyled,
        `${path} control CSS missing at ${width}`,
      );
      assert.equal(styling.adminClasses, 0, `${path} depends on admin CSS`);
      for (const container of await ui.locator(".public-container").all()) {
        assert.equal(
          await container.evaluate((element) =>
            Math.round(element.getBoundingClientRect().width),
          ),
          width,
          `${path} container width is capped at ${width}`,
        );
      }
      await expect(
        ui.locator(".floating-contacts [data-contact-channel]"),
      ).toHaveCount(6);
      assert.equal(
        await ui.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${path} overflow at ${width}`,
      );
      if (width === 1440 || width === 390) {
        await ui.screenshot({
          path: `test-results/modules/${path.slice(1).replaceAll("/", "-")}-${width}.png`,
          animations: "disabled",
        });
      }
    }
  }
  await ui.goto(baseURL + "/e-visa");
  await ui.screenshot({ path: "test-results/modules/e-visa-mobile.png" });
  await ui.goto(baseURL + "/tra-cuu");
  await ui.getByLabel("Mã booking", { exact: true }).fill(booking.id);
  await ui.getByLabel("Số điện thoại đã đặt", { exact: true }).fill(phone);
  await ui
    .getByRole("button", { name: "Tra cứu booking", exact: true })
    .click();
  await expect(ui.getByRole("status")).toContainText("Hoàn tất");
  const badge = ui.locator('.public-booking-status[data-status="completed"]');
  await expect(badge).toBeVisible();
  assert.equal(
    await badge.evaluate((element) => getComputedStyle(element).display),
    "inline-flex",
  );
  await ui.screenshot({
    path: "test-results/modules/lookup-result-mobile.png",
    animations: "disabled",
  });
  assert.deepEqual(failedStyles, []);
  assert.deepEqual(errors, []);
  console.log(
    "PASS module UI: admin menus/editor, 40 responsive public route cases, uncapped page widths, CSS/fonts, styled controls and public booking status",
  );
} finally {
  if (browser) await browser.close();
  if (created.products?.length) {
    await db.query(
      "DELETE FROM booking_history WHERE booking_id IN(SELECT id FROM bookings WHERE product_id=ANY($1::text[]))",
      [created.products],
    );
    await db.query("DELETE FROM bookings WHERE product_id=ANY($1::text[])", [
      created.products,
    ]);
    await db.query("DELETE FROM rooms WHERE product_id=ANY($1::text[])", [
      created.products,
    ]);
    await db.query("DELETE FROM departures WHERE product_id=ANY($1::text[])", [
      created.products,
    ]);
    await db.query("DELETE FROM products WHERE id=ANY($1::text[])", [
      created.products,
    ]);
  }
  if (created.routes?.length) {
    const routes = (
      await db.query(
        "SELECT code FROM transfer_routes WHERE id=ANY($1::uuid[])",
        [created.routes],
      )
    ).rows;
    for (const r of routes) {
      await db.query("DELETE FROM products WHERE id LIKE $1", [
        "transfer-" + r.code + "-%",
      ]);
      await db.query("DELETE FROM transfer_fares WHERE route=$1", [r.code]);
    }
  }
  for (const [resource, table] of [
    ["translations", "translations"],
    ["articles", "articles"],
    ["categories", "article_categories"],
    ["pages", "information_pages"],
    ["requests", "service_requests"],
    ["contacts", "contacts"],
    ["partners", "partners"],
    ["routes", "transfer_routes"],
    ["destinations", "destinations"],
    ["users", "admin_users"],
  ])
    if (created[resource]?.length)
      await db.query(`DELETE FROM ${table} WHERE id=ANY($1::uuid[])`, [
        created[resource],
      ]);
  if (created.image)
    await db.query("DELETE FROM site_images WHERE id=$1", [created.image]);
  await db.query("DELETE FROM customers WHERE phone=$1", [phone]);
  await db.end();
  await admin.dispose();
  await anonymous.dispose();
}
