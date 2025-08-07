import React, { useContext } from "react";
import Navigation from "@/components/Navigation";
import VibrantHeroSection from "@/components/VibrantHeroSection";
import VibrantProductCategories from "@/components/VibrantProductCategories";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { DarkModeContext } from "@/App";

const Index = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <main className="min-h-screen">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <VibrantHeroSection />
      <div id="products">
        <VibrantProductCategories />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <WhyChooseUs />
      <ContactSection />
      <Footer />
      <StickyQuotationButton />
    </main>
  );
};

export default Index;
