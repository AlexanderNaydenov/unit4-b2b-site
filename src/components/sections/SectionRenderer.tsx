import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { RichBody } from "./RichBody";
import type { RichTextContent } from "@graphcms/rich-text-types";

type Cta = { label: string; url: string; variant?: string } | null | undefined;

export type Section =
  | {
      __typename: "HeroBlock";
      eyebrow?: string | null;
      headline: string;
      subheadline?: string | null;
      primaryCta?: Cta;
      secondaryCta?: Cta;
    }
  | { __typename: "RichTextBlock"; richBody?: { raw: RichTextContent } | null }
  | {
      __typename: "CallToActionBanner";
      layout: string;
      ctaBannerTitle: string;
      ctaBannerBody?: { raw: RichTextContent } | null;
      cta: NonNullable<Cta>;
      image?: { url: string; width?: number | null; height?: number | null } | null;
    }
  | {
      __typename: "CardGridBlock";
      intro?: {
        eyebrow?: string | null;
        title: string;
        subtitle?: string | null;
      } | null;
      cards: Array<{
        title: string;
        excerpt?: string | null;
        href?: string | null;
      }>;
    }
  | {
      __typename: "FeatureGridBlock";
      intro?: {
        eyebrow?: string | null;
        title: string;
        subtitle?: string | null;
      } | null;
      features: Array<{
        title: string;
        description?: { raw: RichTextContent } | null;
      }>;
    }
  | {
      __typename: "StatsBlock";
      intro?: {
        eyebrow?: string | null;
        title: string;
        subtitle?: string | null;
      } | null;
      stats: Array<{ value: string; label: string }>;
    }
  | { __typename: "LogoStripBlock"; logoStripTitle?: string | null }
  | {
      __typename: "QuoteBlock";
      quote: string;
      authorName?: string | null;
      authorTitle?: string | null;
    }
  | {
      __typename: "MediaWithTextBlock";
      mediaPosition: string;
      mwtTitle: string;
      mwtBody: { raw: RichTextContent };
      image?: { url: string; width?: number | null; height?: number | null } | null;
      mwtCta?: Cta;
    }
  | {
      __typename: "FaqBlock";
      intro?: {
        eyebrow?: string | null;
        title: string;
        subtitle?: string | null;
      } | null;
      items: Array<{
        question: string;
        answer: { raw: RichTextContent };
      }>;
    };

function SectionIntro({
  intro,
}: {
  intro?: {
    eyebrow?: string | null;
    title: string;
    subtitle?: string | null;
  } | null;
}) {
  if (!intro) return null;
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {intro.eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
          {intro.eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-4xl">
        {intro.title}
      </h2>
      {intro.subtitle ? (
        <p className="mt-3 text-lg text-[var(--brand-muted)]">{intro.subtitle}</p>
      ) : null}
    </div>
  );
}

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="flex flex-col">
      {sections.map((block, i) => (
        <SectionBlock key={`${block.__typename}-${i}`} block={block} index={i} />
      ))}
    </div>
  );
}

