import dynamic from "next/dynamic";
import { ConversionTracker } from "@/components/conversion-tracker";
import { HeroSection } from "@/components/sections/hero-section";

const BentoSection = dynamic(() =>
  import("@/components/sections/bento-section").then((module) => ({ default: module.BentoSection })),
);
const QuoteSection = dynamic(() =>
  import("@/components/sections/quote-section").then((module) => ({ default: module.QuoteSection })),
);
const FeatureSection = dynamic(() =>
  import("@/components/sections/feature-section").then((module) => ({ default: module.FeatureSection })),
);
const PricingSection = dynamic(() =>
  import("@/components/sections/pricing-section").then((module) => ({ default: module.PricingSection })),
);
const TestimonialSection = dynamic(() =>
  import("@/components/sections/testimonial-section").then((module) => ({
    default: module.TestimonialSection,
  })),
);
const FAQSection = dynamic(() =>
  import("@/components/sections/faq-section").then((module) => ({ default: module.FAQSection })),
);
const FooterSection = dynamic(() =>
  import("@/components/sections/footer-section").then((module) => ({ default: module.FooterSection })),
);

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
