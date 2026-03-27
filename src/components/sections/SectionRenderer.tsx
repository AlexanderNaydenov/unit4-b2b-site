import Image from "next/image";
import type { ComponentChainLink } from "@hygraph/preview-sdk";
import { CtaButton } from "@/components/ui/CtaButton";
import {
  createComponentChainLink,
  previewField,
  richTextPreview,
} from "@/lib/preview-attrs";
import { RichBody } from "./RichBody";
import type { RichTextContent } from "@graphcms/rich-text-types";

type Cta = {
  id?: string;
  label: string;
  url: string;
  variant?: string;
} | null;

export type Section =
  | {
      __typename: "HeroBlock";
      id?: string;
      eyebrow?: string | null;
      headline: string;
      subheadline?: string | null;
      primaryCta?: Cta;
      secondaryCta?: Cta;
    }
  | {
      __typename: "RichTextBlock";
      id?: string;
      richBody?: { raw: RichTextContent } | null;
    }
  | {
      __typename: "CallToActionBanner";
      id?: string;
      layout: string;
      ctaBannerTitle: string;
      ctaBannerBody?: { raw: RichTextContent } | null;
      cta: NonNullable<Cta>;
      image?: { url: string; width?: number | null; height?: number | null } | null;
    }
  | {
      __typename: "CardGridBlock";
      id?: string;
      intro?: {
        id?: string;
        eyebrow?: string | null;
        title: string;
        subtitle?: string | null;
      } | null;
      cards: Array<{
        id?: string;
        title: string;
        excerpt?: string | null;
        href?: string | null;
      }>;
    }
  | {
      __typename: "FeatureGridBlock";
      id?: string;
      intro?: {
        id?: string;
        eyebrow?: string | null;
        title: string;
        subtitle?: string | null;
      } | null;
      features: Array<{
        id?: string;
        title: string;
        description?: { raw: RichTextContent } | null;
      }>;
    }
  | {
      __typename: "StatsBlock";
      id?: string;
      intro?: {
        id?: string;
        eyebrow?: string | null;
        title: string;
        subtitle?: string | null;
      } | null;
      stats: Array<{ id?: string; value: string; label: string }>;
    }
  | { __typename: "LogoStripBlock"; id?: string; logoStripTitle?: string | null }
  | {
      __typename: "QuoteBlock";
      id?: string;
      quote: string;
      authorName?: string | null;
      authorTitle?: string | null;
    }
  | {
      __typename: "MediaWithTextBlock";
      id?: string;
      mediaPosition: string;
      mwtTitle: string;
      mwtBody: { raw: RichTextContent };
      image?: { url: string; width?: number | null; height?: number | null } | null;
      mwtCta?: Cta;
    }
  | {
      __typename: "FaqBlock";
      id?: string;
      intro?: {
        id?: string;
        eyebrow?: string | null;
        title: string;
        subtitle?: string | null;
      } | null;
      items: Array<{
        id?: string;
        question: string;
        answer: { raw: RichTextContent };
      }>;
    };

function sc(blockId: string): ComponentChainLink[] {
  return [createComponentChainLink("sections", blockId)];
}

function pf(
  entryId: string | undefined,
  fieldApiId: string,
  chain: ComponentChainLink[] | undefined,
) {
  if (!entryId || !chain) return {};
  return previewField(entryId, fieldApiId, chain);
}

