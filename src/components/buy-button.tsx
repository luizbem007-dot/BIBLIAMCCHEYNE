"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";

const BUY_URL = "https://marcaseditora.com.br/produtos/?brand=Cpp";

export function BuyButton() {
  const handleClick = () => {
    const redirect = () => {
      window.open(BUY_URL, "_blank", "noopener,noreferrer");
    };

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
        Aproveite Agora — R$80
      </ShimmerButton>
    </button>
  );
}
