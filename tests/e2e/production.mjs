import { expect, request } from "@playwright/test";
import { launchBrowser } from "./browser.mjs";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import pg from "pg";
const baseURL = process.env.TEST_URL || "http://localhost:3001";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const api = await request.newContext({ baseURL });
const second = await request.newContext({ baseURL });
const username = "security-qa-" + Date.now();
const key = createHash("sha256")
  .update("login:direct:" + username)
  .digest("hex");
let browser;
try {
  const health = await api.get("/api/health");
  assert.equal(health.status(), 200);
  assert.deepEqual(await health.json(), { status: "ok" });
  for (const path of [
    "/api/admin/session",
    "/api/bookings?id=00000000-0000-4000-8000-000000000000&phone=0900000000",
  ]) {
    const response = await api.get(path);
    assert.ok(response.headers()["cache-control"].includes("no-store"));
    assert.equal(response.headers()["x-content-type-options"], "nosniff");
    assert.equal(response.headers()["x-frame-options"], "DENY");
  }
  const login = "/api/admin/session";
  assert.equal(
    (
      await api.post(login, {
        headers: { origin: "https://other.example" },
        data: { username, password: "invalid" },
      })
    ).status(),
    403,
  );
  for (const data of ["null", "[]", '{"username":'])
    assert.equal(
      (
        await api.post(login, {
          headers: { "content-type": "application/json" },
          data,
        })
      ).status(),
      400,
    );
  assert.equal(
    (
      await api.post(login, {
        headers: { "content-type": "text/plain" },
        data: "{}",
      })
    ).status(),
    415,
  );
  assert.equal(
    (
      await api.post(login, {
        headers: { "content-type": "application/json" },
        data: JSON.stringify({ username, password: "x".repeat(70000) }),
      })
    ).status(),
    413,
  );
  const results = await Promise.all(
    Array.from({ length: 12 }, (_, index) =>
      (index % 2 ? api : second).post(login, {
        data: { username, password: "invalid-password" },
      }),
    ),
  );
  assert.equal(results.filter((r) => r.status() === 401).length, 10);
  assert.equal(results.filter((r) => r.status() === 429).length, 2);
  assert.ok(
    Number(results.find((r) => r.status() === 429).headers()["retry-after"]) >
      0,
  );
  assert.equal(
    (await db.query("SELECT attempts FROM request_limits WHERE key=$1", [key]))
      .rows[0].attempts,
    12,
  );
  console.log(
    "PASS production HTTP: health, private caching, security headers, origin, malformed/oversized JSON and atomic database login limits across clients",
  );
  browser = await launchBrowser();
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const contact = (
    await db.query("SELECT value FROM site_content WHERE key='site.contact'")
  ).rows[0].value;
  await fs.mkdir("test-results/production", { recursive: true });
  for (const width of [320, 390, 768, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(baseURL + "/khach-san?q=B%C3%A3i%20D%C3%A0i");
    await page.locator("body[data-hydrated=true]").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("header")).toContainText("NHATRANGGO");
    assert.ok((await page.title()).includes("NhaTrangGo"));
    assert.equal(
      /Booking\s*Travel/i.test(await page.locator("body").innerText()),
      false,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      "overflow " + width,
    );
    const floating = page.getByRole("navigation", {
      name: "Liên hệ nhanh",
      exact: true,
    });
    await expect(floating.locator("[data-contact-channel]")).toHaveCount(6);
    for (const channel of [
      "telephone",
      "zalo",
      "telegram",
      "whatsapp",
      "facebook",
    ])
      await expect(
        floating.locator('[data-contact-channel="' + channel + '"]').first(),
      ).toHaveAttribute(
        "href",
        channel === "telephone" ? "tel:" + contact.telephone : contact[channel],
      );
    const targets = await floating
      .locator("[data-contact-channel]")
      .evaluateAll((nodes) =>
        nodes.map((n) => ({
          width: n.getBoundingClientRect().width,
          height: n.getBoundingClientRect().height,
        })),
      );
    assert.ok(targets.every((t) => t.width >= 44 && t.height >= 44));
    for (const channel of ["telephone", "kakao"]) {
      assert.notEqual(
        await floating
          .locator(`.floating-contact-icon[data-channel="${channel}"]`)
          .evaluate((element) => getComputedStyle(element).backgroundColor),
        "rgb(255, 255, 255)",
        `${channel} icon lost its background CSS`,
      );
    }
    await floating.locator("img").evaluateAll(async (imgs) => {
      await Promise.all(imgs.map((img) => img.decode()));
    });
    const kakao = floating.getByRole("button", {
      name: "KakaoTalk",
      exact: true,
    });
    await kakao.click();
    const dialog = page.getByRole("dialog", {
      name: "Liên hệ qua KakaoTalk",
      exact: true,
    });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(contact.kakao);
    await expect(dialog).toContainText(contact.international);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(kakao).toBeFocused();
    await page.locator("h1").click();
    if (width === 390 || width === 1920)
      await page.screenshot({
        path: `test-results/production/nhatranggo-${width}.png`,
        animations: "disabled",
      });
  }
  await page.locator('[data-contact-channel="kakao"]').click();
  await page.screenshot({
    path: "test-results/production/kakao-dialog.png",
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Đóng", exact: true }).click();
  assert.deepEqual(errors, []);
  console.log(
    "PASS NhaTrangGo: brand/metadata, six Maigo contact channels, local icons, tap targets, KakaoTalk modal/focus/Escape and four responsive widths",
  );
} finally {
  if (browser) await browser.close();
  await db.query("DELETE FROM request_limits WHERE key=$1", [key]);
  await db.end();
  await api.dispose();
  await second.dispose();
}
