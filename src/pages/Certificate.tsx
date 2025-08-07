import React, { useContext } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { DarkModeContext } from "@/App";

const Certificate = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="min-h-screen">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-steel-primary to-steel-accent text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Certificate</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Your Trusted Partner in Global Trade
          </p>
        </div>
      </section>

      {/* IEC Certification */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">🏆</div>
            <h2 className="text-4xl font-bold text-steel-primary mb-6">IEC Certified Exporter</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Alpify Global: Your Trusted Partner in Global Trade
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-green-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-steel-primary mb-4">International Export Certification</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Our IEC certification demonstrates our commitment to international trade standards and quality assurance. This certification enables us to export our premium kitchenware products to global markets with confidence and reliability.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Compliant with international trade regulations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Quality assurance standards met</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Global market access</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <h4 className="text-xl font-semibold mb-2">Certification Details</h4>
                  <p className="text-gray-600 mb-4">IEC Code: Validated</p>
                  <p className="text-gray-600 mb-4">Status: Active</p>
                  <p className="text-gray-600">Renewal: Annual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Division */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-primary mb-6">Explore Our Technology Division</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Alpify Technologies - Innovating for the future of kitchenware
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-steel-primary mb-4">Alpify Technologies</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Our technology division focuses on innovative solutions and cutting-edge designs that enhance the functionality and aesthetics of modern kitchens.
                </p>
                <a 
                  href="#"
                  className="inline-block bg-steel-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-steel-accent transition-colors"
                >
                  Visit Alpify Technologies
                </a>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                <div className="text-6xl mb-4">🚀</div>
                <h4 className="text-xl font-semibold mb-2">Innovation Hub</h4>
                <p className="text-gray-600">
                  Where tradition meets technology for the perfect kitchen experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-steel-primary mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📍</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                    <p className="text-gray-600">
                      UNIT 101, oxford towers, 139, HAL Old Airport Rd, north, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📞</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                    <a href="tel:+919886317956" className="text-steel-primary hover:text-steel-accent">
                      +91 9886317956
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-2xl mr-4">✉️</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                    <a href="mailto:info@alpifyglobal.com" className="text-steel-primary hover:text-steel-accent">
                      info@alpifyglobal.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="text-3xl font-bold text-steel-primary mb-8">Opening Hours</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-gray-600">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Saturday - Sunday</span>
                    <span className="text-gray-600">10:00 AM - 1:00 PM</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🟢</div>
                    <div>
                      <p className="font-semibold text-green-800">Currently Open</p>
                      <p className="text-sm text-green-600">We're here to serve you</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-steel-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Partner With Us?</h2>
          <p className="text-xl opacity-90 mb-8">
            Experience the perfect blend of tradition and quality—shop AlpifyGlobal stainless steel kitchenware today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+919886317956"
              className="bg-white text-steel-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              +91 9886317956
            </a>
            <a 
              href="mailto:info@alpifyglobal.com"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-primary transition-colors"
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

export default Certificate; 