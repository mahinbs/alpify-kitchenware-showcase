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
      <section className="pt-24 pb-16 bg-gradient-to-br from-steel-primary to-steel-accent text-white">
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
            <h2 className="text-4xl font-bold text-steel-primary mb-6">Official Importer-Exporter Code (IEC)</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Government of India - Ministry of Commerce and Industry
            </p>
          </div>
          
          {/* Certificate Image */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-steel-primary text-center">Official Certificate</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-center">
                  <img 
                    src="https://res.cloudinary.com/dknafpppp/image/upload/v1754600810/WhatsApp-Image-2025-02-11-at-6.57.16-PM_1_p4k94z.jpg"
                    alt="Official Importer-Exporter Code Certificate - ALPIFY TECHNOLOGIES LLP"
                    className="max-w-full h-auto rounded-lg shadow-lg border border-gray-300 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                    style={{ maxHeight: '600px' }}
                    onClick={() => window.open('https://res.cloudinary.com/dknafpppp/image/upload/v1754600810/WhatsApp-Image-2025-02-11-at-6.57.16-PM_1_p4k94z.jpg', '_blank')}
                    title="Click to view full size"
                  />
                </div>
                <div className="mt-6 text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Official Importer-Exporter Code Certificate issued by Directorate General of Foreign Trade, Government of India
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => window.open('https://res.cloudinary.com/dknafpppp/image/upload/v1754600810/WhatsApp-Image-2025-02-11-at-6.57.16-PM_1_p4k94z.jpg', '_blank')}
                      className="bg-steel-primary text-white px-6 py-2 rounded-lg hover:bg-steel-accent transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>👁️</span>
                      <span>View Full Size</span>
                    </button>
                    <a 
                      href="https://res.cloudinary.com/dknafpppp/image/upload/v1754600810/WhatsApp-Image-2025-02-11-at-6.57.16-PM_1_p4k94z.jpg"
                      download="ALPIFY_IEC_Certificate.jpg"
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>📥</span>
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-green-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-steel-primary mb-4">Official IEC Certificate</h3>
                <p className="text-lg text-gray-700 mb-6">
                  This is to certify that <strong>ALPIFY TECHNOLOGIES LLP</strong> is issued an Importer-Exporter Code (IEC) <strong>ACFFA4118A</strong> by the Directorate General of Foreign Trade, Government of India.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700"><strong>IEC Code:</strong> ACFFA4118A</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700"><strong>PAN:</strong> ACFFA4118A</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700"><strong>Issue Date:</strong> 11/10/2024</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700"><strong>Status:</strong> Active & Valid</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <h4 className="text-xl font-semibold mb-2">Certificate Details</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600"><strong>Firm Name:</strong> ALPIFY TECHNOLOGIES LLP</p>
                    <p className="text-gray-600"><strong>Nature:</strong> Limited Liability Partnership</p>
                    <p className="text-gray-600"><strong>Signatory:</strong> RAGHAVENDRADEEPAK DUPUGUNTLA</p>
                    <p className="text-gray-600"><strong>File Number:</strong> BNGIECPAPPLY00020366AM25</p>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600">
                      Authenticity can be verified at <strong>https://dgft.gov.in</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steel-primary mb-6">Certificate Information</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Complete details of our official Importer-Exporter Code certification
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-steel-primary mb-6">Issuing Authority</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Government Body</h4>
                    <p className="text-gray-600">Government of India / भारत सरकार</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Ministry</h4>
                    <p className="text-gray-600">Ministry of Commerce and Industry / वाणिज्य और उद्योग मंत्रालय</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Directorate</h4>
                    <p className="text-gray-600">Directorate General of Foreign Trade / विदेश व्यापार महानिदेशालय</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Issuing Office</h4>
                    <p className="text-gray-600">Office of the Additional Director General of Foreign Trade, Bengaluru</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-steel-primary mb-6">Company Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Registered Address</h4>
                    <p className="text-gray-600">
                      Unit 101 Oxford Towers 139 Hal Old, Airport Rd Kodihalli, H.a.l Ii Stage, Bangalore, Bangalore North, Karnataka, BENGALURU URBAN, BENGALURU URBAN, KARNATAKA, 560008
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Office Address</h4>
                    <p className="text-gray-600">
                      C & E Wing, Kendriya Sadan, 17th Main Road, Koramangala, BENGALURU URBAN, KARNATAKA, 560034
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Verification</h4>
                    <p className="text-gray-600">
                      This is a system-generated certificate. Authenticity can be checked at the official DGFT website.
                    </p>
                  </div>
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