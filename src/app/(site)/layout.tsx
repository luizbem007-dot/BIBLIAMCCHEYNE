import { Navbar } from "@/components/sections/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-11475943566"
        strategy="afterInteractive"
      />
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11475943566');
        `}
      </Script>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div
          className={`${geistSans.variable} ${geistMono.variable} font-sans max-w-7xl mx-auto border-x relative`}
        >
          <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10" />
          <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10" />
          <Navbar />
          {children}
        </div>
      </ThemeProvider>
    </>
  );
}
