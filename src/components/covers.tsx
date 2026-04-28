/**
 * Project covers — pure inline SVG compositions.
 * Each is a 4:5 portrait poster that demonstrates a discipline:
 *   01 UI/UX, 02 Brand, 03 Social, 04 Editorial, 05 Graphic, 06 Web.
 * All values are placeholders — easily edited per project.
 */

import type { ReactNode } from "react";

interface CoverProps {
  children: ReactNode;
  bg?: string;
  fg?: string;
}

function Frame({ children, bg = "#f2eee5", fg = "#0e0e0c" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      style={{ background: bg, color: fg }}
    >
      {children}
    </svg>
  );
}

/* 01 — Pulse fitness app (UI/UX) */
export function CoverPulse() {
  return (
    <Frame bg="#0e0e0c" fg="#f2eee5">
      <text
        x="24"
        y="38"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="#f2eee5"
      >
        PULSE — FITNESS APP — 2025
      </text>
      <line x1="24" y1="50" x2="376" y2="50" stroke="#f2eee5" strokeWidth="0.5" />
      {/* phone */}
      <g>
        <rect
          x="100"
          y="80"
          width="200"
          height="360"
          rx="22"
          fill="#fbf8f2"
        />
        {/* status bar */}
        <text
          x="116"
          y="106"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#0e0e0c"
        >
          9:41
        </text>
        <text
          x="284"
          y="106"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#0e0e0c"
        >
          ●●●
        </text>
        <line x1="116" y1="118" x2="284" y2="118" stroke="#0e0e0c" strokeWidth="0.4" opacity="0.4" />
        {/* title */}
        <text
          x="116"
          y="156"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="26"
          fill="#0e0e0c"
        >
          pulse.
        </text>
        {/* big stat */}
        <text
          x="116"
          y="234"
          fontFamily="Georgia, serif"
          fontSize="58"
          letterSpacing="-2"
          fill="#0e0e0c"
        >
          12,480
        </text>
        <text
          x="116"
          y="252"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#6b6660"
        >
          STEPS · TODAY
        </text>
        {/* bar chart */}
        <g fill="#0e0e0c">
          <rect x="116" y="296" width="14" height="36" />
          <rect x="138" y="280" width="14" height="52" />
          <rect x="160" y="262" width="14" height="70" />
          <rect x="182" y="288" width="14" height="44" />
          <rect x="204" y="270" width="14" height="62" />
          <rect x="226" y="252" width="14" height="80" fill="#e4572e" />
          <rect x="248" y="296" width="14" height="36" />
        </g>
        <line x1="116" y1="332" x2="284" y2="332" stroke="#0e0e0c" strokeWidth="0.5" />
        {/* button */}
        <rect x="116" y="360" width="168" height="40" rx="20" fill="#0e0e0c" />
        <text
          x="200"
          y="385"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          letterSpacing="2"
          fill="#fbf8f2"
        >
          VIEW WEEK ↗
        </text>
        {/* home indicator */}
        <rect x="170" y="420" width="60" height="3" rx="2" fill="#0e0e0c" />
      </g>
      <text
        x="24"
        y="468"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#9a948b"
      >
        iOS · ANDROID · MOBILE-FIRST
      </text>
      <text
        x="376"
        y="468"
        textAnchor="end"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#9a948b"
      >
        01 / 06
      </text>
    </Frame>
  );
}

/* 02 — Kape & Co coffee brand (Identity) */
export function CoverKape() {
  return (
    <Frame bg="#f2eee5" fg="#0e0e0c">
      <text
        x="24"
        y="38"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="#0e0e0c"
      >
        KAPE & CO — IDENTITY — 2025
      </text>
      <line x1="24" y1="50" x2="376" y2="50" stroke="#0e0e0c" strokeWidth="0.5" />
      {/* mark */}
      <g transform="translate(200 230)">
        <circle r="118" fill="none" stroke="#0e0e0c" strokeWidth="0.5" />
        <circle r="92" fill="none" stroke="#0e0e0c" strokeWidth="0.5" />
        <text
          x="0"
          y="20"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="78"
          fill="#0e0e0c"
        >
          kape.
        </text>
        <text
          x="0"
          y="44"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          letterSpacing="3"
          fill="#6b6660"
        >
          EST · MANILA · 2025
        </text>
      </g>
      {/* color swatches */}
      <g>
        <rect x="24" y="380" width="86" height="34" fill="#3b2a1d" />
        <rect x="113" y="380" width="86" height="34" fill="#a4632e" />
        <rect x="202" y="380" width="86" height="34" fill="#e4572e" />
        <rect x="291" y="380" width="85" height="34" fill="#0e0e0c" />
      </g>
      <text
        x="24"
        y="430"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#6b6660"
      >
        COCOA · CARAMEL · EMBER · INK
      </text>
      <text
        x="24"
        y="468"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#6b6660"
      >
        ROASTERY · CAFÉ · WORDMARK + SYSTEM
      </text>
      <text
        x="376"
        y="468"
        textAnchor="end"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#6b6660"
      >
        02 / 06
      </text>
    </Frame>
  );
}

