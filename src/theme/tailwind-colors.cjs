const palette = require("./colors.json");
const plugin = require("tailwindcss/plugin");

// Derive Tailwind utilities and CSS variables from the same hex values.
const channels = (hex) =>
  hex
    .slice(1)
    .match(/.{2}/g)
    .map((value) => parseInt(value, 16))
    .join(" ");
const colors = Object.fromEntries(
  Object.keys(palette).map((name) => [
    name,
    `rgb(var(--color-${name}) / <alpha-value>)`,
  ]),
);
Object.assign(colors, {
  transparent: "transparent",
  current: "currentColor",
  inherit: "inherit",
});
const colorVariables = plugin(({ addBase }) =>
  addBase({
    ":root": Object.fromEntries(
      Object.entries(palette).map(([name, hex]) => [
        `--color-${name}`,
        channels(hex),
      ]),
    ),
  }),
);
module.exports = { colors, colorVariables };
