"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ConversionTracker() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "conversion", {
      send_to: "AW-11475943566/23ozCMqrlKkcEI6BlOAq",
      value: 1.0,
      currency: "BRL",
    });
  }, []);

  return null;
}
