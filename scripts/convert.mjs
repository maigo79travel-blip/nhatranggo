// One-time migration: preserves source markup and design tokens as real JSX.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import * as cheerio from "cheerio";
const write = (p, s) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, s);
};
const folders = fs
  .readdirSync(".")
  .filter((f) => f.startsWith("booking_travel_"));
const pages = folders.map((folder) => ({
  folder,
  html: fs.readFileSync(`${folder}/code.html`, "utf8"),
}));
const home = pages.find((p) => p.folder.includes("trang_ch"));
const sandbox = { tailwind: {} };
vm.runInNewContext(cheerio.load(home.html)("#tailwind-config").text(), sandbox);
write(
  "tailwind.config.cjs",
  "module.exports = " +
    JSON.stringify(
      { ...sandbox.tailwind.config, content: ["./src/**/*.{ts,tsx}"] },
      null,
      2,
    ),
);
write(
  "src/app/globals.css",
  `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n${cheerio.load(home.html)("style").text()}\nbody{font-family:'Plus Jakarta Sans',sans-serif} .material-symbols-outlined{font-family:'Material Symbols Outlined';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;font-feature-settings:'liga'}\n:focus-visible{outline:2px solid #006194;outline-offset:3px} button,a,input,select{touch-action:manipulation} button{cursor:pointer} [data-filter-hidden=true]{display:none!important} @media(max-width:640px){h1.text-display{font-size:32px;line-height:40px} header .h-20{gap:8px;padding-left:16px;padding-right:16px} .max-w-7xl{max-width:100%} }\n`,
);
const routes = {
  "trang-chu": "/",
  "khach-san": "/khach-san",
  "tour-hang-ngay": "/tour-hang-ngay",
  "xe-dua-don": "/xe-dua-don",
  "combo-tron-goi": "/#combo",
  "dich-vu-ve": "/tour-hang-ngay",
  "cam-nang": "/#cam-nang",
  "cam-nang-du-lich": "/#cam-nang",
  "lien-he": "/#lien-he",
  "danh-sach-yeu-thich": "#yeu-thich",
  "tra-cuu-don-hang": "#tra-cuu",
};
const voids = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
const booleans = new Set([
  "checked",
  "disabled",
  "multiple",
  "open",
  "required",
  "selected",
  "readonly",
  "autofocus",
]);
function jsx(n) {
  if (n.type === "text")
    return n.data.trim() ? `{${JSON.stringify(n.data)}}` : "\n";
  if (n.type === "comment" || n.name === "script" || n.name === "style")
    return "";
  if (!n.name) return "";
  const attrs = n.attribs || {};
  let tag = n.name;
  let out = [];
  if (tag === "main" && n.parent?.name !== "body") tag = "div";
  if (attrs["data-path"])
    attrs.href = routes[attrs["data-path"]] || "/#lien-he";
  if (tag === "a" && attrs.href === "#" && !attrs["data-action"])
    attrs["data-action"] = "details";
  if (tag === "img") attrs.loading = "lazy";
  if (tag === "input" && !attrs["aria-label"])
    attrs["aria-label"] = attrs.placeholder || attrs.name || attrs.type;
  if (tag === "select") {
    attrs["aria-label"] = attrs.id || "Lựa chọn";
    const selected = n.children?.find(
      (x) => x.attribs && "selected" in x.attribs,
    );
    if (selected) {
      attrs.defaultValue =
        selected.attribs.value || selected.children?.[0]?.data;
      delete selected.attribs.selected;
    }
  }
  for (let [k, v] of Object.entries(attrs)) {
    if (k.startsWith("on")) continue;
    if (k === "class") k = "className";
    if (k === "for") k = "htmlFor";
    if (k === "tabindex") k = "tabIndex";
    if (k === "maxlength") k = "maxLength";
    if (k === "style") {
      const style = {};
      for (const rule of v.split(";")) {
        const i = rule.indexOf(":");
        if (i > 0)
          style[
            rule
              .slice(0, i)
              .trim()
              .replace(/-([a-z])/g, (_, a) => a.toUpperCase())
          ] = rule.slice(i + 1).trim();
      }
      out.push(`style={${JSON.stringify(style)}}`);
      continue;
    }
    if (k === "checked") k = "defaultChecked";
    if (k === "value" && tag === "input") k = "defaultValue";
    if (booleans.has(k) || k === "defaultChecked")
      out.push(`${k === "readonly" ? "readOnly" : k}={true}`);
    else out.push(`${k}=${JSON.stringify(v)}`);
  }
  if (n.productId) {
    tag = "CatalogCard";
    out.push(
      `productId=${JSON.stringify(n.productId)} tag=${JSON.stringify(n.name)}`,
    );
  }
  if (n.productField) {
    return `<ProductField id=${JSON.stringify(n.productField.id)} field=${JSON.stringify(n.productField.field)} tag=${JSON.stringify(tag)} ${out.join(" ")}>${
      n.productField.field === "price"
        ? (n.children || [])
            .filter((c) => c.type === "tag")
            .map(jsx)
            .join("")
        : ""
    }</ProductField>`;
  }
  return `<${tag} ${out.join(" ")}${voids.has(tag) ? " />" : `>${(n.children || []).map(jsx).join("")}</${tag}>`}`;
}
const products = [];
for (const page of pages) {
  const $ = cheerio.load(page.html);
  const key = page.folder.includes("trang_ch")
    ? "home"
    : page.folder.includes("danh_s")
      ? "hotels"
      : page.folder.includes("tour_du")
        ? "tours"
        : "transfers";
  // Every purchasable card retains its original content and styling.
  const cards =
    key === "home"
      ? $("h3")
          .toArray()
          .map((title) => {
            let n = title.parent;
            while (n && n.name !== "section") {
              const el = $(n);
              if (
                el.find("h3").length === 1 &&
                el.find("a,button").length &&
                /\d[.\d]*đ/.test(el.text()) &&
                (el.find("img").length ||
                  el.find('[style*="background-image"]').length)
              )
                return n;
              n = n.parent;
            }
            return null;
          })
          .filter(Boolean)
      : $("article").toArray();
  cards.forEach((node, i) => {
    const el = $(node);
    const title = el.find("h3").first();
    const image = el.find('img,[style*="background-image"]').first();
    if (!title.length || !image.length) return;
    const prices = el
      .find("span,p,div")
      .filter(
        (_, x) =>
          /^\s*[\d.]+\s*đ(?:\s*\/đêm)?\s*$/.test($(x).text()) &&
          !$(x).hasClass("line-through"),
      );
    const price = prices.last();
    if (!price.length) return;
    const id = `${key}-${i + 1}`;
    const type =
      key === "hotels"
        ? "hotel"
        : key === "tours"
          ? "tour"
          : /combo/i.test(el.text())
            ? "combo"
            : /tour/i.test(title.text())
              ? "tour"
              : "hotel";
    const rating = el.text().match(/\b[45]\.\d\b/);
    const record = {
      id,
      type,
      title: title.text().trim(),
      price: Number(
        price
          .text()
          .match(/[\d.]+/)?.[0]
          .replace(/\D/g, ""),
      ),
      image:
        image.attr("src") ||
        image.attr("style")?.match(/url\(['"]?(.*?)['"]?\)/)?.[1] ||
        "",
      location:
        el
          .find("p")
          .filter((_, x) =>
            $(x)
              .find(".material-symbols-outlined")
              .text()
              .includes("location_on"),
          )
          .first()
          .text()
          .replace("location_on", "")
          .trim() || "Nha Trang, Khánh Hòa",
      rating: rating ? Number(rating[0]) : 4.8,
      description: el.text().replace(/\s+/g, " ").trim().slice(0, 2000),
    };
    products.push(record);
    node.productId = id;
    title[0].productField = { id, field: "title" };
    price[0].productField = { id, field: "price" };
    image[0].productField = { id, field: "image" };
  });
  // Named anchors for navigation already present in the source.
  $("section").each((i, n) => {
    const t = $(n).find("h2").first().text();
    if (/combo/i.test(t)) $(n).attr("id", "combo");
    if (/cẩm nang/i.test(t)) $(n).attr("id", "cam-nang");
  });
  if (key === "home") {
    write(
      "src/components/site-header.tsx",
      `'use client';\nimport { usePathname } from 'next/navigation';\nexport function SiteHeader(){const pathname=usePathname();return (${jsx($("header")[0]).replace(/<nav /, "<nav data-current={pathname} ")});}`,
    );
    $("footer").attr("id", "lien-he");
    write(
      "src/components/site-footer.tsx",
      `export function SiteFooter(){return (${jsx($("footer")[0])});}\nexport function ContactButtons(){return (${jsx($("body > div").last()[0])});}`,
    );
  }
  const main = $("body > main")[0];
  write(
    `src/components/pages/${key}.tsx`,
    `import {CatalogCard,ProductField} from '@/components/catalog';\nexport default function ${key[0].toUpperCase() + key.slice(1)}Page(){return (${jsx(main)});}\n`,
  );
}
write("src/data/catalog.json", JSON.stringify(products, null, 2));
console.log(
  `Converted ${pages.length} pages, ${products.length} purchasable cards; extracted shared shell and design tokens.`,
);
