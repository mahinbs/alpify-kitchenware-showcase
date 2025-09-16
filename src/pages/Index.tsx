import React from "react";
import ElegantVideoHero from "@/components/ElegantVideoHero";
import VibrantProductCategories from "@/components/VibrantProductCategories";
import AboutSection from "@/components/AboutSection";
import BrochureSection from "@/components/BrochureSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen">
      <ElegantVideoHero />
      <div id="products">
        <VibrantProductCategories />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <BrochureSection />
      <WhyChooseUs />
      <ContactSection />
      <StickyQuotationButton />
      <FloatingWhatsAppButton />
    </main>
  );
};

export default Index;
