import React, { useContext, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { DarkModeContext } from "@/App";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

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

    // Hero background animation
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        backgroundPosition: "100% 100%",
        duration: 10,
        ease: "none",
        repeat: -1,
        yoyo: true,
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
          {Array.from({ length: 20 }).map((_, i) => (
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
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-vibrant-orange/30 to-electric-blue/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "25%", "50%"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-emerald-green/30 to-vibrant-purple/30 rounded-full blur-xl"
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
            About Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Your trusted partner in premium kitchenware solutions across the globe
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: "25+", label: "Years Experience" },
              { number: "50+", label: "Countries Served" },
              { number: "1000+", label: "Happy Clients" },
              { number: "100%", label: "Quality Assured" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="text-3xl font-bold text-vibrant-orange">{stat.number}</div>
                <p className="text-sm opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Mission Section */}
      <section className="py-20 bg-gradient-subtle relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-green/5 to-electric-blue/5"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-primary to-vibrant-orange bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Our mission is to offer premium, eco-friendly products that combine modern design with practical usability. We are committed to customer satisfaction, sustainable practices, and delivering excellence in every piece we create.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-green to-electric-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-muted-foreground">Sustainable Innovation Excellence</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-card p-8 rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500 border border-steel-light/20"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02, 
                rotateY: 5,
                boxShadow: "0 20px 40px hsl(var(--primary) / 0.3)"
              }}
            >
              <div className="text-6xl text-primary mb-4 animate-bounce-gentle">🎯</div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Mission Statement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Delivering excellence through sustainable innovation and customer-centric solutions that transform kitchens worldwide.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Vision Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="bg-card p-8 rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500 border border-steel-light/20 order-2 md:order-1"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02, 
                rotateY: -5,
                boxShadow: "0 20px 40px hsl(var(--vibrant-purple) / 0.3)"
              }}
            >
              <div className="text-6xl text-vibrant-purple mb-4 animate-pulse-soft">🔮</div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Vision Statement</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading provider of innovative and sustainable kitchen solutions that inspire culinary creativity globally.
              </p>
            </motion.div>
            
            <motion.div
              className="order-1 md:order-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-primary to-vibrant-purple bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                To be the leading provider of innovative and sustainable kitchen solutions, delivering exceptional quality and functionality while enhancing the everyday cooking experience for families worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-vibrant-purple to-electric-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">★</span>
                </div>
                <span className="text-muted-foreground">Global Kitchen Innovation</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Why We Stand Out */}
      <section className="py-20 bg-gradient-subtle relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-primary via-vibrant-orange to-electric-blue bg-clip-text text-transparent">
              Why We Stand Out
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At AlpifyGlobal, we combine unmatched craftsmanship, sustainability, and dedication to excellence to ensure our products exceed expectations.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "⭐",
                title: "Unmatched Craftsmanship",
                description: "Decades of expertise in creating premium kitchenware with attention to every detail.",
                color: "vibrant-orange"
              },
              {
                icon: "🌱",
                title: "Sustainability Focus",
                description: "Eco-friendly materials and sustainable practices that protect our planet.",
                color: "emerald-green"
              },
              {
                icon: "🎯",
                title: "Excellence Commitment",
                description: "Dedicated to exceeding customer expectations in every product we create.",
                color: "electric-blue"
              }
            ].map((item, index) => (
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
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-primary">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Proven Track Record */}
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
            <h2 className="text-5xl font-bold mb-6">Proven Track Record</h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              With decades of expertise in high-quality kitchenware, we craft durable, functional, and stylish tools to enhance your cooking experience. Committed to innovation and customer satisfaction, we design practical solutions for modern kitchens.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "25+", label: "Years of Experience", icon: "🏆" },
              { number: "50+", label: "Countries Served", icon: "🌍" },
              { number: "1000+", label: "Happy Customers", icon: "😊" },
              { number: "100%", label: "Quality Assured", icon: "✨" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <motion.div 
                  className="text-4xl font-bold mb-2 text-vibrant-orange"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <p className="opacity-90 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-subtle relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-primary mb-6 bg-gradient-to-r from-primary to-vibrant-orange bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Experience the perfect blend of tradition and quality—shop AlpifyGlobal stainless steel kitchenware today!
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

export default AboutUs;