import Image from "next/image";

export function PageHero({
  title,
  summary,
  image,
}: {
  title: string;
  summary?: string | null;
  image?: { url: string; width?: number | null; height?: number | null } | null;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--brand-slate)]/10 bg-gradient-to-br from-[#f8fafc] to-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-5xl">
            {title}
          </h1>
          {summary ? (
            <p className="mt-4 text-lg leading-relaxed text-[var(--brand-muted)]">
              {summary}
            </p>
          ) : null}
        </div>
        {image?.url ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-lg">
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
