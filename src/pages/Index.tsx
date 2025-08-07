import HeroSection from "@/components/HeroSection"
import ProductCategories from "@/components/ProductCategories"
import AboutSection from "@/components/AboutSection"
import WhyChooseUs from "@/components/WhyChooseUs"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import StickyQuotationButton from "@/components/StickyQuotationButton"

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div id="products">
        <ProductCategories />
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
