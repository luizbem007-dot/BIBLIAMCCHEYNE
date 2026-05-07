import dynamic from "next/dynamic";
import { ConversionTracker } from "@/components/conversion-tracker";
import { HeroSection } from "@/components/sections/hero-section";

const BentoSection       = dynamic(() => import("@/components/sections/bento-section").then(m => ({ default: m.BentoSection })));
const QuoteSection       = dynamic(() => import("@/components/sections/quote-section").then(m => ({ default: m.QuoteSection })));
const FeatureSection     = dynamic(() => import("@/components/sections/feature-section").then(m => ({ default: m.FeatureSection })));
const PricingSection     = dynamic(() => import("@/components/sections/pricing-section").then(m => ({ default: m.PricingSection })));
const TestimonialSection = dynamic(() => import("@/components/sections/testimonial-section").then(m => ({ default: m.TestimonialSection })));
const FAQSection         = dynamic(() => import("@/components/sections/faq-section").then(m => ({ default: m.FAQSection })));
const FooterSection      = dynamic(() => import("@/components/sections/footer-section").then(m => ({ default: m.FooterSection })));

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
      <ConversionTracker />
      <HeroSection />
      <BentoSection />
      <QuoteSection />
      <FeatureSection />
      <PricingSection />
      <TestimonialSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