function SectionIntro({
  intro,
  previewEntryId,
  sectionChain,
}: {
  intro?: {
    id?: string;
    eyebrow?: string | null;
    title: string;
    subtitle?: string | null;
  } | null;
  previewEntryId?: string;
  sectionChain?: ComponentChainLink[];
}) {
  if (!intro) return null;
  const introChain =
    previewEntryId && intro.id && sectionChain
      ? [...sectionChain, createComponentChainLink("intro", intro.id)]
      : undefined;
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {intro.eyebrow ? (
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-lime)]"
          {...pf(previewEntryId, "eyebrow", introChain)}
        >
          {intro.eyebrow}
        </p>
      ) : null}
      <h2
        className="text-3xl font-semibold tracking-tight text-[var(--brand-ink)] md:text-4xl"
        {...pf(previewEntryId, "title", introChain)}
      >
        {intro.title}
      </h2>
      {intro.subtitle ? (
        <p
          className="mt-3 text-lg text-[var(--brand-muted)]"
          {...pf(previewEntryId, "subtitle", introChain)}
        >
          {intro.subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function SectionRenderer({
  sections,
  previewEntryId,
}: {
  sections: Section[];
  /** Root Hygraph entry id (e.g. LandingPage id) for click-to-edit */
  previewEntryId?: string;
}) {
  return (
    <div className="flex flex-col">
      {sections.map((block, i) => (
        <SectionBlock
          key={`${block.__typename}-${i}`}
          block={block}
          index={i}
          previewEntryId={previewEntryId}
        />
      ))}
    </div>
  );
}

function SectionBlock({
  block,
  index,
  previewEntryId,
}: {
  block: Section;
  index: number;
  previewEntryId?: string;
}) {
  const stripe = index % 2 === 0 ? "bg-white" : "bg-[var(--brand-surface)]";
  const chain =
    previewEntryId && "id" in block && block.id ? sc(block.id) : undefined;

  switch (block.__typename) {
    case "HeroBlock": {
      const pChain =
        chain && block.primaryCta?.id
          ? [...chain, createComponentChainLink("primaryCta", block.primaryCta.id)]
          : undefined;
      const sChain =
        chain && block.secondaryCta?.id
          ? [...chain, createComponentChainLink("secondaryCta", block.secondaryCta.id)]
          : undefined;
      return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1a2332] to-[#121a24] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--brand-lime)]/15 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            {block.eyebrow ? (
              <p
                className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand-lime)]"
                {...pf(previewEntryId, "eyebrow", chain)}
              >
                {block.eyebrow}
              </p>
            ) : null}
            <h1
              className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl"
              {...pf(previewEntryId, "headline", chain)}
            >
              {block.headline}
            </h1>
            {block.subheadline ? (
              <p
                className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
                {...pf(previewEntryId, "subheadline", chain)}
              >
                {block.subheadline}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap gap-4">
              {block.primaryCta ? (
                <div {...pf(previewEntryId, "label", pChain)}>
                  <CtaButton
                    label={block.primaryCta.label}
                    url={block.primaryCta.url}
                    variant={
                      (block.primaryCta.variant as "PRIMARY" | "SECONDARY" | "GHOST") ??
                      "PRIMARY"
                    }
                    surface="dark"
                  />
                </div>
              ) : null}
              {block.secondaryCta ? (
                <div {...pf(previewEntryId, "label", sChain)}>
                  <CtaButton
                    label={block.secondaryCta.label}
                    url={block.secondaryCta.url}
                    variant={
                      (block.secondaryCta.variant as "PRIMARY" | "SECONDARY" | "GHOST") ??
                      "SECONDARY"
                    }
                    surface="dark"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
    }

    case "RichTextBlock":
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div className="mx-auto max-w-3xl">
            <RichBody
              raw={block.richBody?.raw}
              preview={richTextPreview(previewEntryId, "body", chain)}
            />
          </div>
        </section>
      );

    case "CallToActionBanner": {
      const split = block.layout === "SPLIT";
      const ctaCh =
        chain && block.cta?.id
          ? [...chain, createComponentChainLink("cta", block.cta.id)]
          : undefined;
      return (
        <section className="bg-[var(--brand-ink)] px-6 py-16 text-white md:py-20">
          <div
            className={`mx-auto flex max-w-6xl flex-col gap-10 ${split ? "md:flex-row md:items-center" : ""}`}
          >
            {split && block.image?.url ? (
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-lg md:w-1/2"
                {...pf(previewEntryId, "image", chain)}
              >
                <Image
                  src={block.image.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : null}
            <div
              className={split && block.image?.url ? "md:w-1/2" : "mx-auto max-w-3xl text-center"}
            >
              <h2
                className="text-2xl font-semibold md:text-3xl"
                {...pf(previewEntryId, "title", chain)}
              >
                {block.ctaBannerTitle}
              </h2>
              {block.ctaBannerBody?.raw ? (
                <div className="mt-4 text-white/85">
                  <RichBody
                    raw={block.ctaBannerBody.raw}
                    preview={richTextPreview(previewEntryId, "body", chain)}
                  />
                </div>
              ) : null}
              <div className="mt-8 flex justify-center" {...pf(previewEntryId, "label", ctaCh)}>
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
            <SectionIntro
              intro={block.intro}
              previewEntryId={previewEntryId}
              sectionChain={chain}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {block.cards.map((card, j) => {
                const cardCh =
                  chain && card.id
                    ? [...chain, createComponentChainLink("cards", card.id)]
                    : undefined;
                return (
                  <article
                    key={card.id ?? j}
                    className="flex flex-col rounded-xl border border-[var(--brand-slate)]/15 bg-white p-6 shadow-sm transition hover:border-[var(--brand-lime)]/40 hover:shadow-md"
                  >
                    <h3
                      className="text-lg font-semibold text-[var(--brand-ink)]"
                      {...pf(previewEntryId, "title", cardCh)}
                    >
                      {card.title}
                    </h3>
                    {card.excerpt ? (
                      <p
                        className="mt-2 flex-1 text-sm text-[var(--brand-muted)]"
                        {...pf(previewEntryId, "excerpt", cardCh)}
                      >
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
                );
              })}
            </div>
          </div>
        </section>
      );

    case "FeatureGridBlock":
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              intro={block.intro}
              previewEntryId={previewEntryId}
              sectionChain={chain}
            />
            <div className="grid gap-10 md:grid-cols-2">
              {block.features.map((f, j) => {
                const fCh =
                  chain && f.id
                    ? [...chain, createComponentChainLink("features", f.id)]
                    : undefined;
                return (
                  <div key={f.id ?? j}>
                    <h3
                      className="text-lg font-semibold text-[var(--brand-ink)]"
                      {...pf(previewEntryId, "title", fCh)}
                    >
                      {f.title}
                    </h3>
                    {f.description?.raw ? (
                      <div className="mt-2">
                        <RichBody
                          raw={f.description.raw}
                          preview={richTextPreview(
                            previewEntryId,
                            "description",
                            fCh,
                          )}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );

    case "StatsBlock":
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              intro={block.intro}
              previewEntryId={previewEntryId}
              sectionChain={chain}
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {block.stats.map((s, j) => {
                const stCh =
                  chain && s.id
                    ? [...chain, createComponentChainLink("stats", s.id)]
                    : undefined;
                return (
                  <div
                    key={s.id ?? j}
                    className="rounded-xl border border-[var(--brand-slate)]/15 bg-white p-6 text-center"
                  >
                    <p
                      className="text-3xl font-semibold text-[var(--brand-ink)] md:text-4xl"
                      {...pf(previewEntryId, "value", stCh)}
                    >
                      {s.value}
                    </p>
                    <p
                      className="mt-2 text-sm text-[var(--brand-muted)]"
                      {...pf(previewEntryId, "label", stCh)}
                    >
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );

    case "LogoStripBlock":
      if (!block.logoStripTitle) return null;
      return (
        <section className="border-y border-[var(--brand-slate)]/10 bg-white px-6 py-12">
          <p
            className="text-center text-sm font-medium uppercase tracking-wider text-[var(--brand-muted)]"
            {...pf(previewEntryId, "title", chain)}
          >
            {block.logoStripTitle}
          </p>
        </section>
      );

    case "QuoteBlock":
      return (
        <section className="bg-[var(--brand-surface)] px-6 py-16 md:py-20">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p
              className="text-xl font-medium leading-relaxed text-[var(--brand-ink)] md:text-2xl"
              {...pf(previewEntryId, "quote", chain)}
            >
              “{block.quote}”
            </p>
            {(block.authorName || block.authorTitle) && (
              <footer className="mt-8 text-sm text-[var(--brand-muted)]">
                <span {...pf(previewEntryId, "authorName", chain)}>{block.authorName}</span>
                {block.authorName && block.authorTitle ? " · " : null}
                <span {...pf(previewEntryId, "authorTitle", chain)}>{block.authorTitle}</span>
              </footer>
            )}
          </blockquote>
        </section>
      );

    case "MediaWithTextBlock": {
      const imageLeft = block.mediaPosition === "LEFT";
      const ctaCh =
        chain && block.mwtCta?.id
          ? [...chain, createComponentChainLink("cta", block.mwtCta.id)]
          : undefined;
      return (
        <section className={`${stripe} px-6 py-16 md:py-20`}>
          <div
            className={`mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center ${imageLeft ? "" : "md:flex-row-reverse"}`}
          >
            {block.image?.url ? (
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:w-1/2"
                {...pf(previewEntryId, "image", chain)}
              >
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
              <h2
                className="text-2xl font-semibold text-[var(--brand-ink)] md:text-3xl"
                {...pf(previewEntryId, "title", chain)}
              >
                {block.mwtTitle}
              </h2>
              <div className="mt-4">
                <RichBody
                  raw={block.mwtBody.raw}
                  preview={richTextPreview(previewEntryId, "body", chain)}
                />
              </div>
              {block.mwtCta ? (
                <div className="mt-6" {...pf(previewEntryId, "label", ctaCh)}>
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
            <SectionIntro
              intro={block.intro}
              previewEntryId={previewEntryId}
              sectionChain={chain}
            />
            <div className="space-y-3">
              {block.items.map((item, j) => {
                const itemCh =
                  chain && item.id
                    ? [...chain, createComponentChainLink("items", item.id)]
                    : undefined;
                return (
                  <details
                    key={item.id ?? j}
                    className="group rounded-lg border border-[var(--brand-slate)]/15 bg-white px-4 py-3 open:shadow-sm"
                  >
                    <summary
                      className="cursor-pointer list-none font-medium text-[var(--brand-ink)] after:float-right after:text-[var(--brand-muted)] after:content-['+'] open:after:content-['−']"
                      {...pf(previewEntryId, "question", itemCh)}
                    >
                      {item.question}
                    </summary>
                    <div className="mt-3 border-t border-[var(--brand-slate)]/10 pt-3">
                      <RichBody
                        raw={item.answer.raw}
                        preview={richTextPreview(
                          previewEntryId,
                          "answer",
                          itemCh,
                        )}
                      />
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}
