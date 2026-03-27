import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getSiteSettings } from "@/lib/data";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Static until the next production build. Use Hygraph → Vercel Deploy Hook for instant updates after publish. */
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.siteName ?? "Unit4";
  const og = settings?.defaultOgImage?.url;
  return {
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "Unit4";
  const logoUrl = settings?.logo?.url ?? "/unit4-logo.png";

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        <SiteHeader
          siteName={siteName}
          logoUrl={logoUrl}
          headerCtaLabel={settings?.headerCtaLabel ?? undefined}
          headerCtaUrl={settings?.headerCtaUrl ?? undefined}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter siteName={siteName} footerTagline={settings?.footerTagline} />
      </body>
    </html>
  );
}
