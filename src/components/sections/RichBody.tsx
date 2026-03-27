import { RichText } from "@graphcms/rich-text-react-renderer";
import type { RichTextContent } from "@graphcms/rich-text-types";
import type { RichTextPreviewAttrs } from "@/lib/preview-attrs";

const renderers = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-4 text-base leading-relaxed text-[var(--brand-muted)] last:mb-0">
      {children}
    </p>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight text-[var(--brand-ink)] first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-2 mt-6 text-xl font-semibold text-[var(--brand-ink)]">
      {children}
    </h3>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-[var(--brand-muted)]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-[var(--brand-muted)]">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a
      href={href}
      className="font-medium text-[var(--brand-lime)] underline decoration-[var(--brand-lime)]/40 underline-offset-2 hover:decoration-[var(--brand-lime)]"
    >
      {children}
    </a>
  ),
  bold: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-[var(--brand-ink)]">{children}</strong>
  ),
};

function isRichTextEmpty(raw: RichTextContent | undefined | null) {
  if (!raw) return true;
  if (Array.isArray(raw)) return raw.length === 0;
  return !raw.children?.length;
}

export function RichBody({
  raw,
  className = "",
  preview,
}: {
  raw: RichTextContent | undefined | null;
  className?: string;
  /** Hygraph click-to-edit attributes for rich text `body` fields */
  preview?: RichTextPreviewAttrs;
}) {
  if (isRichTextEmpty(raw)) return null;
  const content = raw as RichTextContent;
  return (
    <div className={`prose-brand max-w-none ${className}`} {...(preview ?? {})}>
      <RichText content={content} renderers={renderers} />
    </div>
  );
}
