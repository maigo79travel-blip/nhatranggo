"use client";
import {
  createContext,
  createElement,
  useContext,
  useMemo,
  type ReactNode,
  type ReactElement,
  Children,
  isValidElement,
  cloneElement,
  type AnchorHTMLAttributes,
} from "react";
import Link from "next/link";
import type { SiteData } from "@/lib/types";
import { formatMoney } from "@/lib/i18n/format";
import { messagesVi } from "@/lib/i18n/messages-vi";
import type { Messages } from "@/lib/i18n/types";
import {
  contentAttributeKeys,
  isPublicBackgroundImage,
  isPublicImageUrl,
  isPublicLink,
} from "@/lib/content-attributes";
import { contactInfo, resolveContent } from "@/lib/content-values";

const DataContext = createContext<
  SiteData & { productById: Map<string, SiteData["products"][number]> }
>({
  productById: new Map(),
  products: [],
  content: {},
  fares: [],
  transferRoutes: [],
  transferVehicleTypes: [],
  hotelCapacities: {},
  destinations: [],
  locale: "vi",
});
const ScopeContext = createContext<string | null>(null);
export function SiteDataProvider({
  data,
  children,
}: {
  data: Partial<SiteData>;
  children: ReactNode;
}) {
  const parent = useContext(DataContext);
  const value = useMemo(
    () => ({
      ...parent,
      ...data,
      content: { ...parent.content, ...data.content },
      productById: data.products
        ? new Map(data.products.map((product) => [product.id, product]))
        : parent.productById,
    }),
    [parent, data],
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export const useSiteData = () => useContext(DataContext);
export function useT(): Messages {
  return useContext(DataContext).messages ?? messagesVi;
}
export function useProduct(id?: string) {
  const scope = useContext(ScopeContext);
  return useSiteData().productById.get(scope || id || "");
}
export function useContent(key: string): unknown {
  const data = useSiteData();
  const scope = useContext(ScopeContext);
  const value = scope
    ? data.productById.get(scope)?.content?.[key]?.value
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
      if (!contentAttributeKeys.has(k) || typeof v !== "string") continue;
      if (k === "href" && !isPublicLink(v)) continue;
      if (k === "src" && !isPublicImageUrl(v)) continue;
      if (k === "backgroundImage" && !isPublicBackgroundImage(v)) continue;
      attrs[k] = v;
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
  const { fares, locale } = useSiteData();
  const fare = fares.find((f) => f.route === route && f.vehicle === vehicle);
  return <>{fare ? formatMoney(fare.price, locale) : ""}</>;
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
