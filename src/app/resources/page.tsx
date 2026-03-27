import Link from "next/link";
import { listResources } from "@/lib/data";

const typeLabel: Record<string, string> = {
  WHITEPAPER: "Whitepaper",
  WEBINAR: "Webinar",
  GUIDE: "Guide",
  BLOG: "Article",
  VIDEO: "Video",
};

export const metadata = {
  title: "Resources",
  description: "Webinars, guides, whitepapers, and articles.",
};

export default async function ResourcesIndexPage() {
  const resources = await listResources();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
          Resources
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-5xl">
          Insights & assets
        </h1>
        <p className="mt-4 text-lg text-[var(--brand-muted)]">
          Research, events, and practical guides to support your evaluation journey.
        </p>
      </header>
      <ul className="mt-14 divide-y divide-[var(--brand-slate)]/10 rounded-xl border border-[var(--brand-slate)]/10 bg-white">
        {resources.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/resources/${r.slug}`}
              className="flex flex-col gap-2 px-6 py-5 transition hover:bg-[var(--brand-surface)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-slate)]">
                  {typeLabel[r.resourceType] ?? r.resourceType}
                </span>
                <h2 className="mt-1 text-lg font-semibold text-[var(--brand-ink)]">
                  {r.title}
                </h2>
                {r.summary ? (
                  <p className="mt-1 text-sm text-[var(--brand-muted)]">{r.summary}</p>
                ) : null}
              </div>
              <span className="text-sm font-semibold text-[var(--brand-lime)] shrink-0">
                View →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
