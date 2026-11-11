import fs from "node:fs/promises";
import { createHash } from "node:crypto";
await fs.mkdir("public/fonts", { recursive: true });
let output = "";
for (const family of [
  "Plus+Jakarta+Sans:wght@400;500;600;700;800",
  "Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
]) {
  const res = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36" } },
  );
  if (!res.ok) throw Error("Cannot download font CSS");
  let css = (await res.text()).match(/@font-face\s*\{[^}]+\}/g).join("\n");
  const urls = [...new Set(css.match(/https:\/\/fonts.gstatic.com\/[^)\s]+/g))];
  for (const url of urls) {
    const local = `/fonts/${createHash("sha256").update(url).digest("hex").slice(0, 16)}.woff2`;
    const font = await fetch(url);
    if (!font.ok) throw Error("Cannot download font");
    await fs.writeFile("public" + local, Buffer.from(await font.arrayBuffer()));
    css = css.replaceAll(url, local);
  }
  output += css + "\n";
}
await fs.writeFile("src/app/fonts.css", output);
console.log(
  "Localized Jakarta Sans (including Vietnamese) and Material Symbols",
);
