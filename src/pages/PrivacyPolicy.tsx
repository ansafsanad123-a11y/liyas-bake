import React from "react";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Data Protection & Privacy
        </span>
        <h1 className="font-serif text-4xl font-bold text-chocolate-900 dark:text-cream-50">
          Privacy Policy
        </h1>
        <p className="text-xs text-chocolate-600 dark:text-cream-300">
          Last Updated: August 2026
        </p>
      </div>

      <div className="bg-white dark:bg-chocolate-900 p-8 rounded-3xl border border-gold-500/20 shadow-md space-y-6 text-xs sm:text-sm text-chocolate-800 dark:text-cream-200 leading-relaxed font-sans">
        
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-50 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-500" />
            1. Overview & Scope
          </h2>
          <p>
            At Liya's Bake, we respect your privacy and are committed to safeguarding personal information shared with us. This website is an informational showcase and inquiry portal for our artisanal bakery. We do not store payment card information or conduct direct e-commerce transactions online.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-50 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gold-500" />
            2. Information We Collect
          </h2>
          <p>
            We only collect personal information that you voluntarily provide when submitting a Special Order Inquiry or Guest Review, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name and contact phone number or email address</li>
            <li>Event dates, guest count, and custom cake design preferences</li>
            <li>Allergen or dietary considerations relevant to your order</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-50 flex items-center gap-2">
            <Eye className="w-5 h-5 text-gold-500" />
            3. How We Use Your Information
          </h2>
          <p>
            Information collected via inquiry forms is strictly used to contact you directly to discuss custom bakery orders, arrange tasting consultations, or confirm store availability. We do not sell, rent, or lease customer data to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-50 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold-500" />
            4. Security & Contact
          </h2>
          <p>
            We implement appropriate administrative and technical safeguards to protect your data. If you have any questions regarding this Privacy Policy, please contact us at <a href="mailto:hello@liyasbake.com" className="text-gold-600 dark:text-gold-400 font-semibold underline">hello@liyasbake.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
};
