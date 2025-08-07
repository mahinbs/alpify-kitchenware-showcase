import React, { useContext, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { DarkModeContext } from "@/App";

// Import images for the 6 product categories
import cookwareImg from "@/assets/cookware.jpg";
import dinnerwareImg from "@/assets/dinnerware.jpg";
import drinkwareImg from "@/assets/drinkware.jpg";
import servewareImg from "@/assets/serveware.jpg";
import storageImg from "@/assets/storage.jpg";
import tablewareImg from "@/assets/tableware.jpg";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  // Animated particles setup
  useEffect(() => {
    if (particlesRef.current.length > 0) {
      gsap.set(particlesRef.current, {
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        scale: () => gsap.utils.random(0.5, 1.5),
        opacity: () => gsap.utils.random(0.3, 0.8),
      });

      gsap.to(particlesRef.current, {
        duration: () => gsap.utils.random(3, 6),
        x: () => `+=${gsap.utils.random(-200, 200)}`,
        y: () => `+=${gsap.utils.random(-200, 200)}`,
        rotation: () => gsap.utils.random(-360, 360),
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addParticleRef = (el: HTMLDivElement | null) => {
    if (el && !particlesRef.current.includes(el)) {
      particlesRef.current.push(el);
    }
  };

  // Product categories with vibrant colors
  const productCategories = [
    {
      title: "Premium Cookware",
      image: cookwareImg,
      description: "Professional-grade cooking solutions for every kitchen",
      features: ["Non-stick surfaces", "Heat distribution", "Durability tested"],
      color: "vibrant-orange",
      bgGradient: "from-vibrant-orange/20 to-vibrant-orange/5"
    },
    {
      title: "Elegant Dinnerware",
      image: dinnerwareImg,
      description: "Beautiful dining sets that make every meal special",
      features: ["Dishwasher safe", "Scratch resistant", "Modern designs"],
      color: "electric-blue",
      bgGradient: "from-electric-blue/20 to-electric-blue/5"
    },
    {
      title: "Stylish Drinkware",
      image: drinkwareImg,
      description: "Premium glasses and cups for every beverage",
      features: ["Temperature retention", "Ergonomic design", "Leak-proof"],
      color: "emerald-green",
      bgGradient: "from-emerald-green/20 to-emerald-green/5"
    },
    {
      title: "Functional Serveware",
      image: servewareImg,
      description: "Elegant serving solutions for entertaining",
      features: ["Easy serving", "Stain resistant", "Multi-purpose"],
      color: "vibrant-purple",
      bgGradient: "from-vibrant-purple/20 to-vibrant-purple/5"
    },
    {
      title: "Smart Storage",
      image: storageImg,
      description: "Innovative storage solutions for organized kitchens",
      features: ["Airtight seals", "Space efficient", "Easy access"],
      color: "coral",
      bgGradient: "from-coral/20 to-coral/5"
    },
    {
      title: "Premium Tableware",
      image: tablewareImg,
      description: "Complete tableware sets for every occasion",
      features: ["Complete sets", "Mix & match", "Event ready"],
      color: "golden-yellow",
      bgGradient: "from-golden-yellow/20 to-golden-yellow/5"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Vibrant Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-24 pb-20 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              hsl(var(--primary)) 0%, 
              hsl(var(--vibrant-purple)) 25%, 
              hsl(var(--electric-blue)) 50%, 
              hsl(var(--vibrant-orange)) 75%, 
              hsl(var(--emerald-green)) 100%
            )`,
          backgroundSize: "400% 400%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              ref={addParticleRef}
              className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Morphing Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-vibrant-orange/30 to-electric-blue/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "25%", "50%"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-emerald-green/30 to-vibrant-purple/30 rounded-full blur-xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 180, 0],
            borderRadius: ["25%", "50%", "25%"],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative max-w-6xl mx-auto px-6 text-center text-white z-10">
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-vibrant-orange to-electric-blue bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Comprehensive kitchenware solutions that transform your culinary experience
          </motion.p>
        </div>
      </motion.section>

      {/* Product Categories Showcase */}
      <section className="py-20 bg-gradient-subtle relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-primary via-vibrant-orange to-electric-blue bg-clip-text text-transparent">
              Premium Product Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Quality, Innovation, and Functionality in Every Product
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {productCategories.map((category, index) => (
              <motion.div
                key={index}
                className={`group relative bg-gradient-to-br ${category.bgGradient} p-8 rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500 border border-steel-light/20 overflow-hidden`}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -10,
                  rotateY: 5,
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border border-white/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className={`w-8 h-8 bg-${category.color} rounded-full`}></div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="space-y-2">
                    {category.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className={`w-2 h-2 bg-${category.color} rounded-full`}></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    className={`mt-6 px-6 py-2 bg-${category.color}/20 text-${category.color} rounded-lg font-medium hover:bg-${category.color}/30 transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Overview */}
      <section className="py-20 bg-background relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "🎨",
                title: "Custom Design Solutions",
                description: "Personalized kitchen solutions that perfectly fit your space and needs, from bespoke utensils to innovative storage solutions.",
                color: "electric-blue"
              },
              {
                icon: "🌱",
                title: "Eco-Friendly Products",
                description: "Sustainable materials and practices that care for both your kitchen and the planet with reduced carbon footprint.",
                color: "emerald-green"
              },
              {
                icon: "🚚",
                title: "Global Delivery & Support",
                description: "Reliable worldwide delivery with exceptional after-sales support and easy returns policy for complete satisfaction.",
                color: "vibrant-orange"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-card rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500 border border-steel-light/20 group"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                }}
              >
                <motion.div 
                  className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-primary">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose AlpifyGlobal */}
      <section className="py-20 bg-gradient-to-br from-primary via-vibrant-purple to-electric-blue text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 30, repeat: Infinity }}
          style={{
            background: `
              radial-gradient(circle at 20% 20%, hsl(var(--vibrant-orange) / 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, hsl(var(--emerald-green) / 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, hsl(var(--electric-blue) / 0.3) 0%, transparent 50%)
            `,
          }}
        />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6">Why Choose AlpifyGlobal?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Excellence, Innovation, and Customer Satisfaction at the Heart of Everything We Do
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: "⭐", title: "Unmatched Quality", description: "Top-tier products made from the finest materials to ensure long-lasting durability." },
              { icon: "🎨", title: "Innovative Designs", description: "Modern aesthetics with practical features for a seamless user experience." },
              { icon: "🌱", title: "Eco-Friendly Practices", description: "Sustainability at our core, from production to packaging, protecting our environment." },
              { icon: "🤝", title: "Dedicated Support", description: "Customer-first approach ensuring personalized assistance and satisfaction." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="opacity-90 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gradient-subtle relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-primary to-vibrant-orange bg-clip-text text-transparent">
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A Seamless Process from Start to Finish
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { step: "01", title: "Contact Us", description: "Reach out anytime, and our team will provide personalized assistance to address your needs.", color: "vibrant-orange" },
              { step: "02", title: "Place Order", description: "Select your products and place your order through our user-friendly platform.", color: "electric-blue" },
              { step: "03", title: "Make Payment", description: "Choose your preferred payment method for a secure and smooth transaction.", color: "emerald-green" },
              { step: "04", title: "Receive Order", description: "Sit back as your order is promptly processed and delivered to your doorstep.", color: "vibrant-purple" }
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                variants={itemVariants}
              >
                <motion.div 
                  className={`bg-gradient-to-br from-${process.color} to-${process.color}/70 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-elegant`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {process.step}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-primary">{process.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {process.description}
                </p>
                
                {/* Connection Line */}
                {index < 3 && (
                  <motion.div 
                    className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-steel-light to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-primary mb-6 bg-gradient-to-r from-primary to-vibrant-orange bg-clip-text text-transparent">
              Ready to Transform Your Kitchen?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Experience the perfect blend of tradition and quality—discover AlpifyGlobal's premium stainless steel kitchenware today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a 
                href="tel:+919886317956"
                className="group bg-gradient-to-r from-primary to-vibrant-orange text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-glow flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📞</span>
                <span>+91 9886317956</span>
              </motion.a>
              <motion.a 
                href="mailto:info@alpifyglobal.com"
                className="group bg-card text-primary border-2 border-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>✉️</span>
                <span>info@alpifyglobal.com</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <StickyQuotationButton />
    </div>
  );
};

export default Services;