export type IconName =
  | "bed"
  | "bath"
  | "car"
  | "area"
  | "pin"
  | "phone"
  | "mail"
  | "whatsapp"
  | "heart"
  | "arrow"
  | "arrow-left"
  | "search"
  | "close"
  | "menu"
  | "facebook"
  | "instagram"
  | "link"
  | "calendar"
  | "check"
  | "spark"
  | "compass"
  | "shield"
  | "key"
  | "expand"
  | "clock"
  | "warehouse"
  | "land"
  | "office"
  | "home"
  | "handshake"
  | "chart";

const PATHS: Record<IconName, React.ReactNode> = {
  bed: <path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9h13a2.5 2.5 0 0 1 2.5 2.5V18M3 15h18M3 18v2M21 18v2M6 9V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5V9" />,
  bath: <path d="M4 12h17v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2ZM6 12V5.5A2.5 2.5 0 0 1 10.5 4M7 20l-1 2M18 20l1 2M2.5 12h1" />,
  car: <path d="M5 16.5V11l2-5h10l2 5v5.5M3.5 11h17M5 16.5h14v2H5zM7.5 13.5h1M15.5 13.5h1" />,
  area: <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5M4 4l6 6M20 4l-6 6M20 20l-6-6M4 20l6-6" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  phone: <path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11.5 11.5 0 0 0 7.2 7.2l1.4-2.1 4.2 1.6V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1L3.5 20.5Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.2-1-1 1A4.5 4.5 0 0 1 11 11.1l1-1-1-2.2L9 8.5Z" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-left": <path d="M20 12H5M11 6l-6 6 6 6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  close: <path d="M5 5l14 14M19 5 5 19" />,
  menu: <path d="M3 7h18M3 12h18M9 17h12" />,
  facebook: <path d="M14 8.5V7c0-.8.5-1.5 1.5-1.5H17V2.5h-2.5C11.9 2.5 10.5 4 10.5 6.6v1.9H8v3h2.5v10h3.5v-10h2.6l.4-3H14Z" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </>
  ),
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  spark: <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  shield: <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3ZM9 12l2 2 4-4" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4.5" />
      <path d="m11.2 11.8 8.8-8.8M17 6l3 3M14.5 8.5l2 2" />
    </>
  ),
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  warehouse: <path d="M3 20V9l9-5 9 5v11M3 20h18M7 20v-7h10v7M7 16h10" />,
  land: <path d="M3 18l5-9 4 6 3-4 6 7H3ZM16 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />,
  office: <path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V21M15 9h3.5A1.5 1.5 0 0 1 20 10.5V21M3 21h18M8.5 7h3M8.5 11h3M8.5 15h3M10 21v-2.5" />,
  home: <path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4v-9.5Z" />,
  handshake: <path d="M2.5 11 6 7.5l3 1.5 3-1.5 3 .5 3.5-1 3 3.5M2.5 11l4.5 5 1.5-1.5M21.5 10l-5 5.5-4-3.5M9 15.5l1.5 1.5M11 13.5l2.5 2.5M12 8.5 9 11.5a1.4 1.4 0 0 0 2 2l2.5-2.5" />,
  chart: <path d="M4 4v16h16M8 16v-4M12 16V8M16 16v-6" />,
};

/** 24px line icons drawn in the current text color. */
export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.5 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {PATHS[name]}
    </svg>
  );
}
