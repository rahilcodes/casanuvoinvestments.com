"use client";

import { useCallback, useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { useLeadForm } from "@/lib/leads";

/** "Schedule a tour" (in person or video), as on the original property pages. */
export function TourForm({ slug, title }: { slug: string; title: string }) {
  const id = useId();
  const [tourType, setTourType] = useState<"In person" | "Video chat">("In person");
  const extra = useCallback(() => ({ property: title, propertySlug: slug }), [slug, title]);
  const { onSubmit, sending, sent, error, reset } = useLeadForm("property-tour", extra);
  const today = new Date().toISOString().slice(0, 10);

  if (sent) {
    return (
      <div role="status" className="py-6">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-ink">
          <Icon name="check" className="h-5 w-5" strokeWidth={2} />
        </span>
        <h3 className="mt-5 text-[1.5rem] leading-tight font-semibold tracking-[-0.03em]">Tour requested.</h3>
        <p className="mt-2 text-[14.5px] text-stone">We’ll confirm your viewing of {title} shortly.</p>
        <button type="button" onClick={reset} className="btn-ghost mt-6 min-h-11">
          Request another time
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div role="radiogroup" aria-label="Tour type" className="grid grid-cols-2 rounded-full bg-paper p-1 ring-1 ring-ink/10">
        {(["In person", "Video chat"] as const).map((t) => (
          <label key={t} className={`flex min-h-10 cursor-pointer items-center justify-center rounded-full text-[14px] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${tourType === t ? "bg-ink text-paper" : "text-stone hover:text-ink"}`}>
            <input type="radio" name="tourType" value={t} checked={tourType === t} onChange={() => setTourType(t)} className="sr-only" />
            {t}
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="field">
          <label htmlFor={`${id}-date`} className="field-label">
            Date *
          </label>
          <input id={`${id}-date`} name="date" type="date" min={today} required className="input" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-time`} className="field-label">
            Time
          </label>
          <select id={`${id}-time`} name="time" className="input cursor-pointer" defaultValue="Morning">
            <option>Morning</option>
            <option>Midday</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${id}-name`} className="field-label">
          Name *
        </label>
        <input id={`${id}-name`} name="name" required autoComplete="name" className="input" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={`${id}-phone`} className="field-label">
            Phone *
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" className="input" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-email`} className="field-label">
            Email *
          </label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className="input" />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${id}-msg`} className="field-label">
          Message
        </label>
        <textarea id={`${id}-msg`} name="message" rows={3} className="textarea" defaultValue={`I'm interested in ${title}.`} />
      </div>
      <button type="submit" disabled={sending} className="btn-gold w-full">
        {sending ? "Sending…" : "Request a tour"}
        {!sending && <Icon name="calendar" className="h-4 w-4" />}
      </button>
      <p className="text-center text-[13px] text-stone">By submitting you agree to our Terms of Use.</p>
      {error && (
        <p role="alert" className="text-[14px] font-semibold text-error">
          {error}
        </p>
      )}
    </form>
  );
}
