import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/roles", label: "Roles" },
  { href: "/resources", label: "Resources" },
  { href: "/customers", label: "Customers" },
];

export function SiteHeader({
  siteName,
  logoUrl,
  headerCtaLabel,
  headerCtaUrl,
}: {
  siteName: string;
  logoUrl?: string | null;
  headerCtaLabel?: string | null;
  headerCtaUrl?: string | null;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--brand-slate)]/15 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteName}
              width={140}
              height={32}
              className="h-8 w-auto object-contain object-left"
              priority
            />
          ) : (
            <span className="text-xl font-semibold tracking-tight text-[var(--brand-ink)]">
              {siteName}
            </span>
          )}
        </Link>
        <nav
          className="-mx-1 flex max-w-[min(100vw-12rem,28rem)] items-center gap-0.5 overflow-x-auto px-1 md:max-w-none"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-2.5 py-2 text-xs font-medium text-[var(--brand-muted)] transition hover:bg-[var(--brand-surface)] hover:text-[var(--brand-ink)] sm:text-sm md:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {headerCtaLabel && headerCtaUrl ? (
            <a
              href={headerCtaUrl}
              className="hidden rounded-md bg-[var(--brand-lime)] px-4 py-2 text-sm font-semibold text-[var(--brand-ink)] transition hover:brightness-95 sm:inline-flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              {headerCtaLabel}
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
