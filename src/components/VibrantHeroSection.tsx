import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play, Star, Sparkles, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const VibrantHeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero text animation with elastic bounce
      gsap.fromTo(
        textRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.8)",
          delay: 0.3,
        }
      );

      // CTA button animation with magnetic effect
      gsap.fromTo(
        ctaRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotationY: 45,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "back.out(2)",
          delay: 0.8,
        }
      );

      // Floating particles animation
      particleRefs.current.forEach((particle, index) => {
        if (particle) {
          gsap.fromTo(
            particle,
            {
              y: 50,
              opacity: 0,
              scale: 0,
              rotation: 0,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 360,
              duration: 2,
              delay: 1 + index * 0.2,
              ease: "power3.out",
              repeat: -1,
              yoyo: true,
              repeatDelay: 1,
            }
          );

          // Continuous floating animation
          gsap.to(particle, {
            y: -20,
            x: Math.sin(index) * 10,
            duration: 3 + index * 0.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.3,
          });
        }
      });

      // Scroll indicator with more dynamic animation
      gsap.fromTo(
        scrollIndicatorRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 1.5,
          ease: "power3.out",
        }
      );

      // Enhanced parallax effect
      gsap.to(heroRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Background gradient animation
      gsap.to(".hero-gradient", {
        backgroundPosition: "100% 50%",
        duration: 8,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('products');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const addParticleRef = (el: HTMLDivElement | null, index: number) => {
    particleRefs.current[index] = el;
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '6rem' }}
    >
      {/* Dynamic Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="hero-gradient absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Animated Gradient Overlays */}
        <div className="hero-gradient absolute inset-0 bg-gradient-to-br from-electric/20 via-vibrant/30 to-emerald/20 animate-gradient-shift" 
             style={{ backgroundSize: '400% 400%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-60" style={{ background: 'var(--gradient-mesh)' }} />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Floating Particles */}
        {[...Array(12)].map((_, index) => (
          <motion.div
            key={index}
            ref={(el) => addParticleRef(el, index)}
            className={`absolute w-3 h-3 rounded-full animate-particle-float ${
              index % 4 === 0 ? 'bg-electric/60' :
              index % 4 === 1 ? 'bg-vibrant/60' :
              index % 4 === 2 ? 'bg-emerald/60' : 'bg-pink/60'
            }`}
            style={{
              left: `${10 + (index % 4) * 20}%`,
              top: `${20 + (index % 3) * 30}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${4 + index * 0.5}s`,
            }}
          />
        ))}

        {/* Morphing Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-electric/30 to-pink/30 animate-morph blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute bottom-40 left-16 w-24 h-24 bg-gradient-to-br from-vibrant/40 to-emerald/40 animate-morph blur-lg"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>

      {/* Hero Content with Enhanced Animations */}
      <div className="relative z-20 container-modern text-center text-white px-4 sm:px-6 lg:px-8">
        <div ref={textRef} className="max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 animate-pulse-glow"
          >
            <Sparkles className="w-5 h-5 text-golden animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">Premium Steel Kitchenware Export</span>
            <Sparkles className="w-5 h-5 text-golden animate-pulse" />
          </motion.div>

          {/* Main Heading with Gradient Text Animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 80, damping: 12 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
          >
            <span className="block bg-gradient-to-r from-electric via-golden to-pink bg-clip-text text-transparent animate-gradient-shift animate-text-glow"
                  style={{ backgroundSize: '400% 400%' }}>
              Alpify Global
            </span>
            <motion.span 
              className="block text-2xl md:text-4xl lg:text-5xl font-medium opacity-95 mt-6 font-sans bg-gradient-to-r from-white via-emerald to-vibrant bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Premium Kitchenware Export
            </motion.span>
          </motion.h1>

          {/* Enhanced Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xl md:text-2xl lg:text-3xl mb-10 opacity-95 max-w-4xl mx-auto leading-relaxed text-balance"
          >
            We are a trusted export company committed to delivering{" "}
            <span className="bg-gradient-to-r from-electric to-emerald bg-clip-text text-transparent font-semibold">
              excellence
            </span>{" "}
            in stainless steel kitchenware to markets worldwide.
          </motion.p>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
          >
            {[
              { number: "25+", label: "Years Experience", color: "from-electric to-vibrant" },
              { number: "50+", label: "Countries", color: "from-emerald to-golden" },
              { number: "100%", label: "Quality Assured", color: "from-pink to-neon" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={`text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:animate-pulse-glow`}>
                  {stat.number}
                </div>
                <div className="text-sm opacity-80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <motion.button
            whileHover={{ scale: 1.08, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="relative group bg-gradient-to-r from-electric to-vibrant text-white text-lg px-10 py-5 rounded-2xl font-bold shadow-2xl overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-vibrant to-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center">
              <Zap className="w-6 h-6 mr-3 animate-pulse" />
              <span>Request for Quotation</span>
              <motion.div
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, rotateY: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white text-lg px-10 py-5 rounded-2xl font-bold transition-all duration-300 hover:bg-white/20 hover:border-white/50"
          >
            <div className="flex items-center">
              <Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Watch Video
            </div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-80 cursor-pointer z-30 group"
        onClick={scrollToNext}
        whileHover={{ scale: 1.2, y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-3"
        >
          <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center group-hover:border-electric transition-colors duration-300">
            <motion.div 
              className="w-1.5 h-4 bg-gradient-to-b from-electric to-pink rounded-full mt-2"
              animate={{ 
                opacity: [1, 0.3, 1],
                height: ['16px', '8px', '16px']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <ArrowDown className="w-5 h-5 animate-bounce opacity-60" />
        </motion.div>
      </motion.div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
    </section>
  );
};

export default VibrantHeroSection;