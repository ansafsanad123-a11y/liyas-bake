import React, { useState, useMemo } from "react";
import { Search, Eye, Filter, Sparkles, Check, Info, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { ProductCategory, Product } from "../types";

export const Products: React.FC = () => {
  const { siteData, loading } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  const categories: (string | ProductCategory)[] = [
    "All",
    "Birthday Cakes",
    "Wedding Cakes",
    "Cupcakes",
    "Cookies",
    "Bread",
    "Pastries",
    "Seasonal Specials",
  ];

  const products = siteData?.products || [];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.isHidden) return false;
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* HEADER & DISCLAIMER BANNER */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Artisanal Bakes Showcase
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-chocolate-900 dark:text-cream-50">
          Our Product Catalog
        </h1>
        <p className="text-sm text-chocolate-700 dark:text-cream-200 leading-relaxed">
          Explore our handcrafted pastries, cakes, breads, and seasonal items.
        </p>

        {/* E-Commerce & Pickup Disclaimer Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs max-w-2xl mx-auto text-left sm:text-center">
          <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span><strong>Notice:</strong> Direct counter collection only — the food will not get to your home, it should be collected from our store address.</span>
        </div>
      </div>

      {/* SEARCH BAR & CATEGORY TABS */}
      <div className="space-y-6">
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-chocolate-600 dark:text-chocolate-300" />
          <input
            type="text"
            placeholder="Search cakes, croissants, cookies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="products-search-input"
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/40 dark:bg-chocolate-900/60 backdrop-blur-xl border border-white/60 dark:border-gold-500/30 text-[#3E2723] dark:text-cream-50 placeholder-chocolate-500/70 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-chocolate-600 hover:text-chocolate-900"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              id={`category-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#3E2723] text-white dark:bg-gold-500 dark:text-chocolate-950 shadow-lg scale-105"
                  : "bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-md text-[#3E2723] dark:text-cream-200 hover:bg-white/60 dark:hover:bg-chocolate-800/60 border border-white/60 dark:border-gold-500/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white/40 dark:bg-chocolate-900/50 backdrop-blur-xl rounded-[32px] border border-white/60 dark:border-gold-500/20 p-8 shadow-xl">
          <p className="font-serif text-xl font-bold text-[#3E2723] dark:text-cream-100">No products found</p>
          <p className="text-xs text-chocolate-700 dark:text-cream-300 mt-2 font-sans">Try adjusting your search query or selecting another category.</p>
          <button
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#3E2723] text-white dark:bg-gold-500 dark:text-chocolate-950 text-xs font-bold uppercase tracking-widest shadow-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 block">
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

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => setActiveProductModal(product)}
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-[#3E2723] dark:border-gold-500/40 text-xs font-bold uppercase tracking-wider text-[#3E2723] dark:text-cream-100 hover:bg-[#3E2723] hover:text-white dark:hover:bg-gold-500 dark:hover:text-chocolate-950 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/60 backdrop-blur-md">
          <div className="bg-white/80 dark:bg-chocolate-900/90 backdrop-blur-2xl rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl border border-white/60 dark:border-gold-500/30 relative">
            <button
              onClick={() => setActiveProductModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#3E2723]/80 text-white hover:bg-[#3E2723] backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-4/3 overflow-hidden bg-cream-100/60">
              <img
                src={activeProductModal.image}
                alt={activeProductModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                  {activeProductModal.category}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#FCE4EC] dark:bg-gold-500/20 text-[#3E2723] dark:text-gold-300">
                  {activeProductModal.availabilityBadge}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#3E2723] dark:text-cream-50">
                {activeProductModal.name}
              </h3>
              
              <p className="text-xs text-chocolate-800/90 dark:text-cream-200 leading-relaxed font-sans">
                {activeProductModal.description}
              </p>

              {activeProductModal.ingredients && activeProductModal.ingredients.length > 0 && (
                <div className="text-xs space-y-1">
                  <strong className="text-[#3E2723] dark:text-gold-400 block font-bold">Artisanal Ingredients:</strong>
                  <p className="text-chocolate-700 dark:text-cream-300">{activeProductModal.ingredients.join(", ")}</p>
                </div>
              )}

              {activeProductModal.allergens && activeProductModal.allergens.length > 0 && (
                <div className="text-xs space-y-1">
                  <strong className="text-rose-600 dark:text-rose-400 block font-bold">Allergens:</strong>
                  <p className="text-rose-700 dark:text-rose-300">{activeProductModal.allergens.join(", ")}</p>
                </div>
              )}

              <div className="pt-3 border-t border-white/40 dark:border-gold-500/20 flex gap-3">
                <Link
                  to="/special-orders"
                  onClick={() => setActiveProductModal(null)}
                  className="flex-1 py-3 rounded-xl bg-[#3E2723] dark:bg-gold-500 text-white dark:text-chocolate-950 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md hover:opacity-90"
                >
                  Send Inquiry For This Bake
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
