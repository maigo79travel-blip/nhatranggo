import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.APP_URL || "http://localhost:3001";
const browser = await chromium.launch();

try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const cases = [
    { label: "English", code: "en", navText: "Hotels" },
    { label: "Русский", code: "ru", navText: "Отели" },
    { label: "한국어", code: "ko", navText: "호텔" },
    { label: "中文", code: "zh", navText: "酒店" },
    { label: "Tiếng Việt", code: "vi", navText: "Khách sạn" },
  ];

  await page.goto(base + "/");
  await page.locator("body[data-hydrated=true]").waitFor();

  for (const item of cases) {
    await page.getByLabel("Ngôn ngữ / Language").click();
    await page.getByRole("option", { name: item.label, exact: true }).click();
    await page.waitForFunction(
      (expected) => document.documentElement.lang === expected,
      item.code,
    );
    await page
      .locator("header")
      .getByRole("link", { name: item.navText, exact: true })
      .waitFor();
    const cookies = await context.cookies(base);
    assert.equal(
      cookies.find((c) => c.name === "site_locale")?.value,
      item.code,
    );
  }

  // Switch to English and verify filters + footer fallback work
  await page.getByLabel("Ngôn ngữ / Language").click();
  await page.getByRole("option", { name: "English", exact: true }).click();
  await page.waitForFunction(() => document.documentElement.lang === "en");

  await page.goto(base + "/khach-san");
  await page.locator("body[data-hydrated=true]").waitFor();
  await page.getByRole("button", { name: /5 Stars VIP/i }).click();
  assert.ok(
    (await page.locator("[data-product-id]").count()) >= 1,
    "Expected English 5-star hotel filter to return results",
  );
  assert.ok(
    (await page.locator("footer ul").nth(1).locator("li").count()) >= 1,
    "Expected footer About us links to fallback in English",
  );

  await page.goto(base + "/tour-hang-ngay");
  await page.locator("body[data-hydrated=true]").waitFor();
  await page.locator('.tour-cat-btn[data-category="du-thuyen"]').click();
  await page.waitForURL(/category=du-thuyen/);
  assert.ok(
    (await page.locator("[data-product-id]:visible").count()) >= 1,
    "Expected English cruise tour filter to return results",
  );

  // Verify zero Vietnamese diacritics leak across all 8 public routes in en, ru, ko, zh
  const vnDiacritics =
    /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;
  const publicRoutes = [
    "/",
    "/khach-san",
    "/tour-hang-ngay",
    "/xe-dua-don",
    "/fast-track",
    "/lien-he",
    "/tra-cuu",
    "/blog",
  ];
  for (const item of cases.filter((c) => c.code !== "vi")) {
    await page.getByLabel("Ngôn ngữ / Language").click();
    await page.getByRole("option", { name: item.label, exact: true }).click();
    await page.waitForFunction(
      (expected) => document.documentElement.lang === expected,
      item.code,
    );
    for (const route of publicRoutes) {
      await page.goto(base + route);
      await page.locator("body[data-hydrated=true]").waitFor();
      const text = await page.evaluate(() => document.body.innerText);
      const cleaned = text
        .replace(/Tiếng Việt/g, "")
        .replace(/Mövenpick|Meliá|Canapé/gi, "");
      const lines = cleaned
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l && vnDiacritics.test(l) && !/homeqa/i.test(l));
      assert.deepEqual(
        lines,
        [],
        `Found untranslated Vietnamese text on ${route} in ${item.code} mode: ${lines.slice(0, 5).join(" | ")}`,
      );
    }
  }

  // Restore Vietnamese
  await page.getByLabel("Ngôn ngữ / Language").click();
  await page.getByRole("option", { name: "Tiếng Việt", exact: true }).click();
  await page.waitForFunction(() => document.documentElement.lang === "vi");

  console.log(
    "PASS i18n: 5-locale switching, <html lang>, cookie, English filters, footer fallback, & 8-route 4-locale zero-VN check",
  );
} finally {
  await browser.close();
}
