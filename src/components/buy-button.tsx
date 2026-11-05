"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";

// Página do produto (e não a lista da marca): o visitante cai direto na Bíblia,
// e a página de produto mantém os parâmetros da URL — o redirecionamento do
// cart-link da Nuvemshop descarta utm e fbclid.
const BUY_URL =
  "https://marcaseditora.com.br/produtos/biblia-devocional-mccheyne-vintage-preta-snz0d/";

export const PRECO = 87.9;

// Repassa para a loja a origem que trouxe o visitante (utm_* e fbclid do anúncio),
// para o GA4 e o pixel da loja saberem que a venda veio desta página.
function linkDaLoja() {
  const destino = new URL(BUY_URL);
  const aqui = new URLSearchParams(window.location.search);
  for (const [chave, valor] of aqui) {
    if (chave.startsWith("utm_") || chave === "fbclid" || chave === "gclid") {
      destino.searchParams.set(chave, valor);
    }
  }
  if (!destino.searchParams.has("utm_source")) {
    destino.searchParams.set("utm_source", "bibliamccheyne.shop");
    destino.searchParams.set("utm_medium", "landing-page");
    destino.searchParams.set("utm_campaign", "lp-mccheyne");
  }
  return destino.toString();
}

export function BuyButton() {
  const handleClick = () => {
    const url = linkDaLoja();
    // Mesma aba, como no quiz: window.open depois de um callback assíncrono
    // é tratado como pop-up e bloqueado (Safari no iPhone, navegador do Instagram).
    const redirect = () => {
      window.location.assign(url);
    };

    window.fbq?.("track", "InitiateCheckout", {
      value: PRECO,
      currency: "BRL",
      content_name: "Bíblia Devocional McCheyne",
      content_type: "product",
    });

    if (typeof window !== "undefined" && window.gtag) {
      let fired = false;
      const callback = () => {
        if (fired) return;
        fired = true;
        redirect();
      };
      window.gtag("event", "conversion", {
        send_to: "AW-11475943566/pkbICMerlKkcEI6BlOAq",
        value: 1.0,
        currency: "BRL",
        event_callback: callback,
      });
      setTimeout(callback, 1000);
    } else {
      redirect();
    }
  };

  return (
    <button onClick={handleClick} className="block w-full" type="button">
      <ShimmerButton
        background="#680d3a"
        shimmerColor="#b8860b"
        shimmerSize="0.05em"
        shimmerDuration="2s"
        className="w-full h-14 sm:h-16 text-sm sm:text-base font-bold tracking-wide uppercase"
      >
        Quero a minha - R$ 87,90
      </ShimmerButton>
    </button>
  );
}
