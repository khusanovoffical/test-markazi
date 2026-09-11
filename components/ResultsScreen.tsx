"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy, CheckCircle2, XCircle, ChevronDown, ChevronUp,
  Home, RotateCcw, Award, BarChart3, Target, Lightbulb
} from "lucide-react";
import { Translations } from "@/data/translations";
import { Question } from "@/data/types";
import { SubjectKey } from "./SubjectCards";
import { calculateLevel, getLevelColor } from "@/lib/utils";

interface ResultsScreenProps {
  subject: SubjectKey;
  questions: Question[];
  answers: (number | null)[];
  timeSpent: number;
  t: Translations;
  hasCertificate: boolean;
  onGetCertificate: () => void;
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultsScreen({
  subject,
  questions,
  answers,
  timeSpent,
  t,
  hasCertificate,
  onGetCertificate,
  onRetry,
  onHome,
}: ResultsScreenProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length;
  const incorrectCount = answers.filter(
    (a, i) => a !== null && a !== questions[i].correctIndex
  ).length;
  const unanswered = answers.filter((a) => a === null).length;
  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const level = calculateLevel(subject, percentage);
  const levelColor = getLevelColor(level);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const getResultLabel = () => {
    if (percentage >= 86) return t.resultsExcellent;
    if (percentage >= 71) return t.resultsGood;
    if (percentage >= 60) return t.resultsSatisfactory;
    return "Qoniqarsiz";
  };

  useEffect(() => {
    if (percentage >= 60) {
      setTimeout(async () => {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#059669", "#1D4ED8", "#F59E0B"],
        });
      }, 500);
    }
  }, [percentage]);

  const statCards = [
    { label: t.resultsCorrect, value: correctCount, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    { label: t.resultsIncorrect, value: incorrectCount, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
    { label: "Javobsiz", value: unanswered, color: "text-white/50", bg: "bg-white/5", border: "border-white/10" },
    { label: "Vaqt", value: formatTime(timeSpent), color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Score Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="glass rounded-3xl p-8 border border-white/10 mb-6 text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${levelColor}, transparent 70%)`,
            }}
          />

          {/* Trophy */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${levelColor}, ${levelColor}80)` }}
            >
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-7xl font-black mb-1" style={{ color: levelColor }}>
              {percentage}%
            </div>
            <div className="text-white/60 text-lg mb-3">
              {correctCount}/{total} {t.resultsCorrect}
            </div>
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-lg font-bold border-2"
              style={{ color: levelColor, borderColor: `${levelColor}60`, background: `${levelColor}15` }}
            >
              <Target className="w-5 h-5" />
              {t.resultsLevel}: {level}
            </div>
            <div className="mt-2 text-white/50 text-sm">{getResultLabel()}</div>
          </motion.div>

          {/* Progress ring */}
          <div className="mt-6">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${levelColor}, ${levelColor}80)` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className={`${stat.bg} border ${stat.border} rounded-2xl p-4 text-center`}
            >
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-white/50 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {hasCertificate && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGetCertificate}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow-lg text-sm flex-1 justify-center"
            >
              <Award className="w-4 h-4" />
              {t.resultsGetCert}
            </motion.button>
          )}
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/20 text-white/80 hover:text-white transition-all text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            {t.resultsRetry}
          </button>
          <button
            onClick={onHome}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/20 text-white/80 hover:text-white transition-all text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            {t.resultsHome}
          </button>
        </motion.div>

        {/* Error Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">{t.resultsAnalysis}</h3>
          </div>

          <div className="space-y-3">
            {questions.map((question, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === question.correctIndex;
              const isExpanded = expandedQuestion === i;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className={`rounded-2xl border overflow-hidden ${
                    isCorrect
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : userAnswer === null
                      ? "border-white/10 bg-white/5"
                      : "border-red-500/30 bg-red-500/5"
                  }`}
                >
                  <button
                    onClick={() => setExpandedQuestion(isExpanded ? null : i)}
                    className="w-full flex items-center gap-3 p-4 text-left"
                  >
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : userAnswer === null ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <span className="text-white/80 text-sm font-medium flex-1 text-left leading-tight">
                      <span className="text-white/40 mr-2">#{i + 1}</span>
                      {question.text.length > 80 ? question.text.slice(0, 80) + "..." : question.text}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-white/40 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 space-y-3 border-t border-white/10 pt-4"
                    >
                      {/* Full question */}
                      <p className="text-white/70 text-sm leading-relaxed">{question.text}</p>

                      {/* Options */}
                      <div className="space-y-2">
                        {question.options.map((option, oi) => {
                          const isUserChoice = userAnswer === oi;
                          const isCorrectChoice = oi === question.correctIndex;
                          return (
                            <div
                              key={oi}
                              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                                isCorrectChoice
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : isUserChoice && !isCorrectChoice
                                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                  : "text-white/40"
                              }`}
                            >
                              <span className="font-mono font-bold w-5">
                                {String.fromCharCode(65 + oi)}
                              </span>
                              <span>{option}</span>
                              {isCorrectChoice && (
                                <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-400" />
                              )}
                              {isUserChoice && !isCorrectChoice && (
                                <XCircle className="w-4 h-4 ml-auto text-red-400" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Answer info */}
                      <div className="space-y-2">
                        {userAnswer !== null && !isCorrect && (
                          <div className="text-xs text-red-400/80">
                            <span className="font-semibold">{t.resultsYourAnswer}:</span>{" "}
                            {question.options[userAnswer]}
                          </div>
                        )}
                        <div className="text-xs text-emerald-400/80">
                          <span className="font-semibold">{t.resultsCorrectAnswer}:</span>{" "}
                          {question.options[question.correctIndex]}
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="flex gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                        <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-blue-400 mb-1">
                            {t.resultsExplanation}
                          </p>
                          <p className="text-white/60 text-xs leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
