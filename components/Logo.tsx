import { useId } from "react";

/** Vector redraw of the Casa Nuvo emblem: a gold ring around a rising skyline. */
export function Emblem({ className = "h-10 w-10" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1e3c4" />
          <stop offset="0.45" stopColor="#c6a15b" />
          <stop offset="1" stopColor="#8a6829" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#g${id})`}>
        <circle cx="50" cy="50" r="46" strokeWidth="2.2" />
        <path d="M24 66c6 9 15 13 26 13s20-4 26-13" strokeWidth="3.4" strokeLinecap="round" />
      </g>
      <g fill={`url(#g${id})`}>
        <rect x="33" y="44" width="6" height="24" rx="1" />
        <rect x="41.5" y="32" width="6" height="36" rx="1" />
        <path d="M50 68V24l6.5-4v48z" />
        <rect x="59" y="38" width="6" height="30" rx="1" />
      </g>
    </svg>
  );
}

/** Emblem + wordmark lockup. `tone` sets the wordmark color for light or dark grounds. */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Emblem className="h-11 w-11 flex-none" />
      {/* "CASA NUVO" sets the width; INVESTMENTS' letters are spread to span it exactly. */}
      <span role="img" className="flex flex-col leading-none" aria-label="Casa Nuvo Investments">
        {/* The negative margin trims the tracking after the final O so both lines end flush. */}
        <span aria-hidden="true" className={`-mr-[0.2em] text-[17px] font-bold tracking-[0.2em] ${tone === "light" ? "text-paper" : "text-ink"}`}>
          CASA NUVO
        </span>
        <span aria-hidden="true" className={`mt-1.5 flex justify-between text-[10px] font-bold ${tone === "light" ? "text-gold" : "text-gold-deep"}`}>
          {"INVESTMENTS".split("").map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </span>
      </span>
    </span>
  );
}
