"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { SECTORS } from "@/lib/site";

const DEALS = ["Buy", "Sell", "Lease"];

/**
 * Commercial property types as a large index on ink: hovering or focusing a
 * row brings its photo and summary into the panel beside it (laptop up).
 * Phones get each row's photo inline, since there is no hover.
 */
export function CommercialIndex() {
  const [active, setActive] = useState(0);
  const current = SECTORS[active];

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <ul className="border-t border-white/12 lg:col-span-6">
        {SECTORS.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.slug} className="border-b border-white/12">
              <Link
                href={`/commercial#${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex flex-col gap-5 py-6 text-paper no-underline sm:py-7"
              >
                <span className="relative block aspect-[16/9] overflow-hidden rounded-[18px] bg-ink-3 lg:hidden">
                  <Image src={s.image} alt="" fill sizes="100vw" className="photo object-cover" />
                </span>
                <span className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-500 ${
                      on ? "bg-gold text-ink" : "bg-gold text-ink lg:bg-transparent lg:text-gold lg:ring-1 lg:ring-white/20"
                    }`}
                  >
                    <Icon name={s.icon} className="h-[22px] w-[22px]" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[clamp(1.5rem,2.5vw,2.3rem)] leading-[1.05] font-medium tracking-[-0.035em] transition-colors duration-500 group-hover:text-paper ${
                        on ? "text-paper" : "text-paper lg:text-paper/45"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className="mt-2 block text-[13.5px] text-paper/55">{s.tags}</span>
                  </span>
                  <Icon
                    name="arrow"
                    className={`h-5 w-5 transition-all duration-500 ${on ? "translate-x-0 text-gold" : "text-paper/40 lg:-translate-x-1.5"}`}
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-6 lg:block">
        <div className="relative aspect-[6/5] overflow-hidden rounded-[28px] bg-ink-3">
          {SECTORS.map((s, i) => (
            <Image
              key={s.slug}
              src={s.image}
              alt=""
              fill
              sizes="45vw"
              className={`photo object-cover transition-opacity duration-700 ease-in-out ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 via-35% to-transparent to-75%" />
          <div className="absolute inset-x-0 bottom-0 p-8 xl:p-10" aria-live="polite">
            <p className="max-w-[42ch] text-[16px] leading-[1.6] text-paper/85">{current.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Transactions">
              {DEALS.map((d) => (
                <li key={d} className="rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-paper ring-1 ring-white/25 backdrop-blur-md">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
