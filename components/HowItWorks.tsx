"use client";

import { motion } from "framer-motion";
import { BookOpen, ClipboardList, BarChart3, Award } from "lucide-react";
import { Translations } from "@/data/translations";

interface HowItWorksProps {
  t: Translations;
}

const steps = [
  { icon: BookOpen, color: "from-blue-600 to-blue-500", glow: "rgba(37,99,235,0.4)" },
  { icon: ClipboardList, color: "from-purple-600 to-purple-500", glow: "rgba(124,58,237,0.4)" },
  { icon: BarChart3, color: "from-emerald-600 to-emerald-500", glow: "rgba(5,150,105,0.4)" },
  { icon: Award, color: "from-orange-500 to-amber-500", glow: "rgba(245,158,11,0.4)" },
];

export default function HowItWorks({ t }: HowItWorksProps) {
  const stepData = [
    { title: t.step1, desc: t.step1Desc },
    { title: t.step2, desc: t.step2Desc },
    { title: t.step3, desc: t.step3Desc },
    { title: t.step4, desc: t.step4Desc },
  ];

  return (
    <section id="how" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t.howTitle}
          </h2>
          <p className="text-white/40 text-lg">Oddiy 4 qadam bilan rasmiy sertifikatga ega bo'ling</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-emerald-500 to-amber-500 opacity-30" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl relative z-10`}
                    style={{ boxShadow: `0 8px 25px ${step.glow}` }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-xs font-black flex items-center justify-center"
                      style={{ color: "#0a0f1a" }}
                    >
                      {i + 1}
                    </div>
                  </motion.div>
                </div>

                <h3 className="text-white font-bold text-lg mb-2">{stepData[i].title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{stepData[i].desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
