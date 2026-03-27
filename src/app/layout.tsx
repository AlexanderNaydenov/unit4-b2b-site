import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Inter } from "next/font/google";
import { PreviewWrapper } from "@/components/preview/PreviewWrapper";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Static until on-demand revalidation (`POST /api/revalidate`) or a new production deploy.
 * Draft Mode (`/api/draft`) uses DRAFT stage for Hygraph Live Preview.
 */
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const settings = await getSiteSettings();
  const title = settings?.siteName ?? "Unit4";
  const og = settings?.defaultOgImage?.url;
  const base: Metadata = {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description:
      "Enterprise software for people-centric organizations — ERP, FP&A, HCM, and more.",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    openGraph: og ? { images: [og] } : undefined,
  };
  if (isEnabled) {
    return { ...base, robots: { index: false, follow: false } };
  }
  return base;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "Unit4";
  const logoUrl = settings?.logo?.url ?? "/unit4-logo.png";
  const settingsId = settings?.id;

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        <PreviewWrapper>
          <SiteHeader
            siteName={siteName}
            logoUrl={logoUrl}
            headerCtaLabel={settings?.headerCtaLabel ?? undefined}
            headerCtaUrl={settings?.headerCtaUrl ?? undefined}
            settingsEntryId={settingsId}
          />
          <main className="flex-1">{children}</main>
          <SiteFooter
            siteName={siteName}
            footerTagline={settings?.footerTagline}
            settingsEntryId={settingsId}
          />
        </PreviewWrapper>
      </body>
    </html>
  );
}
