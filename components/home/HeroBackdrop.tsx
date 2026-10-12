"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_SLIDES } from "@/lib/site";

/** Commercial-first hero photography; sources and licence are noted beside HERO_SLIDES in lib/site.ts. */
const SLIDES = HERO_SLIDES;

const HOLD = 7000;

/**
 * Cinematic hero backdrop: photos cross-fade every few seconds, each drifting
 * in a slow push-in while it holds. A cross-fade is not the kind of motion
 * "reduce motion" guards against, so slides still advance for those visitors;
 * only the push-in is dropped. A pause button stops it for anyone (WCAG 2.2.2),
 * and it also rests while the tab is hidden.
 */
export function HeroBackdrop() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const advancing = visible && !paused;
  const drifting = advancing && !reduced;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setVisible(document.visibilityState === "visible");
      setReduced(mq.matches);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    mq.addEventListener("change", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!advancing) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), HOLD);
    return () => clearTimeout(t);
  }, [active, advancing]);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden bg-ink">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={`hero-fade absolute inset-0 transition-opacity duration-[2200ms] ease-in-out ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              // Re-keying the active slide restarts its push-in from the start.
              key={i === active ? `${s.src}-on` : s.src}
              src={s.src}
              alt=""
              fill
              sizes="100vw"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              className={`object-cover ${s.position} ${i === active && drifting ? "animate-[hero-drift_9.5s_linear_both]" : ""}`}
            />
          </div>
        ))}
      </div>

      {/* Slide position and pause: slim bars that fill while each photo holds (bars from laptop width up). */}
      <div
        className="absolute top-[100px] right-4 z-10 flex items-center gap-2 sm:right-8 lg:top-auto lg:right-[max(3rem,calc((100vw-1400px)/2+3rem))] lg:bottom-10"
        role="group"
        aria-label="Background photos"
      >
        <div className="hidden gap-2 lg:flex">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1} of ${SLIDES.length}`}
              aria-current={i === active}
              className="group relative h-6 w-10 cursor-pointer"
            >
              <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/25 transition-colors group-hover:bg-white/45" />
              <span
                key={i === active ? `bar-${active}` : `bar-${i}`}
                className={`absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 rounded-full bg-gold-bright ${i === active ? "" : "scale-x-0"}`}
                style={i === active && advancing && !reduced ? { animation: `hero-progress ${HOLD}ms linear forwards` } : undefined}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-label={paused ? "Play background photos" : "Pause background photos"}
          aria-pressed={paused}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-black/30 text-paper ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-black/50"
        >
          {paused ? (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
