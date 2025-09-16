import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DarkModeContext } from "@/contexts/DarkModeContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const location = useLocation();
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminRoute && (
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default Layout;