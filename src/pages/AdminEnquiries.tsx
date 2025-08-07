import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Trash2,
  Reply,
  Search,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DarkModeContext } from "@/App";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: string;
  status: 'new' | 'in-progress' | 'responded' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  respondedAt?: string;
  response?: string;
  source: string;
}

const AdminEnquiries = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState("");

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Load enquiries from localStorage
  useEffect(() => {
    const savedEnquiries = localStorage.getItem("adminEnquiries");
    if (savedEnquiries) {
      setEnquiries(JSON.parse(savedEnquiries));
    } else {
      // Only add sample enquiries if there are no existing enquiries
      const sampleEnquiries: Enquiry[] = [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "+1 (555) 123-4567",
          subject: "Quote Request for Cookware Set",
          message: "I'm interested in purchasing a premium cookware set for my restaurant. Could you please provide a quote for 10 sets?",
          category: "Quote Request",
          status: "new",
          priority: "high",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: "Contact Form"
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.j@restaurant.com",
          phone: "+1 (555) 987-6543",
          subject: "Product Information Request",
          message: "I'm looking for information about your induction-ready cookware. Do you have any sets that are compatible with commercial induction cooktops?",
          category: "Product Information",
          status: "in-progress",
          priority: "medium",
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          source: "Email"
        },
        {
          id: "3",
          name: "Mike Chen",
          email: "mike.chen@hotel.com",
          phone: "+1 (555) 456-7890",
          subject: "Partnership Inquiry",
          message: "We're a 5-star hotel looking to upgrade our kitchen equipment. We'd like to discuss a potential partnership for bulk purchases.",
          category: "Partnership",
          status: "responded",
          priority: "urgent",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          respondedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          response: "Thank you for your interest in partnering with Alpify Global. Our sales team will contact you within 24 hours.",
          source: "Phone"
        }
      ];
      setEnquiries(sampleEnquiries);
      localStorage.setItem("adminEnquiries", JSON.stringify(sampleEnquiries));
    }
  }, []);

  // Filter enquiries
  useEffect(() => {
    let filtered = enquiries;

    if (searchTerm) {
      filtered = filtered.filter(enquiry =>
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(enquiry => enquiry.status === statusFilter);
    }

    setFilteredEnquiries(filtered);
  }, [enquiries, searchTerm, statusFilter]);

  const handleStatusChange = (enquiryId: string, newStatus: Enquiry['status']) => {
    const updatedEnquiries = enquiries.map(enquiry => {
      if (enquiry.id === enquiryId) {
        return {
          ...enquiry,
          status: newStatus,
          respondedAt: newStatus === 'responded' ? new Date().toISOString() : enquiry.respondedAt
        };
      }
      return enquiry;
    });
    setEnquiries(updatedEnquiries);
    localStorage.setItem("adminEnquiries", JSON.stringify(updatedEnquiries));
  };

  const handleDeleteEnquiry = (enquiryId: string) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      const updatedEnquiries = enquiries.filter(e => e.id !== enquiryId);
      setEnquiries(updatedEnquiries);
      localStorage.setItem("adminEnquiries", JSON.stringify(updatedEnquiries));
    }
  };

  const handleRespond = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setResponseText(enquiry.response || "");
    setShowResponseModal(true);
  };

  const handleSubmitResponse = () => {
    if (!selectedEnquiry || !responseText.trim()) return;

    const updatedEnquiries = enquiries.map(enquiry => {
      if (enquiry.id === selectedEnquiry.id) {
        return {
          ...enquiry,
          status: 'responded' as const,
          response: responseText,
          respondedAt: new Date().toISOString()
        };
      }
      return enquiry;
    });

    setEnquiries(updatedEnquiries);
    localStorage.setItem("adminEnquiries", JSON.stringify(updatedEnquiries));
    setShowResponseModal(false);
  };

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    inProgress: enquiries.filter(e => e.status === 'in-progress').length,
    responded: enquiries.filter(e => e.status === 'responded').length,
    urgent: enquiries.filter(e => e.priority === 'urgent').length
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
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
                <h1 className="text-4xl font-bold text-primary mb-2">Customer Enquiries</h1>
                <p className="text-muted-foreground">Manage and respond to customer inquiries</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.button
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Back to Dashboard</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6 shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Enquiries</p>
                  <p className="text-3xl font-bold text-primary">{stats.total}</p>
                </div>
                <Mail className="w-8 h-8 text-primary" />
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
                  <p className="text-muted-foreground text-sm">New</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
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
                  <p className="text-muted-foreground text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6 shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Responded</p>
                  <p className="text-3xl font-bold text-green-600">{stats.responded}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6 shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Urgent</p>
                  <p className="text-3xl font-bold text-red-600">{stats.urgent}</p>
                </div>
                <Star className="w-8 h-8 text-red-600" />
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
                  placeholder="Search enquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Enquiries List */}
          <div className="bg-card border border-border rounded-xl shadow-elegant overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredEnquiries.map((enquiry, index) => (
                    <motion.tr
                      key={enquiry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{enquiry.name}</p>
                          <p className="text-sm text-muted-foreground">{enquiry.email}</p>
                          <p className="text-xs text-muted-foreground">{enquiry.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{enquiry.subject}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {enquiry.message.substring(0, 50)}...
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {enquiry.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value as Enquiry['status'])}
                          className={`px-3 py-1 rounded-full text-sm border-0 ${
                            enquiry.status === 'new' ? 'bg-blue-100 text-blue-700' :
                            enquiry.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                            enquiry.status === 'responded' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="responded">Responded</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          enquiry.priority === 'low' ? 'bg-green-100 text-green-700' :
                          enquiry.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          enquiry.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {enquiry.priority.charAt(0).toUpperCase() + enquiry.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-muted-foreground">
                          <p>{formatDate(enquiry.createdAt)}</p>
                          {enquiry.respondedAt && (
                            <p className="text-xs">Replied: {formatDate(enquiry.respondedAt)}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => handleRespond(enquiry)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Reply className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteEnquiry(enquiry.id)}
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

            {filteredEnquiries.length === 0 && (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No enquiries found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl shadow-elegant w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                  Respond to Enquiry
                </h2>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Enquiry Details */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Original Enquiry</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>From:</strong> {selectedEnquiry.name} ({selectedEnquiry.email})</p>
                  <p><strong>Subject:</strong> {selectedEnquiry.subject}</p>
                  <p><strong>Message:</strong></p>
                  <div className="bg-background p-3 rounded border">
                    {selectedEnquiry.message}
                  </div>
                </div>
              </div>

              {/* Response Form */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Response
                </label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Type your response here..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSubmitResponse}
                  disabled={!responseText.trim()}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary to-vibrant-orange text-white rounded-lg hover:shadow-glow transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Reply className="w-4 h-4" />
                  <span>Send Response</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminEnquiries; 