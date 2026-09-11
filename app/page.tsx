"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Sparkles, Star, ArrowDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import InstagramGatekeeper from "@/components/InstagramGatekeeper";
import Header from "@/components/Header";
import SubjectCards, { SubjectKey } from "@/components/SubjectCards";
import CertificateModal, { CertificateUserData } from "@/components/CertificateModal";
import ExamEngine from "@/components/ExamEngine";
import ResultsScreen from "@/components/ResultsScreen";
import CertificateViewer from "@/components/CertificateViewer";
import HowItWorks from "@/components/HowItWorks";
import { getQuestionsForSession } from "@/lib/utils";
import { Question } from "@/data/types";

type AppScreen =
  | "home"
  | "exam"
  | "results"
  | "certificate";

interface ExamState {
  subject: SubjectKey;
  questions: Question[];
  answers: (number | null)[];
  timeSpent: number;
  hasCertificate: boolean;
  userData: CertificateUserData | null;
}

export default function HomePage() {
  const { language, t, switchLanguage } = useLanguage();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [screen, setScreen] = useState<AppScreen>("home");
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [examState, setExamState] = useState<ExamState | null>(null);

  const handleVerified = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  const handleSubjectSelect = (subject: SubjectKey) => {
    setSelectedSubject(subject);
    setShowCertModal(true);
  };

  const loadQuestions = async (subject: SubjectKey) => {
    let allQuestions: Question[];
    switch (subject) {
      case "cefr":
        allQuestions = (await import("@/data/questions/cefr")).default;
        break;
      case "matematika":
        allQuestions = (await import("@/data/questions/matematika")).default;
        break;
      case "informatika":
        allQuestions = (await import("@/data/questions/informatika")).default;
        break;
      case "onaTili":
        allQuestions = (await import("@/data/questions/onaTili")).default;
        break;
    }
    return getQuestionsForSession(allQuestions, subject, 20);
  };

  const startExam = async (
    subject: SubjectKey,
    hasCertificate: boolean,
    userData: CertificateUserData | null
  ) => {
    const questions = await loadQuestions(subject);
    setExamState({
      subject,
      questions,
      answers: Array(questions.length).fill(null),
      timeSpent: 0,
      hasCertificate,
      userData,
    });
    setShowCertModal(false);
    setScreen("exam");
  };

  const handleStartWithCert = (userData: CertificateUserData) => {
    if (!selectedSubject) return;
    startExam(selectedSubject, true, userData);
  };

  const handleStartWithoutCert = () => {
    if (!selectedSubject) return;
    startExam(selectedSubject, false, null);
  };

  const handleExamFinish = (answers: (number | null)[], timeSpent: number) => {
    if (!examState) return;
    setExamState((prev) => prev ? { ...prev, answers, timeSpent } : prev);
    setScreen("results");
  };

  const handleGetCertificate = () => {
    setScreen("certificate");
  };

  const handleRetry = () => {
    if (!examState?.subject) return;
    setSelectedSubject(examState.subject);
    startExam(examState.subject, examState.hasCertificate, examState.userData);
  };

  const handleHome = () => {
    setExamState(null);
    setSelectedSubject(null);
    setScreen("home");
  };

  const correctCount = examState
    ? examState.answers.filter((a, i) => a === examState.questions[i]?.correctIndex).length
    : 0;

  return (
    <div className="min-h-screen bg-[#0a0f1a] relative overflow-x-hidden">
      {/* Instagram Gatekeeper */}
      <InstagramGatekeeper t={t} onVerified={handleVerified} />

      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-emerald-600 -top-40 -left-40" />
        <div
          className="blob w-[400px] h-[400px] bg-blue-700"
          style={{ top: "40%", right: "-100px", animationDelay: "2s" }}
        />
        <div
          className="blob w-[350px] h-[350px] bg-purple-700"
          style={{ bottom: "-80px", left: "30%", animationDelay: "4s" }}
        />
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="geo-shape w-24 h-24 border-2 border-emerald-500/20"
          style={{ top: "20%", left: "5%", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="geo-shape w-16 h-16 border-2 border-blue-500/20"
          style={{ top: "60%", right: "8%", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-20 h-20 bg-red-500/10 rounded-full"
          style={{ top: "70%", left: "15%" }}
        />
      </div>

      {/* Header */}
      <AnimatePresence>
        {isUnlocked && (
          <Header
            language={language}
            t={t}
            onLanguageChange={switchLanguage}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {isUnlocked && screen === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 text-center relative">
              <div className="max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 glass border border-white/20 rounded-full px-4 py-2 mb-8"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/70 text-sm">
                    4 fan • Mock sertifikat • Chuqur tahlil
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl font-black mb-6 leading-tight"
                >
                  <span className="gradient-text-emerald">Milliy va Xalqaro</span>
                  <br />
                  <span className="text-white">Mock Sertifikat</span>
                  <br />
                  <span className="gradient-text-royal">Trenajyori</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/50 text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                  {t.tagline}
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-6 mb-12"
                >
                  {[
                    { val: "4", label: "Fan yo'nalishi" },
                    { val: "80+", label: "Savol bazasi" },
                    { val: "100%", label: "Bepul" },
                    { val: "4", label: "Sertifikat shablon" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-black gradient-text-emerald">{stat.val}</div>
                      <div className="text-white/40 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <motion.a
                    href="#subjects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
                  >
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                    Fan tanlash
                  </motion.a>
                </motion.div>
              </div>
            </section>

            {/* Subject Cards */}
            <SubjectCards t={t} onSelectSubject={handleSubjectSelect} />

            {/* How It Works */}
            <HowItWorks t={t} />

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/10 text-center">
              <div className="flex items-center justify-center gap-2 text-white/30 text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>Mock Sertifikat Trenajyori © {new Date().getFullYear()}</span>
                <Star className="w-3 h-3 text-yellow-500/50" />
                <span className="text-xs">Faqat o'quv maqsadida</span>
              </div>
            </footer>
          </motion.div>
        )}

        {/* Exam Screen */}
        {isUnlocked && screen === "exam" && examState && (
          <motion.div
            key="exam"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", damping: 22 }}
          >
            <ExamEngine
              subject={examState.subject}
              questions={examState.questions}
              t={t}
              onFinish={handleExamFinish}
            />
          </motion.div>
        )}

        {/* Results Screen */}
        {isUnlocked && screen === "results" && examState && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <ResultsScreen
              subject={examState.subject}
              questions={examState.questions}
              answers={examState.answers}
              timeSpent={examState.timeSpent}
              t={t}
              hasCertificate={examState.hasCertificate}
              onGetCertificate={handleGetCertificate}
              onRetry={handleRetry}
              onHome={handleHome}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal (data collection) */}
      <AnimatePresence>
        {showCertModal && selectedSubject && (
          <CertificateModal
            subject={selectedSubject}
            t={t}
            onStartWithCert={handleStartWithCert}
            onStartWithoutCert={handleStartWithoutCert}
            onClose={() => setShowCertModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Certificate Viewer */}
      <AnimatePresence>
        {screen === "certificate" && examState?.hasCertificate && examState.userData && (
          <CertificateViewer
            subject={examState.subject}
            userData={examState.userData}
            score={correctCount}
            totalQuestions={examState.questions.length}
            t={t}
            onClose={() => setScreen("results")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
