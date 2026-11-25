import { expect } from "@playwright/test";
import { launchBrowser } from "./browser.mjs";
import assert from "node:assert/strict";
const base = process.env.TEST_URL || "http://localhost:3001";
const browser = await launchBrowser();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base + "/");
  await page.locator("body[data-hydrated=true]").waitFor();
  await page.evaluate(() => {
    window.__navigationToken = "header-client-navigation";
  });
  let documents = 0;
  page.on("request", (request) => {
    if (
      request.isNavigationRequest() &&
      request.resourceType() === "document" &&
      request.frame() === page.mainFrame()
    )
      documents++;
  });
  const check = async (path) => {
    await expect(page).toHaveURL(
      new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"),
    );
    await page.locator("h1").waitFor();
    if (await page.locator("main.public-page").count()) {
      const styling = await page
        .locator("main.public-page")
        .evaluate((main) => ({
          padding: parseFloat(getComputedStyle(main).paddingTop),
          headingSize: parseFloat(
            getComputedStyle(main.querySelector("h1")).fontSize,
          ),
          heroBackground: getComputedStyle(
            main.querySelector(".public-page-hero"),
          ).backgroundImage,
        }));
      assert.ok(
        styling.padding >= 76 &&
          styling.headingSize >= 28 &&
          styling.heroBackground !== "none",
        path + " lost CSS after client navigation",
      );
    }
    assert.equal(
      await page.evaluate(() => window.__navigationToken),
      "header-client-navigation",
      path + " reloaded the document",
    );
  };
  const desktop = page.getByRole("navigation", { name: "Điều hướng chính" });
  const hrefs = await desktop
    .getByRole("link")
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter(
          (href) =>
            href?.startsWith("/") &&
            !href.startsWith("//") &&
            !href.includes("#"),
        ),
    );
  assert.ok(!hrefs.some((href) => href.startsWith("/dich-vu")));
  for (const href of hrefs.filter((href) => href !== "/")) {
    await desktop.locator(`a[href="${href}"]`).click();
    await check(href);
    await expect(desktop.locator(`a[href="${href}"]`)).toHaveAttribute(
      "aria-current",
      "page",
    );
  }
  await page.goBack();
  await check(hrefs.filter((href) => href !== "/").at(-2));
  await page.goForward();
  await check(hrefs.filter((href) => href !== "/").at(-1));
  await page.locator('header a[data-path="trang-chu"]').click();
  await check("/");
  const contact = page.locator("header").getByRole("link", {
    name: "Liên hệ",
    exact: true,
  });
  await contact.click();
  await check("/lien-he");
  await expect(contact).toHaveAttribute("aria-current", "page");
  await page
    .locator("header")
    .getByRole("link", { name: "Tra cứu", exact: true })
    .click();
  await check("/tra-cuu");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Mở menu", exact: true }).click();
  const mobile = page.getByRole("navigation", {
    name: "Điều hướng trên điện thoại",
  });
  const mobileHrefs = await mobile
    .getByRole("link")
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter(
          (href) =>
            href?.startsWith("/") &&
            !href.startsWith("//") &&
            !href.includes("#"),
        ),
    );
  assert.ok(!mobileHrefs.some((href) => href.startsWith("/dich-vu")));
  for (const href of ["/khach-san", "/tour-hang-ngay", "/xe-dua-don"]) {
    assert.ok(mobileHrefs.includes(href), href + " missing from mobile menu");
  }
  await page.getByRole("button", { name: "Đóng menu", exact: true }).click();
  for (const href of mobileHrefs) {
    await page.getByRole("button", { name: "Mở menu", exact: true }).click();
    await mobile.locator(`a[href="${href}"]`).click();
    await check(href);
    await expect(mobile).toHaveCount(0);
  }
  assert.equal(documents, 0);
  assert.deepEqual(errors, []);
  console.log(
    `PASS header: ${hrefs.length} desktop links, ${mobileHrefs.length} mobile links, logo, lookup and Back/Forward; no new document requests or window reloads`,
  );
} finally {
  await browser.close();
}
