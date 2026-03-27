import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import {
  isAllowedPreviewPath,
  resolvePreviewPath,
} from "@/lib/preview-resolve";

/**
 * Enables Next.js Draft Mode and redirects into the site so Hygraph Live Preview
 * can load DRAFT content. Configure Studio Preview URL templates to point here, e.g.
 * `https://your-domain.com/api/draft?secret=...&slug={slug}`
 * or for Site Settings: `...?secret=...&path=%2F`
 *
 * @see https://hygraph.com/docs/developer-guides/schema/live-preview
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const pathParam = searchParams.get("path");

  if (!secret || secret !== process.env.HYGRAPH_DRAFT_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  let path: string | null = null;
  if (pathParam) {
    const decoded = decodeURIComponent(pathParam);
    if (!isAllowedPreviewPath(decoded)) {
      return new Response("Invalid path", { status: 400 });
    }
    path = decoded;
  } else if (slug) {
    try {
      path = await resolvePreviewPath(slug);
    } catch {
      return new Response("Preview resolution failed", { status: 502 });
    }
    if (!path) {
      return new Response("Invalid slug", { status: 401 });
    }
  } else {
    return new Response("Missing slug or path", { status: 400 });
  }

  (await draftMode()).enable();
  redirect(path);
}
