import Link from "next/link";

type Variant = "PRIMARY" | "SECONDARY" | "GHOST";

const base =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function variantClass(v: Variant, surface: "light" | "dark"): string {
  if (v === "PRIMARY") {
    return "bg-[var(--brand-lime)] text-[var(--brand-ink)] hover:brightness-95 focus-visible:outline-[var(--brand-lime)]";
  }
  if (v === "SECONDARY") {
    if (surface === "dark") {
      return "border border-white/30 bg-white/10 text-white hover:bg-white/15 focus-visible:outline-white";
    }
    return "border border-[var(--brand-slate)]/40 bg-white text-[var(--brand-ink)] hover:bg-[var(--brand-slate)]/5 focus-visible:outline-[var(--brand-slate)]";
  }
  return "border border-[var(--brand-slate)]/30 bg-transparent text-[var(--brand-ink)] hover:bg-[var(--brand-slate)]/5 focus-visible:outline-[var(--brand-slate)]";
}

export function CtaButton({
  label,
  url,
  variant = "PRIMARY",
  surface = "light",
  className = "",
}: {
  label: string;
  url: string;
  variant?: Variant;
  /** Hero and dark banners use `dark` for contrast */
  surface?: "light" | "dark";
  className?: string;
}) {
  const v = variant in { PRIMARY: 1, SECONDARY: 1, GHOST: 1 } ? variant : "PRIMARY";
  const isExternal = /^https?:\/\//i.test(url);
  const cls = `${base} ${variantClass(v, surface)} ${className}`;
  if (isExternal) {
    return (
      <a
        href={url}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={url} className={cls}>
      {label}
    </Link>
  );
}
