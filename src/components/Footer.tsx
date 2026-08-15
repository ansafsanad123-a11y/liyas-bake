import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Shield, Navigation, Heart } from "lucide-react";
import { useData } from "../context/DataContext";
import brandLogo from "../assets/images/liyas_bake_logo_1786681257310.jpg";

export const Footer: React.FC = () => {
  const { siteData } = useData();
  const settings = siteData?.settings;
  const hours = siteData?.businessHours;

  const currentLogo =
    settings?.logoUrl &&
    !settings.logoUrl.includes("photo-1509440159596") &&
    !settings.logoUrl.includes("unsplash.com")
      ? settings.logoUrl
      : brandLogo;

  return (
    <footer className="bg-[#180C09]/90 dark:bg-chocolate-950/90 backdrop-blur-xl text-cream-100 pt-16 pb-8 border-t border-white/20 dark:border-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 dark:border-chocolate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/60 shadow-md bg-[#FFF9F3] flex items-center justify-center shrink-0">
                <img
                  src={currentLogo}
                  alt={settings?.siteName || "Liya's Bake Logo"}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = brandLogo;
                  }}
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-cream-50 block leading-tight">
                  {settings?.siteName || "Liya's Bake"}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-gold-400">
                  • Baked with Love •
                </span>
              </div>
            </div>
            <p className="text-sm text-chocolate-200 leading-relaxed">
              {settings?.tagline || "Freshly Baked Happiness Every Day."}
            </p>
            <p className="text-xs text-chocolate-300 italic">
              Artisanal cakes, delicate viennoiserie, and bespoke celebration orders. Direct store collection only.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings?.instagramUrl || "#"}
                target="_blank"
                rel="noreferrer"
                id="footer-social-instagram"
                className="w-9 h-9 rounded-full bg-chocolate-800/80 hover:bg-gold-500 hover:text-chocolate-950 text-gold-400 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings?.facebookUrl || "#"}
                target="_blank"
                rel="noreferrer"
                id="footer-social-facebook"
                className="w-9 h-9 rounded-full bg-chocolate-800/80 hover:bg-gold-500 hover:text-chocolate-950 text-gold-400 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-gold-400 tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-chocolate-200">
              <li>
                <Link to="/" className="hover:text-gold-300 transition-colors">Home</Link>
              </li>
              <li>
                <a href="/#store-directions-guide" className="hover:text-gold-300 transition-colors inline-flex items-center gap-1 font-semibold text-gold-400">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Way to Bakery & Directions</span>
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">About Our Bakery</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-300 transition-colors">Artisanal Products</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold-300 transition-colors">Bake Gallery</Link>
              </li>
              <li>
                <Link to="/special-orders" className="hover:text-gold-300 transition-colors">Special Order Enquiry</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-gold-300 transition-colors">Guest Reviews</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gold-300 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gold-400 hover:underline inline-flex items-center gap-1 font-medium pt-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-gold-400 tracking-wide">
              Visit & Contact Us
            </h4>
            <div className="space-y-3 text-sm text-chocolate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>{settings?.address || "jolly mohalla masjid road pvr road bengaluru karnataka 560053"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${settings?.phone}`} className="hover:text-gold-300">{settings?.phone || "+91 8431126242"}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${settings?.email}`} className="hover:text-gold-300">{settings?.email || "hello@liyasbake.com"}</a>
              </div>
              <div className="pt-2">
                <a
                  href="/#store-directions-guide"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/20 text-gold-300 hover:bg-gold-500 hover:text-chocolate-950 text-xs font-bold transition-all border border-gold-400/30"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>View Way & Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-gold-400 tracking-wide">
              Bakery Hours
            </h4>
            <div className="space-y-1.5 text-xs text-chocolate-200">
              {hours && hours.length > 0 ? (
                hours.slice(0, 5).map((h) => (
                  <div key={h.day} className="flex justify-between py-0.5 border-b border-chocolate-800/50">
                    <span className="font-medium text-cream-100">{h.day}</span>
                    <span>{h.isClosed ? "Closed" : `${h.openTime} - ${h.closeTime}`}</span>
                  </div>
                ))
              ) : (
                <p>Mon - Sat: 7:00 AM - 8:00 PM<br />Sunday: 8:00 AM - 6:00 PM</p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-chocolate-300 gap-4">
          <p>© {new Date().getFullYear()} {settings?.siteName || "Liya's Bake"}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" /> for luxury baking enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
};
