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

const ACCENT = "#6B2D0E";   // Dark warm brown/maroon for Ona Tili
const GOLD   = "#C9913A";
const CREAM  = "#FDF6EC";

const OnaTiliCertificate = forwardRef<HTMLDivElement, CertProps>(
  ({ userData, score, totalQuestions, percentage, level, serial }, ref) => {
    const today = new Date();
    const examDate = `${today.getFullYear()}-yil ${today.getDate()}-${
      ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"][today.getMonth()]
    }`;

    const sections = [
      { name: "Grammatika", val: Math.min(100, Math.round(percentage * 0.94 + Math.random() * 6)) },
      { name: "Adabiyot", val: Math.min(100, Math.round(percentage * 0.89 + Math.random() * 11)) },
      { name: "Sintaksis", val: Math.min(100, Math.round(percentage * 0.92 + Math.random() * 8)) },
    ];

    return (
      <div
        ref={ref}
        style={{
          width: "842px",
          height: "595px",
          background: CREAM,
          position: "relative",
          fontFamily: "'Times New Roman', Georgia, serif",
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Elegant arabesque / floral SVG watermark */}
        <svg
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "340px",
            height: "340px",
            opacity: 0.035,
            pointerEvents: "none",
            zIndex: 0,
          }}
          viewBox="0 0 200 200"
        >
          {/* Ornamental petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const cx = 100 + 55 * Math.sin(angle);
            const cy = 100 - 55 * Math.cos(angle);
            return (
              <g key={i}>
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx="20"
                  ry="30"
                  fill={ACCENT}
                  transform={`rotate(${i * 45}, ${cx}, ${cy})`}
                />
              </g>
            );
          })}
          <circle cx="100" cy="100" r="25" fill={ACCENT} />
          <circle cx="100" cy="100" r="15" fill={CREAM} />
          {/* Outer ring ornaments */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={100 + 88 * Math.sin(angle)}
                cy={100 - 88 * Math.cos(angle)}
                r="4"
                fill={GOLD}
              />
            );
          })}
        </svg>

        {/* Side ornament lines */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            bottom: "20px",
            left: "22px",
            width: "4px",
            background: `repeating-linear-gradient(180deg, ${GOLD} 0px, ${GOLD} 8px, transparent 8px, transparent 12px)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            bottom: "20px",
            right: "22px",
            width: "4px",
            background: `repeating-linear-gradient(180deg, ${GOLD} 0px, ${GOLD} 8px, transparent 8px, transparent 12px)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <OfficialBorder accentColor={ACCENT} secondaryColor={GOLD} />
        <NamunaWatermark />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "20px 36px 36px",
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
                  fontSize: "10px",
                  color: "#555",
                  letterSpacing: "1.2px",
                  fontFamily: "Arial, sans-serif",
                  marginTop: "1px",
                }}
              >
                ONA TILI VA ADABIYOT FANIDAN
              </div>
            </div>
            <UzbekEmblem size={72} />
          </div>

          {/* Ornamental divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <div style={{ flex: 1, height: "1.5px", background: ACCENT }} />
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M12 1 L23 6 L12 11 L1 6 Z" fill={GOLD} />
            </svg>
            <div
              style={{
                height: "3px",
                width: "60px",
                background: `linear-gradient(90deg, ${ACCENT}, ${GOLD}, ${ACCENT})`,
                borderRadius: "2px",
              }}
            />
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M12 1 L23 6 L12 11 L1 6 Z" fill={GOLD} />
            </svg>
            <div style={{ flex: 1, height: "1.5px", background: ACCENT }} />
          </div>

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
                  background: "#F5EDE0",
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
                  color: "#44403C",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: "1.7",
                  marginBottom: "4px",
                  fontStyle: "italic",
                }}
              >
                Ushbu sertifikat quyidagi shaxsga o'zbek tili va adabiyoti fanidan bilim va saviyasini tasdiqlovchi rasmiy hujjat sifatida berilgan:
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
                    borderBottom: `0.5px solid ${GOLD}50`,
                    paddingBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      color: "#78716C",
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
                      color: row.color ?? "#1C1917",
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
                    background: "#FDF3E7",
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
                          color: item.highlight ? ACCENT : "#1C1917",
                          fontFamily: "'Times New Roman', Georgia, serif",
                          lineHeight: 1,
                        }}
                      >
                        {item.val}
                      </div>
                      <div
                        style={{
                          fontSize: "7.5px",
                          color: "#78716C",
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

OnaTiliCertificate.displayName = "OnaTiliCertificate";
export default OnaTiliCertificate;
