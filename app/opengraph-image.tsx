import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(120% 90% at 85% 0%, #2a2620 0%, #0e0d0b 60%)",
          color: "#faf7f1",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#c6a15b" strokeWidth="2.4" />
          <path d="M24 66c6 9 15 13 26 13s20-4 26-13" fill="none" stroke="#c6a15b" strokeWidth="3.6" strokeLinecap="round" />
          <rect x="33" y="44" width="6" height="24" fill="#c6a15b" />
          <rect x="41.5" y="32" width="6" height="36" fill="#c6a15b" />
          <path d="M50 68V24l6.5-4v48z" fill="#c6a15b" />
          <rect x="59" y="38" width="6" height="30" fill="#c6a15b" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 8, color: "#c6a15b", textTransform: "uppercase" }}>Commercial Real Estate · Guyana</div>
          <div style={{ fontSize: 96, marginTop: 20, letterSpacing: -2 }}>Casa Nuvo Investments</div>
          <div style={{ fontSize: 30, marginTop: 16, color: "rgba(250,247,241,0.65)" }}>Warehouses, commercial land &amp; office buildings</div>
        </div>
      </div>
    ),
    size,
  );
}
