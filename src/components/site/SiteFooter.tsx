import Link from "next/link";
import { previewField } from "@/lib/preview-attrs";

const cols = [
  {
    title: "Explore",
    links: [
      { href: "/solutions", label: "Solutions" },
      { href: "/why-unit4", label: "Why Unit4" },
      { href: "/products", label: "Products" },
      { href: "/industries", label: "Industries" },
    ],
  },
  {
    title: "Audience",
    links: [
      { href: "/roles", label: "Roles" },
      { href: "/resources", label: "Resources" },
      { href: "/customers", label: "Customer stories" },
    ],
  },
];

export function SiteFooter({
  siteName,
  footerTagline,
  settingsEntryId,
}: {
  siteName: string;
  footerTagline?: string | null;
  settingsEntryId?: string;
}) {
  const tagAttrs = settingsEntryId
    ? previewField(settingsEntryId, "footerTagline")
    : {};

  return (
    <footer className="mt-auto border-t border-white/10 bg-[var(--brand-ink)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="md:col-span-1">
          <p className="text-lg font-semibold">{siteName}</p>
          {footerTagline ? (
            <p
              className="mt-3 max-w-sm text-sm leading-relaxed text-white/70"
              {...tagAttrs}
            >
              {footerTagline}
            </p>
          ) : null}
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-lime)]">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. Demo site powered by Next.js & Hygraph.
          </p>
          <p className="text-white/40">
            Inspired by enterprise software for people-centric organizations.
          </p>
        </div>
      </div>
    </footer>
  );
}
