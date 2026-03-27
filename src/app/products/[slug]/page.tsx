import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getProduct, getProductSlugs } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.seo?.metaTitle ?? product.name,
    description: product.seo?.metaDescription ?? product.summary ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        title={product.name}
        summary={product.summary}
        image={product.heroImage}
      />
      <SectionRenderer sections={product.sections} />
    </>
  );
}
