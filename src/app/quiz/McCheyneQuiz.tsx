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
}

const QUESTIONS: Question[] = [
  {
    id: "desejo",
    phase: "Seu objetivo",
    text: "Ler a Bíblia inteira é um desejo seu hoje?",
    accent: "Bíblia inteira",
    options: [
      { id: "muito", label: "Sim, muito", emoji: "✦" },
      { id: "distante", label: "Sim, mas parece distante", emoji: "↗" },
      { id: "incerto", label: "Ainda não sei", emoji: "○" },
    ],
  },
  {
    id: "frequencia",
    phase: "Sua rotina",
    text: "Hoje, sua leitura acontece com que frequência?",
    accent: "que frequência",
    options: [
      { id: "quase-todos", label: "Quase todos os dias", emoji: "✓" },
      { id: "alguns", label: "Alguns dias", emoji: "◐" },
      { id: "raramente", label: "Raramente", emoji: "○" },
    ],
  },
  {
    id: "direcao",
    phase: "Sua rotina",
    text: "Quando abre a Bíblia, você já sabe exatamente o que ler?",
    accent: "exatamente o que ler",
    options: [
      { id: "quase-sempre", label: "Quase sempre", emoji: "✓" },
      { id: "as-vezes", label: "Às vezes", emoji: "◐" },
      { id: "raramente", label: "Raramente", emoji: "○" },
    ],
  },
  {
    id: "plano",
    phase: "Sua experiência",
    text: "Você já começou um plano de leitura e parou no caminho?",
    accent: "parou no caminho",
    options: [
      { id: "mais-de-uma", label: "Mais de uma vez", emoji: "↺" },
      { id: "uma-vez", label: "Uma vez", emoji: "◐" },
      { id: "nunca", label: "Nunca segui um plano", emoji: "○" },
    ],
  },
  {
    id: "rotina",
    phase: "O que interrompe",
    text: "Quando a semana fica corrida, a leitura costuma ficar para depois?",
    accent: "ficar para depois",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "as-vezes", label: "Às vezes", emoji: "◐" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "panorama",
    phase: "Sua compreensão",
    text: "Você conhece alguns trechos, mas ainda não enxerga a Bíblia como um todo?",
    accent: "Bíblia como um todo",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "em-parte", label: "Em parte", emoji: "◐" },
      { id: "nao", label: "Não", emoji: "○" },
    ],
  },
  {
    id: "conclusao",
    phase: "Sua constância",
    text: "Você costuma terminar os livros bíblicos que começa?",
    accent: "terminar os livros",
    options: [
      { id: "geralmente", label: "Geralmente", emoji: "✓" },
      { id: "as-vezes", label: "Às vezes", emoji: "◐" },
      { id: "raramente", label: "Raramente", emoji: "○" },
    ],
  },
  {
    id: "sentimento",
    phase: "Como isso pesa",
    text: "Quando passam alguns dias sem leitura, o que você sente primeiro?",
    accent: "o que você sente primeiro",
    options: [
      { id: "falta", label: "Sinto falta", emoji: "♡" },
      { id: "frustracao", label: "Fico frustrado(a)", emoji: "!" },
      { id: "recomeco", label: "Quero recomeçar", emoji: "↺" },
      { id: "neutro", label: "Não muda muito", emoji: "○" },
    ],
  },
  {
    id: "organizacao",
    phase: "O que ajudaria",
    text: "Se cada dia já mostrasse exatamente o que ler, isso ajudaria você a continuar?",
    accent: "exatamente o que ler",
    options: [
      { id: "muito", label: "Ajudaria muito", emoji: "✦" },
      { id: "um-pouco", label: "Ajudaria um pouco", emoji: "◐" },
      { id: "nao", label: "Não faria diferença", emoji: "○" },
    ],
  },
  {
    id: "tempo",
    phase: "Seu próximo passo",
    text: "Você conseguiria separar 10 minutos por dia se soubesse o que ler?",
    accent: "10 minutos por dia",
    options: [
      { id: "sim", label: "Sim", emoji: "✓" },
      { id: "maioria", label: "Na maioria dos dias", emoji: "◐" },
      { id: "incerto", label: "Ainda não sei", emoji: "○" },
    ],
  },
];

