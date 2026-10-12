"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon";

/** Scroll-snap carousel with prev/next controls and a progress hairline. */
export function Carousel({
  children,
  label,
  itemClassName = "w-[85%] sm:w-[46%] lg:w-[31.5%]",
  tone = "light",
}: {
  children: ReactNode;
  label: string;
  itemClassName?: string;
  tone?: "light" | "dark";
}) {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // Mouse drag to scroll (touch already scrolls natively).
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    const el = track.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { active: true, x: e.clientX, left: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = track.current;
    const d = drag.current;
    if (!el || !d.active) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const el = track.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.style.cursor = "";
    if (drag.current.moved) {
      // Re-enable snapping from the current position so it settles smoothly.
      const left = el.scrollLeft;
      el.style.scrollSnapType = "";
      el.scrollLeft = left;
    }
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector("li");
    const step = item ? item.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const dark = tone === "dark";
  const btn = `grid h-12 w-12 cursor-pointer place-items-center rounded-full border transition-all duration-300 disabled:cursor-default disabled:opacity-30 ${
    dark ? "border-white/20 text-paper enabled:hover:border-gold enabled:hover:bg-gold enabled:hover:text-ink" : "border-ink/15 text-ink enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper"
  }`;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className="no-scrollbar cursor-grab select-none -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0">
        {Children.map(children, (child) => (
          <li className={`flex-none snap-start ${itemClassName}`}>{child}</li>
        ))}
      </ul>
      <div className="mt-10 flex items-center gap-6">
        <div className={`relative h-px flex-1 ${dark ? "bg-white/15" : "bg-line"}`}>
          <div className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-300" style={{ width: `${Math.max(12, progress * 100)}%` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => go(-1)} disabled={edges.start} aria-label="Previous">
            <Icon name="arrow-left" className="h-4 w-4" />
          </button>
          <button type="button" className={btn} onClick={() => go(1)} disabled={edges.end} aria-label="Next">
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
