import Link from "next/link";
import { listPersonas } from "@/lib/data";

export const metadata = {
  title: "Roles",
  description: "Guidance for CFOs, CHROs, CIOs, FP&A, procurement, and more.",
};

export default async function RolesIndexPage() {
  const personas = await listPersonas();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
          Roles
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-5xl">
          Built for your role
        </h1>
        <p className="mt-4 text-lg text-[var(--brand-muted)]">
          Practical outcomes for leaders across finance, HR, IT, and operations.
        </p>
      </header>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2">
        {personas.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/roles/${p.slug}`}
              className="block h-full rounded-xl border border-[var(--brand-slate)]/15 bg-[var(--brand-surface)] p-6 transition hover:border-[var(--brand-lime)]/50"
            >
              <h2 className="text-lg font-semibold text-[var(--brand-ink)]">{p.title}</h2>
              {p.summary ? (
                <p className="mt-2 text-sm text-[var(--brand-muted)]">{p.summary}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
