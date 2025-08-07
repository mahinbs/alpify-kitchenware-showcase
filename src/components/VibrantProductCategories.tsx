import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, Shield, Zap, Sparkles, Eye } from "lucide-react";
import cookware from "@/assets/cookware.jpg";
import dinnerware from "@/assets/dinnerware.jpg";
import drinkware from "@/assets/drinkware.jpg";
import serveware from "@/assets/serveware.jpg";
import storage from "@/assets/storage.jpg";
import tableware from "@/assets/tableware.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const VibrantProductCategories = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const categories = [
    {
      id: "cookware",
      title: "Cookware",
      description: "Premium stainless steel pots, pans, and cooking essentials that transform your culinary experience",
      image: cookware,
      features: ["Non-stick coating", "Heat resistant", "Easy cleaning"],
      icon: "🍳",
      gradient: "from-vibrant via-golden to-pink",
      hoverGradient: "from-pink via-vibrant to-golden",
      shadowColor: "shadow-vibrant/50"
    },
    {
      id: "dinnerware",
      title: "Dinnerware",
      description: "Elegant plates, bowls, and dining accessories that elevate every meal",
      image: dinnerware,
      features: ["Microwave safe", "Dishwasher safe", "Elegant design"],
      icon: "🍽️",
      gradient: "from-electric via-emerald to-neon",
      hoverGradient: "from-neon via-electric to-emerald",
      shadowColor: "shadow-electric/50"
    },
    {
      id: "drinkware",
      title: "Drinkware",
      description: "Stylish glasses, mugs, and beverage containers for every occasion",
      image: drinkware,
      features: ["Temperature control", "Durable construction", "Modern design"],
      icon: "🥤",
      gradient: "from-emerald via-electric to-vibrant",
      hoverGradient: "from-vibrant via-emerald to-electric",
      shadowColor: "shadow-emerald/50"
    },
    {
      id: "serveware",
      title: "Serveware",
      description: "Beautiful serving dishes and presentation pieces that impress your guests",
      image: serveware,
      features: ["Elegant presentation", "Versatile use", "Premium finish"],
      icon: "🎨",
      gradient: "from-pink via-neon to-electric",
      hoverGradient: "from-electric via-pink to-neon",
      shadowColor: "shadow-pink/50"
    },
    {
      id: "storage",
      title: "Storage",
      description: "Organized storage solutions that keep your kitchen perfectly arranged",
      image: storage,
      features: ["Space efficient", "Stackable design", "Airtight seal"],
      icon: "📦",
      gradient: "from-steel-accent via-metallic to-brand-blue",
      hoverGradient: "from-brand-blue via-steel-accent to-metallic",
      shadowColor: "shadow-steel-accent/50"
    },
    {
      id: "tableware",
      title: "Tableware",
      description: "Complete table setting essentials for sophisticated dining experiences",
      image: tableware,
      features: ["Complete sets", "Matching design", "Premium quality"],
      icon: "🍴",
      gradient: "from-golden via-vibrant to-emerald",
      hoverGradient: "from-emerald via-golden to-vibrant",
      shadowColor: "shadow-golden/50"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced stagger animation for category cards
      gsap.fromTo(
        ".vibrant-category-card",
        {
          y: 120,
          opacity: 0,
          scale: 0.8,
          rotationY: 45,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Enhanced parallax effect for category images
      gsap.utils.toArray(".vibrant-category-image").forEach((image: any) => {
        gsap.to(image, {
          yPercent: -30,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      // Floating animation for icons
      gsap.utils.toArray(".category-icon").forEach((icon: any, index) => {
        gsap.to(icon, {
          y: -10,
          rotation: 360,
          duration: 3 + index * 0.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="relative section-padding bg-gradient-to-br from-background via-steel-light/30 to-background overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-electric/20 to-pink/20 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-vibrant/20 to-emerald/20 rounded-full blur-2xl animate-morph" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-golden/10 to-neon/10 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-modern relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, type: "spring", stiffness: 80, damping: 12 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-electric/20 to-pink/20 backdrop-blur-md border border-white/30 text-steel-primary dark:text-white rounded-full px-6 py-3 mb-8 animate-pulse-glow"
          >
            <Shield className="w-5 h-5 text-electric animate-pulse" />
            <span className="text-sm font-bold tracking-wide">Premium Quality</span>
            <Sparkles className="w-5 h-5 text-golden animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-electric via-vibrant to-emerald bg-clip-text text-transparent animate-gradient-shift"
            style={{ backgroundSize: '400% 400%' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Our Product Categories
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover our comprehensive range of{" "}
            <span className="bg-gradient-to-r from-electric to-pink bg-clip-text text-transparent font-bold">
              premium stainless steel kitchenware
            </span>
            , designed to elevate your cooking and dining experience to extraordinary heights.
          </motion.p>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="vibrant-category-card group"
              whileHover={{ y: -15, rotateY: 5 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="relative h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 hover:border-white/40">
                {/* Enhanced Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <div className="vibrant-category-image absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                  </div>
                  
                  {/* Dynamic Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/50 transition-all duration-500`} />
                  
                  {/* Enhanced Category Icon */}
                  <motion.div 
                    className={`category-icon absolute top-6 right-6 w-16 h-16 bg-gradient-to-br ${category.gradient} backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-lg ${category.shadowColor} hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {category.icon}
                  </motion.div>

                  {/* Enhanced Category Badge */}
                  <motion.div 
                    className="absolute bottom-6 left-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${category.gradient} text-white shadow-lg backdrop-blur-sm`}>
                      <Star className="w-4 h-4 mr-2 fill-current animate-pulse" />
                      Premium
                    </div>
                  </motion.div>

                  {/* Hover Overlay Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.hoverGradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}
                    initial={{ opacity: 0 }}
                  />
                </div>

                {/* Enhanced Content */}
                <div className="p-8">
                  <motion.h3 
                    className={`text-2xl font-bold mb-4 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent group-hover:animate-text-glow`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {category.title}
                  </motion.h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                    {category.description}
                  </p>

                  {/* Enhanced Features */}
                  <div className="space-y-3 mb-8">
                    {category.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${category.gradient} rounded-full mr-4 animate-pulse`} />
                        <span className="font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r ${category.gradient} text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:${category.hoverGradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
                    <div className="relative flex items-center justify-center">
                      <Eye className="w-5 h-5 mr-3 animate-pulse" />
                      <span>Explore {category.title}</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </motion.button>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 80, damping: 12 }}
          className="text-center mt-24"
        >
          <div className="relative bg-gradient-to-r from-electric via-vibrant to-emerald rounded-3xl p-12 md:p-16 text-white shadow-2xl overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink/30 to-neon/30 animate-gradient-shift" style={{ backgroundSize: '400% 400%' }} />
            </div>
            
            <div className="relative z-10">
              <motion.h3 
                className="text-4xl md:text-5xl font-bold mb-6 animate-text-glow"
                whileHover={{ scale: 1.02 }}
              >
                Ready to Transform Your Kitchen?
              </motion.h3>
              <motion.p 
                className="text-xl opacity-95 mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Get in touch with us to explore our complete product catalog and receive{" "}
                <span className="font-bold bg-gradient-to-r from-golden to-white bg-clip-text text-transparent">
                  personalized recommendations
                </span>{" "}
                tailored to your specific needs.
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.08, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-white text-steel-primary font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-golden to-vibrant opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center">
                    <Zap className="w-6 h-6 mr-3 text-electric animate-pulse" />
                    Get Free Catalog
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.08, rotateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:border-white/50"
                >
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-6 h-6 mr-3 animate-pulse" />
                    Contact Sales Team
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VibrantProductCategories;