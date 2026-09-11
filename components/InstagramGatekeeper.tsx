"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { Translations } from "@/data/translations";

const confetti = typeof window !== "undefined" ? require("canvas-confetti") : null;

interface InstagramGatekeeperProps {
  t: Translations;
  onVerified: () => void;
}

export default function InstagramGatekeeper({ t, onVerified }: InstagramGatekeeperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [instagramOpened, setInstagramOpened] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("ig_verified");
    if (!verified) {
      setTimeout(() => setIsVisible(true), 500);
    } else {
      onVerified();
    }
  }, [onVerified]);

  const handleInstagramClick = () => {
    window.open("https://instagram.com/your_profile", "_blank");
    setInstagramOpened(true);
  };

  const handleVerify = useCallback(async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));

    localStorage.setItem("ig_verified", "true");

    if (typeof window !== "undefined") {
      const confettiLib = (await import("canvas-confetti")).default;
      confettiLib({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#059669", "#1D4ED8", "#DC2626", "#10B981", "#F59E0B"],
      });
      setTimeout(() => {
        confettiLib({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confettiLib({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 300);
    }

    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onVerified, 500);
    }, 1000);
  }, [onVerified]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center modal-overlay"
      >
        {/* Background animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="blob w-96 h-96 bg-purple-600 -top-20 -left-20"
          />
          <motion.div
            animate={{ scale: [1.1, 0.9, 1.1], rotate: [0, -120, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="blob w-80 h-80 bg-pink-600 bottom-10 right-10"
          />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -40 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="relative w-full max-w-md mx-4"
        >
          <div className="glass rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Instagram gradient icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                }}
              >
                <Instagram className="w-10 h-10 text-white" />
              </motion.div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {t.igTitle}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                {t.igSubtitle}
              </p>
            </div>

            {/* Animated steps */}
            <div className="space-y-3 mb-6">
              {[
                { num: "1", text: t.igButton, icon: "📲" },
                { num: "2", text: t.igNote, icon: "✅" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-3 bg-white/10 rounded-xl p-3"
                >
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-white/80 text-sm">{step.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstagramClick}
                className="w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
                }}
              >
                <Instagram className="w-5 h-5" />
                {t.igButton}
                <ExternalLink className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: instagramOpened ? 1.02 : 1 }}
                whileTap={{ scale: instagramOpened ? 0.98 : 1 }}
                onClick={instagramOpened ? handleVerify : undefined}
                disabled={verifying}
                className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  instagramOpened
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg cursor-pointer"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                {verifying ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
                    />
                    {t.igVerifying}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    {t.igVerifyButton}
                  </>
                )}
              </motion.button>
            </div>

            {/* Floating sparkles */}
            <div className="absolute -top-3 -right-3 pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
