import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, AlertCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DarkModeContext } from "@/App";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const AdminLogin = () => {
  const {
    darkMode,
    toggleDarkMode
  } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [adminExists, setAdminExists] = useState(true);
  
  // Signup form states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  // Check if user is already authenticated and if admin exists
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user is admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        if (profile?.role === 'admin') {
          navigate("/admin/dashboard");
        }
      }
      
      // Check if any admin exists
      const { data: adminProfiles } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);
      
      setAdminExists(adminProfiles && adminProfiles.length > 0);
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let loginEmail = emailOrUsername;

      // If input doesn't contain @, it's a username - look up the email
      if (!emailOrUsername.includes('@')) {
        // For the specific admin username, use a known email
        if (emailOrUsername === 'admin') {
          loginEmail = 'admin@alpify.com';
        } else {
          setError("Username not found");
          setIsLoading(false);
          return;
        }
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (profileError || profile?.role !== 'admin') {
          setError("Access denied. Admin privileges required.");
          await supabase.auth.signOut();
          setIsLoading(false);
          return;
        }

        toast({
          title: "Login successful",
          description: "Welcome back, admin!",
        });
        
        navigate("/admin/dashboard");
      }

      if (data.user) {
        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (profileError || profile?.role !== 'admin') {
          setError("Access denied. Admin privileges required.");
          await supabase.auth.signOut();
          setIsLoading(false);
          return;
        }

        toast({
          title: "Login successful",
          description: "Welcome back, admin!",
        });
        
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignupLoading(true);
    setSignupError("");

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: signupUsername,
            role: 'admin'
          }
        }
      });

      if (authError) {
        setSignupError(authError.message);
        setIsSignupLoading(false);
        return;
      }

      if (data.user) {
        // Create profile manually since trigger might not be working
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            username: signupUsername,
            role: 'admin'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        toast({
          title: "Admin account created successfully",
          description: "You can now login with your credentials.",
        });
        
        // Hide signup form and show login
        setShowSignup(false);
        setAdminExists(true);
        
        // Clear signup form
        setSignupEmail("");
        setSignupPassword("");
        setSignupUsername("");
      }
    } catch (err) {
      setSignupError("An unexpected error occurred");
    } finally {
      setIsSignupLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex items-center justify-center min-h-screen pt-20 pb-10">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="w-full max-w-md">
          {/* Login/Signup Card */}
          <div className="bg-card border border-border rounded-2xl shadow-elegant p-8">
            <div className="text-center mb-8">
              <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }} className="w-20 h-20 rounded-full overflow-hidden shadow-lg mx-auto mb-4">
                <img src="https://res.cloudinary.com/dknafpppp/image/upload/v1754593817/ChatGPT_Image_Aug_8_2025_12_40_02_AM_o1rxt0.png" alt="Alpify Global Logo" className="w-full h-full object-cover" />
              </motion.div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                {!adminExists || showSignup ? "Create Admin Account" : "Admin Login"}
              </h1>
              <p className="text-muted-foreground">
                {!adminExists || showSignup ? "Set up the first admin account" : "Access the product management panel"}
              </p>
            </div>

            {/* Toggle buttons when admin exists */}
            {adminExists && (
              <div className="flex mb-6 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setShowSignup(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    !showSignup ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    showSignup ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Create Admin
                </button>
              </div>
            )}

            {/* Signup Form */}
            {(!adminExists || showSignup) && (
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Username Field */}
                <div>
                  <label htmlFor="signupUsername" className="block text-sm font-medium text-foreground mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      id="signupUsername" 
                      type="text" 
                      value={signupUsername} 
                      onChange={e => setSignupUsername(e.target.value)} 
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      placeholder="Enter username" 
                      required 
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="signupEmail" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      id="signupEmail" 
                      type="email" 
                      value={signupEmail} 
                      onChange={e => setSignupEmail(e.target.value)} 
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      placeholder="Enter email address" 
                      required 
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="signupPassword" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      id="signupPassword" 
                      type={showSignupPassword ? "text" : "password"} 
                      value={signupPassword} 
                      onChange={e => setSignupPassword(e.target.value)} 
                      className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      placeholder="Create password" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowSignupPassword(!showSignupPassword)} 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {signupError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{signupError}</span>
                  </motion.div>
                )}

                {/* Signup Button */}
                <motion.button 
                  type="submit" 
                  disabled={isSignupLoading} 
                  className="w-full bg-gradient-to-r from-primary to-vibrant-orange text-white py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2" 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  {isSignupLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Create Admin Account</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}

            {/* Login Form */}
            {adminExists && !showSignup && (
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email or Username Field */}
                <div>
                  <label htmlFor="emailOrUsername" className="block text-sm font-medium text-foreground mb-2">
                    Email or Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      id="emailOrUsername" 
                      type="text" 
                      value={emailOrUsername} 
                      onChange={e => setEmailOrUsername(e.target.value)} 
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      placeholder="Enter email or username" 
                      required 
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      placeholder="Enter password" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                {/* Login Button */}
                <motion.button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full bg-gradient-to-r from-primary to-vibrant-orange text-white py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>;
};
export default AdminLogin;