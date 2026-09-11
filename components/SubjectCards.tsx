"use client";

import { motion } from "framer-motion";
import { 
  Globe2, Calculator, Cpu, BookOpen, Clock, BookMarked, 
  ArrowRight, Award, Star
} from "lucide-react";
import { Translations } from "@/data/translations";
import { use3DTilt } from "@/hooks/use3DTilt";

export type SubjectKey = "cefr" | "matematika" | "informatika" | "onaTili";

interface SubjectCardProps {
  subject: SubjectKey;
  t: Translations;
  onSelect: (subject: SubjectKey) => void;
}

const subjectConfig = {
  cefr: {
    icon: Globe2,
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    glowColor: "rgba(99, 102, 241, 0.4)",
    borderColor: "#6366F1",
    badge: "international",
    questionCount: 20,
    duration: 45,
    levels: ["A1", "A2", "B1", "B2", "C1"],
    nameUz: "CEFR Ingliz tili",
    descUz: "Multi-darajali xalqaro ingliz tili sertifikati (A1–C1)",
    nameRu: "CEFR Английский",
    descRu: "Международный сертификат по английскому (A1–C1)",
    nameEn: "CEFR English",
    descEn: "International multi-level English certificate (A1–C1)",
    bgPattern: "🇬🇧",
    stars: 5,
    difficulty: "A1–C1",
  },
  matematika: {
    icon: Calculator,
    gradient: "from-emerald-600 via-teal-600 to-green-700",
    glowColor: "rgba(5, 150, 105, 0.4)",
    borderColor: "#059669",
    badge: "national",
    questionCount: 20,
    duration: 40,
    levels: ["B", "B+", "A", "A+"],
    nameUz: "Matematika",
    descUz: "Milliy sertifikat — Matematika fanidan sinov",
    nameRu: "Математика",
    descRu: "Национальный сертификат по Математике",
    nameEn: "Mathematics",
    descEn: "National certificate — Mathematics exam",
    bgPattern: "∑",
    stars: 4,
    difficulty: "B–A+",
  },
  informatika: {
    icon: Cpu,
    gradient: "from-cyan-600 via-blue-600 to-sky-700",
    glowColor: "rgba(29, 78, 216, 0.4)",
    borderColor: "#1D4ED8",
    badge: "national",
    questionCount: 20,
    duration: 40,
    levels: ["B", "B+", "A", "A+"],
    nameUz: "Informatika",
    descUz: "Milliy sertifikat — Informatika va AT fanidan sinov",
    nameRu: "Информатика",
    descRu: "Национальный сертификат по Информатике и ИТ",
    nameEn: "Informatics",
    descEn: "National certificate — Computer Science exam",
    bgPattern: "01",
    stars: 4,
    difficulty: "B–A+",
  },
  onaTili: {
    icon: BookOpen,
    gradient: "from-rose-600 via-red-600 to-orange-600",
    glowColor: "rgba(220, 38, 38, 0.4)",
    borderColor: "#DC2626",
    badge: "national",
    questionCount: 20,
    duration: 40,
    levels: ["B", "B+", "A", "A+"],
    nameUz: "Ona tili va adabiyot",
    descUz: "Milliy sertifikat — O'zbek tili va adabiyot",
    nameRu: "Узбекский язык",
    descRu: "Национальный сертификат — Узбекский язык и литература",
    nameEn: "Uzbek Language",
    descEn: "National certificate — Uzbek Language & Literature",
    bgPattern: "ﻭ",
    stars: 4,
    difficulty: "B–A+",
  },
};

function SubjectCard({
  subject,
  t,
  onSelect,
}: SubjectCardProps) {
  const config = subjectConfig[subject];
  const Icon = config.icon;
  const { style, handleMouseMove, handleMouseLeave } = use3DTilt(12);

  const getName = () => {
    if (t.platformName.includes("Тренажёр")) return (config as any)[`nameRu`];
    if (t.platformName.includes("Trainer")) return (config as any)[`nameEn`];
    return (config as any)[`nameUz`];
  };

  const getDesc = () => {
    if (t.platformName.includes("Тренажёр")) return (config as any)[`descRu`];
    if (t.platformName.includes("Trainer")) return (config as any)[`descEn`];
    return (config as any)[`descUz`];
  };

  return (
    <motion.div
      style={{ perspective: 1200 }}
      className="cursor-pointer"
      onClick={() => onSelect(subject)}
    >
      <motion.div
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-3xl overflow-hidden h-full"
      >
        {/* Glow border */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow: `0 0 30px ${config.glowColor}, inset 0 0 30px rgba(255,255,255,0.02)`,
            border: `1px solid ${config.borderColor}40`,
          }}
        />

        {/* Card body */}
        <div className="relative glass rounded-3xl p-6 h-full flex flex-col border border-white/10 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-4 right-4 text-7xl font-bold opacity-5 select-none">
            {config.bgPattern}
          </div>

          {/* Gradient overlay at bottom */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-10`}
          />

          {/* Badge */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                config.badge === "international"
                  ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                  : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
              }`}
            >
              {config.badge === "international" ? t.international : t.national}
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: config.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>

          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg mb-4 relative z-10`}
            style={{ boxShadow: `0 8px 25px ${config.glowColor}` }}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          {/* Subject name */}
          <h3 className="text-xl font-bold text-white mb-1.5 relative z-10 leading-tight">
            {getName()}
          </h3>
          <p className="text-white/60 text-sm mb-4 relative z-10 leading-relaxed flex-1">
            {getDesc()}
          </p>

          {/* Level pills */}
          <div className="flex gap-1.5 mb-4 flex-wrap relative z-10">
            {config.levels.map((level) => (
              <span
                key={level}
                className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-mono"
              >
                {level}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <BookMarked className="w-3.5 h-3.5" />
              <span>
                {config.questionCount} {t.questionsCount}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {config.duration} {t.minutesCount}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r ${config.gradient} shadow-lg relative z-10 transition-all`}
            style={{ boxShadow: `0 8px 20px ${config.glowColor}` }}
          >
            <Award className="w-4 h-4" />
            {t.startTest}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface SubjectCardsProps {
  t: Translations;
  onSelectSubject: (subject: SubjectKey) => void;
}

export default function SubjectCards({ t, onSelectSubject }: SubjectCardsProps) {
  const subjects: SubjectKey[] = ["cefr", "matematika", "informatika", "onaTili"];

  return (
    <section id="subjects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 15 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">4 ta yo'nalish</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            {t.subjectsTitle}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {t.subjectsSubtitle}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, type: "spring", damping: 20 }}
            >
              <SubjectCard
                subject={subject}
                t={t}
                onSelect={onSelectSubject}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
