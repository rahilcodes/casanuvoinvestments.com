import { Reveal } from "@/components/Reveal";
import { PROPERTIES } from "@/lib/properties";
import { STATS } from "@/lib/site";

/**
 * Four verifiable facts in a row. Values come from lib/site.ts (sales and
 * clients, from the original site) and the live listing data.
 */
export function ProofStrip({ className = "" }: { className?: string }) {
  const sold = STATS.find((s) => s.suffix === "B+");
  const clients = STATS.find((s) => s.label === "Clients served");
  const facts = [
    { value: sold ? `${sold.unit} ${sold.count}${sold.suffix}` : null, label: "in property sold" },
    { value: clients ? `${clients.count}${clients.suffix}` : null, label: "clients served" },
    { value: String(PROPERTIES.length), label: "listings available now" },
    { value: "US & GY", label: "local numbers in both countries" },
  ].filter((f): f is { value: string; label: string } => Boolean(f.value));

  return (
    <dl className={`wrap grid grid-cols-2 lg:grid-cols-4 ${className}`}>
      {facts.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 70}
          className={`flex flex-col-reverse gap-1.5 py-8 lg:py-11 ${i % 2 ? "border-l border-ink/10 pl-5 sm:pl-8" : ""} ${i >= 2 ? "border-t border-ink/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
        >
          <dt className="text-[14px] text-stone">{s.label}</dt>
          <dd className="text-[clamp(1.9rem,3vw,2.75rem)] leading-none font-semibold tracking-[-0.04em] text-ink">{s.value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
