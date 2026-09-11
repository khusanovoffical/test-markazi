"use client";

import { useState, useCallback } from "react";
import translations, { Language, Translations } from "@/data/translations";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("app_language") as Language;
      if (stored && ["uz", "ru", "en"].includes(stored)) return stored;
    }
    return "uz";
  });

  const t: Translations = translations[language];

  const switchLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_language", lang);
    }
  }, []);

  return { language, t, switchLanguage };
}
