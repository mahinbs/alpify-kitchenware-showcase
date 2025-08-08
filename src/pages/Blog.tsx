import React, { useContext, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, User, Tag, Clock, TrendingUp, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyQuotationButton from "@/components/StickyQuotationButton";
import { DarkModeContext } from "@/App";
import { useBlogs, Blog } from "@/hooks/use-blogs";

gsap.registerPlugin(ScrollTrigger);

const BlogPage = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { blogs, loading } = useBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  // Filter blogs based on search and category
  useEffect(() => {
    let filtered = blogs.filter(blog => blog.isPublished);
    
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter(blog => blog.category === categoryFilter);
    }
    
    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, categoryFilter]);

  const categories = ["Industry Insights", "Buying Guide", "Recipes", "Company News", "Tips & Tricks"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-vibrant-orange bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover insights, tips, and industry knowledge from Alpify Global's kitchenware experts
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div 
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 space-y-4 md:space-y-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-80"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-muted-foreground">
              {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
            </div>
          </motion.div>
        </div>
      </section>



      {/* Blog Posts Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading articles...</p>
            </motion.div>
          ) : (filteredBlogs.length > 0 || blogs.length > 0) ? (
            <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
              {(filteredBlogs.length > 0 ? filteredBlogs : blogs).map((blog, index) => (
                <motion.article
                  key={blog.id}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-500 group"
                >
                  {/* Blog Image */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'No date'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{blog.readTime || 5} min read</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {blog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-vibrant-orange transition-colors duration-300">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Author and Views */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span>{blog.views || 0} views</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mb-6">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-muted rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="px-2 py-1 bg-muted rounded-full text-xs">
                              +{blog.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Read More Button */}
                    <Link to={`/blog/${blog.id}`}>
                      <motion.button
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-vibrant-orange text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Read Article
                      </motion.button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">No articles found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {searchTerm || categoryFilter !== "all" 
                  ? "Try adjusting your search or filter criteria to find what you're looking for."
                  : "We're working on creating amazing content for you. Check back soon!"
                }
              </p>
              {(searchTerm || categoryFilter !== "all") && (
                <motion.button
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-vibrant-orange text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-subtle relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Stay Updated with Our Latest Articles
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get notified when we publish new articles about kitchenware trends, cooking tips, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-primary to-vibrant-orange text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <StickyQuotationButton />
      <Footer />
    </div>
  );
};

export default BlogPage; 