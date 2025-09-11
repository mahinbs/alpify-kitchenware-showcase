import { motion } from "framer-motion";
import { Download, FileText, Eye, Star, Sparkles } from "lucide-react";

const BrochureSection = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/ALPIFY GLOBAL_Catologue_2025-2026.pdf';
    link.download = 'ALPIFY GLOBAL_Catalogue_2025-2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    window.open('/ALPIFY GLOBAL_Catologue_2025-2026.pdf', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container-modern px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400 tracking-wide">
                Product Catalogue
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Explore Our Complete
              <span className="block text-yellow-600 dark:text-yellow-400">Product Range</span>
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive collection of premium stainless steel kitchenware products. 
              Download our latest catalogue to explore our full range of cookware, dinnerware, and more.
            </p>
          </motion.div>

          {/* Brochure Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Brochure Preview */}
              <div className="relative h-80 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-32 h-40 bg-white dark:bg-slate-600 rounded-lg shadow-lg mx-auto mb-6 flex items-center justify-center border-2 border-slate-300 dark:border-slate-500"
                  >
                    <FileText className="w-16 h-16 text-slate-400 dark:text-slate-300" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    ALPIFY GLOBAL Catalogue
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    2025-2026 Product Collection
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>Premium Quality</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                    <span>33MB PDF</span>
                  </div>
                </div>
              </div>

              {/* Brochure Content */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      Complete Product Overview
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      Our comprehensive catalogue showcases our entire range of premium stainless steel kitchenware products, 
                      including detailed specifications, high-quality images, and pricing information.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-slate-700 dark:text-slate-300">Cookware & Bakeware</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-slate-700 dark:text-slate-300">Dinnerware & Tableware</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-slate-700 dark:text-slate-300">Drinkware & Serveware</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-slate-700 dark:text-slate-300">Storage Solutions</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Action Buttons */}
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <Download className="w-6 h-6" />
                      <span>Download Catalogue</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePreview}
                      className="w-full bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-slate-50 dark:hover:bg-slate-600 transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <Eye className="w-6 h-6" />
                      <span>Preview Online</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Need a custom quote or have questions about our products? 
              <span className="text-yellow-600 dark:text-yellow-400 font-medium ml-1">
                Contact our sales team for personalized assistance.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrochureSection;
