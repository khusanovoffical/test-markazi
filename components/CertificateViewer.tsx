"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Award, FileText } from "lucide-react";
import { Translations } from "@/data/translations";
import { SubjectKey } from "./SubjectCards";
import { CertificateUserData } from "./CertificateModal";
import { calculateLevel, generateSerialNumber } from "@/lib/utils";
import CefrCertificate from "./certificates/CefrCertificate";
import MathCertificate from "./certificates/MathCertificate";
import InformatikaCertificate from "./certificates/InformatikaCertificate";
import OnaTiliCertificate from "./certificates/OnaTiliCertificate";

interface CertificateViewerProps {
  subject: SubjectKey;
  userData: CertificateUserData;
  score: number;
  totalQuestions: number;
  t: Translations;
  onClose: () => void;
}

const subjectLabels: Record<SubjectKey, string> = {
  cefr: "Ingliz tili (CEFR)",
  matematika: "Matematika",
  informatika: "Informatika va AT",
  onaTili: "Ona tili va Adabiyot",
};

export default function CertificateViewer({
  subject,
  userData,
  score,
  totalQuestions,
  t,
  onClose,
}: CertificateViewerProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [serial] = useState(() => generateSerialNumber(subject));

  const percentage = Math.round((score / totalQuestions) * 100);
  const level = calculateLevel(subject, percentage);

  // All certificates now share the full CertProps interface
  const certProps = {
    userData,
    score,
    totalQuestions,
    percentage,
    level,
    serial,
    subjectName: subjectLabels[subject],
    subjectNameFull: subjectLabels[subject],
  };

  const handleDownload = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;

      // Temporarily make the cert fully visible for capture
      const el = certRef.current;
      const originalTransform = el.style.transform;
      el.style.transform = "none";

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FAF9F6",
        logging: false,
        width: 842,
        height: 595,
        windowWidth: 842,
        windowHeight: 595,
      });

      el.style.transform = originalTransform;

      const link = document.createElement("a");
      link.download = `milliy-sertifikat-${subject}-${serial}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (e) {
      console.error("Download error:", e);
    } finally {
      setDownloading(false);
    }
  };

  // Scale factor for preview (fits in viewport)
  const SCALE = 0.82;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center modal-overlay p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 250 }}
          style={{ maxWidth: `${842 * SCALE + 60}px`, width: "100%" }}
        >
          {/* ── UI Toolbar ── */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Sertifikatingiz tayyor!</h3>
                <p className="text-white/40 text-xs">{subjectLabels[subject]} — {serial}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-sm shadow-lg disabled:opacity-70 transition-all"
              >
                {downloading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                  />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {downloading ? "Yuklanmoqda..." : t.certDownload}
              </motion.button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Certificate Preview ── */}
          <div
            className="rounded-xl overflow-hidden shadow-2xl border border-white/20"
            style={{
              width: `${842 * SCALE}px`,
              height: `${595 * SCALE}px`,
              position: "relative",
            }}
          >
            {/* Scale wrapper — preserves certificate pixel-perfect dimensions */}
            <div
              style={{
                transformOrigin: "top left",
                transform: `scale(${SCALE})`,
                width: "842px",
                height: "595px",
              }}
            >
              {subject === "cefr" && <CefrCertificate ref={certRef} {...certProps} />}
              {subject === "matematika" && <MathCertificate ref={certRef} {...certProps} />}
              {subject === "informatika" && <InformatikaCertificate ref={certRef} {...certProps} />}
              {subject === "onaTili" && <OnaTiliCertificate ref={certRef} {...certProps} />}
            </div>
          </div>

          {/* ── Info bar ── */}
          <div className="mt-3 glass rounded-xl p-3 border border-white/10 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-emerald-400 text-[11px]">{serial}</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <span className="text-white/40">Daraja:</span>
              <span className="text-yellow-300 font-black text-sm">{level}</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <span className="text-white/40">Ball:</span>
              <span className="text-white/80 font-bold">{score}/{totalQuestions} ({percentage}%)</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <span className="text-white/40">Egasi:</span>
              <span className="text-white/70">{userData.fullName}</span>
            </div>
            <div className="ml-auto text-red-400/60 text-[10px] italic flex items-center gap-1">
              ⚠ {t.certShareNote}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
