import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: "#059669",
          light: "#10B981",
          dark: "#047857",
        },
        royal: {
          DEFAULT: "#1D4ED8",
          light: "#3B82F6",
          dark: "#1E3A8A",
        },
        crimson: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
          dark: "#B91C1C",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "float-slow": "float 8s ease-in-out infinite 4s",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient-shift": "gradientShift 4s ease infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(5,150,105,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(5,150,105,0.8), 0 0 60px rgba(5,150,105,0.4)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