/* 03 — Daily Hum social grid (Social Media) */
export function CoverDailyHum() {
  return (
    <Frame bg="#fbf8f2" fg="#0e0e0c">
      <text
        x="24"
        y="38"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="#0e0e0c"
      >
        DAILY HUM — SOCIAL — 2024
      </text>
      <line x1="24" y1="50" x2="376" y2="50" stroke="#0e0e0c" strokeWidth="0.5" />
      {/* 3x3 grid */}
      <g>
        {/* row 1 */}
        <rect x="24" y="80" width="112" height="112" fill="#0e0e0c" />
        <text x="80" y="146" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="46" fill="#fbf8f2">hum.</text>

        <rect x="144" y="80" width="112" height="112" fill="#e4572e" />
        <text x="200" y="142" textAnchor="middle" fontFamily="Georgia, serif" fontSize="62" fill="#fbf8f2">01</text>

        <rect x="264" y="80" width="112" height="112" fill="#fbf8f2" stroke="#0e0e0c" strokeWidth="0.6" />
        <text x="320" y="138" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0e0e0c">DAILY</text>
        <text x="320" y="154" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0e0e0c">VOL · I</text>

        {/* row 2 */}
        <rect x="24" y="200" width="112" height="112" fill="#fbf8f2" stroke="#0e0e0c" strokeWidth="0.6" />
        <g stroke="#0e0e0c" strokeWidth="0.5">
          <line x1="34" y1="220" x2="126" y2="220" />
          <line x1="34" y1="232" x2="126" y2="232" />
          <line x1="34" y1="244" x2="126" y2="244" />
          <line x1="34" y1="256" x2="110" y2="256" />
          <line x1="34" y1="268" x2="100" y2="268" />
          <line x1="34" y1="280" x2="120" y2="280" />
        </g>

        <rect x="144" y="200" width="112" height="112" fill="#0e0e0c" />
        <text x="200" y="262" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="36" fill="#fbf8f2">slow.</text>

        <rect x="264" y="200" width="112" height="112" fill="#2f3a2f" />
        <circle cx="320" cy="256" r="34" fill="none" stroke="#fbf8f2" strokeWidth="0.6" />
        <circle cx="320" cy="256" r="22" fill="none" stroke="#fbf8f2" strokeWidth="0.6" />
        <circle cx="320" cy="256" r="10" fill="#e4572e" />

        {/* row 3 */}
        <rect x="24" y="320" width="112" height="112" fill="#e4572e" />
        <text x="80" y="382" textAnchor="middle" fontFamily="Georgia, serif" fontSize="58" fill="#fbf8f2">02</text>

        <rect x="144" y="320" width="112" height="112" fill="#fbf8f2" stroke="#0e0e0c" strokeWidth="0.6" />
        <text x="200" y="384" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="40" fill="#0e0e0c">field</text>

        <rect x="264" y="320" width="112" height="112" fill="#0e0e0c" />
        <text x="320" y="378" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="32" fill="#fbf8f2">notes,</text>
      </g>
      <text x="24" y="468" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#6b6660">
        INSTAGRAM · 9 POSTS / WEEK
      </text>
      <text x="376" y="468" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#6b6660">
        03 / 06
      </text>
    </Frame>
  );
}

/* 04 — Atlas '26 annual report (Editorial) */
export function CoverAtlas() {
  return (
    <Frame bg="#e4572e" fg="#f2eee5">
      <text
        x="24"
        y="38"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="#f2eee5"
      >
        ATLAS — ANNUAL REPORT — 2026
      </text>
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="220"
        letterSpacing="-12"
        fill="#f2eee5"
      >
        ′26
      </text>
      <g stroke="#f2eee5" strokeWidth="0.5">
        <line x1="24" y1="80" x2="376" y2="80" />
        <line x1="24" y1="320" x2="376" y2="320" />
      </g>
      <text
        x="24"
        y="368"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="28"
        fill="#f2eee5"
      >
        figures, fragments,
      </text>
      <text
        x="24"
        y="400"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="28"
        fill="#f2eee5"
      >
        and footnotes.
      </text>
      <text
        x="24"
        y="468"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#fbe0d4"
      >
        96 PP · TWO INKS · SADDLE STITCH
      </text>
      <text
        x="376"
        y="468"
        textAnchor="end"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#fbe0d4"
      >
        04 / 06
      </text>
    </Frame>
  );
}

