"use client";
import {
  createContext,
  createElement,
  useContext,
  type ReactNode,
  type ReactElement,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import type { Product, ContentEntry, Fare, SiteData } from "@/lib/types";
import { money } from "@/lib/types";

export type { ContentEntry, Fare, SiteData };
const DataContext = createContext<SiteData>({
  products: [],
  content: {},
  fares: [],
});
const ScopeContext = createContext<string | null>(null);
export function SiteDataProvider({
  data,
  children,
}: {
  data: SiteData;
  children: ReactNode;
}) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
export const useSiteData = () => useContext(DataContext);
export function useProduct(id?: string) {
  const scope = useContext(ScopeContext);
  return useSiteData().products.find((p) => p.id === (scope || id));
}
export function useContent(key: string): unknown {
  const data = useSiteData();
  const scope = useContext(ScopeContext);
  const value = scope
    ? data.products.find((p) => p.id === scope)?.content?.[key]?.value
    : data.content[key]?.value;
  const contact = data.content["site.contact"]?.value as
    Record<string, string> | undefined;
  function resolve(value: unknown): unknown {
    if (typeof value === "string")
      return value.replace(
        /\{\{contact\.([a-z]+)\}\}/g,
        (_, key) => contact?.[key] || "",
      );
    if (Array.isArray(value)) return value.map(resolve);
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.entries(value).map(([key, value]) => [key, resolve(value)]),
      );
    return value;
  }
  return resolve(value);
}
export function ContentText({ contentKey }: { contentKey: string }) {
  const value = useContent(contentKey);
  return (
    <>{typeof value === "string" || typeof value === "number" ? value : ""}</>
  );
}
export function ContentOption({
  contentKey,
  ...props
}: {
  contentKey: string;
  [key: string]: unknown;
}) {
  const value = useContent(contentKey);
  const text =
    typeof value === "string" || typeof value === "number" ? String(value) : "";
  return (
    <option {...props} value={text}>
      {text}
    </option>
  );
}
const attributeKeys = new Set([
  "href",
  "src",
  "alt",
  "title",
  "placeholder",
  "defaultValue",
  "value",
  "aria-label",
  "data-alt",
  "data-location",
  "backgroundImage",
]);
export function useContentAttributes(contentKey?: string) {
  const value = useContent(contentKey || "");
  const attrs: Record<string, unknown> = {};
  if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) {
      if (attributeKeys.has(k)) {
        if (
          (k === "href" || k === "src") &&
          typeof v === "string" &&
          !/^(\/[^/]|\/$|#|https?:\/\/|tel:|mailto:)/i.test(v)
        )
          continue;
        attrs[k] = v;
      }
    }
  return attrs;
}
export function ContentElement({
  contentKey,
  tag,
  children,
  ...props
}: {
  contentKey: string;
  tag: string;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const attrs = useContentAttributes(contentKey);
  const { backgroundImage, ...rest } = attrs;
  return createElement(
    tag,
    {
      ...props,
      ...rest,
      ...(backgroundImage
        ? { style: { ...(props.style as object), backgroundImage } }
        : {}),
    },
    children,
  );
}
export function ProductValue({
  id,
  field,
}: {
  id: string;
  field: "rating" | "description" | "location";
}) {
  const p = useProduct(id);
  return <>{p?.[field]}</>;
}
export function FareValue({
  route,
  vehicle,
}: {
  route: string;
  vehicle: string;
}) {
  const fare = useSiteData().fares.find(
    (f) => f.route === route && f.vehicle === vehicle,
  );
  return <>{fare ? money(fare.price) : ""}</>;
}
export function CatalogCollection({
  collectionId,
  children,
}: {
  collectionId: string;
  children: ReactNode;
}) {
  const products = useSiteData().products.filter(
    (p) => p.collection_id === collectionId,
  );
  const templates = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<{ productId: string; children: ReactNode }>[];
  return (
    <>
      {products.map((product) => {
        const template = templates.find(
          (t) => t.props.productId === product.template_id,
        );
        if (!template) return null;
        return (
          <ScopeContext.Provider key={product.id} value={product.id}>
            {cloneElement(template, { productId: product.id })}
          </ScopeContext.Provider>
        );
      })}
    </>
  );
}
