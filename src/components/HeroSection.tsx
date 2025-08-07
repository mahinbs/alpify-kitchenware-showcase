import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play, Star } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(textRef.current, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3
      });

      // CTA button animation
      gsap.fromTo(ctaRef.current, {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.8
      });

      // Scroll indicator animation
      gsap.fromTo(scrollIndicatorRef.current, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 1.2
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToNext = () => {
    const nextSection = document.getElementById('products');
    nextSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Hero Background with Parallax */}
      

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm" />
        <motion.div animate={{
        y: [0, 20, 0],
        rotate: [0, -5, 0]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }} className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm" />
        <motion.div animate={{
        y: [0, -15, 0],
        x: [0, 10, 0]
      }} transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }} className="absolute bottom-40 left-20 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm" />
      </div>

      {/* Hero Content */}
      

      {/* Scroll Indicator */}
      <motion.div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-70 cursor-pointer" onClick={scrollToNext} whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }}>
        
      </motion.div>

      {/* Bottom Gradient Overlay */}
      
    </section>;
};
export default HeroSection;