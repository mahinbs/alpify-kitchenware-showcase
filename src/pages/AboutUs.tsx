import React, { useContext } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { DarkModeContext } from "@/App";

const AboutUs = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="min-h-screen">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-steel-primary to-steel-accent text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Your trusted partner in premium kitchenware solutions
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-steel-primary mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to offer premium, eco-friendly products that combine modern design with practical usability. We are committed to customer satisfaction, sustainable practices.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="text-6xl text-steel-primary mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-4">Mission Statement</h3>
              <p className="text-gray-600">
                Delivering excellence through sustainable innovation and customer-centric solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-6xl text-steel-primary mb-4">🔮</div>
              <h3 className="text-2xl font-semibold mb-4">Vision Statement</h3>
              <p className="text-gray-600">
                To be the leading provider of innovative and sustainable kitchen solutions.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-steel-primary mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the leading provider of innovative and sustainable kitchen solutions, delivering exceptional quality and functionality while enhancing the everyday cooking experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Stand Out */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-primary mb-6">Why We Stand Out</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              At AlpifyGlobal, we combine unmatched craftsmanship, sustainability, and dedication to excellence to ensure our products exceed expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-4">Unmatched Craftsmanship</h3>
              <p className="text-gray-600">
                Decades of expertise in creating premium kitchenware with attention to every detail.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-4">Sustainability Focus</h3>
              <p className="text-gray-600">
                Eco-friendly materials and sustainable practices that protect our planet.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-4">Excellence Commitment</h3>
              <p className="text-gray-600">
                Dedicated to exceeding customer expectations in every product we create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Track Record */}
      <section className="py-16 bg-steel-primary text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Proven Track Record</h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              With decades of expertise in high-quality kitchenware, we craft durable, functional, and stylish tools to enhance your cooking experience. Committed to innovation and customer satisfaction, we design practical solutions for modern kitchens.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <p className="opacity-90">Years of Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="opacity-90">Countries Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p className="opacity-90">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="opacity-90">Quality Assured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Request for Quotation CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-steel-primary mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Experience the perfect blend of tradition and quality—shop AlpifyGlobal stainless steel kitchenware today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+919886317956"
              className="bg-steel-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-steel-accent transition-colors"
            >
              +91 9886317956
            </a>
            <a 
              href="mailto:info@alpifyglobal.com"
              className="bg-white text-steel-primary border-2 border-steel-primary px-8 py-3 rounded-lg font-semibold hover:bg-steel-primary hover:text-white transition-colors"
            >
              info@alpifyglobal.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyQuotationButton />
    </div>
  );
};

export default AboutUs; 