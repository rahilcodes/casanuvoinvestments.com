"use client";

import { useId, useState } from "react";

/** Monthly repayment estimate in GYD (standard amortization). */
export function MortgageCalculator({ price }: { price: number }) {
  const id = useId();
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(25);

  const loan = price * (1 - down / 100);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
  const fmt = (v: number) => `GYD $${Math.round(v).toLocaleString("en-US")}`;

  return (
    <div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[22px] bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-3">
        <Stat label="Monthly payment" value={fmt(monthly)} big />
        <Stat label="Loan amount" value={fmt(loan)} />
        <Stat label="Down payment" value={fmt(price - loan)} />
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Slider id={`${id}-d`} label="Down payment" value={down} min={5} max={60} step={1} unit="%" onChange={setDown} />
        <Slider id={`${id}-r`} label="Interest rate" value={rate} min={3} max={15} step={0.25} unit="%" onChange={setRate} />
        <Slider id={`${id}-y`} label="Term" value={years} min={5} max={30} step={1} unit=" yrs" onChange={setYears} />
      </div>
      <p className="mt-6 text-[13.5px] leading-relaxed text-stone">
        Estimate only, excluding taxes and insurance. Casa Nuvo works with trusted financial partners — ask us for a tailored quote.
      </p>
    </div>
  );
}

function Stat({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className={`p-6 ${big ? "bg-ink text-paper" : "bg-white"}`}>
      <p className={`text-[13.5px] ${big ? "font-semibold text-gold" : "text-stone"}`}>{label}</p>
      <p className={`mt-2 leading-none font-semibold tracking-[-0.03em] ${big ? "text-[1.6rem]" : "text-[1.3rem]"}`} aria-live={big ? "polite" : undefined}>
        {value}
      </p>
    </div>
  );
}

function Slider({ id, label, value, min, max, step, unit, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <span className="text-[15px] font-semibold text-ink">
          {value}
          {unit}
        </span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-3 h-11 w-full cursor-pointer accent-[#8a6829]" />
    </div>
  );
}
