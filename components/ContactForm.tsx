"use client";

import { useId } from "react";
import { useLeadForm } from "@/lib/leads";
import { Icon } from "@/components/Icon";

const INTERESTS = ["Commercial", "Buying a home", "Renting", "Selling", "Investing"] as const;

/**
 * Enquiry form posted to /api/leads. The full version asks for first and last
 * name separately; `compact` (home page) asks for one name field and a shorter
 * message so the form fits beside the contact options.
 */
export function ContactForm({
  source = "contact",
  tone = "light",
  defaultMessage = "",
  defaultInterest = "Commercial",
  compact = false,
}: {
  source?: string;
  tone?: "light" | "dark";
  defaultMessage?: string;
  defaultInterest?: (typeof INTERESTS)[number];
  compact?: boolean;
}) {
  const { onSubmit, sending, sent, error, reset } = useLeadForm(source);
  const id = useId();
  const dark = tone === "dark";
  const input = dark ? "input input-dark" : "input";
  const label = `field-label ${dark ? "text-paper/70" : ""}`;

  if (sent) {
    return (
      <div role="status" className={`flex flex-col items-start gap-5 py-10 ${dark ? "text-paper" : ""}`}>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink">
          <Icon name="check" className="h-6 w-6" strokeWidth={2} />
        </span>
        <h3 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Thank you — your message is with us.</h3>
        <p className={dark ? "text-paper/65" : "text-stone"}>A Casa Nuvo specialist will be in touch shortly. For anything urgent, message us on WhatsApp.</p>
        <button type="button" onClick={reset} className={dark ? "btn-ghost-light" : "btn-ghost"}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
      {compact ? (
        <div className="field sm:col-span-2">
          <label htmlFor={`${id}-name`} className={label}>
            Your name *
          </label>
          <input id={`${id}-name`} name="name" required autoComplete="name" className={input} />
        </div>
      ) : (
        <>
          <div className="field">
            <label htmlFor={`${id}-first`} className={label}>
              First name *
            </label>
            <input id={`${id}-first`} name="firstName" required autoComplete="given-name" className={input} />
          </div>
          <div className="field">
            <label htmlFor={`${id}-last`} className={label}>
              Last name *
            </label>
            <input id={`${id}-last`} name="lastName" required autoComplete="family-name" className={input} />
          </div>
        </>
      )}
      <div className="field">
        <label htmlFor={`${id}-email`} className={label}>
          Email *
        </label>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={input} />
      </div>
      <div className="field">
        <label htmlFor={`${id}-phone`} className={label}>
          Phone / WhatsApp
        </label>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={input} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={`${label} mb-2.5`}>I’m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((v) => (
            <label key={v} className="cursor-pointer">
              <input type="radio" name="interest" value={v} defaultChecked={v === defaultInterest} className="peer sr-only" />
              <span
                className={`inline-flex min-h-10 items-center rounded-full border px-4 text-[14px] font-semibold transition-colors peer-checked:border-gold peer-checked:bg-gold peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-gold ${
                  dark ? "border-white/20 text-paper/75 hover:border-gold" : "border-ink/15 bg-white text-ink/70 hover:border-ink/40"
                }`}
              >
                {v}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field sm:col-span-2">
        <label htmlFor={`${id}-msg`} className={label}>
          Message
        </label>
        <textarea
          id={`${id}-msg`}
          name="message"
          rows={compact ? 3 : 4}
          defaultValue={defaultMessage}
          className={`${input} textarea`}
          placeholder="Tell us about the property, size, location or investment you have in mind"
        />
      </div>
      <div className="flex flex-col gap-4 pt-1 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className={`flex items-center gap-2 text-[13px] ${dark ? "text-paper/55" : "text-stone"}`}>
          <Icon name="shield" className="h-4 w-4 flex-none text-gold-deep" />
          No obligation. Your details are never shared.
        </p>
        <button type="submit" disabled={sending} className="pill-gold disabled:cursor-not-allowed disabled:opacity-60">
          {sending ? "Sending…" : "Send message"}
          {!sending && <Icon name="arrow" className="h-4 w-4" />}
        </button>
      </div>
      {error && (
        <p role="alert" className="text-[14px] font-semibold text-error sm:col-span-2">
          {error}
        </p>
      )}
    </form>
  );
}
