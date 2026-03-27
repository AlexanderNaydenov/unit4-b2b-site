import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getCustomerStory, getCustomerSlugs } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCustomerSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getCustomerStory(slug);
  if (!story) return {};
  return {
    title: story.seo?.metaTitle ?? story.title,
    description: story.seo?.metaDescription ?? story.excerpt ?? undefined,
  };
}

export default async function CustomerStoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getCustomerStory(slug);
  if (!story) notFound();

  return (
    <>
      <PageHero
        title={story.title}
        summary={story.excerpt}
        image={story.heroImage}
      />
      <div className="border-b border-[var(--brand-slate)]/10 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6">
          {story.clientLogo?.url ? (
            <div className="relative h-12 w-40">
              <Image
                src={story.clientLogo.url}
                alt={story.clientName ?? ""}
                fill
                className="object-contain object-left"
              />
            </div>
          ) : null}
          {story.clientName ? (
            <p className="text-sm font-medium text-[var(--brand-muted)]">{story.clientName}</p>
          ) : null}
          {story.industry ? (
            <Link
              href={`/industries/${story.industry.slug}`}
              className="text-sm font-semibold text-[var(--brand-lime)]"
            >
              {story.industry.name}
            </Link>
          ) : null}
        </div>
      </div>
      <SectionRenderer sections={story.sections} />
    </>
  );
}
