"use client";

import { DEFAULT_HYGRAPH_ENDPOINT, DEFAULT_HYGRAPH_STUDIO_URL } from "@/lib/constants";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const HygraphPreviewNextjs = dynamic(
  () =>
    import("@hygraph/preview-sdk/react").then((m) => m.HygraphPreviewNextjs),
  { ssr: false },
);

type Props = { children: React.ReactNode };

/**
 * Hygraph Preview SDK — iframe live preview, save refresh, and click-to-edit overlays.
 * Requires NEXT_PUBLIC_HYGRAPH_STUDIO_URL (no trailing slash).
 */
export function PreviewWrapper({ children }: Props) {
  const router = useRouter();
  const endpoint =
    process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? DEFAULT_HYGRAPH_ENDPOINT;
  const studioUrl =
    process.env.NEXT_PUBLIC_HYGRAPH_STUDIO_URL ??
    process.env.NEXT_PUBLIC_HYGRAPH_APP_URL ??
    DEFAULT_HYGRAPH_STUDIO_URL;

  return (
    <HygraphPreviewNextjs
      endpoint={endpoint}
      studioUrl={studioUrl.replace(/\/$/, "")}
      refresh={() => router.refresh()}
      sync={{ fieldFocus: true, fieldUpdate: true }}
      overlay={{
        style: {
          borderColor: "var(--brand-lime, #b8d433)",
          borderWidth: "2px",
        },
        button: {
          backgroundColor: "var(--brand-lime, #b8d433)",
          color: "var(--brand-ink, #1a2332)",
        },
      }}
    >
      {children}
    </HygraphPreviewNextjs>
  );
}
