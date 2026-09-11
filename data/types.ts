export interface Question {
  id: string;
  subject: "cefr" | "matematika" | "informatika" | "onaTili";
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level?: string;
  section?: string;
}
