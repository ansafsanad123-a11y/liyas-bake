import React, { useState, useMemo } from "react";
import { X, Sparkles, Image as ImageIcon } from "lucide-react";
import { useData } from "../context/DataContext";
import { GalleryCategory, GalleryItem } from "../types";

export const Gallery: React.FC = () => {
  const { siteData } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories: (string | GalleryCategory)[] = [
    "All",
    "Cakes",
    "Cookies",
    "Bread",
    "Pastries",
    "Events",
  ];

  const galleryItems = siteData?.gallery || [];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return galleryItems;
    return galleryItems.filter((g) => g.category === selectedCategory);
  }, [galleryItems, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Visual Feasts & Celebration Art
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-chocolate-900 dark:text-cream-50">
          Bakery Gallery
        </h1>
        <p className="text-sm text-chocolate-700 dark:text-cream-200">
          Browse our portfolio of custom wedding tiers, morning viennoiserie, and private dessert banquets.
        </p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            id={`gallery-filter-${cat.toLowerCase()}`}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-gold-500 text-chocolate-950 shadow-md scale-105"
                : "bg-white dark:bg-chocolate-900 text-chocolate-800 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-chocolate-800 border border-gold-500/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALLERY GRID */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-chocolate-900 rounded-3xl border border-gold-500/20 p-8">
          <p className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-100">No images in this category</p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-4 px-4 py-2 rounded-full bg-gold-500 text-chocolate-950 text-xs font-bold"
          >
            View All Images
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-gold-500/20 bg-cream-100"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/90 via-chocolate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-cream-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-cream-50">{item.title}</h3>
                <p className="text-xs text-cream-200 line-clamp-2 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/90 backdrop-blur-md"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-chocolate-900 rounded-3xl overflow-hidden shadow-2xl border border-gold-500/40 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-chocolate-950/80 text-white hover:bg-gold-500 hover:text-chocolate-950 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-black">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 space-y-2 text-cream-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                  {activeItem.category}
                </span>
                <span className="text-xs text-chocolate-400">{activeItem.uploadDate}</span>
              </div>
              <h2 className="font-serif text-2xl font-bold">{activeItem.title}</h2>
              <p className="text-sm text-cream-200 leading-relaxed">{activeItem.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
