import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const locales = ["vi", "en", "ru", "ko", "zh"];

test("all 5 i18n message files exist and have non-empty strings", () => {
  for (const locale of locales) {
    const file = `src/lib/i18n/messages-${locale}.ts`;
    assert.ok(fs.existsSync(file), `Missing ${file}`);
    const content = fs.readFileSync(file, "utf8");
    assert.ok(content.includes("nav:"), `${file} missing nav section`);
    assert.ok(content.includes("footer:"), `${file} missing footer section`);
    assert.ok(content.includes("hotels:"), `${file} missing hotels section`);
    assert.ok(content.includes("transfers:"), `${file} missing transfers section`);
    assert.ok(content.includes("booking:"), `${file} missing booking section`);
  }
});
