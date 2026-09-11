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

const ACCENT = "#1B2A6B";   // Deep navy-blue for IT
const GOLD   = "#C9A84C";
const CYAN   = "#0E7490";

const InformatikaCertificate = forwardRef<HTMLDivElement, CertProps>(
  ({ userData, score, totalQuestions, percentage, level, serial }, ref) => {
    const today = new Date();
    const examDate = `${today.getFullYear()}-yil ${today.getDate()}-${
      ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"][today.getMonth()]
    }`;

    const sections = [
      { name: "Dasturlash", val: Math.min(100, Math.round(percentage * 0.93 + Math.random() * 7)) },
      { name: "Tarmoqlar", val: Math.min(100, Math.round(percentage * 0.88 + Math.random() * 12)) },
      { name: "Algoritmlar", val: Math.min(100, Math.round(percentage * 0.91 + Math.random() * 9)) },
    ];

    return (
      <div
        ref={ref}
        style={{
          width: "842px",
          height: "595px",
          background: "#F8FAFD",
          position: "relative",
          fontFamily: "'Times New Roman', Georgia, serif",
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Subtle dot-matrix watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(27,42,107,0.06) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Binary string watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%) rotate(-5deg)",
            fontSize: "9px",
            color: "rgba(27,42,107,0.06)",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "2px",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          01001101 01001001 01001100 01001100 01001001 01011001 00100000 01010011 01000101 01010010 01010100 01001001 01000110 01001001 01001011 01000001 01010100
        </div>

        <OfficialBorder accentColor={ACCENT} secondaryColor={GOLD} />
        <NamunaWatermark />

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
          {/* ── HEADER ── */}
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
              <div
                style={{
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${ACCENT}, ${GOLD}, ${ACCENT}, transparent)`,
                  margin: "4px 0",
                }}
              />
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
                  fontSize: "9.5px",
                  color: "#555",
                  letterSpacing: "1px",
                  fontFamily: "Arial, sans-serif",
                  marginTop: "1px",
                }}
              >
                INFORMATIKA VA AXBOROT TEXNOLOGIYALARI FANIDAN
              </div>
            </div>
            <UzbekEmblem size={72} />
          </div>

          <div
            style={{
              height: "3px",
              background: `linear-gradient(90deg, ${ACCENT}, ${CYAN}, ${GOLD}, ${CYAN}, ${ACCENT})`,
              marginBottom: "12px",
              borderRadius: "2px",
            }}
          />

          {/* ── BODY ── */}
          <div style={{ display: "flex", gap: "20px", flex: 1 }}>
            {/* Photo */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "96px",
                  height: "128px",
                  border: `3px solid ${ACCENT}`,
                  outline: `1px solid ${GOLD}`,
                  outlineOffset: "2px",
                  overflow: "hidden",
                  background: "#E8EDF5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  BO'LIMLAR
                </div>
                {sections.map((s) => (
                  <div
                    key={s.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 5px",
                      borderBottom: "0.5px solid #e5e7eb",
                      fontSize: "7.5px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <span style={{ color: "#374151" }}>{s.name}</span>
                    <span style={{ fontWeight: "700", color: ACCENT }}>{s.val}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Info */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
              <p
                style={{
                  fontSize: "10px",
                  color: "#444",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: "1.6",
                  marginBottom: "4px",
                }}
              >
                Ushbu sertifikat quyidagi shaxsga informatika va axborot texnologiyalari fanidan bilim darajasini tasdiqlovchi hujjat sifatida berilgan:
              </p>

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

              <div
                style={{
                  marginTop: "6px",
                  border: `1.5px solid ${ACCENT}`,
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
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
                    background: "#EFF4FB",
                  }}
                >
                  {[
                    { label: "To'plangan ball", val: `${score} / ${totalQuestions}` },
                    { label: "O'zlashtirish", val: `${percentage}%` },
                    { label: "Berilgan daraja", val: level, highlight: true },
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

            {/* Right: Verification */}
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

InformatikaCertificate.displayName = "InformatikaCertificate";
export default InformatikaCertificate;
