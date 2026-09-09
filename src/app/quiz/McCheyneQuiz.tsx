"use client";

import { VSLVideoPlayer } from "@/components/ui/vsl-video-player";
import { useEffect, useRef, useState } from "react";
import "./McCheyneQuiz.css";

type Gender = "Male" | "Female";
type AnswerId = "sim" | "as-vezes" | "nao";
type Answers = Record<string, AnswerId>;

interface Question {
  id: string;
  text: string;
  accent: string;
}



const ANSWER_OPTIONS: { id: AnswerId; label: string; emoji: string }[] = [
  { id: "sim", label: "Sim", emoji: "✓" },
  { id: "as-vezes", label: "Às vezes", emoji: "◐" },
  { id: "nao", label: "Não", emoji: "○" },
];

const QUESTIONS: Question[] = [
  {
    id: "semana",
    text: "Você costuma ler a Bíblia durante a semana?",
    accent: "durante a semana",
  },
  {
    id: "termina",
    text: "Você termina os livros bíblicos que começa?",
    accent: "termina os livros",
  },
  {
    id: "testamentos",
    text: "Você lê tanto o Antigo quanto o Novo Testamento?",
    accent: "Antigo quanto o Novo Testamento",
  },
  {
    id: "proximidade",
    text: "Você se sente próximo da Bíblia como gostaria?",
    accent: "próximo da Bíblia",
  },
  {
    id: "ano",
    text: "Você pensa em ler a Bíblia inteira em um ano?",
    accent: "inteira em um ano",
  },
];

const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_MCCHEYNE_CHECKOUT_URL ??
  "https://marcaseditora.com.br/produtos/biblia-devocional-mccheyne-vintage-preta-snz0d/";

function buzz() {
  if ("vibrate" in navigator) navigator.vibrate(8);
}

function track(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("mccheyne:quiz", {
      detail: { name, ...props, funnel: "quiz-mccheyne-v1" },
    }),
  );
}

function BrandLogo() {
  return (
    <img
      className="pc-wordmark pc-brand-logo"
      src="/quiz/marcas-logo-optimized.webp"
      alt="Marcas Editora"
      width="1080"
      height="300"
      loading="eager"
      fetchPriority="high"
    />
  );
}

function Celestial() {
  return (
    <div className="pc-celestial" aria-hidden="true">
      <i className="pc-cloud pc-cloud--one" />
      <i className="pc-cloud pc-cloud--two" />
      <i className="pc-glow pc-glow--one" />
      <i className="pc-glow pc-glow--two" />
      <i className="pc-star pc-star--one" />
      <i className="pc-star pc-star--two" />
      <i className="pc-star pc-star--three" />
    </div>
  );
}

function AppShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`pc-app ${className}`}>
      <Celestial />
      <div className="pc-app__content">{children}</div>
    </div>
  );
}

function AccentText({ text, accent }: { text: string; accent: string }) {
  const start = text.indexOf(accent);
  if (start < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, start)}
      <span>{accent}</span>
      {text.slice(start + accent.length)}
    </>
  );
}

function Landing({
  onStart,
}: {
  onStart: (gender: Gender) => void;
}) {
  const [selected, setSelected] = useState<Gender | null>(null);
  const locked = useRef(false);

  useEffect(() => {
    track("quiz_landing_viewed");
  }, []);

  const choose = (gender: Gender) => {
    if (locked.current) return;
    locked.current = true;
    setSelected(gender);
    buzz();
    window.setTimeout(() => onStart(gender), 260);
  };

  return (
    <AppShell className="pc-app--entry">
      <main className="pc-entry pc-reveal">
        <BrandLogo />
        <p className="pc-entry__pill">Quiz de 2 minutos</p>
        <h1>Queremos conhecer você.</h1>
        <p className="pc-entry__subtitle">Você é:</p>
        <div className="pc-entry__choices">
          <button
            className={`pc-person-card${selected === "Male" ? " is-selected" : ""}`}
            onClick={() => choose("Male")}
          >
            <span className="pc-person-card__portrait">
              <img
                src="/quiz/homem-dogra-optimized.webp"
                alt=""
                width="560"
                height="700"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </span>
            <span className="pc-person-card__label">
              Homem <b>›</b>
            </span>
          </button>
          <button
            className={`pc-person-card${selected === "Female" ? " is-selected" : ""}`}
            onClick={() => choose("Female")}
          >
            <span className="pc-person-card__portrait">
              <img
                src="/quiz/mulher-dogra-optimized.webp"
                alt=""
                width="560"
                height="700"
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="pc-person-card__label">
              Mulher <b>›</b>
            </span>
          </button>
        </div>
        <p className="pc-entry__legal">
          Ao continuar, você pode consultar nossas{" "}
          <a href="https://marcaseditora.com.br/trocas-e-devolucoes/">
            Trocas e Devoluções
          </a>{" "}
          e a{" "}
          <a href="https://marcaseditora.com.br/politica-de-privacidade/">
            Política de Privacidade
          </a>.
        </p>
      </main>
    </AppShell>
  );
}

