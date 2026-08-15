import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Shield, MapPin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import brandLogo from "../assets/images/liyas_bake_logo_1786681257310.jpg";

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { siteData } = useData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const settings = siteData?.settings;

  // Resolved logo: prioritize uploaded custom logo unless it's the old bread photo, otherwise use the official brandLogo
  const currentLogo =
    settings?.logoUrl &&
    !settings.logoUrl.includes("photo-1509440159596") &&
    !settings.logoUrl.includes("unsplash.com")
      ? settings.logoUrl
      : brandLogo;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Special Orders", path: "/special-orders" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white/40 dark:bg-chocolate-950/60 backdrop-blur-md border-b border-white/50 dark:border-gold-500/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" id="nav-brand-logo" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/60 shadow-md group-hover:scale-105 transition-transform duration-300 bg-[#FFF9F3] flex items-center justify-center shrink-0">
            <img
              src={currentLogo}
              alt={settings?.siteName || "Liya's Bake Logo"}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = brandLogo;
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#3E2723] dark:text-cream-50 group-hover:text-gold-600 transition-colors leading-tight">
              {settings?.siteName || "Liya's Bake"}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-gold-600 dark:text-gold-400">
              • Baked with Love •
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? "text-[#D4AF37] border-b-2 border-[#D4AF37] font-bold bg-white/50 dark:bg-chocolate-800/40"
                    : "text-[#3E2723]/80 dark:text-cream-200 hover:text-[#D4AF37] dark:hover:text-gold-400 hover:bg-white/30 dark:hover:bg-chocolate-800/30"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Quick Directions Navigation Link */}
          <a
            href="/#store-directions-guide"
            id="nav-link-directions"
            className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-400/30 transition-all inline-flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Way to Bakery</span>
          </a>
        </nav>

        {/* Action Buttons: Dark Mode & Visible Admin Login */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label="Toggle theme"
            className="p-2.5 rounded-full bg-white/50 dark:bg-chocolate-800/80 text-[#3E2723] dark:text-gold-300 hover:text-gold-600 transition-colors border border-white/60 dark:border-gold-500/20 shadow-xs"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Visible Admin Login / Dashboard Button */}
          <Link
            to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
            id="nav-admin-login-btn"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#3E2723] text-white dark:bg-gold-500 dark:text-chocolate-950 hover:opacity-90 shadow-md transition-all"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isAuthenticated ? "Admin Panel" : "Admin Login"}</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            id="mobile-theme-toggle"
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-cream-100 dark:bg-chocolate-800 text-chocolate-800 dark:text-gold-300"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            id="mobile-menu-toggle-btn"
            aria-label="Open menu"
            className="p-2 rounded-lg text-chocolate-900 dark:text-cream-100 hover:bg-cream-100 dark:hover:bg-chocolate-800 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/50 dark:border-gold-500/20 bg-white/70 dark:bg-chocolate-950/90 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${
                isActive(link.path)
                  ? "bg-white/80 dark:bg-chocolate-800/80 text-[#D4AF37] font-bold border border-white/60 dark:border-gold-500/30"
                  : "text-[#3E2723] dark:text-cream-200 hover:bg-white/40 dark:hover:bg-chocolate-800/40"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <a
            href="/#store-directions-guide"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gold-600 dark:text-gold-300 bg-gold-500/10 border border-gold-400/30"
          >
            📍 Way to Bakery & Store Pickup Directions
          </a>

          <div className="pt-2 border-t border-white/40 dark:border-gold-500/20">
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#3E2723] dark:bg-gold-500 text-white dark:text-chocolate-950 shadow-md"
            >
              <Shield className="w-4 h-4" />
              <span>{isAuthenticated ? "Admin Panel" : "Admin Login"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
