import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Calendar, User, Tag, Image as ImageIcon, FileText, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DarkModeContext } from "@/App";
import { Blog } from "@/hooks/use-blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
const AdminBlogs = () => {
  const {
    darkMode,
    toggleDarkMode
  } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    tags: "",
    image: "",
    isPublished: true
  });

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Load blogs from localStorage
  useEffect(() => {
    const savedBlogs = localStorage.getItem("adminBlogs");
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      // Add sample blogs if none exist
      const sampleBlogs: Blog[] = [{
        id: "1",
        title: "The Future of Stainless Steel Kitchenware",
        content: "Stainless steel kitchenware has been a staple in professional kitchens for decades. Its durability, resistance to corrosion, and ease of maintenance make it an ideal choice for both commercial and residential use. In this comprehensive guide, we explore the latest innovations in stainless steel manufacturing and how they're shaping the future of kitchenware...",
        excerpt: "Discover the latest innovations in stainless steel kitchenware manufacturing and how they're revolutionizing the industry.",
        author: "Alpify Global Team",
        category: "Industry Insights",
        tags: ["stainless steel", "innovation", "manufacturing", "kitchenware"],
        image: "https://res.cloudinary.com/dknafpppp/image/upload/v1754593817/ChatGPT_Image_Aug_8_2025_12_40_02_AM_o1rxt0.png",
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: true,
        readTime: 5,
        views: 1250
      }, {
        id: "2",
        title: "Choosing the Right Cookware for Your Kitchen",
        content: "Selecting the perfect cookware set can be overwhelming with so many options available. From stainless steel to non-stick coatings, each material offers unique benefits. This guide will help you understand the differences between various cookware materials and choose the best option for your cooking needs...",
        excerpt: "A comprehensive guide to selecting the perfect cookware set for your kitchen needs and cooking style.",
        author: "Kitchen Expert",
        category: "Buying Guide",
        tags: ["cookware", "buying guide", "kitchen essentials", "cooking"],
        image: "https://res.cloudinary.com/dknafpppp/image/upload/v1754593817/ChatGPT_Image_Aug_8_2025_12_40_02_AM_o1rxt0.png",
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: true,
        readTime: 8,
        views: 890
      }];
      setBlogs(sampleBlogs);
      localStorage.setItem("adminBlogs", JSON.stringify(sampleBlogs));
    }
  }, []);

  // Filter blogs based on search and category
  useEffect(() => {
    let filtered = blogs;
    if (searchTerm) {
      filtered = filtered.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.content.toLowerCase().includes(searchTerm.toLowerCase()) || blog.author.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter !== "all") {
      filtered = filtered.filter(blog => blog.category === categoryFilter);
    }
    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, categoryFilter]);
  const categories = ["Industry Insights", "Buying Guide", "Recipes", "Company News", "Tips & Tricks"];
  const handleAddBlog = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      category: "",
      tags: "",
      image: "",
      isPublished: true
    });
    setShowModal(true);
  };
  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      category: blog.category,
      tags: blog.tags.join(", "),
      image: blog.image,
      isPublished: blog.isPublished
    });
    setShowModal(true);
  };
  const handleDeleteBlog = (blogId: string) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
    setBlogs(updatedBlogs);
    localStorage.setItem("adminBlogs", JSON.stringify(updatedBlogs));
    window.dispatchEvent(new CustomEvent('blogsUpdated'));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData: Blog = {
      id: editingBlog?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      author: formData.author,
      category: formData.category,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      image: formData.image,
      publishedAt: editingBlog?.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: formData.isPublished,
      readTime: Math.ceil(formData.content.split(" ").length / 200),
      // Estimate read time
      views: editingBlog?.views || 0
    };
    let updatedBlogs;
    if (editingBlog) {
      updatedBlogs = blogs.map(blog => blog.id === editingBlog.id ? blogData : blog);
    } else {
      updatedBlogs = [...blogs, blogData];
    }
    setBlogs(updatedBlogs);
    localStorage.setItem("adminBlogs", JSON.stringify(updatedBlogs));
    window.dispatchEvent(new CustomEvent('blogsUpdated'));
    setShowModal(false);
  };
  const stats = {
    total: blogs.length,
    published: blogs.filter(blog => blog.isPublished).length,
    draft: blogs.filter(blog => !blog.isPublished).length,
    totalViews: blogs.reduce((sum, blog) => sum + blog.views, 0)
  };
  return <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
                <img src="https://res.cloudinary.com/dknafpppp/image/upload/v1754593817/ChatGPT_Image_Aug_8_2025_12_40_02_AM_o1rxt0.png" alt="Alpify Global Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">Blog Management</h1>
                <p className="text-muted-foreground">Manage your blog content and articles</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.button onClick={() => navigate("/admin/dashboard")} className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <span>Back to Dashboard</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-card border border-border rounded-xl p-6 shadow-elegant">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Blogs</p>
                  <p className="text-3xl font-bold text-primary">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="bg-card border border-border rounded-xl p-6 shadow-elegant">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Published</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.published}</p>
                </div>
                <Eye className="w-8 h-8 text-emerald-600" />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="bg-card border border-border rounded-xl p-6 shadow-elegant">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Drafts</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
                </div>
                <EyeOff className="w-8 h-8 text-yellow-600" />
              </div>
            </motion.div>

            
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder="Search blogs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>

              {/* Category Filter */}
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="all">All Categories</option>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>

            {/* Add Blog Button */}
            <motion.button onClick={handleAddBlog} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-vibrant-orange text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-300" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Plus className="w-5 h-5" />
              <span>Add New Blog</span>
            </motion.button>
          </div>

          {/* Blogs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => <motion.div key={blog.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} className="bg-card border border-border rounded-xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300">
                {/* Blog Image */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.isPublished ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime} min read</span>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>{blog.views} views</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 2).map((tag, tagIndex) => <span key={tagIndex} className="px-2 py-1 bg-muted rounded-full text-xs">
                          {tag}
                        </span>)}
                      {blog.tags.length > 2 && <span className="px-2 py-1 bg-muted rounded-full text-xs">
                          +{blog.tags.length - 2}
                        </span>}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <motion.button onClick={() => handleEditBlog(blog)} className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm" whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }}>
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </motion.button>
                    <motion.button onClick={() => handleDeleteBlog(blog.id)} className="px-3 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors" whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }}>
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>)}
          </div>

          {filteredBlogs.length === 0 && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">No blogs found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || categoryFilter !== "all" ? "Try adjusting your search or filter criteria." : "Get started by creating your first blog post."}
              </p>
              {!searchTerm && categoryFilter === "all" && <motion.button onClick={handleAddBlog} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-vibrant-orange text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-300 mx-auto" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
                  <Plus className="w-5 h-5" />
                  <span>Create First Blog</span>
                </motion.button>}
            </motion.div>}
        </div>
      </div>

      {/* Blog Modal */}
      {showModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.9
      }} className="bg-card border border-border rounded-2xl shadow-elegant w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-primary">
                {editingBlog ? 'Edit Blog' : 'Add New Blog'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title" className="text-foreground font-medium">
                    Title *
                  </Label>
                  <Input id="title" value={formData.title} onChange={e => setFormData({
                ...formData,
                title: e.target.value
              })} className="mt-2" required />
                </div>

                <div>
                  <Label htmlFor="author" className="text-foreground font-medium">
                    Author *
                  </Label>
                  <Input id="author" value={formData.author} onChange={e => setFormData({
                ...formData,
                author: e.target.value
              })} className="mt-2" required />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-foreground font-medium">
                  Excerpt *
                </Label>
                <Textarea id="excerpt" value={formData.excerpt} onChange={e => setFormData({
              ...formData,
              excerpt: e.target.value
            })} className="mt-2" rows={3} required />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category" className="text-foreground font-medium">
                    Category *
                  </Label>
                  <select id="category" value={formData.category} onChange={e => setFormData({
                ...formData,
                category: e.target.value
              })} className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required>
                    <option value="">Select Category</option>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>

                <div>
                  <Label htmlFor="image" className="text-foreground font-medium">
                    Image URL *
                  </Label>
                  <Input id="image" value={formData.image} onChange={e => setFormData({
                ...formData,
                image: e.target.value
              })} className="mt-2" placeholder="https://example.com/image.jpg" required />
                </div>
              </div>

              <div>
                <Label htmlFor="tags" className="text-foreground font-medium">
                  Tags (comma-separated)
                </Label>
                <Input id="tags" value={formData.tags} onChange={e => setFormData({
              ...formData,
              tags: e.target.value
            })} className="mt-2" placeholder="stainless steel, kitchenware, cooking" />
              </div>

              <div>
                <Label htmlFor="content" className="text-foreground font-medium">
                  Content *
                </Label>
                <Textarea id="content" value={formData.content} onChange={e => setFormData({
              ...formData,
              content: e.target.value
            })} className="mt-2" rows={10} required />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="isPublished" checked={formData.isPublished} onChange={e => setFormData({
              ...formData,
              isPublished: e.target.checked
            })} className="rounded border-border" />
                <Label htmlFor="isPublished" className="text-foreground font-medium">
                  Publish immediately
                </Label>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-primary to-vibrant-orange">
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>}

      <Footer />
    </div>;
};
export default AdminBlogs;