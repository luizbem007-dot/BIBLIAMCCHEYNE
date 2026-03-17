import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-8 py-16 md:py-20 w-full relative"
    >
      {/* Card Central - sem subfundo, direto no background */}
      <div className="w-full max-w-md mx-auto px-4">
        {/* Título */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-primary mb-6">
          Bíblia Devocional McCheyne
        </h2>

        {/* Imagem destaque */}
        <div className="w-full rounded-t-3xl overflow-hidden">
          <img
            src="/VENDAA.webp"
            alt="Bíblia Devocional McCheyne"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col items-center gap-5 pt-8 pb-4">
          {/* Badge animado */}
          <div className="group inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-5 py-2 text-sm shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm dark:border-white/5 dark:bg-black">
            <span>🏆</span>
            <span className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <AnimatedGradientText colorFrom="#680d3a" colorTo="#b8860b" speed={2} className="font-semibold">O Plano Completo de 1 Ano</AnimatedGradientText>
          </div>

          {/* Preço - destaque visual */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-base text-muted-foreground line-through decoration-red-400/60">
              R$ 87,00
            </span>
            <div className="relative">
              <span className="text-6xl sm:text-7xl font-black tracking-tighter text-primary">
                R$80
              </span>
            </div>
            <span className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
              pagamento único
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2 pb-6">
          <Link href="#" className="block w-full">
            <ShimmerButton
              background="#680d3a"
              shimmerColor="#b8860b"
              shimmerSize="0.05em"
              shimmerDuration="2s"
              className="w-full h-14 sm:h-16 text-sm sm:text-base font-bold tracking-wide uppercase"
            >
              Aproveite Agora — R$80
            </ShimmerButton>
          </Link>
        </div>

        {/* Garantia */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground pb-2">
          <ShieldCheck className="size-4 text-secondary/70" />
          <span className="text-xs">Compra 100% segura • Garantia de satisfação</span>
        </div>
      </div>
    </section>
  );
}
