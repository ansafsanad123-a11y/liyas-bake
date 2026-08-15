import React from "react";
import { motion } from "motion/react";
import { Award, Sun, Heart, Sparkles, CheckCircle, ShieldCheck } from "lucide-react";
import { useData } from "../context/DataContext";

export const About: React.FC = () => {
  const { siteData } = useData();
  const about = siteData?.about;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Our Heritage & Passion
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-chocolate-900 dark:text-cream-50">
          {about?.storyTitle || "Our Journey & Philosophy"}
        </h1>
        <p className="text-sm sm:text-base text-chocolate-700 dark:text-cream-200 leading-relaxed font-sans">
          Where French patisserie techniques meet warm hospitality and single-origin organic ingredients.
        </p>
      </div>

      {/* STORY & PHOTO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          {about?.storyParagraphs?.map((paragraph, index) => (
            <p key={index} className="text-sm sm:text-base text-chocolate-800 dark:text-cream-100 leading-relaxed font-sans">
              {paragraph}
            </p>
          )) || (
            <p className="text-sm sm:text-base text-chocolate-800 dark:text-cream-100 leading-relaxed">
              At Liya's Bake, we believe that baking is a harmony of chemistry and soul. We never compromise on ingredients — using single-origin Valrhona chocolate, farm-fresh pasture eggs, and slow-fermented starters.
            </p>
          )}

          <div className="p-6 rounded-2xl bg-cream-100 dark:bg-chocolate-900 border-l-4 border-gold-500 space-y-2">
            <h3 className="font-serif text-lg font-bold text-chocolate-900 dark:text-gold-400">Our Quality Promise</h3>
            <p className="text-xs text-chocolate-700 dark:text-cream-200">
              No artificial colorings, no preservatives, and no pre-made doughs. Every bake is prepared from scratch with uncompromising dedication.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-500/30">
            <img
              src="/src/assets/images/about_bakery_story_1785843803396.jpg"
              alt="Artisanal Bakery Kitchen"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-chocolate-900 p-8 rounded-3xl border border-gold-500/20 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Our Mission</h2>
          <p className="text-sm text-chocolate-700 dark:text-cream-200 leading-relaxed font-sans">
            {about?.mission || "To elevate life's everyday and monumental moments through extraordinary, handcrafted baked delights."}
          </p>
        </div>

        <div className="bg-white dark:bg-chocolate-900 p-8 rounded-3xl border border-gold-500/20 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Our Vision</h2>
          <p className="text-sm text-chocolate-700 dark:text-cream-200 leading-relaxed font-sans">
            {about?.vision || "To be recognized globally as a benchmark of artisanal bakery excellence and sustainable luxury patisserie."}
          </p>
        </div>
      </section>

      {/* MEET OUR BAKERS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
            Artisanal Culinary Team
          </span>
          <h2 className="font-serif text-3xl font-bold text-chocolate-900 dark:text-cream-50">Meet Our Bakers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {about?.bakers?.map((baker) => (
            <div key={baker.id} className="bg-white dark:bg-chocolate-900 rounded-3xl overflow-hidden shadow-md border border-gold-500/20 group hover:shadow-xl transition-all">
              <div className="aspect-square overflow-hidden bg-cream-100">
                <img
                  src={baker.image}
                  alt={baker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-chocolate-900 dark:text-cream-50">{baker.name}</h3>
                <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-wide">{baker.role}</p>
                <p className="text-xs text-chocolate-600 dark:text-cream-200 leading-relaxed">{baker.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE OF HERITAGE */}
      <section className="space-y-8 pt-8 border-t border-gold-500/20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
            Milestones & Legacy
          </span>
          <h2 className="font-serif text-3xl font-bold text-chocolate-900 dark:text-cream-50">Bakery Timeline</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gold-500/30 hidden sm:block" />

          <div className="space-y-8">
            {about?.timeline?.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row items-center justify-between gap-6 ${
                  idx % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full sm:w-1/2 p-6 bg-white dark:bg-chocolate-900 rounded-2xl border border-gold-500/20 shadow-sm space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500 text-chocolate-950 inline-block">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-50">{item.title}</h3>
                  <p className="text-xs text-chocolate-600 dark:text-cream-200 leading-relaxed">{item.description}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold-500 border-4 border-white dark:border-chocolate-950 z-10 hidden sm:flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-chocolate-950" />
                </div>
                <div className="w-full sm:w-1/2 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
