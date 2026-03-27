# Hygraph live preview and click-to-edit

This app uses [Next.js Draft Mode](https://nextjs.org/docs/app/guides/draft-mode), DRAFT-stage GraphQL queries, the [Hygraph Preview SDK](https://hygraph.com/docs/developer-guides/schema/live-preview), and `data-hygraph-*` attributes for [click-to-edit](https://hygraph.com/docs/developer-guides/schema/click-to-edit-next-js).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `HYGRAPH_DRAFT_SECRET` | Validates `GET /api/draft` (Preview widget “Enable draft mode” links). |
| `HYGRAPH_PREVIEW_TOKEN` | PAT with **default stage DRAFT** — used when Draft Mode is on so the iframe sees draft content. |
| `HYGRAPH_API_TOKEN` | PAT for **PUBLISHED** (normal visitors and build-time static generation). |
| `NEXT_PUBLIC_HYGRAPH_STUDIO_URL` | Base URL of Hygraph Studio for click-to-edit (no trailing slash). Use your project’s host if it differs from `https://app.hygraph.com`. |

Copy `env.example` and set these in `.env.local` and in Vercel (Production + Preview).

## Studio: Preview URL templates

In **Project settings → Preview**, add URL templates per content model. Replace `YOUR_DOMAIN` and `YOUR_SECRET` with your deployed site and `HYGRAPH_DRAFT_SECRET`.

| Model | Template (example) |
|-------|---------------------|
| **LandingPage** | `https://YOUR_DOMAIN/api/draft?secret=YOUR_SECRET&slug={slug}` |
| **SiteSettings** (singleton) | `https://YOUR_DOMAIN/api/draft?secret=YOUR_SECRET&path=%2F` |
| **Product**, **Industry**, **Persona**, **CustomerStory**, **Resource** | Same as LandingPage with `{slug}` — the app resolves CMS slugs to routes (`/products/...`, `/industries/...`, etc.). |

Local development:

`http://localhost:3000/api/draft?secret=YOUR_SECRET&slug=home`

Optional query params:

- `slug` — resolved via GraphQL to the correct path (see `src/lib/preview-resolve.ts`).
- `path` — allowlisted path (e.g. `/`, `/solutions`, `/products`) when there is no landing slug.

## Endpoints

- **Enable draft:** `GET /api/draft?secret=...&slug=...` or `&path=...`
- **Disable draft:** `GET /api/draft/disable` (redirects home)

## Troubleshooting

- **Iframe shows published content:** Ensure `HYGRAPH_PREVIEW_TOKEN` is a PAT with DRAFT as default stage and that Preview URLs hit `/api/draft` successfully (correct secret).
- **Click-to-edit opens wrong environment:** Set `NEXT_PUBLIC_HYGRAPH_STUDIO_URL` to the Studio URL shown in your browser for this project (region/account).
- **Vercel Deployment Protection:** Protected deployments can block the Preview iframe. Allow unauthenticated access for the preview deployment or use Hygraph’s documented bypass patterns.

See also: [on-demand revalidation](./on-demand-revalidation.md) for published-site updates after publish.
