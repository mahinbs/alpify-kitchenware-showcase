import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, Shield } from "lucide-react";
import cookware from "@/assets/cookware.jpg";
import dinnerware from "@/assets/dinnerware.jpg";
import drinkware from "@/assets/drinkware.jpg";
import serveware from "@/assets/serveware.jpg";
import storage from "@/assets/storage.jpg";
import tableware from "@/assets/tableware.jpg";

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
      accentColor: "steel-accent"
    },
    {
      id: "dinnerware",
      title: "Dinnerware", 
      description: "Elegant plates, bowls, and dining accessories that elevate every meal",
      image: dinnerware,
      features: ["Microwave safe", "Dishwasher safe", "Elegant design"],
      icon: "🍽️",
      accentColor: "brand-blue"
    },
    {
      id: "drinkware",
      title: "Drinkware",
      description: "Stylish glasses, mugs, and beverage containers for every occasion",
      image: drinkware,
      features: ["Temperature control", "Durable construction", "Modern design"],
      icon: "🥤",
      accentColor: "electric"
    },
    {
      id: "serveware",
      title: "Serveware",
      description: "Beautiful serving dishes and presentation pieces that impress your guests",
      image: serveware,
      features: ["Elegant presentation", "Versatile use", "Premium finish"],
      icon: "🎨",
      accentColor: "golden"
    },
    {
      id: "storage",
      title: "Storage",
      description: "Organized storage solutions that keep your kitchen perfectly arranged",
      image: storage,
      features: ["Space efficient", "Stackable design", "Airtight seal"],
      icon: "📦",
      accentColor: "vibrant"
    },
    {
      id: "tableware",
      title: "Tableware",
      description: "Complete table setting essentials for sophisticated dining experiences",
      image: tableware,
      features: ["Complete sets", "Matching design", "Premium quality"],
      icon: "🍴",
      accentColor: "emerald"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".category-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.utils.toArray(".category-image").forEach((image: any) => {
        gsap.to(image, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="relative section-padding bg-background"
    >
      <div className="container-modern relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-card border border-border text-foreground rounded-full px-6 py-3 mb-8"
          >
            <Shield className="w-5 h-5 text-steel-accent" />
            <span className="text-sm font-semibold tracking-wide">Premium Quality</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Product Categories
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our comprehensive range of premium stainless steel kitchenware, 
            designed to elevate your cooking and dining experience.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card group"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-full bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 border border-border">
                <div className="relative h-64 overflow-hidden">
                  <div className="category-image absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  <motion.div 
                    className={`absolute top-4 right-4 w-12 h-12 bg-${category.accentColor}/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-${category.accentColor}/20`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {category.icon}
                  </motion.div>

                  <div className="absolute bottom-4 left-4">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-${category.accentColor}/20 text-${category.accentColor} backdrop-blur-sm border border-${category.accentColor}/30`}>
                      <Star className="w-3 h-3 mr-1.5 fill-current" />
                      Premium
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 text-foreground group-hover:text-${category.accentColor} transition-colors duration-300`}>
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {category.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="flex items-center text-muted-foreground"
                      >
                        <div className={`w-1.5 h-1.5 bg-${category.accentColor} rounded-full mr-3`} />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-${category.accentColor} text-white font-semibold py-3 px-4 rounded-xl hover:bg-${category.accentColor}/90 transition-colors duration-300 flex items-center justify-center`}
                  >
                    <span>Explore {category.title}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-steel-accent text-white rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Kitchen?
            </h3>
            <p className="text-steel-light mb-8 max-w-2xl mx-auto">
              Get in touch with us to explore our complete product catalog and receive 
              personalized recommendations tailored to your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-steel-accent font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                Get Free Catalog
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                Contact Sales Team
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VibrantProductCategories;