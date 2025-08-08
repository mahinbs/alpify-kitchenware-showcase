import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  LogOut, 
  Package, 
  Users, 
  TrendingUp,
  Eye,
  EyeOff,
  X,
  Save,
  Loader2,
  Mail,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DarkModeContext } from "@/App";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  features: string[];
  specifications: {
    material: string;
    warranty: string;
    origin: string;
    [key: string]: string;
  };
  stock: number;
  isActive: boolean;
  createdAt: string;
}

const AdminDashboard = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for adding/editing products
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    features: [""],
    specifications: {
      material: "",
      warranty: "",
      origin: ""
    },
    stock: "",
    isActive: true
  });

  const categories = [
    "Cookware",
    "Dinnerware", 
    "Drinkware",
    "Serveware",
    "Storage",
    "Tableware"
  ];

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("adminProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Add all products from the website if none exist
      const allProducts: Product[] = [
        // Cookware Products
        {
          id: "cookware-1",
          name: "Premium Stainless Steel Cookware Set",
          description: "Complete 10-piece cookware set with non-stick coating and heat-resistant handles",
          price: 24999,
          category: "Cookware",
          image: "/src/assets/cookware.jpg",
          features: ["Non-stick coating", "Heat resistant up to 500°F", "Dishwasher safe", "Oven safe", "Induction compatible"],
          specifications: {
            material: "18/10 Stainless Steel",
            warranty: "Lifetime",
            origin: "Made in Germany"
          },
          stock: 25,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "cookware-2",
          name: "Professional Chef Pan Collection",
          description: "Professional-grade pans designed for commercial kitchens and serious home chefs",
          price: 16999,
          category: "Cookware",
          image: "/src/assets/cookware.jpg",
          features: ["Heavy-duty construction", "Even heat distribution", "Professional finish", "Easy maintenance", "Stackable design"],
          specifications: {
            material: "Commercial-grade steel",
            warranty: "10 years",
            origin: "Made in Italy"
          },
          stock: 15,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "cookware-3",
          name: "Eco-Friendly Non-Stick Fry Pan",
          description: "Environmentally conscious non-stick pan with ceramic coating",
          price: 7499,
          category: "Cookware",
          image: "/src/assets/cookware.jpg",
          features: ["Ceramic non-stick coating", "PFOA-free", "Eco-friendly materials", "Lightweight design", "Quick heating"],
          specifications: {
            material: "Aluminum with ceramic coating",
            warranty: "5 years",
            origin: "Made in USA"
          },
          stock: 30,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "cookware-4",
          name: "Induction-Ready Sauce Pan Set",
          description: "Perfect for sauces, soups, and precise temperature control cooking",
          price: 12499,
          category: "Cookware",
          image: "/src/assets/cookware.jpg",
          features: ["Induction compatible", "Precise temperature control", "Pour spouts", "Lids included", "Stackable"],
          specifications: {
            material: "Magnetic stainless steel",
            warranty: "Lifetime",
            origin: "Made in France"
          },
          stock: 20,
          isActive: true,
          createdAt: new Date().toISOString()
        },

        // Dinnerware Products
        {
          id: "dinnerware-1",
          name: "Elegant Dinner Plate Set",
          description: "Sophisticated 12-piece dinner plate set with modern design and premium finish",
          price: 15999,
          category: "Dinnerware",
          image: "/src/assets/dinnerware.jpg",
          features: ["Microwave safe", "Dishwasher safe", "Elegant design", "Chip resistant", "Stackable"],
          specifications: {
            material: "Bone China",
            warranty: "2 years",
            origin: "Made in England"
          },
          stock: 40,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "dinnerware-2",
          name: "Complete Table Setting Collection",
          description: "Full 16-piece table setting including plates, bowls, and serving dishes",
          price: 28999,
          category: "Dinnerware",
          image: "/src/assets/dinnerware.jpg",
          features: ["Complete set", "Matching design", "Premium quality", "Versatile use", "Easy care"],
          specifications: {
            material: "Premium porcelain",
            warranty: "3 years",
            origin: "Made in Germany"
          },
          stock: 20,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "dinnerware-3",
          name: "Modern Salad Bowl Collection",
          description: "Contemporary salad bowls perfect for healthy meals and elegant presentations",
          price: 6499,
          category: "Dinnerware",
          image: "/src/assets/dinnerware.jpg",
          features: ["Modern design", "Perfect portion sizes", "Microwave safe", "Dishwasher safe", "Lightweight"],
          specifications: {
            material: "Tempered glass",
            warranty: "1 year",
            origin: "Made in France"
          },
          stock: 35,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "dinnerware-4",
          name: "Luxury Soup Bowl Set",
          description: "Elegant soup bowls with handles for comfortable dining experience",
          price: 10999,
          category: "Dinnerware",
          image: "/src/assets/dinnerware.jpg",
          features: ["Comfortable handles", "Heat retention", "Elegant rim design", "Stackable", "Oven safe"],
          specifications: {
            material: "Stoneware",
            warranty: "2 years",
            origin: "Made in Italy"
          },
          stock: 25,
          isActive: true,
          createdAt: new Date().toISOString()
        },

        // Drinkware Products
        {
          id: "drinkware-1",
          name: "Premium Wine Glass Set",
          description: "Elegant crystal wine glasses perfect for fine dining and special occasions",
          price: 13499,
          category: "Drinkware",
          image: "/src/assets/drinkware.jpg",
          features: ["Crystal clear", "Perfect balance", "Elegant stem", "Dishwasher safe", "Set of 6"],
          specifications: {
            material: "Lead-free crystal",
            warranty: "2 years",
            origin: "Made in Czech Republic"
          },
          stock: 30,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "drinkware-2",
          name: "Insulated Travel Mug Collection",
          description: "High-quality insulated mugs that keep beverages at perfect temperature",
          price: 7499,
          category: "Drinkware",
          image: "/src/assets/drinkware.jpg",
          features: ["Temperature control", "Leak-proof design", "Durable construction", "Modern design", "BPA-free"],
          specifications: {
            material: "Stainless steel",
            warranty: "5 years",
            origin: "Made in USA"
          },
          stock: 45,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "drinkware-3",
          name: "Cocktail Glass Set",
          description: "Professional cocktail glasses for home bartending and entertaining",
          price: 6499,
          category: "Drinkware",
          image: "/src/assets/drinkware.jpg",
          features: ["Professional design", "Perfect proportions", "Crystal clear", "Stackable", "Versatile use"],
          specifications: {
            material: "Tempered glass",
            warranty: "1 year",
            origin: "Made in Italy"
          },
          stock: 40,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "drinkware-4",
          name: "Beer Stein Collection",
          description: "Traditional beer steins with modern craftsmanship and elegant designs",
          price: 10999,
          category: "Drinkware",
          image: "/src/assets/drinkware.jpg",
          features: ["Traditional design", "Heat retention", "Durable construction", "Elegant finish", "Collector quality"],
          specifications: {
            material: "Stoneware",
            warranty: "3 years",
            origin: "Made in Germany"
          },
          stock: 20,
          isActive: true,
          createdAt: new Date().toISOString()
        },

        // Serveware Products
        {
          id: "serveware-1",
          name: "Elegant Serving Platter Set",
          description: "Beautiful serving dishes perfect for entertaining and special occasions",
          price: 16999,
          category: "Serveware",
          image: "/src/assets/serveware.jpg",
          features: ["Elegant presentation", "Versatile use", "Premium finish", "Dishwasher safe", "Set of 3"],
          specifications: {
            material: "Stainless steel",
            warranty: "3 years",
            origin: "Made in Italy"
          },
          stock: 15,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "serveware-2",
          name: "Modern Salad Bowl Collection",
          description: "Contemporary salad bowls with elegant design and practical functionality",
          price: 12499,
          category: "Serveware",
          image: "/src/assets/serveware.jpg",
          features: ["Modern design", "Perfect portion sizes", "Microwave safe", "Dishwasher safe", "Lightweight"],
          specifications: {
            material: "Tempered glass",
            warranty: "2 years",
            origin: "Made in France"
          },
          stock: 25,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "serveware-3",
          name: "Luxury Cheese Board Set",
          description: "Premium cheese boards with elegant presentation and storage solutions",
          price: 14999,
          category: "Serveware",
          image: "/src/assets/serveware.jpg",
          features: ["Premium wood", "Elegant presentation", "Storage included", "Easy care", "Gift ready"],
          specifications: {
            material: "Bamboo wood",
            warranty: "2 years",
            origin: "Made in Germany"
          },
          stock: 20,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "serveware-4",
          name: "Professional Chafing Dish Set",
          description: "Commercial-grade chafing dishes for catering and large gatherings",
          price: 24999,
          category: "Serveware",
          image: "/src/assets/serveware.jpg",
          features: ["Commercial grade", "Heat retention", "Professional finish", "Easy cleaning", "Stackable"],
          specifications: {
            material: "Stainless steel",
            warranty: "5 years",
            origin: "Made in USA"
          },
          stock: 10,
          isActive: true,
          createdAt: new Date().toISOString()
        },

        // Storage Products
        {
          id: "storage-1",
          name: "Premium Food Storage Set",
          description: "Complete food storage solution with airtight containers and organization system",
          price: 20999,
          category: "Storage",
          image: "/src/assets/storage.jpg",
          features: ["Airtight seal", "Stackable design", "Space efficient", "Microwave safe", "Set of 12"],
          specifications: {
            material: "BPA-free plastic",
            warranty: "3 years",
            origin: "Made in USA"
          },
          stock: 30,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "storage-2",
          name: "Professional Kitchen Organizer",
          description: "Commercial-grade kitchen organization system for maximum efficiency",
          price: 32999,
          category: "Storage",
          image: "/src/assets/storage.jpg",
          features: ["Commercial grade", "Modular design", "Easy assembly", "Durable construction", "Customizable"],
          specifications: {
            material: "Stainless steel",
            warranty: "5 years",
            origin: "Made in Germany"
          },
          stock: 8,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "storage-3",
          name: "Elegant Pantry Storage Collection",
          description: "Beautiful pantry storage solutions that keep your kitchen organized and stylish",
          price: 14999,
          category: "Storage",
          image: "/src/assets/storage.jpg",
          features: ["Elegant design", "Airtight containers", "Transparent lids", "Stackable", "Easy access"],
          specifications: {
            material: "Glass with silicone seals",
            warranty: "2 years",
            origin: "Made in France"
          },
          stock: 25,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "storage-4",
          name: "Compact Spice Rack System",
          description: "Space-saving spice organization system with easy access and elegant design",
          price: 7499,
          category: "Storage",
          image: "/src/assets/storage.jpg",
          features: ["Space saving", "Easy access", "Elegant design", "Wall mountable", "Adjustable shelves"],
          specifications: {
            material: "Bamboo wood",
            warranty: "2 years",
            origin: "Made in Italy"
          },
          stock: 35,
          isActive: true,
          createdAt: new Date().toISOString()
        },

        // Tableware Products
        {
          id: "tableware-1",
          name: "Complete Table Setting Collection",
          description: "Full 24-piece table setting including flatware, serving pieces, and accessories",
          price: 41999,
          category: "Tableware",
          image: "/src/assets/tableware.jpg",
          features: ["Complete set", "Matching design", "Premium quality", "Versatile use", "Gift ready"],
          specifications: {
            material: "18/10 Stainless Steel",
            warranty: "Lifetime",
            origin: "Made in Germany"
          },
          stock: 15,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "tableware-2",
          name: "Luxury Flatware Set",
          description: "Premium flatware set with elegant design and superior craftsmanship",
          price: 24999,
          category: "Tableware",
          image: "/src/assets/tableware.jpg",
          features: ["Premium finish", "Elegant design", "Dishwasher safe", "Set of 12", "Heavy weight"],
          specifications: {
            material: "18/10 Stainless Steel",
            warranty: "Lifetime",
            origin: "Made in Italy"
          },
          stock: 20,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "tableware-3",
          name: "Professional Serving Utensils",
          description: "Commercial-grade serving utensils perfect for entertaining and catering",
          price: 16999,
          category: "Tableware",
          image: "/src/assets/tableware.jpg",
          features: ["Commercial grade", "Professional finish", "Durable construction", "Complete set", "Easy care"],
          specifications: {
            material: "Stainless steel",
            warranty: "10 years",
            origin: "Made in France"
          },
          stock: 18,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "tableware-4",
          name: "Elegant Dessert Set",
          description: "Beautiful dessert forks and spoons with intricate design details",
          price: 12499,
          category: "Tableware",
          image: "/src/assets/tableware.jpg",
          features: ["Intricate design", "Perfect proportions", "Elegant finish", "Set of 6", "Gift quality"],
          specifications: {
            material: "18/10 Stainless Steel",
            warranty: "5 years",
            origin: "Made in England"
          },
          stock: 25,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      setProducts(allProducts);
      localStorage.setItem("adminProducts", JSON.stringify(allProducts));
    }
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  const handleAddProduct = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      features: [""],
      specifications: {
        material: "",
        warranty: "",
        origin: ""
      },
      stock: "",
      isActive: true
    });
    setEditingProduct(null);
    setShowAddModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      features: product.features,
      specifications: product.specifications,
      stock: product.stock.toString(),
      isActive: product.isActive
    });
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
          const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('productsUpdated'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      features: formData.features.filter(f => f.trim() !== ""),
      specifications: formData.specifications,
      stock: parseInt(formData.stock),
      isActive: formData.isActive,
      createdAt: editingProduct?.createdAt || new Date().toISOString()
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
    } else {
      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('productsUpdated'));
    
    setShowAddModal(false);
    setIsLoading(false);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.isActive).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://res.cloudinary.com/dknafpppp/image/upload/v1754593817/ChatGPT_Image_Aug_8_2025_12_40_02_AM_o1rxt0.png"
                  alt="Alpify Global Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your product catalog</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">
                Welcome, {localStorage.getItem("adminUsername")}
              </span>
              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6 shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6 shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Products</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.activeProducts}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Value</p>
                  <p className="text-3xl font-bold text-vibrant-orange">₹{stats.totalValue.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-vibrant-orange" />
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              {/* Enquiries Button */}
              <motion.button
                onClick={() => navigate("/admin/enquiries")}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-electric-blue to-vibrant-purple text-white rounded-lg hover:shadow-glow transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                <span>Customer Enquiries</span>
              </motion.button>

              {/* Blog Management Button */}
              <motion.button
                onClick={() => navigate("/admin/blogs")}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-glow transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5" />
                <span>Blog Management</span>
              </motion.button>

              {/* Add Product Button */}
              <motion.button
                onClick={handleAddProduct}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-vibrant-orange text-white rounded-lg hover:shadow-glow transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </motion.button>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-card border border-border rounded-xl shadow-elegant overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">₹{product.price}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          product.isActive 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card border border-border rounded-2xl shadow-elegant w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Features
                  </label>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter feature"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      + Add Feature
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Material
                    </label>
                    <input
                      type="text"
                      value={formData.specifications.material}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        specifications: { ...prev.specifications, material: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Warranty
                    </label>
                    <input
                      type="text"
                      value={formData.specifications.warranty}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        specifications: { ...prev.specifications, warranty: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Origin
                    </label>
                    <input
                      type="text"
                      value={formData.specifications.origin}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        specifications: { ...prev.specifications, origin: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label htmlFor="isActive" className="text-sm text-foreground">
                    Product is active
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary to-vibrant-orange text-white rounded-lg hover:shadow-glow transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default AdminDashboard; 