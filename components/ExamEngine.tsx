"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flag, ChevronLeft, ChevronRight, CheckSquare2, AlertTriangle,
  Clock, Save, X, BookOpen, Zap
} from "lucide-react";
import { Translations } from "@/data/translations";
import { Question } from "@/data/types";
import { SubjectKey } from "./SubjectCards";

interface ExamEngineProps {
  subject: SubjectKey;
  questions: Question[];
  t: Translations;
  onFinish: (answers: (number | null)[], timeSpent: number) => void;
}

const SESSION_KEY = "exam_session";

interface ExamSession {
  subject: string;
  answers: (number | null)[];
  flagged: boolean[];
  currentIndex: number;
  startTime: number;
  duration: number;
  questionIds: string[];
}

export default function ExamEngine({ subject, questions, t, onFinish }: ExamEngineProps) {
  const DURATION = 40 * 60; // 40 minutes in seconds

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(questions.length).fill(null)
  );
  const [flagged, setFlagged] = useState<boolean[]>(() =>
    Array(questions.length).fill(false)
  );
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [startTime] = useState(() => Date.now());
  const [showConfirm, setShowConfirm] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restore session if exists
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const session: ExamSession = JSON.parse(stored);
        if (
          session.subject === subject &&
          session.questionIds.join() === questions.map((q) => q.id).join()
        ) {
          const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
          const remaining = Math.max(0, session.duration - elapsed);
          setAnswers(session.answers);
          setFlagged(session.flagged);
          setCurrentIndex(session.currentIndex);
          setTimeLeft(remaining);
          return;
        }
      }
    } catch {}
    // Fresh session
    saveSession(Array(questions.length).fill(null), Array(questions.length).fill(false), 0, DURATION);
  }, []);

  const saveSession = useCallback(
    (ans: (number | null)[], fl: boolean[], idx: number, time: number) => {
      try {
        const session: ExamSession = {
          subject,
          answers: ans,
          flagged: fl,
          currentIndex: idx,
          startTime: Date.now() - (DURATION - time) * 1000,
          duration: DURATION,
          questionIds: questions.map((q) => q.id),
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setLastSaved(new Date());
      } catch {}
    },
    [subject, questions, DURATION]
  );

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleFinish(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveSession(answers, flagged, currentIndex, timeLeft);
    }, 30000);
    return () => clearInterval(interval);
  }, [answers, flagged, currentIndex, timeLeft, saveSession]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    saveSession(newAnswers, flagged, currentIndex, timeLeft);
  };

  const handleFlag = () => {
    const newFlagged = [...flagged];
    newFlagged[currentIndex] = !newFlagged[currentIndex];
    setFlagged(newFlagged);
  };

  const handleFinish = useCallback(
    (auto = false) => {
      clearInterval(timerRef.current!);
      sessionStorage.removeItem(SESSION_KEY);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      onFinish(answers, timeSpent);
    },
    [answers, startTime, onFinish]
  );

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const flaggedCount = flagged.filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;
  const isLowTime = timeLeft < 300;
  const isCritical = timeLeft < 60;

  const currentQuestion = questions[currentIndex];

  const getQuestionStatus = (i: number) => {
    if (flagged[i]) return "flagged";
    if (answers[i] !== null) return "answered";
    if (i === currentIndex) return "current";
    return "unanswered";
  };

  const statusColors: Record<string, string> = {
    answered: "bg-emerald-500 text-white border-emerald-400",
    flagged: "bg-yellow-500 text-white border-yellow-400",
    current: "bg-blue-500 text-white border-blue-400",
    unanswered: "bg-white/10 text-white/40 border-white/10",
  };

  return (
    <div className="min-h-screen pt-20 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main exam area */}
          <div className="lg:col-span-3">
            {/* Exam header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-4 border border-white/10 mb-6 flex items-center justify-between flex-wrap gap-3"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-semibold text-sm">
                  {t.examQuestion} {currentIndex + 1} {t.examOf} {questions.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {lastSaved && (
                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Save className="w-3 h-3" />
                    {t.examSaved}
                  </div>
                )}

                {/* Timer */}
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-sm ${
                    isCritical
                      ? "bg-red-500/20 text-red-400 timer-critical border border-red-500/40"
                      : isLowTime
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                      : "glass border border-white/20 text-white"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  {formatTime(timeLeft)}
                </div>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ type: "spring", damping: 22, stiffness: 250 }}
                className="glass rounded-3xl p-6 border border-white/10 mb-6"
              >
                {/* Section badge */}
                {currentQuestion.section && (
                  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
                    {currentQuestion.section}
                    {currentQuestion.level && ` • ${currentQuestion.level}`}
                  </span>
                )}

                {/* Question text */}
                <h2 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                  {currentQuestion.text}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = answers[currentIndex] === i;
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(i)}
                        className={`w-full text-left px-5 py-4 rounded-2xl border transition-all flex items-center gap-3 ${
                          isSelected
                            ? "bg-emerald-600/30 border-emerald-500 text-white shadow-lg"
                            : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold border-2 ${
                            isSelected
                              ? "border-emerald-400 bg-emerald-500 text-white"
                              : "border-white/20 bg-white/10 text-white/50"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm leading-relaxed">{option}</span>
                        {isSelected && (
                          <CheckSquare2 className="w-5 h-5 text-emerald-400 ml-auto flex-shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl glass border border-white/20 text-white/70 hover:text-white transition-all disabled:opacity-30 text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.examPrev}
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleFlag}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-medium transition-all ${
                    flagged[currentIndex]
                      ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                      : "glass border-white/20 text-white/60 hover:text-white"
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  {flagged[currentIndex] ? t.examFlagged : t.examFlag}
                </motion.button>
              </div>

              {currentIndex < questions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold shadow-lg"
                >
                  {t.examNext}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  {t.examFinish}
                </motion.button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-3xl border border-white/10 p-5 sticky top-24"
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { label: t.examAnswered, count: answeredCount, color: "text-emerald-400", dot: "bg-emerald-500" },
                  { label: t.examFlaggedLabel, count: flaggedCount, color: "text-yellow-400", dot: "bg-yellow-500" },
                  { label: t.examNotAnswered, count: unansweredCount, color: "text-white/50", dot: "bg-white/20" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-2 rounded-xl bg-white/5">
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.count}</div>
                    <div className="text-[10px] text-white/40 mt-0.5 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Question grid */}
              <div className="mb-5">
                <p className="text-white/40 text-xs font-medium mb-2 uppercase tracking-wide">Savollar xaritasi</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {questions.map((_, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentIndex(i)}
                      className={`question-dot w-full aspect-square rounded-lg text-xs font-bold border transition-all ${
                        statusColors[getQuestionStatus(i)]
                      } ${i === currentIndex ? "ring-2 ring-blue-400 ring-offset-1 ring-offset-transparent" : ""}`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-1.5 mb-5">
                {[
                  { color: "bg-emerald-500", label: t.examAnswered },
                  { color: "bg-yellow-500", label: t.examFlaggedLabel },
                  { color: "bg-blue-500", label: "Joriy" },
                  { color: "bg-white/20", label: t.examNotAnswered },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                    <span className="text-white/50 text-xs">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Finish button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowConfirm(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {t.examFinish}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirm Finish Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="glass rounded-3xl p-8 border border-white/20 shadow-2xl max-w-sm mx-4 w-full"
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t.examConfirmFinish}
                </h3>
                {unansweredCount > 0 && (
                  <p className="text-orange-400 text-sm">
                    ⚠️ {unansweredCount} {t.examUnanswered}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-2xl bg-white/10 text-white/70 hover:text-white transition-all font-medium text-sm"
                >
                  {t.examFinishNo}
                </button>
                <button
                  onClick={() => handleFinish()}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-sm shadow-lg"
                >
                  {t.examFinishYes}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
