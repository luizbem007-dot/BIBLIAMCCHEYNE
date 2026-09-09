import type { Metadata } from "next";
import { McCheyneQuiz } from "./McCheyneQuiz";

export const metadata: Metadata = {
  title: "Seu caminho de leitura | Bíblia McCheyne",
  description:
    "Responda perguntas rápidas e descubra seu caminho para ler a Bíblia inteira em um ano.",
};

export default function QuizPage() {
  return <McCheyneQuiz />;
}
