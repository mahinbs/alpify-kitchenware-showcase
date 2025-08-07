import React, { useContext } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DarkModeContext } from "@/App";

const ContactUs = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="min-h-screen">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-steel-primary to-steel-accent text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have questions, need support, or want to learn more about our products, our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-steel-primary mb-8">Get in Touch</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700 font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700 font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Contact Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Contact Number"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your Message"
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-steel-primary hover:bg-steel-accent text-white py-3"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-steel-primary mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
                    <p className="text-gray-600">
                      UNIT 101, oxford towers, 139, HAL Old Airport Rd, north, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">📞</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                    <a 
                      href="tel:+919886317956" 
                      className="text-steel-primary hover:text-steel-accent font-medium"
                    >
                      +91 9886317956
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">✉️</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                    <a 
                      href="mailto:info@alpifyglobal.com" 
                      className="text-steel-primary hover:text-steel-accent font-medium"
                    >
                      info@alpifyglobal.com
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">🕒</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Opening Hours</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Monday - Friday: 10:00 AM - 6:00 PM</p>
                      <p>Saturday - Sunday: 10:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Catalogue CTA */}
              <div className="mt-12 bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-steel-primary mb-4">
                  Explore Our Product Catalogue
                </h3>
                <p className="text-gray-600 mb-4">
                  Premium Selections for Global Trade
                </p>
                <Button className="bg-steel-primary hover:bg-steel-accent text-white">
                  View Catalogue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steel-primary mb-6">Find Us</h2>
            <p className="text-lg text-gray-700">
              Visit our office in Bengaluru, Karnataka
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600">Interactive Map Coming Soon</p>
                <p className="text-sm text-gray-500 mt-2">
                  UNIT 101, oxford towers, 139, HAL Old Airport Rd, Bengaluru
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steel-primary mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700">
              Get quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-steel-primary mb-3">
                What are your shipping options?
              </h3>
              <p className="text-gray-600">
                We offer reliable delivery services worldwide with tracking and insurance for all shipments.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-steel-primary mb-3">
                Do you offer custom designs?
              </h3>
              <p className="text-gray-600">
                Yes, we specialize in custom kitchenware solutions tailored to your specific needs and requirements.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-steel-primary mb-3">
                What is your return policy?
              </h3>
              <p className="text-gray-600">
                We offer easy returns and replacements for any products that don't meet your expectations.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-steel-primary mb-3">
                How can I request a quotation?
              </h3>
              <p className="text-gray-600">
                You can request a quotation by filling out our contact form, calling us directly, or sending us an email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-steel-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
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

export default ContactUs; 