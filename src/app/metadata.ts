import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Bíblia McCheyne",
    "Bíblia Devocional",
    "Plano de Leitura Bíblica",
    "McCheyne",
    "Devocional Diário",
    "Leitura da Bíblia",
    "Almeida Corrigida Fiel",
    "Bíblia Cristã",
    "Plano McCheyne",
  ],
  authors: [
    {
      name: "Bíblia Devocional McCheyne",
    },
  ],
  creator: "Bíblia Devocional McCheyne",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-biblia.jpeg",
        width: 1200,
        height: 630,
        alt: "Bíblia Devocional McCheyne — Leia a Bíblia inteira em 1 ano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-biblia.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
