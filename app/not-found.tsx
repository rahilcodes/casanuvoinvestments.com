import Link from "next/link";
import { CtaLink } from "@/components/CtaLink";
import { Emblem } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper">
      <Emblem className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />
      <div className="wrap py-40 text-center">
        <p className="kicker-light">Error 404</p>
        <h1 className="display mt-6 text-[clamp(2.8rem,7vw,6rem)]">
          This address is <em className="text-gold-bright">off-market.</em>
        </h1>
        <p className="mx-auto mt-8 max-w-md text-[16.5px] leading-relaxed text-paper/60">
          The page you’re looking for has moved or no longer exists. Let’s get you somewhere better.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CtaLink href="/commercial" tone="dark">
            Commercial property
          </CtaLink>
          <Link href="/properties" className="pill-glass">
            Residential listings
          </Link>
          <Link href="/" className="pill-glass">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