const MIDPOINT_INDEX = 4;

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
        <p className="pc-entry__pill">10 perguntas · menos de 2 minutos</p>
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
  const text = question.text;
  const accent = question.accent;
  const current = index + 1;
  const total = QUESTIONS.length;

  return (
    <AppShell className="pc-app--question">
      <main
        className={`pc-question pc-reveal${question.options.length > 3 ? " pc-question--four" : ""}`}
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

function midpointMessage(answers: Answers) {
  const readingOften = answers.frequencia === "quase-todos";
  const routineHolds = answers.rotina === "nao";
  const stoppedBefore = answers.plano === "mais-de-uma" || answers.plano === "uma-vez";

  if (readingOften && routineHolds) {
    return {
      title: "Você já abriu espaço para a Palavra.",
      copy: "Agora vamos entender o que pode transformar essa leitura em um percurso completo, sem deixar partes importantes para trás.",
    };
  }

  if (stoppedBefore || answers.rotina === "sim") {
    return {
      title:
        answers.desejo === "incerto"
          ? "A rotina mostra onde a leitura costuma parar."
          : "O desejo existe. A rotina é que interrompe o caminho.",
      copy: "Isso não mede a sua fé. Só mostra que vontade e constância são coisas diferentes — e que o caminho precisa funcionar também nos dias corridos.",
    };
  }

  return {
    title: "Você chegou à metade.",
    copy: "Agora vamos entender o que tornaria sua leitura mais clara, constante e possível de continuar até o fim.",
  };
}

function Checkpoint({
  answers,
  onBack,
  onContinue,
}: {
  answers: Answers;
  onBack: () => void;
  onContinue: () => void;
}) {
  const message = midpointMessage(answers);

  useEffect(() => {
    track("quiz_midpoint_viewed", { answered: MIDPOINT_INDEX + 1 });
  }, []);

  return (
    <AppShell className="pc-app--bridge">
      <main className="pc-bridge pc-reveal">
        <header className="pc-question__header">
          <button className="pc-back" onClick={onBack} aria-label="Voltar">
            ‹
          </button>
          <BrandLogo />
          <strong>50%</strong>
        </header>

        <div className="pc-bridge__visual" aria-hidden="true">
          <span>5</span>
          <i />
          <b>10</b>
        </div>

        <p className="pc-bridge__eyebrow">Uma pausa rápida</p>
        <h1>{message.title}</h1>
        <p className="pc-bridge__copy">{message.copy}</p>

        <button className="pc-bridge__cta" onClick={onContinue}>
          Entender o que falta <span>›</span>
        </button>
      </main>
    </AppShell>
  );
}

interface QuizProfile {
  id: "caminho" | "ritmo" | "panorama";
  eyebrow: string;
  title: string;
  copy: string;
  insight: string;
  signals: {
    desire: string;
    rhythm: string;
    direction: string;
  };
}

function buildProfile(answers: Answers): QuizProfile {
  const desireIsClear = answers.desejo !== "incerto";
  const directionScore =
    (answers.direcao === "raramente" ? 3 : answers.direcao === "as-vezes" ? 1 : 0) +
    (answers.plano === "mais-de-uma" ? 2 : answers.plano === "uma-vez" ? 1 : 0) +
    (answers.organizacao === "muito" ? 2 : answers.organizacao === "um-pouco" ? 1 : 0);

  const rhythmScore =
    (answers.frequencia === "raramente" ? 3 : answers.frequencia === "alguns" ? 1 : 0) +
    (answers.rotina === "sim" ? 2 : answers.rotina === "as-vezes" ? 1 : 0) +
    (answers.conclusao === "raramente" ? 2 : answers.conclusao === "as-vezes" ? 1 : 0) +
    (answers.tempo === "incerto" ? 2 : answers.tempo === "maioria" ? 1 : 0);

  const panoramaScore =
    (answers.panorama === "sim" ? 3 : answers.panorama === "em-parte" ? 1 : 0) +
    (answers.desejo === "muito" ? 2 : answers.desejo === "distante" ? 1 : 0) +
    (answers.conclusao === "geralmente" ? 1 : 0);

  const signals = {
    desire:
      answers.desejo === "muito"
        ? "Muito claro"
        : answers.desejo === "distante"
          ? "Existe"
          : "Em construção",
    rhythm:
      answers.frequencia === "quase-todos"
        ? "Já acontece"
        : answers.frequencia === "alguns"
          ? "Oscilante"
          : "Ainda irregular",
    direction:
      answers.direcao === "quase-sempre"
        ? "Clara"
        : answers.direcao === "as-vezes"
          ? "Variável"
          : "Indefinida",
  };

  if (rhythmScore >= directionScore && rhythmScore >= panoramaScore) {
    return {
      id: "ritmo",
      eyebrow: "Seu ponto de partida: constância",
      title: desireIsClear
        ? "A vontade existe. O desafio é fazê-la caber na vida real."
        : "Seu primeiro passo é encontrar um ritmo que caiba na vida real.",
      copy: desireIsClear
        ? "Sua leitura disputa espaço com a semana corrida e perde ritmo quando cada dia depende de uma nova decisão."
        : "Você ainda está entendendo esse objetivo, e uma rotina pesada tornaria essa decisão ainda mais difícil.",
      insight: "O melhor caminho para você precisa ser curto, definido e fácil de retomar — inclusive depois de um dia perdido.",
      signals,
    };
  }

  if (directionScore >= panoramaScore) {
    return {
      id: "caminho",
      eyebrow: "Seu ponto de partida: direção",
      title: desireIsClear
        ? "O desejo existe. O que falta é um caminho claro para amanhã."
        : "Um caminho claro pode ajudar você a descobrir o próximo passo.",
      copy: desireIsClear
        ? "Suas respostas colocam a escolha do que ler e o recomeço depois de uma pausa entre os principais pontos de atrito."
        : "Você ainda está entendendo esse objetivo, mas saber exatamente o que ler pode tornar o começo mais simples.",
      insight: "Um percurso diário já organizado reduz essa decisão repetida: você abre, lê a porção do dia e sabe onde continuar.",
      signals,
    };
  }

  return {
    id: "panorama",
    eyebrow: "Seu ponto de partida: visão do todo",
    title: desireIsClear
      ? "Você não busca apenas ler mais. Busca finalmente enxergar o todo."
      : "Seu próximo passo pode ser enxergar como as partes formam o todo.",
    copy: desireIsClear
      ? "Suas respostas mostram interesse em sair dos trechos conhecidos e percorrer a Bíblia sem abandonar os livros mais densos."
      : "Você ainda está entendendo esse objetivo, mas demonstrou interesse em conhecer a Bíblia além dos trechos mais familiares.",
    insight: "Para isso, o caminho precisa distribuir a leitura ao longo do ano e manter Antigo e Novo Testamento presentes.",
    signals,
  };
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

        <p className="pc-loading__eyebrow">Respostas registradas</p>
        <h1>Preparando seu ponto de partida...</h1>
        <p className="pc-loading__copy">
          O resultado organiza o que você marcou. Ele não mede a sua fé e não cria
          um diagnóstico sobre você.
        </p>

        <div className="pc-loading__track" aria-hidden="true">
          <i style={{ width: `${progress}%` }} />
        </div>
      </main>
    </AppShell>
  );
}

