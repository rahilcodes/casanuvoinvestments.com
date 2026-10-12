import Link from "next/link";
import { FooterCta } from "@/components/FooterCta";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { SECTORS, SITE } from "@/lib/site";

/**
 * Light footer on the same bone ground as the closing contact panel above it.
 * Phone and email live in that panel, so the footer carries navigation, the
 * office address and social links rather than repeating them.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;
  return (
    <footer className="bg-bone text-ink">
      <FooterCta />

      <div className="wrap grid grid-cols-2 gap-x-8 gap-y-12 pt-16 pb-12 md:pt-20 lg:grid-cols-12">
        <div className="col-span-2 lg:col-span-3">
          <Link href="/" aria-label={`${SITE.name} home`} className="inline-block no-underline">
            <Logo tone="dark" />
          </Link>
          <p className="mt-6 max-w-xs text-[15.5px] leading-relaxed text-ink/70">Commercial real estate brokerage in Guyana: warehouses, commercial land and office buildings, plus homes for sale and rent.</p>
          <div className="mt-7 flex gap-2">
            <Social href={SITE.social.instagram} label="Casa Nuvo on Instagram" icon="instagram" />
            <Social href={SITE.social.facebook} label="Casa Nuvo on Facebook" icon="facebook" />
            <Social href={SITE.whatsapp} label="Chat with Casa Nuvo on WhatsApp" icon="whatsapp" />
          </div>
        </div>

        <FooterCol title="Commercial" className="lg:col-span-2">
          {SECTORS.map((s) => (
            <FooterLink key={s.slug} href={`/commercial#${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
          <FooterLink href="/contact?topic=commercial">Commercial enquiry</FooterLink>
        </FooterCol>

        <FooterCol title="Residential" className="lg:col-span-2">
          <FooterLink href="/properties?status=sale">Homes for sale</FooterLink>
          <FooterLink href="/properties?status=rent">Rentals</FooterLink>
          <FooterLink href="/contact?topic=sell">Sell your home</FooterLink>
          <FooterLink href="/favorites">Favorites</FooterLink>
        </FooterCol>

        <FooterCol title="Company" className="lg:col-span-2">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/insights">Insights</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>

        <FooterCol title="Office" className="lg:col-span-3">
          <li className="text-[15px] leading-relaxed text-ink/75">
            {SITE.address.street}
            <br />
            {SITE.address.area}, {SITE.address.city}
          </li>
          <li className="pt-1">
            <a href={directions} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold-deep no-underline hover:text-ink">
              Get directions <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-3 border-t border-ink/12 py-7 text-[13.5px] text-ink/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <Link href="/terms" className="text-ink/65 no-underline hover:text-ink">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-[13.5px] font-semibold text-ink">{title}</h3>
      <ul className="mt-5 grid gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[15px] text-ink/70 no-underline transition-colors hover:text-ink">
        {children}
      </Link>
    </li>
  );
}

function Social({ href, label, icon }: { href: string; label: string; icon: "instagram" | "facebook" | "whatsapp" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className="grid h-11 w-11 place-items-center rounded-full text-ink no-underline ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper hover:ring-ink"
    >
      <Icon name={icon} className="h-[18px] w-[18px]" />
    </a>
  );
}
