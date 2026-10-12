import Image from "next/image";
import { Emblem } from "@/components/Logo";

/**
 * Listing photo, or a branded panel for listings whose photos are shared on
 * request (the six late-2025 rentals had no preserved photography). The
 * panel's message is centred in the space above a card's price label.
 */
export function PropertyImage({
  src,
  alt,
  sizes,
  priority,
  className = "",
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} preload={priority} className={`object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={`${alt} — photos available on request`}
      className="absolute inset-0 overflow-hidden bg-[linear-gradient(150deg,#2b2721_0%,#1e1b17_55%,#151310_100%)]"
    >
      {/* Fine diagonal texture and a soft gold glow, so the panel reads as designed rather than empty. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #dfc187 0 1px, transparent 1px 14px)" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_38%,rgba(198,161,91,0.22),transparent_70%)]" />
      <Emblem className="absolute -right-12 -bottom-14 h-56 w-56 opacity-[0.08]" />

      {/* Padding keeps the message clear of the price label at the card's foot. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ paddingBottom: "3.75rem" }}>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-black/25 ring-1 ring-gold/40">
          <Emblem className="h-9 w-9" />
        </span>
        <span className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-paper">Photos on request</span>
        <span className="mt-1 text-[13px] text-paper/60">Message us for the full set</span>
      </div>
    </div>
  );
}
