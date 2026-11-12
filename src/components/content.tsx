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
  type AnchorHTMLAttributes,
} from "react";
import Link from "next/link";
import type { SiteData } from "@/lib/types";
import { money } from "@/lib/types";
import { contentAttributeKeys } from "@/lib/content-attributes";
import { contactInfo, resolveContent } from "@/lib/content-values";

const DataContext = createContext<SiteData>({
  products: [],
  content: {},
  fares: [],
  destinations: [],
  locale: "vi",
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
function useContent(key: string): unknown {
  const data = useSiteData();
  const scope = useContext(ScopeContext);
  const value = scope
    ? data.products.find((p) => p.id === scope)?.content?.[key]?.value
    : data.content[key]?.value;
  return resolveContent(value, contactInfo(data.content));
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
export function useContentAttributes(contentKey?: string) {
  const value = useContent(contentKey || "");
  const attrs: Record<string, unknown> = {};
  if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) {
      if (contentAttributeKeys.has(k)) {
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
export function ContentLink({
  contentKey,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { contentKey: string }) {
  const attrs = useContentAttributes(contentKey);
  const href = typeof attrs.href === "string" ? attrs.href : props.href;
  if (!href)
    return (
      <a {...props} {...attrs}>
        {children}
      </a>
    );
  return (
    <Link {...props} {...attrs} href={href}>
      {children}
    </Link>
  );
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
  productIds,
  children,
}: {
  collectionId: string;
  productIds?: string[];
  children: ReactNode;
}) {
  const products = useSiteData().products.filter(
    (p) =>
      p.collection_id === collectionId &&
      (!productIds || productIds.includes(p.id)),
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
