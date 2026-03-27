import { GraphQLClient } from "graphql-request";
import { DEFAULT_HYGRAPH_ENDPOINT } from "./constants";
import { RESOLVE_PREVIEW_SLUG } from "./queries";

/** Client for the draft API route only (before the draft cookie exists). */
export function getPreviewResolutionClient() {
  const endpoint =
    process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? DEFAULT_HYGRAPH_ENDPOINT;
  const token =
    process.env.HYGRAPH_PREVIEW_TOKEN ?? process.env.HYGRAPH_API_TOKEN;
  return new GraphQLClient(endpoint, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}

/** Landing slug → app path (matches `src/app` routes). */
export function landingSlugToPath(slug: string): string {
  if (slug === "home") return "/";
  if (slug === "solutions-overview") return "/solutions";
  if (slug === "why-unit4") return "/why-unit4";
  return `/${slug}`;
}

export async function resolvePreviewPath(slug: string): Promise<string | null> {
  const client = getPreviewResolutionClient();
  const data = await client.request<{
    lp: Array<{ slug: string }>;
    pr: Array<{ slug: string }>;
    ind: Array<{ slug: string }>;
    per: Array<{ slug: string }>;
    res: Array<{ slug: string }>;
    cus: Array<{ slug: string }>;
  }>(RESOLVE_PREVIEW_SLUG, { slug });
  if (data.lp?.length) return landingSlugToPath(data.lp[0].slug);
  if (data.pr?.length) return `/products/${data.pr[0].slug}`;
  if (data.ind?.length) return `/industries/${data.ind[0].slug}`;
  if (data.per?.length) return `/roles/${data.per[0].slug}`;
  if (data.res?.length) return `/resources/${data.res[0].slug}`;
  if (data.cus?.length) return `/customers/${data.cus[0].slug}`;
  return null;
}

const ALLOWED_PATH_PREFIXES = [
  "/",
  "/solutions",
  "/why-unit4",
  "/products",
  "/industries",
  "/roles",
  "/resources",
  "/customers",
];

/** Prevent open redirects when using `path` query (e.g. SiteSettings preview). */
export function isAllowedPreviewPath(path: string): boolean {
  if (path === "/") return true;
  return ALLOWED_PATH_PREFIXES.some(
    (p) => p !== "/" && (path === p || path.startsWith(`${p}/`)),
  );
}
