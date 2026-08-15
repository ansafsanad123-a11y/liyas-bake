import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  Heart,
  Sun,
  Star,
  Cake,
  Eye,
  CheckCircle2,
  Calendar,
  X,
  Phone,
  MapPin,
  Store,
  AlertTriangle,
  ShoppingBag,
  Navigation,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { StoreDirections } from "../components/StoreDirections";
import brandLogo from "../assets/images/liyas_bake_logo_1786681257310.jpg";

export const Home: React.FC = () => {
  const { siteData, loading } = useData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const homepage = siteData?.homepage;
  const settings = siteData?.settings;
  const products = siteData?.products || [];
  const gallery = siteData?.gallery || [];
  const testimonials = siteData?.testimonials || [];
  const hours = siteData?.businessHours || [];

  const featuredProducts = products.filter((p) => p.isFeatured && !p.isHidden).slice(0, 4);

  // Resolved logo
  const currentLogo =
    settings?.logoUrl &&
    !settings.logoUrl.includes("photo-1509440159596") &&
    !settings.logoUrl.includes("unsplash.com")
      ? settings.logoUrl
      : brandLogo;

  // Calculate if currently open based on business hours
  const getCurrentDayHours = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = days[new Date().getDay()];
    const todayObj = hours.find((h) => h.day === todayName);
    return todayObj || { day: todayName, openTime: "07:00 AM", closeTime: "08:00 PM", isClosed: false };
  };

  const todayHours = getCurrentDayHours();

  const pickupNoticeText =
    homepage?.pickupNotice ||
    settings?.pickupNotice ||
    "THE FOOD WILL NOT GET TO YOUR HOME IT SHOULD COME AND COLLECT FROM GIVEN ADDRESS";

  const storeAddress = settings?.address || "jolly mohalla masjid road pvr road bengaluru karnataka 560053";
  const mapsUrl = settings?.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(storeAddress)}`;

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      
      {/* HERO BANNER SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-chocolate-950">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={homepage?.heroImage || "/src/assets/images/hero_bakery_banner_1785843789202.jpg"}
            alt="Liya's Bake Hero Banner"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow opacity-35 filter contrast-110 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950 via-chocolate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-chocolate-950/85 via-transparent to-chocolate-950/85" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-cream-50 pt-10 pb-16 space-y-6">
          
          {/* Circular Logo Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mx-auto flex flex-col items-center"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-gold-400/80 shadow-2xl bg-[#FFF9F3] p-1 ring-4 ring-gold-500/20 backdrop-blur-md transform hover:rotate-3 transition-transform duration-300">
              <img
                src={currentLogo}
                alt="Liya's Bake - Baked with Love Logo"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = brandLogo;
                }}
              />
            </div>
          </motion.div>

          {/* Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 backdrop-blur-md text-gold-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Artisanal Luxury Bakery • Baked with Love</span>
          </motion.div>

          {/* Brand Name Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight gold-gradient-text drop-shadow-lg"
          >
            {homepage?.heroTitle || "Liya's Bake"}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-2xl font-light italic text-cream-100 max-w-2xl mx-auto tracking-wide"
          >
            "{homepage?.tagline || "Freshly Baked Happiness Every Day"}"
          </motion.p>

          <p className="text-xs sm:text-sm text-cream-200/90 max-w-lg mx-auto font-sans leading-relaxed">
            Handcrafted celebration cakes, 72-hour laminated viennoiserie, and bespoke event treats prepared daily with organic butter and pure passion.
          </p>

          {/* PROMINENT STARTING PAGE PICKUP NOTICE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-500/20 border-2 border-gold-400/70 backdrop-blur-xl shadow-2xl text-left"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-gold-500 text-chocolate-950 shrink-0 mt-0.5 shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-black uppercase tracking-wider bg-gold-500 text-chocolate-950 px-2.5 py-0.5 rounded-full">
                    ⚠️ Important Store Policy
                  </span>
                  <span className="text-[11px] font-semibold text-gold-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Today: {todayHours.isClosed ? "Closed" : `${todayHours.openTime} - ${todayHours.closeTime}`}
                  </span>
                </div>
                <h3 className="font-serif text-sm sm:text-base font-extrabold text-gold-200 tracking-wide leading-snug uppercase">
                  {pickupNoticeText}
                </h3>
                <div className="text-xs text-cream-100/95 flex items-start gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pickup Location:</strong> {storeAddress}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              to="/products"
              id="hero-view-products-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3E2723] hover:bg-[#261512] dark:bg-gold-500 dark:hover:bg-gold-400 text-white dark:text-chocolate-950 font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-[#3E2723]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-white/20"
            >
              <Cake className="w-4 h-4 text-gold-400 dark:text-chocolate-950" />
              <span>{homepage?.ctaText1 || "View Products"}</span>
            </Link>

            <a
              href="#store-directions-guide"
              id="hero-directions-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-chocolate-950 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              <span>Way to Bakery & Directions</span>
            </a>

            <Link
              to="/special-orders"
              id="hero-special-order-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-cream-50 border-2 border-white/40 dark:border-gold-400/50 backdrop-blur-md font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <span>{homepage?.ctaText2 || "Special Order Inquiry"}</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* HIGHLIGHTED STORE COLLECTION & PICKUP DETAILS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="bg-gradient-to-r from-[#2C1810] via-[#3E2723] to-[#2C1810] text-cream-50 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-gold-500/50 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30">
                <AlertTriangle className="w-3.5 h-3.5 text-gold-400" />
                <span>Self-Pickup Only Notice</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream-50 leading-snug">
                "{pickupNoticeText}"
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-200 leading-relaxed font-sans">
                We do not provide doorstep delivery. To guarantee the pristine texture and temperature of all cakes, pastries, and treats, customers must pick up their orders in person from our bakery counter.
              </p>
              <div className="flex items-center gap-2 text-xs text-gold-300 pt-1 font-medium">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-semibold">{storeAddress}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="#store-directions-guide"
                id="home-open-directions-btn"
                className="w-full py-3 px-5 rounded-xl bg-gold-500 hover:bg-gold-400 text-chocolate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Show Way to Address & GPS Route</span>
              </a>
              <a
                href={`tel:${settings?.phone || "+918431126242"}`}
                id="home-call-store-btn"
                className="w-full py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-cream-100 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Store: {settings?.phone || "+91 8431126242"}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* DEDICATED STORE DIRECTIONS & LIVE MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoreDirections
          address={storeAddress}
          phone={settings?.phone || "+91 8431126242"}
          pickupNotice={pickupNoticeText}
        />
      </section>

      {/* WELCOME STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-xl rounded-[32px] p-8 sm:p-12 shadow-xl border border-white/60 dark:border-gold-500/20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold text-gold-600 dark:text-gold-400 tracking-widest block bg-[#FCE4EC] dark:bg-gold-500/20 text-[#3E2723] dark:text-gold-300 px-3 py-1 rounded-full w-fit">
              {homepage?.welcomeSubtitle || "Where Every Creation Tells A Celebration Story"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] dark:text-cream-50">
              {homepage?.welcomeTitle || "Artisanal Craftsmanship & Pure Passion"}
            </h2>
            <p className="text-chocolate-800/90 dark:text-cream-200 leading-relaxed font-sans text-sm sm:text-base">
              {homepage?.welcomeStory ||
                "Founded in the heart of the culinary district, Liya's Bake brings timeless Parisian pastry techniques together with modern flavor palettes. We handcraft every batch using 100% organic French butter, Madagascar bourbon vanilla, and locally harvested berries."}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/50 dark:bg-chocolate-800/50 border border-white/60 dark:border-gold-500/20 backdrop-blur-md">
                <p className="font-serif text-2xl font-bold text-gold-600">100% Organic</p>
                <p className="text-xs text-chocolate-700 dark:text-cream-300">Butter & Heritage Wheat</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 dark:bg-chocolate-800/50 border border-white/60 dark:border-gold-500/20 backdrop-blur-md">
                <p className="font-serif text-2xl font-bold text-gold-600">Fresh Daily</p>
                <p className="text-xs text-chocolate-700 dark:text-cream-300">Ovens Fired Before Dawn</p>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-[#3E2723] dark:text-gold-400 hover:text-gold-600 transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/30">
              <img
                src="/src/assets/images/about_bakery_story_1785843803396.jpg"
                alt="Baker Crafting Cake"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-chocolate-950 text-cream-50 p-4 sm:p-6 rounded-2xl shadow-2xl border border-gold-500/40 hidden sm:block max-w-xs">
              <p className="font-serif italic text-sm text-gold-300">
                "Baking is the art of turning simple grain and sugar into everlasting memories."
              </p>
              <p className="text-xs font-semibold text-cream-200 mt-2">— Liya Vance, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400 block">
              Handcrafted Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 dark:text-cream-50">
              {homepage?.featuredSectionTitle || "Our Signature Creations"}
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-chocolate-800 dark:text-gold-400 hover:text-gold-600 transition-colors"
          >
            <span>View All Bakes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg border border-white/60 dark:border-gold-500/20 group hover:shadow-2xl hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-cream-100/60 dark:bg-chocolate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#FCE4EC] dark:bg-chocolate-950/80 text-[#3E2723] dark:text-gold-300 backdrop-blur-md border border-white/40 dark:border-gold-400/30">
                    {product.availabilityBadge}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#3E2723] dark:text-cream-100 group-hover:text-gold-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-chocolate-800/80 dark:text-cream-200 line-clamp-2 leading-relaxed font-sans">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-[#3E2723] dark:border-gold-500/40 text-xs font-bold uppercase tracking-wider text-[#3E2723] dark:text-cream-100 hover:bg-[#3E2723] hover:text-white dark:hover:bg-gold-500 dark:hover:text-chocolate-950 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quick View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white/20 dark:bg-chocolate-950/40 py-16 border-y border-white/50 dark:border-gold-500/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E2723] dark:text-gold-400 bg-[#FCE4EC] dark:bg-gold-500/20 px-3 py-1 rounded-full inline-block">
              The Liya's Bake Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] dark:text-cream-50">
              Why Our Bakery Is Cherished
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/60 dark:border-gold-500/20 shadow-lg space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FCE4EC] dark:bg-gold-500/20 text-[#3E2723] dark:text-gold-400 flex items-center justify-center border border-white/40">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3E2723] dark:text-cream-100">Artisanal Ingredients</h3>
              <p className="text-xs text-chocolate-800/80 dark:text-cream-200 leading-relaxed font-sans">
                Single-origin Valrhona dark chocolate, Normandy butter, and Madagascar bourbon vanilla beans in every single recipe.
              </p>
            </div>

            <div className="bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/60 dark:border-gold-500/20 shadow-lg space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FCE4EC] dark:bg-gold-500/20 text-[#3E2723] dark:text-gold-400 flex items-center justify-center border border-white/40">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3E2723] dark:text-cream-100">Baked Fresh Daily</h3>
              <p className="text-xs text-chocolate-800/80 dark:text-cream-200 leading-relaxed font-sans">
                Our team fires up hearth ovens before dawn. No preservatives, no frozen dough batches — always warm and fresh.
              </p>
            </div>

            <div className="bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/60 dark:border-gold-500/20 shadow-lg space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FCE4EC] dark:bg-gold-500/20 text-[#3E2723] dark:text-gold-400 flex items-center justify-center border border-white/40">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3E2723] dark:text-cream-100">Bespoke Custom Art</h3>
              <p className="text-xs text-chocolate-800/80 dark:text-cream-200 leading-relaxed font-sans">
                From delicate hand-piped flowers to 24k gold leaf accents, every custom order is tailored to your exact celebration vision.
              </p>
            </div>

            <div className="bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/60 dark:border-gold-500/20 shadow-lg space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FCE4EC] dark:bg-gold-500/20 text-[#3E2723] dark:text-gold-400 flex items-center justify-center border border-white/40">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3E2723] dark:text-cream-100">Master Pastry Chefs</h3>
              <p className="text-xs text-chocolate-800/80 dark:text-cream-200 leading-relaxed font-sans">
                French-trained pastry chefs with decades of combined experience in luxury wedding tiers and delicate patisserie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400 block">
              Visual Moments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 dark:text-cream-50">
              Gallery Snippet
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-chocolate-800 dark:text-gold-400 hover:text-gold-600 transition-colors"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.slice(0, 4).map((item) => (
            <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden group shadow-md">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-cream-50">
                <p className="font-serif text-sm font-bold">{item.title}</p>
                <p className="text-[10px] text-gold-300 uppercase tracking-widest">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS PREVIEW & BUSINESS HOURS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Reviews Snippet */}
        <div className="lg:col-span-2 bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-white/60 dark:border-gold-500/20 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E2723] dark:text-gold-400 block bg-[#FCE4EC] dark:bg-gold-500/20 px-3 py-1 rounded-full w-fit">
                Loved By Guests
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#3E2723] dark:text-cream-50 mt-2">
                Customer Testimonials
              </h2>
            </div>
            <Link to="/testimonials" className="text-xs font-bold uppercase tracking-widest text-[#3E2723] dark:text-gold-400 hover:text-gold-600 transition-colors">
              View All Reviews
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 2).map((t) => (
              <div key={t.id} className="p-5 rounded-2xl bg-white/50 dark:bg-chocolate-800/50 border border-white/60 dark:border-gold-500/10 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-chocolate-600 dark:text-cream-300 uppercase tracking-widest">{t.occasion}</span>
                </div>
                <p className="text-xs text-chocolate-800/90 dark:text-cream-100 italic leading-relaxed font-sans">
                  "{t.comment}"
                </p>
                <p className="text-xs font-bold text-[#3E2723] dark:text-gold-400">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business Hours & Store Info Card */}
        <div className="bg-[#3E2723]/90 dark:bg-chocolate-950/90 backdrop-blur-xl text-cream-50 p-8 rounded-[32px] border border-white/20 dark:border-gold-500/30 shadow-2xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/20 dark:border-chocolate-800 pb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif text-xl font-bold text-cream-50">Business Hours</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                todayHours.isClosed ? "bg-rose-500/30 text-rose-200 border border-rose-400/30" : "bg-emerald-500/30 text-emerald-200 border border-emerald-400/30"
              }`}>
                {todayHours.isClosed ? "Closed Today" : "Open Today"}
              </span>
            </div>

            <p className="text-xs text-cream-200/90 mt-4 mb-4">
              Today ({todayHours.day}): <strong className="text-gold-300">{todayHours.isClosed ? "Closed" : `${todayHours.openTime} - ${todayHours.closeTime}`}</strong>
            </p>

            <div className="space-y-2 text-xs text-cream-200">
              {hours.map((h) => (
                <div key={h.day} className={`flex justify-between py-1 border-b border-white/10 dark:border-chocolate-800/40 ${h.day === todayHours.day ? "text-gold-300 font-bold" : ""}`}>
                  <span>{h.day}</span>
                  <span>{h.isClosed ? "Closed" : `${h.openTime} - ${h.closeTime}`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/20 dark:border-chocolate-800 text-xs space-y-2">
            <p className="flex items-center gap-2 text-gold-300">
              <Phone className="w-3.5 h-3.5" />
              <span>{siteData?.settings?.phone || "+1 (555) 839-2253"}</span>
            </p>
            <p className="text-cream-200/80">
              {siteData?.settings?.address || "742 Evergreen Artisan Avenue"}
            </p>
          </div>
        </div>

      </section>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/60 backdrop-blur-md">
          <div className="bg-white/80 dark:bg-chocolate-900/90 backdrop-blur-2xl rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl border border-white/60 dark:border-gold-500/30 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#3E2723]/80 text-white hover:bg-[#3E2723] backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-4/3 overflow-hidden bg-cream-100/60">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                  {selectedProduct.category}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#FCE4EC] dark:bg-gold-500/20 text-[#3E2723] dark:text-gold-300">
                  {selectedProduct.availabilityBadge}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#3E2723] dark:text-cream-50">
                {selectedProduct.name}
              </h3>
              <p className="text-xs text-chocolate-800/90 dark:text-cream-200 leading-relaxed font-sans">
                {selectedProduct.description}
              </p>

              {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                <div className="text-xs space-y-1">
                  <strong className="text-[#3E2723] dark:text-gold-400 block font-bold">Ingredients:</strong>
                  <p className="text-chocolate-700 dark:text-cream-300">{selectedProduct.ingredients.join(", ")}</p>
                </div>
              )}

              {selectedProduct.allergens && selectedProduct.allergens.length > 0 && (
                <div className="text-xs space-y-1">
                  <strong className="text-rose-600 dark:text-rose-400 block font-bold">Allergens:</strong>
                  <p className="text-rose-700 dark:text-rose-300">{selectedProduct.allergens.join(", ")}</p>
                </div>
              )}

              <div className="pt-2 border-t border-white/40 dark:border-gold-500/20 flex gap-3">
                <Link
                  to="/special-orders"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-3 rounded-xl bg-[#3E2723] dark:bg-gold-500 text-white dark:text-chocolate-950 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md hover:opacity-90"
                >
                  Inquire For Special Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
