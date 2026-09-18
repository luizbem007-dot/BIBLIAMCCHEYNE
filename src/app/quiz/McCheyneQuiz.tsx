"use client";

import { VSLVideoPlayer } from "@/components/ui/vsl-video-player";
import { useEffect, useRef, useState } from "react";
import "./McCheyneQuiz.css";

type Gender = "Male" | "Female";
type AnswerId = string;
type Answers = Record<string, AnswerId>;

interface AnswerOption {
  id: AnswerId;
  label: string;
  emoji: string;
}

interface Question {
  id: string;
  phase: string;
  text: string;
  accent: string;
  options: AnswerOption[];
  variant?: "reading-format";
}

const QUESTIONS: Question[] = [
  {
    id: "leu_inteira",
    phase: "Sua leitura",
    text: "Você já leu a Bíblia inteira?",
    accent: "Bíblia inteira",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "le_diariamente",
    phase: "Sua rotina",
    text: "Você lê a Bíblia todos os dias?",
    accent: "todos os dias",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "as-vezes", label: "Às vezes", emoji: "◐" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "dias_sem_ler",
    phase: "Sua rotina",
    text: "Você costuma passar vários dias sem abrir a Bíblia?",
    accent: "vários dias",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "as-vezes", label: "Às vezes", emoji: "◐" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "sabe_onde_parou",
    phase: "Sua leitura",
    text: "Você sabe onde parou sua última leitura?",
    accent: "onde parou",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "as-vezes", label: "Às vezes", emoji: "◐" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "le_menos",
    phase: "Seu desejo",
    text: "Você sente que lê a Bíblia menos do que gostaria?",
    accent: "menos do que gostaria",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "as-vezes", label: "Às vezes", emoji: "◐" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "entender_melhor",
    phase: "Sua compreensão",
    text: "Você gostaria de entender melhor a Bíblia?",
    accent: "entender melhor",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "talvez", label: "Talvez", emoji: "◐" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "quer_ler_inteira",
    phase: "Seu objetivo",
    text: "Você gostaria de ler a Bíblia inteira?",
    accent: "Bíblia inteira",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "talvez", label: "Talvez", emoji: "◐" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "formato_preferido",
    phase: "Sua preferência",
    text: "Como você prefere ler a Bíblia?",
    accent: "prefere ler",
    variant: "reading-format",
    options: [
      { id: "celular", label: "No celular", emoji: "📱" },
      { id: "impressa", label: "Impressa", emoji: "📖" },
    ],
  },
];

const CHECKOUT_URL = "https://marcaseditora.com.br/cart-link/1464343353-1";

function buzz() {
  if ("vibrate" in navigator) navigator.vibrate(8);
}

function track(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("mccheyne:quiz", {
      detail: { name, ...props, funnel: "quiz-mccheyne-v2" },
    }),
  );
}

function BrandLogo() {
  return (
    <img
      className="pc-wordmark pc-brand-logo"
      src="/quiz/marcas-logo-240.webp"
      srcSet="/quiz/marcas-logo-240.webp 240w, /quiz/marcas-logo-optimized.webp 432w"
      sizes="118px"
      alt="Marcas Editora"
      width="240"
      height="67"
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
        <p className="pc-entry__pill">8 perguntas · menos de 2 minutos</p>
        <h1>
          Descubra o que falta para sua leitura da Bíblia <span>continuar até o fim.</span>
        </h1>
        <p className="pc-entry__subtitle">Para começar, você é:</p>
        <div className="pc-entry__choices">
          <button
            className={`pc-person-card${selected === "Male" ? " is-selected" : ""}`}
            onClick={() => choose("Male")}
          >
            <span className="pc-person-card__portrait">
              <img
                src="/quiz/homem-dogra-320.webp"
                srcSet="/quiz/homem-dogra-320.webp 320w, /quiz/homem-dogra-optimized.webp 560w"
                sizes="(max-width: 430px) calc((100vw - 56px) / 2), 182px"
                alt=""
                width="320"
                height="400"
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
                src="/quiz/mulher-dogra-320.webp"
                srcSet="/quiz/mulher-dogra-320.webp 320w, /quiz/mulher-dogra-optimized.webp 560w"
                sizes="(max-width: 430px) calc((100vw - 56px) / 2), 182px"
                alt=""
                width="320"
                height="400"
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
  const text = question.text;
  const accent = question.accent;
  const current = index + 1;
  const total = QUESTIONS.length;

  return (
    <AppShell className="pc-app--question">
      <main
        className={`pc-question pc-reveal${question.variant === "reading-format" ? " pc-question--reading-format" : ""}`}
      >
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
        <p className="pc-question__phase">{question.phase}</p>
        <h1>
          <AccentText text={text} accent={accent} />
        </h1>
        <div className="pc-question__answers" role="group" aria-label="Escolha uma resposta">
          {question.options.map((answer) => (
            <button
              className={selected === answer.id ? "is-selected" : ""}
              onClick={() => onAnswer(answer.id)}
              aria-pressed={selected === answer.id}
              key={answer.id}
            >
              <span className="pc-answer__emoji" aria-hidden="true">
                {answer.emoji}
              </span>
              <strong>
                {gender === "Female"
                  ? answer.label.replace("frustrado(a)", "frustrada")
                  : answer.label.replace("frustrado(a)", "frustrado")}
              </strong>
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
      const next = Math.min(100, Math.round(8 + (elapsed / 650) * 92));
      setProgress(next);
      if (next >= 100 && !finished.current) {
        finished.current = true;
        window.clearInterval(timer);
        window.setTimeout(onDone, 100);
      }
    }, 40);
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

        <p className="pc-loading__eyebrow">Quiz concluído</p>
        <h1>Preparando sua próxima etapa...</h1>
        <p className="pc-loading__copy">
          Estamos organizando tudo para mostrar uma forma simples de continuar.
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
  const checkoutStarted = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    track("quiz_offer_viewed", { price: 87.9 });
  }, []);

  const checkout = () => {
    if (checkoutStarted.current) return;
    checkoutStarted.current = true;
    buzz();
    track("quiz_checkout_clicked", { price: 87.9 });
    window.fbq?.("track", "InitiateCheckout", {
      value: 87.9,
      currency: "BRL",
      content_name: "Bíblia Devocional McCheyne",
      content_type: "product",
    });
    window.setTimeout(() => window.location.assign(CHECKOUT_URL), 120);
  };

  return (
    <AppShell className="pc-app--result pc-app--checkout">
      <main className="pc-checkout pc-reveal">
        <BrandLogo />

        <h1>
          Leia a Bíblia inteira em um ano, <span>com apenas 10 minutos por dia.</span>
        </h1>

        <p className="pc-checkout__subtitle">
          Uma Bíblia com as leituras do ano inteiro já organizadas, dia por dia.
        </p>

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
  const [screen, setScreen] = useState<
    "landing" | "questions" | "loading" | "result"
  >("landing");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<AnswerId>();
  const [gender, setGender] = useState<Gender>("Female");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Descubra seu caminho de leitura | Bíblia McCheyne";
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
      setSelected(undefined);
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
