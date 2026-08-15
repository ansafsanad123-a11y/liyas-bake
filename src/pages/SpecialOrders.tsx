import React, { useState } from "react";
import { Send, Calendar, Clock, Sparkles, CheckCircle2, AlertCircle, Info, Heart } from "lucide-react";
import { useData } from "../context/DataContext";
import { ImageUploader } from "../components/ImageUploader";

export const SpecialOrders: React.FC = () => {
  const { submitSpecialOrder } = useData();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    occasion: "Birthday",
    preferredDate: "",
    servingSize: "20 - 30 Guests",
    message: "",
    specialRequirements: "",
    referenceImage: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in your name, contact phone number, and order details.");
      return;
    }

    setSubmitting(true);
    const result = await submitSpecialOrder(formData);
    setSubmitting(false);

    if (result.success) {
      setSuccessMsg("Thank you! Your special order inquiry has been received. Chef Liya's team will contact you directly within 24 hours.");
      setFormData({
        customerName: "",
        phone: "",
        email: "",
        occasion: "Birthday",
        preferredDate: "",
        servingSize: "20 - 30 Guests",
        message: "",
        specialRequirements: "",
        referenceImage: "",
      });
    } else {
      setErrorMsg(result.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER & DISCLAIMER BANNER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Custom Bakes & Event Catering
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-chocolate-900 dark:text-cream-50">
          Special Order Inquiry
        </h1>
        <p className="text-sm sm:text-base text-chocolate-700 dark:text-cream-200 leading-relaxed font-sans">
          Planning a wedding, milestone birthday, or corporate gala? Fill out the inquiry form below to share your vision with our master pastry team.
        </p>

        {/* E-Commerce Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 text-left">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold mb-0.5">Note on Custom Orders & Pickup:</strong>
            This is an inquiry form only. No online payments or doorstep delivery — <strong>THE FOOD WILL NOT GET TO YOUR HOME IT SHOULD COME AND COLLECT FROM GIVEN ADDRESS</strong>. Once submitted, our bakery manager will reach out to confirm your custom requirements and pickup timing.
          </div>
        </div>
      </div>

      {/* INQUIRY FORM CONTAINER */}
      <div className="bg-white dark:bg-chocolate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-gold-500/20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Info Panel */}
        <div className="space-y-6 lg:border-r border-gold-500/20 lg:pr-8">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">
              Inquiry Process
            </h3>
            <p className="text-xs text-chocolate-600 dark:text-cream-200 leading-relaxed">
              We recommend submitting inquiries at least 2 weeks in advance for bespoke celebration cakes and 1 month for wedding tiers.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <strong className="text-chocolate-900 dark:text-gold-300 block">Submit Inquiry</strong>
                <span className="text-chocolate-600 dark:text-cream-300">Share your event date, theme, guest count, and flavor preferences.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <strong className="text-chocolate-900 dark:text-gold-300 block">Personal Consultation</strong>
                <span className="text-chocolate-600 dark:text-cream-300">Chef Liya reviews your request and calls you to refine details.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <strong className="text-chocolate-900 dark:text-gold-300 block">Artisanal Creation</strong>
                <span className="text-chocolate-600 dark:text-cream-300">Your custom creation is handcrafted fresh for your special day.</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-chocolate-800/60 border border-gold-500/20">
            <img
              src="/src/assets/images/special_orders_cake_1785843816163.jpg"
              alt="Custom Cake Display"
              className="w-full h-32 object-cover rounded-xl mb-3"
              referrerPolicy="no-referrer"
            />
            <p className="text-[11px] text-chocolate-700 dark:text-cream-200 italic">
              "Every custom cake is a centerpice designed to capture the magic of your milestone."
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sophia Martinez"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  id="special-order-name-input"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  id="special-order-phone-input"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>
            </div>

            {/* Email & Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. sophia@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  id="special-order-email-input"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Occasion Type *
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  id="special-order-occasion-select"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                >
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Wedding">Wedding Tier</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Baby Shower">Baby Shower / Gender Reveal</option>
                  <option value="Corporate Event">Corporate Gala</option>
                  <option value="Custom Desserts">Custom Dessert Table</option>
                </select>
              </div>
            </div>

            {/* Date & Serving Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Preferred Event Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  id="special-order-date-input"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Estimated Guest Count
                </label>
                <input
                  type="text"
                  placeholder="e.g. 30 - 40 Guests"
                  value={formData.servingSize}
                  onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
                  id="special-order-servings-input"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>
            </div>

            {/* Message Details */}
            <div>
              <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                Design & Flavor Ideas *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your desired cake theme, color palette, tier count, and preferred flavors (e.g. Earl Grey Blackberry, Pistachio Raspberry, Velvet)..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                id="special-order-message-input"
                className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              />
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                Special Requirements & Allergens (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Gluten-free tier required, nut allergies among guests..."
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                id="special-order-allergens-input"
                className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              />
            </div>

            {/* Cake Design Reference Photo */}
            <div>
              <ImageUploader
                label="Cake Design / Inspiration Photo (Optional)"
                value={formData.referenceImage}
                onChange={(img) => setFormData({ ...formData, referenceImage: img })}
                helpText="Upload a photo or sketch directly from your phone or device to show us your dream design."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                id="special-order-submit-btn"
                className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-chocolate-950 font-bold text-xs tracking-wide shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "Sending Inquiry..." : "Send Special Order Inquiry"}</span>
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};
