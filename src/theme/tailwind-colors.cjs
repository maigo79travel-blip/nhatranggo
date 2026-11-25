const { ramps, primitives, roles } = require("./colors.json");
const plugin = require("tailwindcss/plugin");

const hexColor = /^#[\da-f]{6}$/i;
const tokenName = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const colorsByName = new Map();

function register(name, value) {
  if (!tokenName.test(name)) throw new Error(`Invalid color token: ${name}`);
  if (colorsByName.has(name)) throw new Error(`Duplicate color token: ${name}`);
  colorsByName.set(name, value);
}

function registerHex(name, hex) {
  if (!hexColor.test(hex))
    throw new Error(`Invalid HEX color for ${name}: ${hex}`);
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((value) => parseInt(value, 16));
  register(name, channels.join(" "));
}

for (const [ramp, stops] of Object.entries(ramps)) {
  for (const [stop, hex] of Object.entries(stops))
    registerHex(`${ramp}-${stop}`, hex);
}
for (const [name, hex] of Object.entries(primitives)) registerHex(name, hex);

const primitiveNames = new Set(colorsByName.keys());
for (const group of Object.values(roles)) {
  for (const [name, source] of Object.entries(group)) {
    if (!primitiveNames.has(source)) {
      throw new Error(
        `Color role ${name} references unknown primitive: ${source}`,
      );
    }
    register(name, `var(--color-${source})`);
  }
}

const colors = {
  ...Object.fromEntries(
    [...colorsByName.keys()].map((name) => [
      name,
      `rgb(var(--color-${name}) / <alpha-value>)`,
    ]),
  ),
  transparent: "transparent",
  current: "currentColor",
  inherit: "inherit",
};

const colorVariables = plugin(({ addBase }) =>
  addBase({
    ":root": Object.fromEntries(
      [...colorsByName].map(([name, value]) => [`--color-${name}`, value]),
    ),
  }),
);

module.exports = { colors, colorVariables };
