import Image from "next/image";
import { previewField } from "@/lib/preview-attrs";

export function PageHero({
  title,
  summary,
  image,
  preview,
}: {
  title: string;
  summary?: string | null;
  image?: { url: string; width?: number | null; height?: number | null } | null;
  preview?: {
    entryId: string;
    titleFieldApiId: string;
    summaryFieldApiId?: string;
  };
}) {
  const tAttrs = preview
    ? previewField(preview.entryId, preview.titleFieldApiId)
    : {};
  const sAttrs =
    preview && preview.summaryFieldApiId
      ? previewField(preview.entryId, preview.summaryFieldApiId)
      : {};
  const imgAttrs = preview ? previewField(preview.entryId, "heroImage") : {};

  return (
    <section className="relative overflow-hidden border-b border-[var(--brand-slate)]/10 bg-gradient-to-br from-[#f8fafc] to-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <h1
            className="text-4xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-5xl"
            {...tAttrs}
          >
            {title}
          </h1>
          {summary ? (
            <p
              className="mt-4 text-lg leading-relaxed text-[var(--brand-muted)]"
              {...sAttrs}
            >
              {summary}
            </p>
          ) : null}
        </div>
        {image?.url ? (
          <div
            className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-lg"
            {...imgAttrs}
          >
            <Image
              src={image.url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
