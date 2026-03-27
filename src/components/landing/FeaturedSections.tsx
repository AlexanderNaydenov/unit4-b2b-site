import Link from "next/link";

export function FeaturedProducts({
  products,
}: {
  products: Array<{ name: string; slug: string; summary?: string | null }>;
}) {
  if (!products.length) return null;
  return (
    <section className="border-t border-[var(--brand-slate)]/10 bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
            Featured
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-ink)]">
            Solutions that scale with you
          </h2>
          <p className="mt-3 text-[var(--brand-muted)]">
            Explore core capabilities across ERP, planning, and people.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group rounded-xl border border-[var(--brand-slate)]/15 bg-[var(--brand-surface)] p-6 transition hover:border-[var(--brand-lime)]/50 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-[var(--brand-ink)] group-hover:text-[var(--brand-slate)]">
                {p.name}
              </h3>
              {p.summary ? (
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">
                  {p.summary}
                </p>
              ) : null}
              <span className="mt-4 inline-flex text-sm font-semibold text-[var(--brand-lime)]">
                View product →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedCustomers({
  stories,
}: {
  stories: Array<{
    title: string;
    slug: string;
    clientName?: string | null;
    excerpt?: string | null;
  }>;
}) {
  if (!stories.length) return null;
  return (
    <section className="bg-[var(--brand-surface)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
            Customer stories
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-ink)]">
            Organizations like yours
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((s) => (
            <Link
              key={s.slug}
              href={`/customers/${s.slug}`}
              className="group flex flex-col rounded-xl border border-[var(--brand-slate)]/10 bg-white p-8 shadow-sm transition hover:border-[var(--brand-lime)]/40"
            >
              {s.clientName ? (
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-slate)]">
                  {s.clientName}
                </p>
              ) : null}
              <h3 className="mt-2 text-xl font-semibold text-[var(--brand-ink)]">
                {s.title}
              </h3>
              {s.excerpt ? (
                <p className="mt-3 flex-1 text-[var(--brand-muted)]">{s.excerpt}</p>
              ) : null}
              <span className="mt-6 text-sm font-semibold text-[var(--brand-lime)]">
                Read story →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
