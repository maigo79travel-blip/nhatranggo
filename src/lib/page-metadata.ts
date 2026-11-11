import { getSiteData } from "./catalog";
import type { Metadata } from "next";
export async function pageMetadata(scope: string): Promise<Metadata> {
  const data = await getSiteData();
  const meta = data.content[`metadata.${scope}`]?.value as Metadata | undefined;
  return meta || {};
}
