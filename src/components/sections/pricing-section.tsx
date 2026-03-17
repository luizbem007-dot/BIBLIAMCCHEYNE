import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-10 py-20 w-full relative bg-[#F9FAFB] dark:bg-background"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 px-6">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance text-primary">
          A Sua Transformação Começa Hoje.
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium max-w-lg">
          Não adie mais a sua vida espiritual. Oferta especial de lançamento com
          preço único e sem mensalidades.
        </p>
      </div>

      {/* Card Central */}
      <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-accent rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] border border-border/50 overflow-hidden">
          {/* Imagem da Bíblia */}
          <div className="w-full">
            <img
              src="/VENDAA.webp"
              alt="Bíblia Devocional McCheyne"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Badge + Título + Preço */}
          <div className="flex flex-col items-center gap-4 pt-8 pb-6 px-4 sm:px-6">
            <span className="inline-flex items-center gap-1.5 bg-secondary/10 text-sm font-semibold px-4 py-1.5 rounded-full">
              🏆 <AnimatedGradientText colorFrom="#680d3a" colorTo="#b8860b" speed={2}>O Plano Completo de 1 Ano</AnimatedGradientText>
            </span>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-primary text-center">
              Bíblia Devocional McCheyne
            </h3>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg text-muted-foreground line-through">
                De R$ 87,00
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground mr-1">Por apenas</span>
                <span className="text-5xl md:text-6xl font-bold tracking-tighter text-primary">
                  R$ 80
                </span>
                <span className="text-2xl font-semibold text-primary">,00</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              pagamento único | sem taxas escondidas
            </p>
          </div>

          {/* CTA */}
          <div className="px-4 sm:px-6 pb-8">
            <Link href="#" className="block w-full">
              <ShimmerButton
                background="#680d3a"
                shimmerColor="#b8860b"
                shimmerSize="0.05em"
                shimmerDuration="2.5s"
                className="w-full h-14 text-xs sm:text-sm md:text-base font-semibold tracking-wide"
              >
                SIM, QUERO GARANTIR MINHA BÍBLIA POR R$ 80
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Garantia */}
      <div className="flex items-center gap-2 text-muted-foreground px-6">
        <ShieldCheck className="size-5 text-secondary/60" />
        <span className="text-sm">Compra 100% segura com garantia de satisfação</span>
      </div>
    </section>
  );
}
