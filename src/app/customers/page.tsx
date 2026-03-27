import Link from "next/link";
import { listCustomers } from "@/lib/data";

export const metadata = {
  title: "Customer stories",
  description: "How organizations transform with Unit4.",
};

export default async function CustomersIndexPage() {
  const stories = await listCustomers();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
          Customers
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-5xl">
          Customer stories
        </h1>
        <p className="mt-4 text-lg text-[var(--brand-muted)]">
          Real outcomes from public sector, services, education, and nonprofit teams.
        </p>
      </header>
      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {stories.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/customers/${s.slug}`}
              className="block h-full rounded-xl border border-[var(--brand-slate)]/15 bg-[var(--brand-surface)] p-8 transition hover:border-[var(--brand-lime)]/50"
            >
              {s.clientName ? (
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-slate)]">
                  {s.clientName}
                </p>
              ) : null}
              <h2 className="mt-2 text-xl font-semibold text-[var(--brand-ink)]">{s.title}</h2>
              {s.excerpt ? (
                <p className="mt-3 text-[var(--brand-muted)]">{s.excerpt}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
