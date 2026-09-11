"use client";

import { forwardRef } from "react";
import { CertificateUserData } from "@/components/CertificateModal";
import { formatDate } from "@/lib/utils";

// ─── Shared Types ────────────────────────────────────────────────────────────
export interface CertProps {
  userData: CertificateUserData;
  score: number;
  totalQuestions: number;
  percentage: number;
  level: string;
  serial: string;
  subjectName: string;
  subjectNameFull: string;
}

// ─── Uzbekistan State Emblem SVG ─────────────────────────────────────────────
export function UzbekEmblem({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#1A6B3C" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="43" fill="#F0F7F0" stroke="#1A6B3C" strokeWidth="1" />

      {/* Star / sun rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 50 + 35 * Math.sin(angle);
        const y1 = 50 - 35 * Math.cos(angle);
        const x2 = 50 + 42 * Math.sin(angle);
        const y2 = 50 - 42 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#1A6B3C"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Central shield background */}
      <ellipse cx="50" cy="52" rx="22" ry="26" fill="#1A6B3C" />
      <ellipse cx="50" cy="52" rx="19" ry="23" fill="#0B4F2A" />

      {/* Crescent and star */}
      <path
        d="M50 32 A10 10 0 0 1 60 42 A8 8 0 0 0 50 34 A10 10 0 0 1 50 32Z"
        fill="#F5E642"
      />
      <polygon
        points="54,37 55.5,41.5 60,41.5 56.5,44.5 58,49 54,46 50,49 51.5,44.5 48,41.5 52.5,41.5"
        fill="#F5E642"
        transform="scale(0.55) translate(47, 26)"
      />

      {/* Cotton bolls bottom */}
      <circle cx="35" cy="68" r="5" fill="#F5E642" opacity="0.9" />
      <circle cx="50" cy="72" r="5" fill="#F5E642" opacity="0.9" />
      <circle cx="65" cy="68" r="5" fill="#F5E642" opacity="0.9" />

      {/* Wheat stalks */}
      <line x1="38" y1="62" x2="35" y2="73" stroke="#F5E642" strokeWidth="1" />
      <line x1="62" y1="62" x2="65" y2="73" stroke="#F5E642" strokeWidth="1" />

      {/* Ribbon at bottom */}
      <path
        d="M30 80 Q50 86 70 80 Q50 88 30 80Z"
        fill="#1A6B3C"
        stroke="#F5E642"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// ─── Border Pattern Component ─────────────────────────────────────────────────
export function OfficialBorder({
  accentColor = "#1A6B3C",
  secondaryColor = "#F5E642",
}: {
  accentColor?: string;
  secondaryColor?: string;
}) {
  return (
    <>
      {/* Outer border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `6px solid ${accentColor}`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {/* Inner gold border */}
      <div
        style={{
          position: "absolute",
          inset: "9px",
          border: `2px solid ${secondaryColor}`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {/* Second inner border */}
      <div
        style={{
          position: "absolute",
          inset: "13px",
          border: `0.5px solid ${accentColor}`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Corner ornaments — top left */}
      <svg
        style={{ position: "absolute", top: "6px", left: "6px", zIndex: 3 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path d="M0 0 L40 0 L0 40 Z" fill={accentColor} opacity="0.15" />
        <path d="M2 2 L30 2 L2 30 Z" fill="none" stroke={secondaryColor} strokeWidth="1" />
        <circle cx="6" cy="6" r="3" fill={accentColor} />
      </svg>

      {/* Corner ornament — top right */}
      <svg
        style={{ position: "absolute", top: "6px", right: "6px", zIndex: 3 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path d="M40 0 L0 0 L40 40 Z" fill={accentColor} opacity="0.15" />
        <path d="M38 2 L10 2 L38 30 Z" fill="none" stroke={secondaryColor} strokeWidth="1" />
        <circle cx="34" cy="6" r="3" fill={accentColor} />
      </svg>

      {/* Corner ornament — bottom left */}
      <svg
        style={{ position: "absolute", bottom: "6px", left: "6px", zIndex: 3 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path d="M0 40 L40 40 L0 0 Z" fill={accentColor} opacity="0.15" />
        <path d="M2 38 L30 38 L2 10 Z" fill="none" stroke={secondaryColor} strokeWidth="1" />
        <circle cx="6" cy="34" r="3" fill={accentColor} />
      </svg>

      {/* Corner ornament — bottom right */}
      <svg
        style={{ position: "absolute", bottom: "6px", right: "6px", zIndex: 3 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path d="M40 40 L0 40 L40 0 Z" fill={accentColor} opacity="0.15" />
        <path d="M38 38 L10 38 L38 10 Z" fill="none" stroke={secondaryColor} strokeWidth="1" />
        <circle cx="34" cy="34" r="3" fill={accentColor} />
      </svg>
    </>
  );
}

// ─── QR Code Placeholder ──────────────────────────────────────────────────────
export function QRCodePlaceholder({ size = 60, serial }: { size?: number; serial: string }) {
  const cells = 7;
  const cellSize = size / cells;
  const pattern = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: "grid",
          gridTemplateColumns: `repeat(${cells}, ${cellSize}px)`,
          border: "1px solid #ccc",
          padding: "2px",
          background: "white",
        }}
      >
        {pattern.flat().map((v, i) => (
          <div
            key={i}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              background: v ? "#1A1A1A" : "white",
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: "6px", color: "#666", fontFamily: "monospace", textAlign: "center" }}>
        {serial.slice(-8)}
      </div>
    </div>
  );
}

// ─── Director Signature Block ──────────────────────────────────────────────────
export function SignatureBlock({ color = "#1A6B3C" }: { color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
      {/* Fake signature SVG */}
      <svg width="90" height="28" viewBox="0 0 90 28">
        <path
          d="M5 22 C15 10, 25 8, 35 15 C45 22, 50 6, 60 12 C70 18, 75 8, 85 14"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <div style={{ width: "90px", height: "1px", background: color }} />
      <div style={{ fontSize: "8px", color: "#333", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        Direktor
      </div>
    </div>
  );
}

// ─── Seal / Muhr Placeholder ──────────────────────────────────────────────────
export function OfficialSeal({ color = "#1A6B3C", size = 60 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" opacity={0.35}>
      <circle cx="40" cy="40" r="38" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="40" cy="40" r="26" fill="none" stroke={color} strokeWidth="0.5" />

      {/* Gear-like notches */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 40 + 34 * Math.sin(angle);
        const y1 = 40 - 34 * Math.cos(angle);
        const x2 = 40 + 38 * Math.sin(angle);
        const y2 = 40 - 38 * Math.cos(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" />;
      })}

      <text
        x="40"
        y="37"
        textAnchor="middle"
        fontSize="5"
        fill={color}
        fontFamily="Arial"
        fontWeight="bold"
      >
        BAHOLASH
      </text>
      <text x="40" y="44" textAnchor="middle" fontSize="5" fill={color} fontFamily="Arial">
        AGENTLIGI
      </text>
      <text x="40" y="51" textAnchor="middle" fontSize="4.5" fill={color} fontFamily="Arial">
        O'ZBEKISTON
      </text>
    </svg>
  );
}

// ─── NAMUNA Watermark ─────────────────────────────────────────────────────────
export function NamunaWatermark() {
  return (
    <>
      {/* Diagonal large watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 50,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: "rotate(-32deg)",
            fontSize: "68px",
            fontWeight: "900",
            color: "rgba(220, 38, 38, 0.07)",
            fontFamily: "Arial Black, Arial, sans-serif",
            letterSpacing: "8px",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          NAMUNA
        </div>
      </div>

      {/* Bottom red banner */}
      <div
        style={{
          position: "absolute",
          bottom: "18px",
          left: "18px",
          right: "18px",
          background: "rgba(220, 38, 38, 0.08)",
          border: "1px solid rgba(220, 38, 38, 0.35)",
          borderRadius: "2px",
          padding: "3px 10px",
          textAlign: "center",
          zIndex: 51,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "7.5px",
            fontWeight: "700",
            color: "#B91C1C",
            letterSpacing: "2px",
            fontFamily: "Arial, sans-serif",
            textTransform: "uppercase",
          }}
        >
          ⚠ NAMUNA / NORASMIY TEST NATIJASI — TEST PURPOSE ONLY ⚠
        </span>
      </div>
    </>
  );
}

// ─── Agency Header ────────────────────────────────────────────────────────────
export function AgencyHeader({ accentColor = "#1A6B3C" }: { accentColor?: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "8px" }}>
      <div
        style={{
          fontSize: "7px",
          fontWeight: "700",
          color: accentColor,
          letterSpacing: "0.5px",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.5",
          textTransform: "uppercase",
        }}
      >
        O'ZBEKISTON RESPUBLIKASI OLIY TA'LIM, FAN VA INNOVATSIYALAR VAZIRLIGI HUZURIDAGI
      </div>
      <div
        style={{
          fontSize: "7px",
          fontWeight: "700",
          color: accentColor,
          letterSpacing: "0.5px",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.5",
          textTransform: "uppercase",
        }}
      >
        BILIM VA MALAKALARNI BAHOLASH AGENTLIGI
      </div>
    </div>
  );
}
