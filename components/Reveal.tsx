"use client";

import { Fragment, useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Adds `is-in` to the element the first time it scrolls into view. */
function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

const VARIANT = { fade: "reveal", clip: "reveal-clip", none: "" } as const;

/**
 * Reveals its content once, the first time it scrolls into view.
 * - `fade`: lifts and fades in (default)
 * - `clip`: curtain wipe for imagery; the photo inside settles from a slight zoom
 * The layout's <noscript> style and the reduced-motion rules keep content visible.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "fade",
  className = "",
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: keyof typeof VARIANT;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className">) {
  const ref = useInView<HTMLElement>(variant === "clip" ? 0.05 : 0.12);
  return (
    <Tag
      {...rest}
      ref={ref}
      className={`${VARIANT[variant]} ${className}`}
      style={delay ? ({ ...rest.style, "--reveal-delay": `${delay}ms` } as React.CSSProperties) : rest.style}
    >
      {children}
    </Tag>
  );
}

/**
 * Heading whose lines rise out of a mask one after another. Lines are passed
 * explicitly so the break points are designed rather than accidental.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  immediate = false,
  ...rest
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on mount (above-the-fold headings) instead of on scroll. */
  immediate?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className">) {
  const ref = useInView<HTMLElement>(0.2);
  useEffect(() => {
    if (!immediate) return;
    const el = ref.current;
    const id = requestAnimationFrame(() => el?.classList.add("is-in"));
    return () => cancelAnimationFrame(id);
  }, [immediate, ref]);
  return (
    <Tag {...rest} ref={ref} className={`reveal-lines ${className}`} style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          <span className="line">
            <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
          </span>
          {i < lines.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
