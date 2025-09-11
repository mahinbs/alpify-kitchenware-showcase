import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play, Star, Sparkles, ChevronRight, Volume2, VolumeX } from "lucide-react";
import VideoModal from "./VideoModal";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ElegantVideoHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Auto-play failed, user will need to interact
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant text entrance animation
      gsap.fromTo(
        textRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // CTA buttons with staggered entrance
      gsap.fromTo(
        ctaRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 1.2,
        }
      );

      // Scroll indicator with elegant fade
      gsap.fromTo(
        scrollIndicatorRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          delay: 2.0,
        }
      );

      // Parallax effect on scroll
      gsap.to(textRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('products');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '6rem' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          autoPlay
        >
          <source src="https://res.cloudinary.com/dknafpppp/video/upload/v1754597584/GettyImages-1316495330_1_remgng.mp4" type="video/mp4" />
          {/* Fallback background for browsers that don't support video */}
        </video>
        
        {/* Fallback Background - Shows when video fails to load */}
        <div className="fallback-bg" />
        
        {/* Video Overlay - Enhanced for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 w-24 h-24 bg-white/5 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 left-20 w-20 h-20 bg-white/5 rounded-full backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Video Controls */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        onClick={toggleMute}
        className="absolute top-8 right-8 z-30 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>

      {/* Main Content */}
      <div className="container-modern relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
        <div ref={textRef} className="max-w-6xl mx-auto">
          {/* Elegant Badge - Enhanced for better visibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium tracking-wide text-white drop-shadow-md">Premium Steel Kitchenware Export</span>
          </motion.div>

          {/* Main Heading - Enhanced for better visibility */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.9 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight drop-shadow-2xl"
          >
            <span className="block bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-lg">
              Alpify Global
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-light mt-6 font-sans tracking-wide text-white drop-shadow-lg">
              Premium Kitchenware Export
            </span>
          </motion.h1>

          {/* Elegant Description - Enhanced for better visibility */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.1 }}
            className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-balance font-light text-white drop-shadow-lg"
          >
            We are a trusted export company committed to delivering excellence in stainless steel kitchenware to markets worldwide.
          </motion.p>

          {/* Elegant Stats - Enhanced for better visibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.3 }}
            className="grid grid-cols-3 gap-12 max-w-3xl mx-auto mb-16"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3 text-yellow-400 drop-shadow-lg">25+</div>
              <div className="text-sm text-white tracking-wide uppercase drop-shadow-md">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3 text-yellow-400 drop-shadow-lg">50+</div>
              <div className="text-sm text-white tracking-wide uppercase drop-shadow-md">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3 text-yellow-400 drop-shadow-lg">100%</div>
              <div className="text-sm text-white tracking-wide uppercase drop-shadow-md">Quality Assured</div>
            </div>
          </motion.div>
        </div>

        {/* Elegant CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-lg px-10 py-5 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
          >
            <span className="flex items-center">
              Request for Quotation
              <motion.div
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVideoModalOpen(true)}
            className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold text-lg px-10 py-5 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
          >
            <span className="flex items-center">
              <Play className="w-5 h-5 mr-3" />
              Watch Video
            </span>
          </motion.button>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white opacity-70 cursor-pointer z-30"
        onClick={scrollToNext}
        whileHover={{ scale: 1.1, opacity: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-3"
        >
          <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-4 bg-white rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://res.cloudinary.com/dsrqs3aat/video/upload/v1757583837/VN20250911_150929_zbsspt.mp4"
      />
    </section>
  );
};

export default ElegantVideoHero; 