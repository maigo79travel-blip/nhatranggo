// One-time structured migration. JSX layout stays in source; content becomes seed records.
const fs = require("node:fs");
const ts = require("typescript");
const products = JSON.parse(fs.readFileSync("src/data/catalog.json", "utf8"));
const content = [];
const counters = {};
const sources = [
  ["home", "src/components/pages/home.tsx"],
  ["hotels", "src/components/pages/hotels.tsx"],
  ["tours", "src/components/pages/tours.tsx"],
  ["transfers", "src/components/pages/transfers.tsx"],
  ["header", "src/components/site-header.tsx"],
  ["footer", "src/components/site-footer.tsx"],
];
function getAttr(n, key) {
  const opening = n.openingElement || n;
  const a = opening.attributes?.properties.find((a) => a.name?.text === key);
  return a?.initializer && ts.isStringLiteral(a.initializer)
    ? a.initializer.text
    : undefined;
}
const tag = (n) => (n.openingElement || n).tagName?.getText();
function find(n, p) {
  const out = [];
  function walk(x) {
    if (p(x)) out.push(x);
    ts.forEachChild(x, walk);
  }
  walk(n);
  return out;
}
function owner(n) {
  for (let p = n; p; p = p.parent)
    if (ts.isJsxElement(p) && tag(p) === "CatalogCard")
      return getAttr(p, "productId");
  return null;
}
function record(scope, productId, kind, value, label) {
  const prefix = productId || scope;
  const count = (counters[prefix] = (counters[prefix] || 0) + 1);
  const key = productId
    ? `field-${String(count).padStart(3, "0")}`
    : `${scope}.${kind}-${String(count).padStart(3, "0")}`;
  const entry = { kind, value, label: label.slice(0, 150) };
  if (productId) {
    const p = products.find((p) => p.id === productId);
    p.content ||= {};
    p.content[key] = entry;
  } else content.push({ key, scope, ...entry });
  return key;
}
for (const [scope, file] of sources) {
  let source = fs.readFileSync(file, "utf8");
  const root = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const edits = [];
  const skip = [];
  const cards = find(
    root,
    (n) => ts.isJsxElement(n) && tag(n) === "CatalogCard",
  );
  const parents = [...new Set(cards.map((c) => c.parent))];
  for (const [index, parent] of parents.entries()) {
    if (!ts.isJsxElement(parent)) throw Error("Unknown card parent");
    const collectionId = `${scope}-collection-${index + 1}`;
    const siblings = cards.filter((c) => c.parent === parent);
    for (const node of siblings) {
      const p = products.find((p) => p.id === getAttr(node, "productId"));
      p.collection_id = collectionId;
      p.template_id = p.id;
    }
    edits.push(
      {
        start: parent.openingElement.end,
        end: parent.openingElement.end,
        text: `<CatalogCollection collectionId="${collectionId}">`,
      },
      {
        start: parent.closingElement.pos,
        end: parent.closingElement.pos,
        text: "</CatalogCollection>",
      },
    );
  }
  const nodes = find(
    root,
    (n) => ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n),
  );
  for (const n of nodes) {
    const name = tag(n);
    const pId = owner(n);
    const p = products.find((p) => p.id === pId);
    const opening = n.openingElement || n;
    if (name === "PriceStack") {
      const a = opening.attributes.properties.find(
        (a) => a.name?.text === "originalPrice",
      );
      p.original_price = Number(a.initializer.text.replace(/\D/g, ""));
      edits.push({
        start: a.getStart(root),
        end: a.end,
        text: `productId="${pId}"`,
      });
      continue;
    }
    if (name === "ProductField") {
      const attrs = {};
      for (const a of opening.attributes.properties) {
        if (
          ["alt", "data-alt"].includes(a.name?.text) &&
          a.initializer &&
          ts.isStringLiteral(a.initializer)
        ) {
          attrs[a.name.text] = a.initializer.text;
          edits.push({ start: a.getStart(root), end: a.end, text: "" });
        }
        if (a.name?.text === "style" && getAttr(n, "field") === "image") {
          edits.push({ start: a.getStart(root), end: a.end, text: "" });
        }
      }
      if (Object.keys(attrs).length) {
        const key = record(scope, pId, "attributes", attrs, "Ảnh dịch vụ");
        edits.push({
          start: opening.tagName.end,
          end: opening.tagName.end,
          text: ` contentKey="${key}"`,
        });
      }
      continue;
    }
    if (!/^[a-z]/.test(name)) continue;
    const attrs = {};
    for (const a of opening.attributes.properties) {
      const k = a.name?.text;
      if (
        [
          "href",
          "src",
          "alt",
          "title",
          "placeholder",
          "defaultValue",
          "aria-label",
          "data-alt",
          "data-location",
        ].includes(k) &&
        a.initializer &&
        ts.isStringLiteral(a.initializer)
      ) {
        attrs[k] = a.initializer.text;
        edits.push({ start: a.getStart(root), end: a.end, text: "" });
      } else if (
        k === "style" &&
        a.initializer?.expression &&
        ts.isObjectLiteralExpression(a.initializer.expression)
      ) {
        const bg = a.initializer.expression.properties.find(
          (p) => p.name?.text === "backgroundImage",
        );
        if (bg && ts.isStringLiteral(bg.initializer)) {
          attrs.backgroundImage = bg.initializer.text;
          const rest = a.initializer.expression.properties.filter(
            (x) => x !== bg,
          );
          edits.push({
            start: a.getStart(root),
            end: a.end,
            text: rest.length
              ? `style={{${rest.map((x) => x.getText(root)).join(",")}}}`
              : "",
          });
        }
      }
    }
    if (Object.keys(attrs).length) {
      const key = record(
        scope,
        pId,
        "attributes",
        attrs,
        Object.values(attrs).join(" · "),
      );
      edits.push({
        start: opening.tagName.getStart(root),
        end: opening.tagName.end,
        text: `ContentElement contentKey="${key}" tag="${name}"`,
      });
      if (ts.isJsxElement(n))
        edits.push({
          start: n.closingElement.tagName.getStart(root),
          end: n.closingElement.tagName.end,
          text: "ContentElement",
        });
    }
  }
  // Transfer matrix prices use the same authoritative fare records as the quote API.
  if (scope === "transfers") {
    const rows = find(
      root,
      (n) =>
        ts.isJsxElement(n) &&
        tag(n) === "tr" &&
        find(n, (x) => ts.isJsxElement(x) && tag(x) === "td").length >= 5,
    );
    const routes = [
      "CXR_NT_CENTER",
      "CXR_BAI_DAI",
      "NT_CENTER_DALAT",
      "NT_CENTER_TUY_HOA",
      "NT_CENTER_DOC_LET",
    ];
    rows.forEach((row, index) => {
      const cells = row.children.filter(
        (n) => ts.isJsxElement(n) && tag(n) === "td",
      );
      for (let c = 1; c <= 4; c++) {
        const value = cells[c]?.children.find((n) => ts.isJsxExpression(n));
        if (value) {
          skip.push(value);
          edits.push({
            start: value.getStart(root),
            end: value.end,
            text: `<FareValue route="${routes[index]}" vehicle="${["4cho", "7cho", "16cho", "limo9"][c - 1]}" />`,
          });
        }
      }
    });
  }
  for (const expr of find(
    root,
    (n) =>
      ts.isJsxExpression(n) && n.expression && ts.isStringLiteral(n.expression),
  )) {
    if (skip.includes(expr) || !ts.isJsxElement(expr.parent)) continue;
    const parent = expr.parent;
    const value = expr.expression.text;
    if (
      !value.trim() ||
      getAttr(parent, "className")?.includes("material-symbols-outlined")
    )
      continue;
    const pId = owner(expr);
    const p = products.find((p) => p.id === pId);
    let field;
    if (p && /^[45]\.\d$/.test(value.trim())) field = "rating";
    if (
      p &&
      value.trim().replace(/\s+/g, " ") ===
        p.location.trim().replace(/\s+/g, " ")
    )
      field = "location";
    if (
      p &&
      tag(parent) === "p" &&
      getAttr(parent, "className")?.includes("line-clamp-2")
    ) {
      field = "description";
      p.description = value.trim();
    }
    if (field) {
      edits.push({
        start: expr.getStart(root),
        end: expr.end,
        text: `<ProductValue id="${pId}" field="${field}" />`,
      });
      continue;
    }
    const key = record(scope, pId, "text", value, value.trim());
    edits.push({
      start: expr.getStart(root),
      end: expr.end,
      text: `<ContentText contentKey="${key}" />`,
    });
  }
  edits
    .sort((a, b) => b.start - a.start || b.end - a.end)
    .forEach(
      (e) => (source = source.slice(0, e.start) + e.text + source.slice(e.end)),
    );
  source =
    `import { ContentText, ContentElement, ProductValue, FareValue, CatalogCollection } from '@/components/content';\n` +
    source;
  fs.writeFileSync(file, source);
  console.log(scope, "migrated");
}
content.push({
  key: "site.metadata",
  scope: "site",
  kind: "settings",
  label: "Tiêu đề và mô tả website",
  value: {
    title: "Booking Travel | Khách sạn, Tour & Xe đưa đón",
    description:
      "Khám phá Nha Trang, Cam Ranh: khách sạn, resort, tour đảo và xe đưa đón. Tư vấn 24/7.",
  },
});
content.push({
  key: "site.contact",
  scope: "site",
  kind: "settings",
  label: "Thông tin liên hệ dùng chung",
  value: {
    phone: "084.64.77.222",
    telephone: "0846477222",
    zalo: "https://zalo.me/0846477222",
    email: "info@bookingtravel.vn",
  },
});
content.push({
  key: "site.mobile-navigation",
  scope: "site",
  kind: "settings",
  label: "Menu điện thoại",
  value: [
    { href: "/", label: "Trang chủ" },
    { href: "/khach-san", label: "Khách sạn & Resort" },
    { href: "/tour-hang-ngay", label: "Tour hằng ngày" },
    { href: "/xe-dua-don", label: "Xe đưa đón" },
  ],
});
fs.mkdirSync("db/seed", { recursive: true });
fs.writeFileSync(
  "db/seed/products.json",
  JSON.stringify(products, null, 2) + "\n",
);
fs.writeFileSync(
  "db/seed/content.json",
  JSON.stringify(content, null, 2) + "\n",
);
console.log(
  "Extracted",
  products.length,
  "products;",
  content.length,
  "site content records",
);
