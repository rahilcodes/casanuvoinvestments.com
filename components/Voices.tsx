import { Reveal } from "@/components/Reveal";

interface Voice {
  quote: string;
  name: string;
  role: string;
}

/**
 * Client testimonials: the first is featured large on ink, the next two stack
 * beside it, and any further quotes continue as cards below.
 */
export function Voices({ items }: { items: readonly Voice[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
      {items.map((v, i) => {
        const lead = i === 0;
        return (
          <Reveal as="li" key={v.name} delay={(i % 3) * 90} className={lead ? "lg:col-span-2 lg:row-span-2" : ""}>
            <figure
              className={`flex h-full flex-col rounded-[22px] p-7 sm:p-9 ${lead ? "bg-ink text-paper lg:p-12" : "bg-white text-ink ring-1 ring-ink/6"}`}
            >
              <span aria-hidden="true" className={`font-serif leading-[0.6] text-gold ${lead ? "text-[6rem]" : "text-[4rem]"}`}>
                &ldquo;
              </span>
              <blockquote
                className={`mt-5 flex-1 ${lead ? "flex items-center text-[clamp(1.4rem,2.3vw,2.05rem)] leading-[1.35] font-medium tracking-[-0.025em]" : "text-[16.5px] leading-[1.65] text-ink/85"}`}
              >
                {v.quote}
              </blockquote>
              <figcaption className={`mt-8 flex items-center gap-3.5 border-t pt-6 ${lead ? "border-white/12" : "border-ink/8"}`}>
                <span
                  aria-hidden="true"
                  className={`grid h-11 w-11 place-items-center rounded-full text-[14px] font-semibold ${lead ? "bg-gold text-ink" : "bg-gold-pale text-gold-deep"}`}
                >
                  {initials(v.name)}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{v.name}</span>
                  <span className={`block text-[13.5px] ${lead ? "text-paper/60" : "text-stone"}`}>{v.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        );
      })}
    </ul>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase();
}
