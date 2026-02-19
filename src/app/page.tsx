import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import TemplateShowcase from "@/components/landing/TemplateShowcase";
import GalleryPreview from "@/components/landing/GalleryPreview";
import PricingPreview from "@/components/landing/PricingPreview";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <Hero />
        <HowItWorks />
        <TemplateShowcase />
        <GalleryPreview />
        <PricingPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
