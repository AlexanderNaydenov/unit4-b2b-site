import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getPersona, getPersonaSlugs } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPersonaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const persona = await getPersona(slug);
  if (!persona) return {};
  return {
    title: persona.seo?.metaTitle ?? persona.title,
    description: persona.seo?.metaDescription ?? persona.summary ?? undefined,
  };
}

export default async function PersonaPage({ params }: Props) {
  const { slug } = await params;
  const persona = await getPersona(slug);
  if (!persona) notFound();

  return (
    <>
      <PageHero
        title={persona.title}
        summary={persona.summary}
        image={persona.heroImage}
      />
      {persona.recommendedProducts.length > 0 ? (
        <section className="border-b border-[var(--brand-slate)]/10 bg-white px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-lime)]">
              Recommended products
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {persona.recommendedProducts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="inline-flex rounded-full border border-[var(--brand-slate)]/20 bg-[var(--brand-surface)] px-4 py-2 text-sm font-medium text-[var(--brand-ink)] hover:border-[var(--brand-lime)]/50"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <SectionRenderer sections={persona.sections} />
    </>
  );
}
