import React, { useContext } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { DarkModeContext } from "@/App";

const Services = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="min-h-screen">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-steel-primary to-steel-accent text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            At AlpifyGlobal, we offer a wide range of expert services designed to meet all your kitchen and home needs.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-primary mb-6">Quality, Innovation, and Functionality in Every Product</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              With a focus on innovation, quality, and customer satisfaction, we provide solutions that transform your cooking and dining experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Kitchenware */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-steel-primary mb-6">Premium Kitchenware</h2>
              <p className="text-lg text-gray-700 mb-6">
                We offer an exclusive range of kitchen products, carefully crafted to provide both style and durability, making every meal preparation a delightful experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-steel-primary rounded-full mr-3"></div>
                  <span className="text-gray-700">High-quality, durable products designed for everyday use</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-steel-primary rounded-full mr-3"></div>
                  <span className="text-gray-700">Ultimate convenience and functionality</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-steel-primary rounded-full mr-3"></div>
                  <span className="text-gray-700">Stylish designs that enhance your kitchen</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-6xl mb-4">🍳</div>
              <h3 className="text-2xl font-semibold mb-4">Premium Collection</h3>
              <p className="text-gray-600">
                From cookware to utensils, our premium range combines aesthetics with functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design & Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-semibold mb-4">Custom Solutions</h3>
              <p className="text-gray-600">
                Personalized designs that perfectly match your kitchen's unique style and requirements.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-steel-primary mb-6">Custom Design & Solutions</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our team works closely with you to create personalized kitchen solutions that perfectly fit your space and needs, from bespoke utensils to innovative storage solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-steel-primary rounded-full mr-3"></div>
                  <span className="text-gray-700">Bespoke utensil designs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-steel-primary rounded-full mr-3"></div>
                  <span className="text-gray-700">Innovative storage solutions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-steel-primary rounded-full mr-3"></div>
                  <span className="text-gray-700">Space-optimized kitchen layouts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-steel-primary mb-6">Eco-Friendly Products</h2>
              <p className="text-lg text-gray-700 mb-6">
                Committed to sustainability, we offer eco-conscious products that don't just look good but also contribute to a healthier planet.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Sustainable materials and practices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Environmentally conscious production</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Reduced carbon footprint</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-8 border border-green-200">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl font-semibold mb-4">Sustainability at Core</h3>
              <p className="text-gray-600">
                Eco-friendly materials and sustainable practices that care for both your kitchen and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Reliable Delivery & Support */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-4">Reliable Delivery & Support</h3>
              <p className="text-gray-600 mb-4">
                We ensure prompt, hassle-free delivery and provide exceptional after-sales support, so you can shop with confidence knowing we're here for you every step of the way.
              </p>
            </div>

            {/* Easy Returns & Replacements */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-4">Easy Returns & Replacements</h3>
              <p className="text-gray-600 mb-4">
                Enhance your kitchen with our innovative products designed to simplify cooking and boost functionality. With our easy returns and replacements policy, shop confidently, knowing we'll handle any items that don't meet expectations.
              </p>
            </div>

            {/* Customer Support */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
              <p className="text-gray-600 mb-4">
                Our dedicated customer support team is here to provide expert assistance at every step of your kitchenware journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AlpifyGlobal */}
      <section className="py-16 bg-steel-primary text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Why Choose AlpifyGlobal?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Excellence, Innovation, and Customer Satisfaction at the Heart of Everything We Do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-4">Unmatched Quality</h3>
              <p className="opacity-90">
                We offer top-tier products made from the finest materials to ensure long-lasting durability.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-4">Innovative Designs</h3>
              <p className="opacity-90">
                Our products combine modern aesthetics with practical features for a seamless user experience.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-4">Eco-Friendly Practices</h3>
              <p className="opacity-90">
                Sustainability is at the core of our brand, from production to packaging, ensuring we protect our environment.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-4">Dedicated Customer Support</h3>
              <p className="opacity-90">
                Our customer-first approach ensures personalized assistance and satisfaction with every purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request for Quotation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-primary mb-6">How We Work at AlpifyGlobal</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A Seamless Process from Start to Finish
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-steel-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">01</div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">
                Reach out to us anytime, and our team will provide personalized assistance to address your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-steel-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">02</div>
              <h3 className="text-xl font-semibold mb-4">Place an Order</h3>
              <p className="text-gray-600">
                Simply select your products, and place your order through our user-friendly platform.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-steel-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">03</div>
              <h3 className="text-xl font-semibold mb-4">Make a Payment</h3>
              <p className="text-gray-600">
                Choose your preferred payment method, and we'll ensure a secure and smooth transaction.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-steel-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">04</div>
              <h3 className="text-xl font-semibold mb-4">Receive an Order</h3>
              <p className="text-gray-600">
                Sit back and relax as your order is promptly processed and delivered to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
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

export default Services; 