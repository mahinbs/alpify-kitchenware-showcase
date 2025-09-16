import React, { useContext } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { motion } from "framer-motion";
import { Star, Shield, Zap, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import cookware from "@/assets/cookware.jpg";
import { useProducts } from "@/hooks/use-products";

const Cookware = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const { products, loading } = useProducts("cookware");

  return (
    <div className="min-h-screen">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-steel-primary to-steel-accent text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Cookware Collection</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Premium stainless steel pots, pans, and cooking essentials that transform your culinary experience
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-steel-primary"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No cookware products found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
              {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{product.price.toFixed(2)}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Specifications:</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Material:</span>
                        <span className="ml-2 text-gray-900">{product.specifications.material}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Warranty:</span>
                        <span className="ml-2 text-gray-900">{product.specifications.warranty}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Origin:</span>
                        <span className="ml-2 text-gray-900">{product.specifications.origin}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-steel-primary text-white font-semibold py-3 px-6 rounded-xl hover:bg-steel-accent transition-colors duration-300"
                    >
                      Request Quote
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 border-2 border-steel-primary text-steel-primary font-semibold py-3 px-6 rounded-xl hover:bg-steel-primary hover:text-white transition-colors duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Cookware */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Cookware?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of functionality, durability, and style with our premium cookware collection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-steel-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Crafted from the finest materials with attention to every detail for lasting performance
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-steel-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Superior Performance</h3>
              <p className="text-gray-600">
                Even heat distribution and precise temperature control for perfect cooking results
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-steel-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lifetime Warranty</h3>
              <p className="text-gray-600">
                Backed by our confidence in quality with comprehensive warranty coverage
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyQuotationButton />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default Cookware; 