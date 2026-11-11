import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
async function walk(dir) {
  const out = [];
  for (const f of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx|json|css)$/.test(p)) out.push(p);
  }
  return out;
}
const files = await walk("src");
const contents = await Promise.all(files.map((f) => fs.readFile(f, "utf8")));
const urls = [
  ...new Set(
    contents.flatMap(
      (s) =>
        s.match(
          /https:\/\/lh3\.googleusercontent\.com\/aida-public\/[A-Za-z0-9_-]+/g,
        ) || [],
    ),
  ),
];
await fs.mkdir("public/images", { recursive: true });
const replacements = new Map();
let index = 0;
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (index < urls.length) {
      const url = urls[index++];
      const dest = `/images/${createHash("sha256").update(url).digest("hex").slice(0, 16)}.jpg`;
      try {
        try {
          await fs.access("public" + dest);
        } catch {
          const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
          if (!res.ok) throw Error(String(res.status));
          await fs.writeFile(
            "public" + dest,
            Buffer.from(await res.arrayBuffer()),
          );
        }
        replacements.set(url, dest);
      } catch (e) {
        console.error("Image unavailable:", url.slice(-20), e.message);
      }
    }
  }),
);
for (let i = 0; i < files.length; i++) {
  let content = contents[i];
  for (const [url, dest] of replacements)
    content = content.replaceAll(url, dest);
  await fs.writeFile(files[i], content);
}
console.log(`Localized ${replacements.size}/${urls.length} original images`);
