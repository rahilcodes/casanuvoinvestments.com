import Link from "next/link";
import { Icon } from "@/components/Icon";

/** Pill call to action with a trailing arrow: dark on light grounds, gold on dark grounds. */
export function CtaLink({
  href,
  children,
  tone = "light",
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  external?: boolean;
  className?: string;
}) {
  const cls = `group ${tone === "dark" ? "pill-gold" : "pill-dark"} ${className}`;
  const inner = (
    <>
      {children}
      <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
