import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { getResource, getResourceSlugs } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getResourceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResource(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.summary ?? undefined,
  };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResource(slug);
  if (!resource) notFound();

  const primaryHref = resource.externalUrl ?? resource.file?.url ?? null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-lime)]">
        {resource.resourceType.replace("_", " ")}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--brand-ink)]">
        {resource.title}
      </h1>
      {resource.summary ? (
        <p className="mt-4 text-lg text-[var(--brand-muted)]">{resource.summary}</p>
      ) : null}

      {resource.thumbnail?.url ? (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={resource.thumbnail.url}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50rem"
            priority
          />
        </div>
      ) : null}

      {resource.relatedProduct ? (
        <p className="mt-8 text-sm text-[var(--brand-muted)]">
          Related product:{" "}
          <Link
            href={`/products/${resource.relatedProduct.slug}`}
            className="font-medium text-[var(--brand-ink)] underline"
          >
            {resource.relatedProduct.name}
          </Link>
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-4">
        {primaryHref ? (
          <CtaButton
            label={
              resource.externalUrl
                ? "Open resource"
                : resource.file
                  ? "Download"
                  : "View"
            }
            url={primaryHref}
          />
        ) : null}
      </div>
    </article>
  );
}
