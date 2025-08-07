import React, { useContext } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { DarkModeContext } from "@/App";
const Index = () => {
  const {
    darkMode,
    toggleDarkMode
  } = useContext(DarkModeContext);
  return;
};
export default Index;