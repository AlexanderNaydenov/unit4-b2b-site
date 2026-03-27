# Hygraph webhooks → Vercel deploy hooks

This project is configured so **published Hygraph content is baked into static pages at build time**. To reflect CMS changes **without waiting for time-based revalidation**, use a **Vercel Deploy Hook** and call it from a **Hygraph webhook** (see [Hygraph: Trigger static build](https://hygraph.com/docs/developer-guides/webhooks/trigger-static-build)).

## 1. Create a Deploy Hook (Vercel)

1. Open the project on Vercel: **Settings → Git → Deploy Hooks**.
2. Create a hook (e.g. name `hygraph-publish`, branch `main`).
3. Copy the generated URL.  
   **Treat it as a secret** — anyone with the URL can trigger production builds.

Optional: store the URL in a password manager or team vault (do **not** commit it to the repo).

## 2. Create a webhook (Hygraph)

1. In Hygraph: **Project settings → Webhooks** (under AI & Automation).
2. **Add webhook**:
   - **URL**: paste the Vercel Deploy Hook URL.
   - **Payload**: you can disable including the payload if you only need to ping Vercel (smaller requests).
3. **Triggers**:
   - **Stage**: **Published** (so drafts do not trigger production builds).
   - **Content models**: either leave empty to fire on any model, or restrict to models this site uses, for example:
     - `SiteSettings`, `LandingPage`, `Product`, `Industry`, `PersonaRole`, `Resource`, `CustomerStory`
   - **Actions**: e.g. publish / unpublish, or leave as needed so edits that matter to the live site trigger a rebuild.

Webhooks are **per environment** in Hygraph — configure staging vs production separately if you use multiple Hygraph environments.

## 3. Verify

1. Publish a small content change in Hygraph.
2. In Vercel → **Deployments**, confirm a new deployment starts within a short time.
3. When the deployment is **Ready**, the site should show the new content.

## How this fits the Next.js app

- The root layout sets **`revalidate = false`**, so pages do not rely on periodic ISR; **fresh content comes from new builds** triggered by the deploy hook (plus any normal Git push deployments).
- Local **`next dev`** still loads data on each request, so editors can preview without waiting for Vercel.

## Manual trigger (debugging)

```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_xxx/xxx"
```

Use the exact URL from Vercel Deploy Hooks (your project’s URL will differ).
