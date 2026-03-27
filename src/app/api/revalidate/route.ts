import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getSecret(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7).trim();
  }
  const header = request.headers.get("x-webhook-secret");
  if (header) return header.trim();
  return new URL(request.url).searchParams.get("secret");
}

/**
 * On-demand revalidation for Hygraph (or any caller) after content publish.
 * Secured with REVALIDATION_SECRET — never commit the real secret.
 */
export async function POST(request: Request) {
  const expected = process.env.REVALIDATION_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, message: "REVALIDATION_SECRET is not configured" },
      { status: 503 },
    );
  }

  const secret = getSecret(request);
  if (!secret || secret !== expected) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Invalidate the root layout and every page that uses it (entire app).
    revalidatePath("/", "layout");
    return NextResponse.json({
      ok: true,
      revalidated: true,
      scope: "layout:/",
      now: Date.now(),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

