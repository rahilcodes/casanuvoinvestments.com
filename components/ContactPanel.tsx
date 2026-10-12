import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

/**
 * The closing call to action every page ends on: a rounded ink panel with the
 * three ways to reach the team. The home page adds the short enquiry form;
 * elsewhere it points to the contact page.
 */
export function ContactPanel({ withForm = false, headingId = "contact-title" }: { withForm?: boolean; headingId?: string }) {
  return (
    <div className="relative isolate overflow-hidden rounded-[28px] bg-ink text-paper sm:rounded-[36px]">
      <div aria-hidden="true" className="absolute -top-48 -right-40 -z-10 h-[560px] w-[560px] rounded-full bg-gold/15 blur-[130px]" />
      <div aria-hidden="true" className="absolute -bottom-56 -left-48 -z-10 h-[460px] w-[460px] rounded-full bg-gold/8 blur-[120px]" />

      <div className="grid grid-cols-1 items-center gap-12 px-5 py-16 sm:px-10 md:py-20 lg:grid-cols-12 lg:gap-12 lg:px-16">
        <Reveal className={withForm ? "lg:col-span-5" : "lg:col-span-6"}>
          <h2 id={headingId} className="t-display text-[clamp(2.5rem,5vw,4.5rem)]">
            Let’s find your <span className="t-accent text-gold-bright">next property.</span>
          </h2>
          <p className="mt-6 max-w-md text-[16.5px] leading-[1.7] text-paper/70">
            Warehouses, land, offices or homes: buying, leasing, selling or investing in Guyana. Tell us what you need and we reply within one business day.
          </p>
          {!withForm && (
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="pill-gold">
                Book a consultation <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          )}
        </Reveal>

        <Reveal delay={120} className={withForm ? "lg:col-span-7" : "lg:col-span-5 lg:col-start-8"}>
          {withForm ? (
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-[24px] bg-paper p-6 text-ink sm:p-9">
                <h3 className="mb-6 text-[22px] font-semibold tracking-[-0.025em]">Send us a message</h3>
                <ContactForm source="home-contact" compact />
              </div>
              <ContactRows className="sm:grid-cols-3" compact />
            </div>
          ) : (
            <ContactRows />
          )}
        </Reveal>
      </div>
    </div>
  );
}

function ContactRows({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const rows: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: "whatsapp", label: "WhatsApp · Guyana", value: SITE.phoneGY, href: SITE.whatsapp, external: true },
    { icon: "phone", label: "Call · United States", value: SITE.phoneUS, href: SITE.phoneUSHref },
    { icon: "mail", label: "Email", value: compact ? "Email us" : SITE.email, href: SITE.emailHref },
  ];
  return (
    <ul className={`grid grid-cols-1 gap-3 ${className}`}>
      {rows.map((r) => (
        <li key={r.label} className="min-w-0">
          <a
            href={r.href}
            {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-3.5 rounded-[18px] bg-white/[0.06] p-3 pr-4 text-paper no-underline ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
          >
            <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-gold text-ink">
              <Icon name={r.icon} className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] text-paper/60">{r.label}</span>
              <span className="block text-[15px] leading-snug font-semibold [overflow-wrap:anywhere]">{r.value}</span>
            </span>
            {!compact && <Icon name="arrow" className="h-4 w-4 flex-none text-paper/50 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold" />}
          </a>
        </li>
      ))}
    </ul>
  );
}
