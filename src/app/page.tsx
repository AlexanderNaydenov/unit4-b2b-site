import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturedCustomers, FeaturedProducts } from "@/components/landing/FeaturedSections";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getLandingPage } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLandingPage("home");
  if (!page?.seo?.metaTitle) return {};
  return {
    title: page.seo.metaTitle,
    description: page.seo.metaDescription ?? undefined,
  };
}

export default async function HomePage() {
  const page = await getLandingPage("home");
  if (!page) notFound();

  return (
    <>
      <SectionRenderer sections={page.sections} previewEntryId={page.id} />
      <FeaturedProducts products={page.featuredProducts} />
      <FeaturedCustomers stories={page.featuredCustomerStories} />
    </>
  );
}
