import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSerialNumber(subject: string): string {
  const prefix = subject.toUpperCase().slice(0, 3);
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `UZ-${year}-${prefix}-${random}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function calculateLevel(
  subject: string,
  percentage: number
): string {
  if (subject === "cefr") {
    if (percentage >= 90) return "C1";
    if (percentage >= 75) return "B2";
    if (percentage >= 60) return "B1";
    if (percentage >= 45) return "A2";
    return "A1";
  } else {
    if (percentage >= 86) return "A+";
    if (percentage >= 75) return "A";
    if (percentage >= 71) return "B+";
    if (percentage >= 60) return "B";
    return "C";
  }
}

export function getLevelColor(level: string): string {
  switch (level) {
    case "A+":
    case "C1":
      return "#059669";
    case "A":
    case "B2":
      return "#10B981";
    case "B+":
    case "B1":
      return "#1D4ED8";
    case "B":
    case "A2":
      return "#7C3AED";
    default:
      return "#DC2626";
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getUsedIds(subject: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(`used_ids_${subject}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function appendUsedIds(subject: string, ids: string[]): void {
  if (typeof window === "undefined") return;
  const existing = getUsedIds(subject);
  const updated = Array.from(new Set([...existing, ...ids]));
  localStorage.setItem(`used_ids_${subject}`, JSON.stringify(updated));
}

export function resetUsedIds(subject: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`used_ids_${subject}`);
}

export function getQuestionsForSession<T extends { id: string }>(
  allQuestions: T[],
  subject: string,
  count: number
): T[] {
  const usedIds = getUsedIds(subject);
  let available = allQuestions.filter((q) => !usedIds.includes(q.id));

  if (available.length < count) {
    resetUsedIds(subject);
    available = [...allQuestions];
  }

  const shuffled = shuffleArray(available);
  const selected = shuffled.slice(0, count);
  appendUsedIds(subject, selected.map((q) => q.id));
  return selected;
}
