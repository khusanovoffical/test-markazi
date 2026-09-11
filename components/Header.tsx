"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, GraduationCap, Menu, X, BookOpen } from "lucide-react";
import { Language, Translations } from "@/data/translations";

interface HeaderProps {
  language: Language;
  t: Translations;
  onLanguageChange: (lang: Language) => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "uz", label: "UZ", flag: "🇺🇿" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export default function Header({ language, t, onLanguageChange }: HeaderProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language)!;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-royal-600 flex items-center justify-center shadow-lg neon-emerald">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold gradient-text-emerald leading-tight">
                  Mock Sertifikat
                </h1>
                <p className="text-[10px] text-white/50 leading-none">Trenajyor</p>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#subjects"
                className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                {t.subjects}
              </a>
              <a
                href="#how"
                className="text-white/60 hover:text-white text-sm font-medium transition-colors"
              >
                {t.howItWorks}
              </a>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLangOpen(!langOpen)}
                  className="glass flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{currentLang.flag}</span>
                  <span>{currentLang.label}</span>
                  <motion.span
                    animate={{ rotate: langOpen ? 180 : 0 }}
                    className="text-white/40 text-xs"
                  >
                    ▾
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="absolute right-0 mt-2 w-32 glass-dark rounded-xl border border-white/20 shadow-2xl overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onLanguageChange(lang.code);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                            language === lang.code
                              ? "bg-emerald-600/30 text-emerald-400"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span className="font-medium">{lang.label}</span>
                          {language === lang.code && (
                            <span className="ml-auto text-emerald-400 text-xs">✓</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden glass p-2 rounded-xl border border-white/20 text-white/70 hover:text-white transition-colors"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                <a
                  href="#subjects"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-white/70 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  {t.subjects}
                </a>
                <a
                  href="#how"
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-all block"
                >
                  {t.howItWorks}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
