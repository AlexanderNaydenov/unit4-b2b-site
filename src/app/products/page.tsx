import Link from "next/link";
import { listProducts } from "@/lib/data";

export const metadata = {
  title: "Products",
  description: "Cloud ERP, FP&A, HCM, procurement, and platform technology.",
};

export default async function ProductsIndexPage() {
  const products = await listProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
          Products
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-5xl">
          The Unit4 portfolio
        </h1>
        <p className="mt-4 text-lg text-[var(--brand-muted)]">
          Modular applications on a unified platform—built for people-centric organizations.
        </p>
      </header>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/products/${p.slug}`}
              className="block h-full rounded-xl border border-[var(--brand-slate)]/15 bg-[var(--brand-surface)] p-6 transition hover:border-[var(--brand-lime)]/50 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-[var(--brand-ink)]">{p.name}</h2>
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