function ProfileScreen({
  answers,
  onBack,
  onContinue,
}: {
  answers: Answers;
  onBack: () => void;
  onContinue: () => void;
}) {
  const profile = buildProfile(answers);

  useEffect(() => {
    track("quiz_profile_viewed", { profile: profile.id });
  }, [profile.id]);

  return (
    <AppShell className="pc-app--profile">
      <main className="pc-profile pc-reveal">
        <header className="pc-question__header">
          <button className="pc-back" onClick={onBack} aria-label="Voltar">
            ‹
          </button>
          <BrandLogo />
          <strong>Resultado</strong>
        </header>

        <p className="pc-profile__eyebrow">{profile.eyebrow}</p>
        <h1>{profile.title}</h1>
        <p className="pc-profile__copy">{profile.copy}</p>

        <div className="pc-profile__signals" aria-label="Resumo das suas respostas">
          <div>
            <span>Desejo</span>
            <strong>{profile.signals.desire}</strong>
          </div>
          <div>
            <span>Ritmo</span>
            <strong>{profile.signals.rhythm}</strong>
          </div>
          <div>
            <span>Direção</span>
            <strong>{profile.signals.direction}</strong>
          </div>
        </div>

        <section className="pc-profile__insight">
          <small>O que isso indica</small>
          <p>{profile.insight}</p>
        </section>

        <button className="pc-profile__cta" onClick={onContinue}>
          Conhecer um caminho possível <span>›</span>
        </button>
        <small className="pc-profile__note">
          Resultado baseado somente nas respostas deste quiz.
        </small>
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
  const [screen, setScreen] = useState<
    "landing" | "questions" | "checkpoint" | "loading" | "profile" | "result"
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
      } else if (index === MIDPOINT_INDEX) {
        setScreen("checkpoint");
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
    if (screen === "checkpoint") {
      setScreen("questions");
      setIndex(MIDPOINT_INDEX);
      setSelected(undefined);
      return;
    }
    if (screen === "profile") {
      setScreen("questions");
      setIndex(QUESTIONS.length - 1);
      setSelected(undefined);
      window.scrollTo(0, 0);
      return;
    }
    if (screen === "result") {
      setScreen("profile");
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
  } else if (screen === "checkpoint") {
    content = (
      <Checkpoint
        answers={answers}
        onBack={back}
        onContinue={() => {
          setIndex(MIDPOINT_INDEX + 1);
          setScreen("questions");
          window.scrollTo(0, 0);
        }}
      />
    );
  } else if (screen === "loading") {
    content = (
      <Loading
        onDone={() => {
          setScreen("profile");
          window.scrollTo(0, 0);
        }}
      />
    );
  } else if (screen === "profile") {
    content = (
      <ProfileScreen
        answers={answers}
        onBack={back}
        onContinue={() => {
          track("quiz_profile_continued", { profile: buildProfile(answers).id });
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
