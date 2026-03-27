import Link from "next/link";
import { listIndustries } from "@/lib/data";

export const metadata = {
  title: "Industries",
  description: "Industry solutions for professional services, public sector, nonprofit, and higher education.",
};

export default async function IndustriesIndexPage() {
  const industries = await listIndustries();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
          Industries
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-5xl">
          Built for your sector
        </h1>
        <p className="mt-4 text-lg text-[var(--brand-muted)]">
          Deep experience where complex projects, people, and compliance matter.
        </p>
      </header>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2">
        {industries.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/industries/${i.slug}`}
              className="block h-full rounded-xl border border-[var(--brand-slate)]/15 bg-[var(--brand-surface)] p-8 transition hover:border-[var(--brand-lime)]/50"
            >
              <h2 className="text-xl font-semibold text-[var(--brand-ink)]">{i.name}</h2>
              {i.summary ? (
                <p className="mt-2 text-[var(--brand-muted)]">{i.summary}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
