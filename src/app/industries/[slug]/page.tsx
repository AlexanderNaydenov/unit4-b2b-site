import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getIndustry, getIndustrySlugs } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getIndustrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) return {};
  return {
    title: industry.seo?.metaTitle ?? industry.name,
    description: industry.seo?.metaDescription ?? industry.summary ?? undefined,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <PageHero
        title={industry.name}
        summary={industry.summary}
        image={industry.heroImage}
      />
      <SectionRenderer sections={industry.sections} />
    </>
  );
}
