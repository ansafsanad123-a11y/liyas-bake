import React from "react";
import { Link } from "react-router-dom";
import { Cake, ArrowLeft } from "lucide-react";

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center">
        <Cake className="w-10 h-10" />
      </div>
      <h1 className="font-serif text-5xl font-extrabold text-chocolate-900 dark:text-cream-50">
        404 - Page Not Found
      </h1>
      <p className="text-sm text-chocolate-600 dark:text-cream-200 max-w-md">
        The page you are looking for seems to have crumbled away or moved to another oven!
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-chocolate-950 font-bold text-xs tracking-wide shadow-md transition-all inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return To Home</span>
      </Link>
    </div>
  );
};
