"use client";

import { usePathname } from "next/navigation";
import { ContactPanel } from "@/components/ContactPanel";

/** Closing contact panel above the footer. Home and Contact end with their own. */
export function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/contact") return null;
  return (
    // Straddles the page's paper ground and the footer's bone, so the two blend without a seam.
    <div className="bg-[linear-gradient(to_bottom,var(--color-paper)_50%,transparent_50%)]">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5">
        <ContactPanel headingId="footer-cta-title" />
      </div>
    </div>
  );
}
