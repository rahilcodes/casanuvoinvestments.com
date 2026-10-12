"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { Emblem } from "@/components/Logo";
import { SITE } from "@/lib/site";

/** Editorial gallery (hero + up to 2 side frames) with a full-screen lightbox. */
export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const n = images.length;

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => {
    dialog.current?.close();
    setIndex(null);
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  if (n === 0) {
    return (
      <div className="relative overflow-hidden rounded-[28px] bg-ink-3 text-paper">
        <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_85%_0%,rgba(198,161,91,0.25),transparent_60%)]" />
        <Emblem className="absolute -right-16 -bottom-24 h-96 w-96 opacity-[0.1]" />
        <div className="relative flex flex-col items-start gap-6 px-8 py-14 sm:px-14 sm:py-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[13.5px] font-semibold text-gold">Private viewing</p>
            <p className="mt-3 text-[clamp(1.75rem,3.5vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.035em]">Photography available on request.</p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-paper/65">
              This residence is newly listed. Message us and we’ll send the full photo set and arrange a viewing at your convenience.
            </p>
          </div>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent(`Hello Casa Nuvo, please send me photos of ${title}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex-none"
          >
            <Icon name="whatsapp" className="h-4 w-4" /> Request photos
          </a>
        </div>
      </div>
    );
  }

  const side = images.slice(1, 3);
  return (
    <>
      <div className={`grid gap-3 ${side.length ? "lg:grid-cols-[2fr_1fr]" : ""}`}>
        <button type="button" onClick={() => open(0)} className="group relative block aspect-[16/10] cursor-zoom-in overflow-hidden rounded-[22px] bg-ink-3 lg:aspect-auto lg:min-h-[560px]" aria-label={`Open photo 1 of ${n}`}>
          <Image src={images[0]} alt={`${title} — photo 1`} fill preload sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.03]" />
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[14px] font-semibold text-ink shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
            <Icon name="expand" className="h-4 w-4 text-gold-deep" /> {n > 1 ? `View all ${n} photos` : "Full screen"}
          </span>
        </button>
        {side.length > 0 && (
          <div className="hidden grid-rows-2 gap-3 lg:grid">
            {side.map((src, i) => (
              <button key={src} type="button" onClick={() => open(i + 1)} className="group relative cursor-zoom-in overflow-hidden rounded-[22px] bg-ink-3" aria-label={`Open photo ${i + 2} of ${n}`}>
                <Image src={src} alt="" fill sizes="33vw" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.05]" />
                {i === 1 && n > 3 && (
                  <span className="absolute inset-0 grid place-items-center bg-ink/55 text-[1.75rem] font-semibold text-paper">+{n - 3} photos</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialog.current && close()}
        aria-label={`${title} photos`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/97 p-0 text-paper backdrop:bg-ink/90"
      >
        {index !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="text-[15.5px] font-semibold">
                {title} <span className="ml-3 text-paper/50">{index + 1} / {n}</span>
              </p>
              <button type="button" onClick={close} aria-label="Close gallery" className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/20 hover:border-gold hover:text-gold">
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex-1">
              <Image key={images[index]} src={images[index]} alt={`${title} — photo ${index + 1}`} fill sizes="100vw" className="animate-fade-up object-contain" />
              {n > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute top-1/2 left-4 grid h-14 w-14 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-ink/60 hover:bg-gold hover:text-ink">
                    <Icon name="arrow-left" className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute top-1/2 right-4 grid h-14 w-14 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-ink/60 hover:bg-gold hover:text-ink">
                    <Icon name="arrow" className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {n > 1 && (
              <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-5 py-4">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index}
                    className={`relative h-16 w-24 flex-none cursor-pointer overflow-hidden rounded-lg border-2 transition-opacity ${i === index ? "border-gold" : "border-transparent opacity-50 hover:opacity-100"}`}
                  >
                    <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