function SectionBlock({ block, index }: { block: Section; index: number }) {
  const stripe = index % 2 === 0 ? "bg-white" : "bg-[var(--brand-surface)]";

  switch (block.__typename) {
    case "HeroBlock":
      return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1a2332] to-[#121a24] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--brand-lime)]/15 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            {block.eyebrow ? (
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand-lime)]">
                {block.eyebrow}
              </p>
            ) : null}
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {block.headline}
            </h1>
            {block.subheadline ? (
              <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
                {block.subheadline}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap gap-4">
              {block.primaryCta ? (
                <CtaButton
                  label={block.primaryCta.label}
                  url={block.primaryCta.url}
                  variant={
                    (block.primaryCta.variant as "PRIMARY" | "SECONDARY" | "GHOST") ??
                    "PRIMARY"
                  }
                  surface="dark"
                />
              ) : null}
              {block.secondaryCta ? (
                <CtaButton
                  label={block.secondaryCta.label}
                  url={block.secondaryCta.url}
                  variant={
                    (block.secondaryCta.variant as "PRIMARY" | "SECONDARY" | "GHOST") ??
                    "SECONDARY"
                  }
                  surface="dark"
                />
              ) : null}
            </div>
          </div>
        </section>
      );

    case "RichTextBlock":
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div className="mx-auto max-w-3xl">
            <RichBody raw={block.richBody?.raw} />
          </div>
        </section>
      );

    case "CallToActionBanner": {
      const split = block.layout === "SPLIT";
      return (
        <section className="bg-[var(--brand-ink)] px-6 py-16 text-white md:py-20">
          <div
            className={`mx-auto flex max-w-6xl flex-col gap-10 ${split ? "md:flex-row md:items-center" : ""}`}
          >
            {split && block.image?.url ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg md:w-1/2">
                <Image
                  src={block.image.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : null}
            <div className={split && block.image?.url ? "md:w-1/2" : "mx-auto max-w-3xl text-center"}>
              <h2 className="text-2xl font-semibold md:text-3xl">{block.ctaBannerTitle}</h2>
              {block.ctaBannerBody?.raw ? (
                <div className="mt-4 text-white/85">
                  <RichBody raw={block.ctaBannerBody.raw} />
                </div>
              ) : null}
              <div className="mt-8 flex justify-center">
                <CtaButton
                  label={block.cta.label}
                  url={block.cta.url}
                  variant={
                    (block.cta.variant as "PRIMARY" | "SECONDARY" | "GHOST") ?? "PRIMARY"
                  }
                  surface="dark"
                />
              </div>
            </div>
          </div>
        </section>
      );
    }

    case "CardGridBlock":
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div className="mx-auto max-w-6xl">
            <SectionIntro intro={block.intro} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {block.cards.map((card, j) => (
                <article
                  key={j}
                  className="flex flex-col rounded-xl border border-[var(--brand-slate)]/15 bg-white p-6 shadow-sm transition hover:border-[var(--brand-lime)]/40 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-[var(--brand-ink)]">
                    {card.title}
                  </h3>
                  {card.excerpt ? (
                    <p className="mt-2 flex-1 text-sm text-[var(--brand-muted)]">
                      {card.excerpt}
                    </p>
                  ) : null}
                  {card.href ? (
                    <CtaButton
                      label="Learn more"
                      url={card.href}
                      variant="GHOST"
                      className="mt-6 self-start"
                    />
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case "FeatureGridBlock":
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div className="mx-auto max-w-6xl">
            <SectionIntro intro={block.intro} />
            <div className="grid gap-10 md:grid-cols-2">
              {block.features.map((f, j) => (
                <div key={j}>
                  <h3 className="text-lg font-semibold text-[var(--brand-ink)]">
                    {f.title}
                  </h3>
                  {f.description?.raw ? (
                    <div className="mt-2">
                      <RichBody raw={f.description.raw} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "StatsBlock":
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div className="mx-auto max-w-6xl">
            <SectionIntro intro={block.intro} />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {block.stats.map((s, j) => (
                <div
                  key={j}
                  className="rounded-xl border border-[var(--brand-slate)]/15 bg-white p-6 text-center"
                >
                  <p className="text-3xl font-semibold text-[var(--brand-ink)] md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-[var(--brand-muted)]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "LogoStripBlock":
      if (!block.logoStripTitle) return null;
      return (
        <section className="border-y border-[var(--brand-slate)]/10 bg-white px-6 py-12">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-[var(--brand-muted)]">
            {block.logoStripTitle}
          </p>
        </section>
      );

    case "QuoteBlock":
      return (
        <section className="bg-[var(--brand-surface)] px-6 py-16 md:py-20">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="text-xl font-medium leading-relaxed text-[var(--brand-ink)] md:text-2xl">
              “{block.quote}”
            </p>
            {(block.authorName || block.authorTitle) && (
              <footer className="mt-8 text-sm text-[var(--brand-muted)]">
                {block.authorName}
                {block.authorName && block.authorTitle ? " · " : null}
                {block.authorTitle}
              </footer>
            )}
          </blockquote>
        </section>
      );

    case "MediaWithTextBlock": {
      const imageLeft = block.mediaPosition === "LEFT";
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div
            className={`mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center ${imageLeft ? "" : "md:flex-row-reverse"}`}
          >
            {block.image?.url ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:w-1/2">
                <Image
                  src={block.image.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : null}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-[var(--brand-ink)] md:text-3xl">
                {block.mwtTitle}
              </h2>
              <div className="mt-4">
                <RichBody raw={block.mwtBody.raw} />
              </div>
              {block.mwtCta ? (
                <div className="mt-6">
                  <CtaButton
                    label={block.mwtCta.label}
                    url={block.mwtCta.url}
                    variant={
                      (block.mwtCta.variant as "PRIMARY" | "SECONDARY" | "GHOST") ??
                      "PRIMARY"
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    }

    case "FaqBlock":
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div className="mx-auto max-w-3xl">
            <SectionIntro intro={block.intro} />
            <div className="space-y-3">
              {block.items.map((item, j) => (
                <details
                  key={j}
                  className="group rounded-lg border border-[var(--brand-slate)]/15 bg-white px-4 py-3 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none font-medium text-[var(--brand-ink)] after:float-right after:text-[var(--brand-muted)] after:content-['+'] open:after:content-['−']">
                    {item.question}
                  </summary>
                  <div className="mt-3 border-t border-[var(--brand-slate)]/10 pt-3">
                    <RichBody raw={item.answer.raw} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}
