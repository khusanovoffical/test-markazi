"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Calendar, Camera, Award, Play, ChevronRight } from "lucide-react";
import { Translations } from "@/data/translations";
import { SubjectKey } from "./SubjectCards";

export interface CertificateUserData {
  fullName: string;
  birthDate: string;
  photoUrl: string | null;
}

interface CertificateModalProps {
  subject: SubjectKey;
  t: Translations;
  onStartWithCert: (data: CertificateUserData) => void;
  onStartWithoutCert: () => void;
  onClose: () => void;
}

type Step = "choice" | "form";

export default function CertificateModal({
  subject,
  t,
  onStartWithCert,
  onStartWithoutCert,
  onClose,
}: CertificateModalProps) {
  const [step, setStep] = useState<Step>("choice");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Fayl hajmi 5MB dan oshmasligi kerak");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoUrl(ev.target?.result as string);
      setPhotoError("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !birthDate) return;
    onStartWithCert({ fullName: fullName.trim(), birthDate, photoUrl });
  };

  const isFormValid = fullName.trim().length >= 3 && birthDate;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 250 }}
          className="w-full max-w-lg"
        >
          <div className="glass rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {step === "choice" ? t.certModalTitle : t.certFormTitle}
                  </h3>
                  {step === "choice" && (
                    <p className="text-white/50 text-xs mt-0.5">{t.certModalSubtitle}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === "choice" ? (
                  <motion.div
                    key="choice"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    {/* Certificate preview illustration */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-4 border border-white/10 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 rounded-lg bg-gradient-to-b from-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg">
                          <Award className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Rasmiy Mock Sertifikat</p>
                          <p className="text-white/50 text-xs">PNG formatida yuklab olish mumkin</p>
                          <div className="flex gap-1 mt-1">
                            {["Ism", "Sana", "Ball", "Daraja"].map((tag) => (
                              <span key={tag} className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Yes button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep("form")}
                      className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg flex items-center justify-between px-5 group"
                    >
                      <span>{t.certYesButton}</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    {/* No button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onStartWithoutCert}
                      className="w-full py-4 rounded-2xl font-medium text-white/70 bg-white/10 hover:bg-white/15 border border-white/10 transition-all flex items-center justify-between px-5"
                    >
                      <span>{t.certNoButton}</span>
                      <Play className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                        <User className="w-4 h-4" />
                        {t.certFullName} *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.certNamePlaceholder}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                      />
                    </div>

                    {/* Birth date */}
                    <div>
                      <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                        <Calendar className="w-4 h-4" />
                        {t.certBirthDate} *
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm [color-scheme:dark]"
                      />
                    </div>

                    {/* Photo upload */}
                    <div>
                      <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                        <Camera className="w-4 h-4" />
                        {t.certPhoto}
                      </label>
                      <div
                        className="flex items-center gap-4 p-4 bg-white/5 border border-dashed border-white/20 rounded-xl cursor-pointer hover:border-emerald-500/50 transition-colors"
                        onClick={() => fileRef.current?.click()}
                      >
                        {photoUrl ? (
                          <img
                            src={photoUrl}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-dashed border-white/30">
                            <Camera className="w-6 h-6 text-white/30" />
                          </div>
                        )}
                        <div>
                          <p className="text-white/80 text-sm font-medium">
                            {photoUrl ? "Fotosuratni o'zgartirish" : "Fotosurat yuklash"}
                          </p>
                          <p className="text-white/40 text-xs mt-0.5">{t.certPhotoHint}</p>
                        </div>
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      {photoError && (
                        <p className="text-red-400 text-xs mt-1">{photoError}</p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setStep("choice")}
                        className="flex-1 py-3 rounded-2xl text-white/60 hover:text-white bg-white/10 hover:bg-white/15 transition-all text-sm font-medium"
                      >
                        ← Orqaga
                      </button>
                      <motion.button
                        whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                        whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                        onClick={isFormValid ? handleSubmit : undefined}
                        disabled={!isFormValid}
                        className={`flex-[2] py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                          isFormValid
                            ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg cursor-pointer"
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        <Play className="w-4 h-4" />
                        {t.certStartExam}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
