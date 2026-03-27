# On-demand revalidation (no full Vercel rebuild)

This app exposes **`POST /api/revalidate`** to purge the Next.js **Full Route Cache** after Hygraph publishes. A new **Vercel build is not required** for content updates.

## 1. Set the secret on Vercel

1. Generate a long random value (e.g. `openssl rand -hex 32`).
2. In Vercel → your project → **Settings → Environment Variables**:
   - **Name:** `REVALIDATION_SECRET`
   - **Value:** the random string
   - **Environment:** Production (and Preview if you use preview Hygraph → preview URL).

Redeploy once so the variable is available to the serverless function.

## 2. Point Hygraph at the route

1. Hygraph → **Project settings → Webhooks** → **Add webhook**.
2. **URL:** `https://<your-production-domain>/api/revalidate`
   - Example: `https://unit4-b2b-site.vercel.app/api/revalidate`
3. **Stage:** **Published** (and the actions you care about, e.g. publish / unpublish).
4. **Authenticate** (pick one; avoid putting secrets in URLs in shared logs):

   **Preferred — custom header**

   If your Hygraph plan supports **custom headers** for webhooks, add:

   - Header name: `x-webhook-secret`  
   - Header value: same value as `REVALIDATION_SECRET`

   Or:

   - Header name: `Authorization`  
   - Header value: `Bearer <REVALIDATION_SECRET>`

   **Fallback — query string**

   If you cannot set headers, use:

   `https://<your-domain>/api/revalidate?secret=<REVALIDATION_SECRET>`

   This is easier to leak via referrer logs; prefer headers when possible.

5. **Payload:** Including or omitting the JSON body is fine; this route does not read the body.

## 3. Verify

```bash
curl -sS -X POST "https://<your-domain>/api/revalidate" \
  -H "Authorization: Bearer YOUR_SECRET"
```

Expect: `{"ok":true,"revalidated":true,"scope":"layout:/",...}`

Then reload the site; published Hygraph content should appear after the next request (usually within seconds).

## Behavior

- **`revalidatePath('/', 'layout')`** invalidates the root layout and **all routes** under it, so any model used on the marketing site is covered without listing paths.
- **`revalidate = false`** in `layout.tsx` means there is **no time-based ISR**; freshness relies on **this webhook**, **git deploys**, or **manual** `curl`.

## Compared to Vercel Deploy Hooks

| Approach | Speed | Cost |
|----------|--------|------|
| **On-demand revalidation** | Seconds (no install/build) | One short serverless invocation |
| **Deploy Hook** | Minutes (full `next build`) | Full build minutes |

You can use **only** on-demand revalidation, or keep a Deploy Hook as a rare “hard reset” if needed. See also [docs/hygraph-vercel-webhook.md](./hygraph-vercel-webhook.md).
