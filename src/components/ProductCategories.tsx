import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import cookware from "@/assets/cookware.jpg";
import dinnerware from "@/assets/dinnerware.jpg";
import drinkware from "@/assets/drinkware.jpg";
import serveware from "@/assets/serveware.jpg";
import storage from "@/assets/storage.jpg";
import tableware from "@/assets/tableware.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ProductCategories = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const categories = [
    {
      id: "cookware",
      title: "Cookware",
      description: "Premium stainless steel pots, pans, and cooking essentials",
      image: cookware,
      features: ["Non-stick coating", "Heat resistant", "Easy cleaning"],
      icon: "🍳",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "dinnerware",
      title: "Dinnerware",
      description: "Elegant plates, bowls, and dining accessories",
      image: dinnerware,
      features: ["Microwave safe", "Dishwasher safe", "Elegant design"],
      icon: "🍽️",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "drinkware",
      title: "Drinkware",
      description: "Stylish glasses, mugs, and beverage containers",
      image: drinkware,
      features: ["Temperature control", "Durable construction", "Modern design"],
      icon: "🥤",
      color: "from-green-500 to-teal-500"
    },
    {
      id: "serveware",
      title: "Serveware",
      description: "Beautiful serving dishes and presentation pieces",
      image: serveware,
      features: ["Elegant presentation", "Versatile use", "Premium finish"],
      icon: "🎨",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "storage",
      title: "Storage",
      description: "Organized storage solutions for your kitchen",
      image: storage,
      features: ["Space efficient", "Stackable design", "Airtight seal"],
      icon: "📦",
      color: "from-gray-500 to-slate-500"
    },
    {
      id: "tableware",
      title: "Tableware",
      description: "Complete table setting essentials",
      image: tableware,
      features: ["Complete sets", "Matching design", "Premium quality"],
      icon: "🍴",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for category cards
      gsap.fromTo(
        ".category-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax effect for category images
      gsap.utils.toArray(".category-image").forEach((image: any) => {
        gsap.to(image, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
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
      className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container-modern">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-steel-primary/10 dark:bg-steel-primary/20 text-steel-primary dark:text-white rounded-full px-4 py-2 mb-6"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Quality</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Our Product Categories
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of premium stainless steel kitchenware, 
            designed to elevate your cooking and dining experience.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-modern overflow-hidden h-full">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="category-image absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
                  
                  {/* Category Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.color} text-white`}>
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Premium
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-steel-primary dark:text-white mb-3">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-steel-primary rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full btn-outline group-hover:bg-steel-primary group-hover:text-white transition-all duration-300"
                  >
                    <span>Explore {category.title}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-steel-primary to-brand-blue rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Kitchen?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Get in touch with us to explore our complete product catalog and receive personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary bg-white text-steel-primary hover:bg-gray-100"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Free Catalog
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-steel-primary"
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

export default ProductCategories;