import type { Metadata } from "next";
import { McCheyneQuiz } from "./McCheyneQuiz";

export const metadata: Metadata = {
  title: "Descubra seu caminho de leitura | Bíblia McCheyne",
  description:
    "Em menos de dois minutos, entenda o que falta para sua leitura da Bíblia continuar até o fim.",
};

export default function QuizPage() {
  return <McCheyneQuiz />;
}
