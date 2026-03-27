import { draftMode } from "next/headers";
import { GraphQLClient } from "graphql-request";
import { DEFAULT_HYGRAPH_ENDPOINT } from "./constants";

/**
 * Request-aware client (Draft Mode → DRAFT + preview token).
 * Do not use from `generateStaticParams` (no request context).
 */
export async function getHygraphClient() {
  const { isEnabled } = await draftMode();
  const endpoint =
    process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? DEFAULT_HYGRAPH_ENDPOINT;
  const token = isEnabled
    ? process.env.HYGRAPH_PREVIEW_TOKEN ?? process.env.HYGRAPH_API_TOKEN
    : process.env.HYGRAPH_API_TOKEN;
  return new GraphQLClient(endpoint, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}

/** Build-time / `generateStaticParams` — always PUBLISHED, no `draftMode()`. */
export function getHygraphClientPublished() {
  const endpoint =
    process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? DEFAULT_HYGRAPH_ENDPOINT;
  const token = process.env.HYGRAPH_API_TOKEN;
  return new GraphQLClient(endpoint, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}
