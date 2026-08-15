import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { MaintenanceBanner } from "./components/MaintenanceBanner";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { Gallery } from "./pages/Gallery";
import { SpecialOrders } from "./pages/SpecialOrders";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { NotFound } from "./pages/NotFound";

function AppContent() {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith("/admin/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F5] dark:bg-chocolate-950 text-chocolate-800 dark:text-cream-50 transition-colors duration-300 relative overflow-x-hidden font-sans">
      {/* Background Mesh Gradient Accents for Frosted Glass Theme */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#FCE4EC] dark:bg-[#3E2723] rounded-full blur-[120px] opacity-70 dark:opacity-40 pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[450px] h-[450px] bg-[#D4AF37] dark:bg-[#8C630D] rounded-full blur-[110px] opacity-25 dark:opacity-20 pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[30%] w-[350px] h-[350px] bg-[#F8BBD0] dark:bg-[#261512] rounded-full blur-[140px] opacity-35 dark:opacity-20 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-1">
        <MaintenanceBanner />
        {!isAdminDashboard && <Navbar />}
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/special-orders" element={<SpecialOrders />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isAdminDashboard && <Footer />}
        <ScrollToTop />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
