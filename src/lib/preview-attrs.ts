import {
  createComponentChainLink,
  createPreviewAttributes,
} from "@hygraph/preview-sdk";
import type { ComponentChainLink, ElementAttributes } from "@hygraph/preview-sdk";

export { createComponentChainLink };

export type RichTextPreviewAttrs = ElementAttributes & {
  "data-hygraph-rich-text-format"?: "html" | "markdown" | "text";
};

/** Typed wrapper for Hygraph click-to-edit `data-hygraph-*` attributes. */
export function previewField(
  entryId: string,
  fieldApiId: string,
  componentChain?: ComponentChainLink[],
) {
  return createPreviewAttributes({
    entryId,
    fieldApiId,
    componentChain,
  });
}

/** Rich text + format hint for Hygraph AST / Slate JSON fields. */
export function richTextPreview(
  entryId: string | undefined,
  fieldApiId: string,
  chain: ComponentChainLink[] | undefined,
): RichTextPreviewAttrs | undefined {
  if (!entryId || !chain) return undefined;
  return {
    ...createPreviewAttributes({
      entryId,
      fieldApiId,
      componentChain: chain,
    }),
    "data-hygraph-rich-text-format": "text",
  };
}