/* 05 — Type Forum poster (Graphic Design) */
export function CoverTypeForum() {
  return (
    <Frame bg="#f2eee5" fg="#0e0e0c">
      <text
        x="24"
        y="38"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="#0e0e0c"
      >
        TYPE FORUM — POSTER — 2024
      </text>
      <line x1="24" y1="50" x2="376" y2="50" stroke="#0e0e0c" strokeWidth="0.5" />
      <text
        x="24"
        y="170"
        fontFamily="Georgia, serif"
        fontSize="120"
        letterSpacing="-6"
        fill="#0e0e0c"
      >
        TYPE
      </text>
      <text
        x="24"
        y="270"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="120"
        letterSpacing="-6"
        fill="#e4572e"
      >
        forum
      </text>
      <text
        x="24"
        y="350"
        fontFamily="Georgia, serif"
        fontSize="64"
        letterSpacing="-2"
        fill="#0e0e0c"
      >
        ′24
      </text>
      <g stroke="#0e0e0c" strokeWidth="0.5">
        <line x1="24" y1="380" x2="376" y2="380" />
        <line x1="24" y1="408" x2="376" y2="408" />
      </g>
      <text x="24" y="400" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0e0e0c">
        MANILA · OCT 12—14 · TICKETS ↗
      </text>
      <text x="24" y="468" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#6b6660">
        OFFSET · A1 · TWO COLOURS
      </text>
      <text x="376" y="468" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#6b6660">
        05 / 06
      </text>
    </Frame>
  );
}

/* 06 — Rolio Studio website (Web / Framer) */
export function CoverRolio() {
  return (
    <Frame bg="#2f3a2f" fg="#f2eee5">
      <text
        x="24"
        y="38"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="#f2eee5"
      >
        ROLIO STUDIO — WEB — 2025
      </text>
      <line x1="24" y1="50" x2="376" y2="50" stroke="#f2eee5" strokeWidth="0.5" />
      {/* browser chrome */}
      <g>
        <rect x="36" y="100" width="328" height="320" rx="6" fill="#fbf8f2" />
        {/* traffic lights */}
        <circle cx="52" cy="116" r="4" fill="#e4572e" />
        <circle cx="64" cy="116" r="4" fill="#a4632e" />
        <circle cx="76" cy="116" r="4" fill="#2f3a2f" />
        <rect x="100" y="108" width="240" height="16" rx="3" fill="#f2eee5" />
        <text
          x="220"
          y="120"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#6b6660"
        >
          rolio.studio
        </text>
        <line x1="36" y1="134" x2="364" y2="134" stroke="#0e0e0c" strokeWidth="0.4" opacity="0.3" />
        {/* nav row */}
        <text x="52" y="158" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#0e0e0c">
          ROLIO ●
        </text>
        <text x="364" y="158" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#0e0e0c">
          INDEX  · STUDIO  · CONTACT
        </text>
        {/* hero text */}
        <text
          x="52"
          y="240"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="44"
          fill="#0e0e0c"
        >
          studio of
        </text>
        <text
          x="52"
          y="282"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="44"
          fill="#e4572e"
        >
          soft work.
        </text>
        {/* meta row */}
        <line x1="52" y1="320" x2="348" y2="320" stroke="#0e0e0c" strokeWidth="0.4" />
        <text x="52" y="340" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#6b6660">
          SELECTED ↓
        </text>
        <text x="348" y="340" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#6b6660">
          14:08 · MNL
        </text>
        {/* card hint */}
        <rect x="52" y="356" width="140" height="50" fill="#0e0e0c" />
        <rect x="200" y="356" width="148" height="50" fill="#f2eee5" stroke="#0e0e0c" strokeWidth="0.5" />
      </g>
      <text x="24" y="468" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#a9b1a4">
        FRAMER · RESPONSIVE · MOTION
      </text>
      <text x="376" y="468" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#a9b1a4">
        06 / 06
      </text>
    </Frame>
  );
}