function Progress({ current, total }: { current: number; total: number }) {
  return (
    <div className="pc-progress" aria-label={`Pergunta ${current} de ${total}`}>
      {Array.from({ length: total }, (_, index) => (
        <i className={index < current ? "is-filled" : ""} key={index} />
      ))}
    </div>
  );
}

function QuestionScreen({
  index,
  gender,
  selected,
  onBack,
  onAnswer,
}: {
  index: number;
  gender: Gender;
  selected?: AnswerId;
  onBack: () => void;
  onAnswer: (answer: AnswerId) => void;
}) {
  const question = QUESTIONS[index];
  const text =
    gender === "Female"
      ? question.text.replace("próximo da Bíblia", "próxima da Bíblia")
      : question.text;
  const accent =
    gender === "Female"
      ? question.accent.replace("próximo da Bíblia", "próxima da Bíblia")
      : question.accent;
  const current = index + 1;
  const total = QUESTIONS.length;

  return (
    <AppShell className="pc-app--question">
      <main className="pc-question pc-reveal">
        <header className="pc-question__header">
          <button className="pc-back" onClick={onBack} aria-label="Voltar">
            ‹
          </button>
          <BrandLogo />
          <strong>
            {current} / {total}
          </strong>
        </header>
        <Progress current={current} total={total} />
        <h1>
          <AccentText text={text} accent={accent} />
        </h1>
        <div className="pc-question__answers" role="group" aria-label="Escolha uma resposta">
          {ANSWER_OPTIONS.map((answer) => (
            <button
              className={selected === answer.id ? "is-selected" : ""}
              onClick={() => onAnswer(answer.id)}
              aria-pressed={selected === answer.id}
              key={answer.id}
            >
              <span className="pc-answer__emoji" aria-hidden="true">
                {answer.emoji}
              </span>
              <strong>{answer.label}</strong>
              <span className="pc-answer__check" aria-hidden="true">
                {selected === answer.id ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>
      </main>
    </AppShell>
  );
}

function Loading({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(4);
  const finished = useRef(false);

  useEffect(() => {
    if (document.head.querySelector('link[data-mccheyne-wistia="true"]')) return;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fast.wistia.com";
    link.crossOrigin = "anonymous";
    link.dataset.mccheyneWistia = "true";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const next = Math.min(100, Math.round(4 + (elapsed / 1200) * 96));
      setProgress(next);
      if (next >= 100 && !finished.current) {
        finished.current = true;
        window.clearInterval(timer);
        window.setTimeout(onDone, 180);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [onDone]);

  return (
    <AppShell className="pc-app--loading pc-app--loading-journey">
      <main className="pc-loading pc-loading--journey pc-reveal">
        <BrandLogo />

        <div className="pc-loading__stage">
          <div
            className="pc-loading__journey-ring"
            style={{ "--pc-progress": `${progress * 3.6}deg` } as React.CSSProperties}
            aria-hidden="true"
          />
          <div className="pc-loading__book">
            <img
              src="/quiz/biblias-mccheyne-optimized.webp"
              alt=""
              width="1080"
              height="510"
              decoding="async"
            />
          </div>
          <output className="pc-loading__badge" aria-label={`${progress}% concluído`}>
            <strong>{progress}%</strong>
            <span>concluído</span>
          </output>
        </div>

        <p className="pc-loading__eyebrow">Só mais um instante</p>
        <h1>Abrindo o próximo capítulo...</h1>
        <p className="pc-loading__copy">
          Em seguida, você vai conhecer uma forma de percorrer a Bíblia inteira ao
          longo de um ano.
        </p>

        <div className="pc-loading__track" aria-hidden="true">
          <i style={{ width: `${progress}%` }} />
        </div>
      </main>
    </AppShell>
  );
}

function CheckoutScreen() {
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    track("quiz_offer_viewed", { price: 87.9 });
  }, []);

  const checkout = () => {
    buzz();
    track("quiz_checkout_clicked", { price: 87.9 });
    window.location.assign(CHECKOUT_URL);
  };

  return (
    <AppShell className="pc-app--result pc-app--checkout">
      <main className="pc-checkout pc-reveal">
        <BrandLogo />

        <h1>
          Leia a Bíblia inteira em 1 ano, <span>com 10 minutos por dia.</span>
        </h1>

        <VSLVideoPlayer className="pc-checkout__vsl" />

        <section className="pc-checkout__product" aria-label="Bíblia Devocional McCheyne">
          <img
            className="pc-checkout__bibles"
            src="/quiz/biblias-mccheyne-optimized.webp"
            alt="Bíblias Devocionais McCheyne"
            width="1080"
            height="510"
            decoding="async"
          />

          <div className="pc-checkout__price">
            <small>Bíblia Devocional McCheyne</small>
            <strong>R$ 87,90</strong>
            <span>pagamento único</span>
          </div>

          <button className="pc-checkout-cta" onClick={checkout}>
            Quero minha Bíblia <span>›</span>
          </button>

          <img
            className="pc-checkout__payments"
            src="/quiz/pagamentos-optimized.webp"
            alt="Pagamento por Pix, Apple Pay, Visa, Mastercard, Elo, Hipercard, American Express, boleto e débito"
            width="700"
            height="80"
            decoding="async"
          />
        </section>
      </main>
    </AppShell>
  );
}

export function McCheyneQuiz() {
  const [screen, setScreen] = useState<"landing" | "questions" | "loading" | "result">(
    "landing",
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<AnswerId>();
  const [gender, setGender] = useState<Gender>("Female");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Seu caminho de leitura | Bíblia McCheyne";
    document.documentElement.classList.add("pc-document");
    document.body.classList.add("pc-document");
    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("pc-document");
      document.body.classList.remove("pc-document");
    };
  }, []);

  const start = (nextGender: Gender) => {
    setGender(nextGender);
    track("quiz_started", { gender: nextGender });
    setScreen("questions");
    window.scrollTo(0, 0);
  };

  const answer = (value: AnswerId) => {
    if (selected) return;
    buzz();
    const question = QUESTIONS[index];
    setSelected(value);
    setAnswers((current) => ({ ...current, [question.id]: value }));
    track("quiz_step", {
      step_id: question.id,
      step_number: index + 1,
      answer: value,
    });
    window.setTimeout(() => {
      setSelected(undefined);
      if (index >= QUESTIONS.length - 1) {
        track("quiz_completed", { question_count: QUESTIONS.length });
        setScreen("loading");
      } else {
        setIndex((current) => current + 1);
      }
    }, 280);
  };

  const back = () => {
    if (screen === "questions") {
      if (index === 0) setScreen("landing");
      else setIndex((current) => current - 1);
      setSelected(undefined);
      return;
    }
    if (screen === "result") {
      setScreen("questions");
      setIndex(QUESTIONS.length - 1);
      window.scrollTo(0, 0);
    }
  };

  let content: React.ReactNode;
  if (screen === "landing") content = <Landing onStart={start} />;
  else if (screen === "questions") {
    content = (
      <QuestionScreen
        key={QUESTIONS[index].id}
        index={index}
        gender={gender}
        selected={selected}
        onBack={back}
        onAnswer={answer}
      />
    );
  } else if (screen === "loading") {
    content = (
      <Loading
        onDone={() => {
          setScreen("result");
          window.scrollTo(0, 0);
        }}
      />
    );
  } else {
    content = <CheckoutScreen />;
  }

  return <div className="pc-quiz-root">{content}</div>;
}
