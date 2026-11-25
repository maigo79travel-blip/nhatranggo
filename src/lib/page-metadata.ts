import { getSiteContent } from "./catalog";
import type { Metadata } from "next";
export async function pageMetadata(scope: string): Promise<Metadata> {
  const content = await getSiteContent(scope);
  const meta = content[`metadata.${scope}`]?.value as Metadata | undefined;
  return meta || {};
}
