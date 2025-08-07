import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DarkModeContext } from "@/App";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { toast } = useToast();
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    if (formRef.current) {
      formRef.current.reset();
    }
    setIsSubmitting(false);
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
          {Array.from({ length: 30 }).map((_, i) => (
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
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We'd love to hear from you! Whether you have questions, need support, or want to learn more about our products, our team is ready to assist you.
          </motion.p>
        </div>
      </motion.section>

      {/* Enhanced Contact Form Section */}
      <section className="py-20 bg-gradient-subtle relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Animated Contact Form */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500 border border-steel-light/20"
            >
              <h2 className="text-3xl font-bold text-primary mb-8 bg-gradient-to-r from-primary to-vibrant-orange bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  className="grid md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="firstName" className="text-foreground font-medium">
                      First Name *
                    </Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="mt-2 bg-background/50 border-steel-light/30 focus:border-vibrant-orange transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="lastName" className="text-foreground font-medium">
                      Last Name *
                    </Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="mt-2 bg-background/50 border-steel-light/30 focus:border-electric-blue transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address *
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@company.com"
                      className="mt-2 bg-background/50 border-steel-light/30 focus:border-emerald-green transition-all duration-300"
                      required
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Contact Number
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98863 17956"
                      className="mt-2 bg-background/50 border-steel-light/30 focus:border-vibrant-purple transition-all duration-300"
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Your Message *
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements..."
                      className="mt-2 min-h-[120px] bg-background/50 border-steel-light/30 focus:border-coral transition-all duration-300"
                      required
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-vibrant-orange text-white py-4 text-lg font-semibold hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="flex items-center space-x-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Enhanced Contact Information */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-primary mb-8 bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">
                Contact Information
              </h2>
              
              <motion.div 
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: "📍",
                    title: "Address",
                    content: "UNIT 101, oxford towers, 139, HAL Old Airport Rd, north, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
                    color: "vibrant-orange"
                  },
                  {
                    icon: "📞",
                    title: "Phone",
                    content: "+91 9886317956",
                    href: "tel:+919886317956",
                    color: "electric-blue"
                  },
                  {
                    icon: "✉️",
                    title: "Email",
                    content: "info@alpifyglobal.com",
                    href: "mailto:info@alpifyglobal.com",
                    color: "emerald-green"
                  },
                  {
                    icon: "🕒",
                    title: "Opening Hours",
                    content: "Monday - Friday: 10:00 AM - 6:00 PM\nSaturday - Sunday: 10:00 AM - 1:00 PM",
                    color: "vibrant-purple"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group flex items-start p-6 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-steel-light/20"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <motion.div 
                      className={`text-3xl mr-6 mt-1 p-3 bg-${item.color}/10 rounded-full group-hover:bg-${item.color}/20 transition-colors`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary mb-2 text-lg">{item.title}</h3>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className={`text-${item.color} hover:text-${item.color}/80 font-medium transition-colors`}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced Product Catalogue CTA */}
              <motion.div 
                className="bg-gradient-to-br from-primary/10 to-vibrant-orange/10 rounded-xl p-8 border border-steel-light/20"
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px hsl(var(--primary) / 0.2)" }}
              >
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Explore Our Product Catalogue
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Premium Selections for Global Trade - Discover our comprehensive range of kitchenware solutions
                </p>
                <motion.button
                  className="bg-gradient-to-r from-primary to-vibrant-orange text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Catalogue
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-primary mb-6 bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">
              Find Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Visit our office in the heart of Bengaluru's tech corridor
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-card rounded-2xl p-8 shadow-elegant hover:shadow-glow transition-all duration-500 border border-steel-light/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-video bg-gradient-to-br from-steel-light/20 to-steel-light/5 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, hsl(var(--vibrant-orange)) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, hsl(var(--electric-blue)) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, hsl(var(--emerald-green)) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, hsl(var(--vibrant-orange)) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <div className="text-center z-10">
                <motion.div 
                  className="text-8xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🗺️
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-4">Interactive Map Coming Soon</h3>
                <p className="text-muted-foreground mb-2 font-medium">
                  UNIT 101, Oxford Towers, HAL Old Airport Road
                </p>
                <p className="text-sm text-muted-foreground">
                  Bengaluru, Karnataka 560008
                </p>
                <motion.button
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-primary to-electric-blue text-white rounded-lg font-medium hover:shadow-glow transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Directions
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-gradient-subtle relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-primary mb-6 bg-gradient-to-r from-primary to-vibrant-purple bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Get quick answers to common questions
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                question: "What are your shipping options?",
                answer: "We offer reliable delivery services worldwide with tracking and insurance for all shipments. Express and standard shipping options available.",
                color: "vibrant-orange"
              },
              {
                question: "Do you offer custom designs?",
                answer: "Yes, we specialize in custom kitchenware solutions tailored to your specific needs and requirements. Our design team works closely with you.",
                color: "electric-blue"
              },
              {
                question: "What is your return policy?",
                answer: "We offer easy returns and replacements for any products that don't meet your expectations within 30 days of delivery.",
                color: "emerald-green"
              },
              {
                question: "How can I request a quotation?",
                answer: "You can request a quotation by filling out our contact form, calling us directly, or sending us an email with your requirements.",
                color: "vibrant-purple"
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className={`border border-steel-light/30 rounded-xl p-8 bg-card hover:shadow-medium transition-all duration-300 group hover:border-${faq.color}/30`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <h3 className={`text-lg font-semibold text-primary mb-4 group-hover:text-${faq.color} transition-colors`}>
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
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
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-12 leading-relaxed">
              Experience the perfect blend of tradition and quality—discover AlpifyGlobal's premium stainless steel kitchenware today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a 
                href="tel:+919886317956"
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📞</span>
                <span>+91 9886317956</span>
              </motion.a>
              <motion.a 
                href="mailto:info@alpifyglobal.com"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 flex items-center space-x-2"
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

export default ContactUs;