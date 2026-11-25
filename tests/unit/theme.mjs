import assert from "node:assert/strict";
import test from "node:test";
import postcss from "postcss";
import tailwind from "tailwindcss";
import config from "../../tailwind.config.cjs";

test("the generated theme keeps text and focus colors readable", async () => {
  const result = await postcss([
    tailwind({
      ...config,
      content: [
        {
          raw: '<button class="bg-primary hover:bg-primary-hover text-on-primary">Tìm kiếm</button>',
        },
      ],
    }),
  ]).process("@tailwind base; @tailwind utilities;", { from: undefined });

  const variables = new Map();
  result.root.walkDecls(/^--color-/, ({ prop, value }) =>
    variables.set(prop, value),
  );

  function luminance(role) {
    const value = variables.get(`--color-${role}`);
    assert.ok(value, `Missing CSS color role: ${role}`);
    const reference = value.match(/^var\((--color-[a-z0-9-]+)\)$/)?.[1];
    const channels = (reference ? variables.get(reference) : value)
      ?.split(" ")
      .map(Number);
    assert.ok(
      channels?.length === 3 &&
        channels.every(
          (channel) =>
            Number.isInteger(channel) && channel >= 0 && channel <= 255,
        ),
      `Invalid RGB channels for ${role}`,
    );
    return channels.reduce((sum, channel, index) => {
      const srgb = channel / 255;
      const linear =
        srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
      return sum + linear * [0.2126, 0.7152, 0.0722][index];
    }, 0);
  }

  const textPairs = [
    ["on-primary", "primary"],
    ["on-primary", "primary-hover"],
    ["on-primary", "brand-gradient-start"],
    ["on-secondary", "secondary"],
    ["on-surface", "surface"],
    ["on-surface-variant", "surface-muted"],
    ["primary", "background"],
    ["error", "error-surface"],
    ["sale-price", "sale-surface"],
    ["on-sale", "sale-badge"],
    ["on-sale", "sale-badge-hover"],
    ["on-promo", "promo-strong"],
    ["on-promo", "promo-ink"],
    ["promo-ink", "promo-surface"],
    ["admin-muted", "admin-background"],
    ["admin-sidebar-muted", "admin-sidebar"],
  ];
  const focusPairs = [
    ["focus-ring", "surface"],
    ["focus-ring", "surface-muted"],
  ];

  for (const [pairs, minimum] of [
    [textPairs, 4.5],
    [focusPairs, 3],
  ]) {
    for (const [foreground, background] of pairs) {
      const a = luminance(foreground) + 0.05;
      const b = luminance(background) + 0.05;
      const contrast = Math.max(a, b) / Math.min(a, b);
      assert.ok(
        contrast >= minimum,
        `${foreground} on ${background}: ${contrast.toFixed(2)}:1 requires ${minimum}:1`,
      );
    }
  }
});
