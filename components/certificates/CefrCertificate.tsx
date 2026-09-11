"use client";

import { forwardRef } from "react";
import {
  CertProps,
  OfficialBorder,
  UzbekEmblem,
  AgencyHeader,
  QRCodePlaceholder,
  SignatureBlock,
  OfficialSeal,
  NamunaWatermark,
} from "./CertificateBase";
import { formatDate } from "@/lib/utils";

const ACCENT = "#1A5276";   // Deep blue for CEFR
const GOLD   = "#C9A84C";   // Academic gold accent

const CefrCertificate = forwardRef<HTMLDivElement, CertProps>(
  ({ userData, score, totalQuestions, percentage, level, serial }, ref) => {
    const today = new Date();
    const examDate = `${today.getFullYear()}-yil ${today.getDate()}-${
      ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"][today.getMonth()]
    }`;

    const subScores = {
      Tinglash: Math.min(100, Math.round(percentage * 0.92 + Math.random() * 8)),
      "O\u02BBqish":   Math.min(100, Math.round(percentage * 0.96 + Math.random() * 4)),
      Yozish:   Math.min(100, Math.round(percentage * 0.88 + Math.random() * 12)),
      Gapirish: Math.min(100, Math.round(percentage * 0.90 + Math.random() * 10)),
    };

    return (
      <div
        ref={ref}
        style={{
          width: "842px",
          height: "595px",
          background: "#FAF9F6",
          position: "relative",
          fontFamily: "'Times New Roman', Georgia, serif",
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Subtle diagonal watermark background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 60px,
              rgba(26,82,118,0.018) 60px,
              rgba(26,82,118,0.018) 61px
            )`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Official border */}
        <OfficialBorder accentColor={ACCENT} secondaryColor={GOLD} />

        {/* NAMUNA watermark */}
        <NamunaWatermark />

        {/* ── CONTENT ──────────────────────────────── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "20px 32px 36px",
          }}
        >
          {/* ── HEADER ROW ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "6px",
            }}
          >
            <UzbekEmblem size={72} />
            <div style={{ textAlign: "center" }}>
              <AgencyHeader accentColor={ACCENT} />
              {/* Divider */}
              <div
                style={{
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${ACCENT}, ${GOLD}, ${ACCENT}, transparent)`,
                  margin: "4px 0",
                }}
              />
              {/* Main title */}
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "900",
                  color: ACCENT,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  fontFamily: "'Times New Roman', Georgia, serif",
                }}
              >
                MILLIY SERTIFIKAT
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#555",
                  letterSpacing: "1.5px",
                  fontFamily: "Arial, sans-serif",
                  marginTop: "1px",
                }}
              >
                INGLIZ TILI (CEFR) FANIDAN
              </div>
            </div>
            <UzbekEmblem size={72} />
          </div>

          {/* Thick divider */}
          <div
            style={{
              height: "3px",
              background: `linear-gradient(90deg, ${ACCENT}, ${GOLD}, ${ACCENT})`,
              marginBottom: "12px",
              borderRadius: "2px",
            }}
          />

          {/* ── BODY ROW ── */}
          <div style={{ display: "flex", gap: "20px", flex: 1 }}>
            {/* ── LEFT: Photo ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              {/* Photo frame */}
              <div
                style={{
                  width: "96px",
                  height: "128px",
                  border: `3px solid ${ACCENT}`,
                  outline: `1px solid ${GOLD}`,
                  outlineOffset: "2px",
                  overflow: "hidden",
                  background: "#E8EEF5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {userData.photoUrl ? (
                  <img
                    src={userData.photoUrl}
                    alt="Talaba rasmi"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "#94A3B8" }}>
                    <div style={{ fontSize: "32px" }}>👤</div>
                    <div style={{ fontSize: "7px", fontFamily: "Arial" }}>3×4 foto</div>
                  </div>
                )}
              </div>
              <div
                style={{
                  fontSize: "8px",
                  color: "#666",
                  fontFamily: "Arial, sans-serif",
                  textAlign: "center",
                }}
              >
                Talabaning rasmi
              </div>

              {/* Sub-scores */}
              <div
                style={{
                  border: `1px solid ${ACCENT}30`,
                  borderRadius: "4px",
                  overflow: "hidden",
                  width: "96px",
                  marginTop: "4px",
                }}
              >
                <div
                  style={{
                    background: ACCENT,
                    color: "white",
                    fontSize: "7px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "2px",
                    letterSpacing: "0.5px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  KO'RSATKICHLAR
                </div>
                {Object.entries(subScores).map(([key, val]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 5px",
                      borderBottom: "0.5px solid #e5e7eb",
                      fontSize: "7.5px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <span style={{ color: "#374151" }}>{key}</span>
                    <span style={{ fontWeight: "700", color: ACCENT }}>{val}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CENTER: Candidate Info ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
              {/* Intro text */}
              <p
                style={{
                  fontSize: "10px",
                  color: "#444",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: "1.6",
                  marginBottom: "4px",
                }}
              >
                Ushbu sertifikat quyidagi shaxsga ingliz tilini bilish darajasini tasdiqlash maqsadida berilgan:
              </p>

              {/* Candidate rows */}
              {[
                {
                  label: "Sertifikat egasi:",
                  value: userData.fullName.toUpperCase(),
                  bold: true,
                  large: true,
                  color: "#0F172A",
                },
                { label: "Tug'ilgan sanasi:", value: userData.birthDate },
                { label: "Sinov o'tkazilgan sana:", value: examDate },
                { label: "Sertifikat seriyasi:", value: serial },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "6px",
                    borderBottom: "0.5px solid #D1D5DB",
                    paddingBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      color: "#6B7280",
                      fontFamily: "Arial, sans-serif",
                      flexShrink: 0,
                      width: "140px",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: row.large ? "13px" : "10px",
                      fontWeight: row.bold ? "800" : "600",
                      color: row.color ?? "#1F2937",
                      fontFamily: row.bold
                        ? "'Times New Roman', Georgia, serif"
                        : "Arial, sans-serif",
                      letterSpacing: row.bold ? "0.5px" : "0",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              {/* Results box */}
              <div
                style={{
                  marginTop: "6px",
                  border: `1.5px solid ${ACCENT}`,
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {/* Box header */}
                <div
                  style={{
                    background: ACCENT,
                    padding: "4px 12px",
                    color: "white",
                    fontSize: "9px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  NATIJA
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    gap: "16px",
                    background: "#F0F4F8",
                  }}
                >
                  {[
                    { label: "To'plangan ball", val: `${score} / ${totalQuestions}` },
                    { label: "O'zlashtirish", val: `${percentage}%` },
                    {
                      label: "Berilgan daraja",
                      val: level,
                      highlight: true,
                    },
                  ].map((item) => (
                    <div key={item.label} style={{ textAlign: "center", flex: 1 }}>
                      <div
                        style={{
                          fontSize: item.highlight ? "22px" : "16px",
                          fontWeight: "900",
                          color: item.highlight ? ACCENT : "#1F2937",
                          fontFamily: "'Times New Roman', Georgia, serif",
                          lineHeight: 1,
                        }}
                      >
                        {item.val}
                      </div>
                      <div
                        style={{
                          fontSize: "7.5px",
                          color: "#6B7280",
                          fontFamily: "Arial, sans-serif",
                          marginTop: "2px",
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Signatures ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                flexShrink: 0,
                paddingBottom: "8px",
              }}
            >
              <QRCodePlaceholder size={64} serial={serial} />
              <OfficialSeal color={ACCENT} size={58} />
              <SignatureBlock color={ACCENT} />
              <div
                style={{
                  fontSize: "8px",
                  color: "#9CA3AF",
                  fontFamily: "Arial, sans-serif",
                  textAlign: "center",
                  marginTop: "2px",
                }}
              >
                {formatDate(today)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CefrCertificate.displayName = "CefrCertificate";
export default CefrCertificate;
