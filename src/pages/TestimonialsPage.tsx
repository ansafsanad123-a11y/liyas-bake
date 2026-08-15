import React, { useState } from "react";
import { Star, MessageSquare, Plus, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useData } from "../context/DataContext";

export const TestimonialsPage: React.FC = () => {
  const { siteData, submitTestimonial } = useData();
  const testimonials = siteData?.testimonials || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
    occasion: "General Experience",
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) {
      setStatusMsg({ type: "error", text: "Please enter your name and review comment." });
      return;
    }

    setSubmitting(true);
    const res = await submitTestimonial(formData);
    setSubmitting(false);

    if (res.success) {
      setStatusMsg({ type: "success", text: res.message });
      setFormData({ name: "", rating: 5, comment: "", occasion: "General Experience" });
      setTimeout(() => {
        setModalOpen(false);
        setStatusMsg(null);
      }, 3000);
    } else {
      setStatusMsg({ type: "error", text: res.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
            Guest Experiences & Memories
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-chocolate-900 dark:text-cream-50">
            Customer Testimonials
          </h1>
          <p className="text-sm text-chocolate-700 dark:text-cream-200">
            Read stories and feedback from patrons who have celebrated with Liya's Bake.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          id="open-write-review-modal-btn"
          className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-chocolate-950 font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Write A Review</span>
        </button>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-chocolate-900 p-6 rounded-3xl border border-gold-500/20 shadow-md space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500" />
                  ))}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold-500/10 text-gold-700 dark:text-gold-300">
                  {t.occasion || "Celebration"}
                </span>
              </div>

              <p className="text-xs text-chocolate-800 dark:text-cream-100 italic leading-relaxed">
                "{t.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-gold-500/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-500/20 text-gold-600 font-bold flex items-center justify-center text-sm shrink-0">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-chocolate-900 dark:text-cream-50">{t.name}</h4>
                <p className="text-[10px] text-chocolate-500 dark:text-cream-300">{t.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT REVIEW MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-chocolate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gold-500/30 relative space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-chocolate-500 hover:bg-cream-100 dark:hover:bg-chocolate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">
                Share Your Experience
              </h3>
              <p className="text-xs text-chocolate-600 dark:text-cream-300">
                Your feedback helps us continuously elevate our baking craftsmanship.
              </p>
            </div>

            {statusMsg && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMsg.type === "success" ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200" : "bg-rose-500/10 text-rose-800 dark:text-rose-200"
              }`}>
                {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  id="testimonial-name-input"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Star Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating ? "text-gold-500 fill-gold-500" : "text-chocolate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Occasion / Purchase
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birthday Cake, Morning Croissants, Wedding Tier"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  id="testimonial-occasion-input"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                  Your Review *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about the flavor, presentation, and service..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  id="testimonial-comment-input"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                id="submit-review-btn"
                className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-chocolate-950 font-bold text-xs tracking-wide shadow-md transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Review for Approval"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
