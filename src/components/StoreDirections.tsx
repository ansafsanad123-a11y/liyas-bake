import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Compass,
  Car,
  Train,
  Bus,
  Footprints,
  Copy,
  Check,
  Phone,
  Share2,
  AlertCircle,
  ExternalLink,
  Store,
  Clock,
  Sparkles,
} from "lucide-react";
import brandLogo from "../assets/images/liyas_bake_logo_1786681257310.jpg";

interface StoreDirectionsProps {
  address?: string;
  phone?: string;
  pickupNotice?: string;
  isCompact?: boolean;
}

export const StoreDirections: React.FC<StoreDirectionsProps> = ({
  address = "jolly mohalla masjid road pvr road bengaluru karnataka 560053",
  phone = "+91 8431126242",
  pickupNotice = "THE FOOD WILL NOT GET TO YOUR HOME IT SHOULD COME AND COLLECT FROM GIVEN ADDRESS",
  isCompact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [startingPoint, setStartingPoint] = useState("");
  const [locating, setLocating] = useState(false);
  const [activeTab, setActiveTab] = useState<"metro" | "drive" | "bus" | "walk">("metro");

  const encodedAddress = encodeURIComponent(address);
  const directMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const directNavigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${encodedAddress}`;
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}`;

  // Interactive Embed Map URL for Jolly Mohalla, Bengaluru
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.084478330761!2d77.5746!3d12.9664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e12f67dbb9%3A0x7d01878d6b8b0e71!2sJolly%20Mohalla%2C%20Chickpet%2C%20Bengaluru%2C%20Karnataka%20560053!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`;

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = `Liya's Bake - Store Pickup Address:\n${address}\n\nGoogle Maps Location:\n${directMapsUrl}\n\nNote: All orders must be collected directly from the bakery.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleNavigateFromCurrentLocation = () => {
    if (!navigator.geolocation) {
      window.open(directNavigationUrl, "_blank");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodedAddress}`;
        window.open(url, "_blank");
      },
      () => {
        setLocating(false);
        window.open(directNavigationUrl, "_blank");
      },
      { timeout: 10000 }
    );
  };

  const handleCustomRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startingPoint.trim()) {
      window.open(directNavigationUrl, "_blank");
      return;
    }
    const origin = encodeURIComponent(startingPoint.trim());
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${encodedAddress}`;
    window.open(url, "_blank");
  };

  const quickLocations = [
    { name: "Chickpet Metro", distance: "800m (~3 min)", origin: "Chickpet Metro Station Bengaluru" },
    { name: "Majestic / City Railway", distance: "1.8 km (~7 min)", origin: "KSR Bengaluru City Railway Station" },
    { name: "KR Market", distance: "1.2 km (~5 min)", origin: "KR Market Bengaluru" },
    { name: "Indiranagar", distance: "6.8 km (~22 min)", origin: "Indiranagar Bengaluru" },
    { name: "Koramangala", distance: "6.2 km (~20 min)", origin: "Koramangala Bengaluru" },
    { name: "Jayanagar", distance: "4.8 km (~15 min)", origin: "Jayanagar 4th Block Bengaluru" },
  ];

  return (
    <div id="store-directions-guide" className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#2C1810] via-[#3E2723] to-[#1F110B] rounded-3xl p-6 sm:p-10 border-2 border-gold-500/50 shadow-2xl text-cream-50 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Row Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/40">
              <Store className="w-4 h-4 text-gold-400" />
              <span>Way to Address & Store Pickup Guide</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-medium text-cream-200">
              <Clock className="w-4 h-4 text-gold-400" />
              <span>Open Daily: 07:00 AM - 09:00 PM</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-cream-50 leading-tight">
              Visit & Collect at Liya's Bake
            </h2>
            <div className="p-4 rounded-2xl bg-amber-500/20 border border-gold-400/60 text-gold-200 text-xs sm:text-sm font-bold flex items-start gap-3 shadow-inner">
              <AlertCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="uppercase tracking-wide text-gold-300 block font-black text-[11px]">
                  Direct Counter Pickup Policy:
                </span>
                <p className="font-serif font-bold text-cream-100 text-sm leading-snug">
                  "{pickupNotice}"
                </p>
              </div>
            </div>
          </div>

          {/* Formatted Address Box & Quick Action Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
            
            {/* Address Display */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Official Bakery Pickup Address:</span>
                </div>
                <p className="font-serif text-base sm:text-lg text-cream-100 font-semibold uppercase tracking-wide leading-relaxed">
                  {address}
                </p>
                <p className="text-xs text-chocolate-200 font-sans">
                  Landmark: Near PVR Road Junction, Masjid Road, Jolly Mohalla, Chickpet Area, Bengaluru 560053
                </p>
              </div>

              {/* Action Buttons for Address */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  id="copy-store-address-btn"
                  onClick={copyAddressToClipboard}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-cream-100 text-xs font-bold transition-all flex items-center gap-2 border border-white/20 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gold-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  id="share-location-whatsapp-btn"
                  onClick={handleShareWhatsApp}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-2 border border-emerald-400/40 active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Location on WhatsApp</span>
                </button>

                <a
                  href={`tel:${phone}`}
                  id="call-pickup-counter-btn"
                  className="px-4 py-2.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 text-xs font-bold transition-all flex items-center gap-2 border border-gold-400/40"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call: {phone}</span>
                </a>
              </div>
            </div>

            {/* GPS Live Navigation Box */}
            <div className="p-5 rounded-2xl bg-gold-500/10 border border-gold-400/30 backdrop-blur-md flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
                  Live GPS Navigation
                </span>
                <h4 className="font-serif text-base font-bold text-cream-100">
                  Instant Turn-by-Turn Route
                </h4>
                <p className="text-xs text-cream-200/80 font-sans">
                  Tap to launch continuous audio navigation directly to our bakery door.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  id="gps-current-location-btn"
                  onClick={handleNavigateFromCurrentLocation}
                  disabled={locating}
                  className="w-full py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-chocolate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                >
                  <Navigation className={`w-4 h-4 ${locating ? "animate-spin" : ""}`} />
                  <span>{locating ? "Locating You..." : "Navigate From My Location"}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={directNavigationUrl}
                    target="_blank"
                    rel="noreferrer"
                    id="open-gmaps-directions-btn"
                    className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-cream-100 text-[11px] font-bold text-center border border-white/20 transition-all flex items-center justify-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 text-gold-400" />
                    <span>Google Maps</span>
                  </a>
                  <a
                    href={appleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    id="open-apple-maps-btn"
                    className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-cream-100 text-[11px] font-bold text-center border border-white/20 transition-all flex items-center justify-center gap-1"
                  >
                    <Compass className="w-3 h-3 text-gold-400" />
                    <span>Apple Maps</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map & Step-by-Step Directions Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Embedded Map with Pinpoint */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white/80 dark:bg-chocolate-900/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-gold-500/20 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold-400 shadow-sm bg-cream-50 shrink-0">
                  <img
                    src={brandLogo}
                    alt="Liya's Bake"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-50">
                    Live Bakery Location Map
                  </h3>
                  <p className="text-xs text-chocolate-600 dark:text-cream-300">
                    Masjid Road, Jolly Mohalla, Bengaluru 560053
                  </p>
                </div>
              </div>

              <a
                href={directMapsUrl}
                target="_blank"
                rel="noreferrer"
                id="expand-map-btn"
                className="inline-flex items-center gap-1 text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline"
              >
                <span>Open Full Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Map Iframe */}
            <div className="w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-gold-500/30 shadow-inner relative bg-chocolate-100 dark:bg-chocolate-950">
              <iframe
                title="Liya's Bake Store Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Quick Route Planner by Area */}
            <div className="p-4 rounded-2xl bg-cream-100/70 dark:bg-chocolate-950/60 border border-gold-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-chocolate-800 dark:text-cream-100 uppercase tracking-wide flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  Quick Directions From Bengaluru Landmarks:
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quickLocations.map((loc) => {
                  const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(loc.origin)}&destination=${encodedAddress}`;
                  return (
                    <a
                      key={loc.name}
                      href={routeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white dark:bg-chocolate-800/80 border border-gold-500/20 hover:border-gold-500 text-left transition-all hover:scale-[1.02] shadow-xs group"
                    >
                      <span className="block text-xs font-bold text-chocolate-900 dark:text-cream-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 truncate">
                        {loc.name}
                      </span>
                      <span className="text-[10px] text-chocolate-500 dark:text-cream-300 font-medium">
                        {loc.distance}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Custom Origin Search */}
              <form onSubmit={handleCustomRoute} className="pt-1 flex gap-2">
                <input
                  type="text"
                  value={startingPoint}
                  onChange={(e) => setStartingPoint(e.target.value)}
                  placeholder="Enter your area (e.g., Whitefield, Malleshwaram)..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-chocolate-800 border border-gold-500/30 text-xs text-chocolate-900 dark:text-cream-100 placeholder:text-chocolate-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-chocolate-950 text-xs font-bold transition-all shrink-0"
                >
                  Get Route
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Right Column: Step-by-Step Way to Address & Transit Guide */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step-by-Step Way to Address Card */}
          <div className="bg-white/80 dark:bg-chocolate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gold-500/20 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gold-500/20 text-gold-600 dark:text-gold-400">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-50">
                  Step-by-Step Way to Address
                </h3>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">
                  Follow these simple landmarks to reach our counter smoothly
                </p>
              </div>
            </div>

            {/* Stepper Steps */}
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gold-500/30">
              
              {/* Step 1 */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-gold-500 text-chocolate-950 font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm">
                  1
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-chocolate-900 dark:text-cream-100">
                    Reach City Market / Mysore Road Junction
                  </h4>
                  <p className="text-[11px] text-chocolate-600 dark:text-cream-300 leading-relaxed">
                    Head towards KR Market or Chickpet entrance via Mysore Road or BVK Iyengar Road.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-gold-500 text-chocolate-950 font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm">
                  2
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-chocolate-900 dark:text-cream-100">
                    Turn onto PVR Road towards Jolly Mohalla
                  </h4>
                  <p className="text-[11px] text-chocolate-600 dark:text-cream-300 leading-relaxed">
                    Enter the Jolly Mohalla main street accessible easily by car, two-wheeler, or auto rickshaw.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-gold-500 text-chocolate-950 font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm">
                  3
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-chocolate-900 dark:text-cream-100">
                    Enter Masjid Road
                  </h4>
                  <p className="text-[11px] text-chocolate-600 dark:text-cream-300 leading-relaxed">
                    Look for the Masjid Road signpost in Jolly Mohalla.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm">
                  4
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-chocolate-900 dark:text-cream-100">
                    Arrive at Liya's Bake Counter
                  </h4>
                  <p className="text-[11px] text-chocolate-600 dark:text-cream-300 leading-relaxed">
                    Collect your freshly prepared bakery order directly at our front desk counter.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Transit Options Tabs */}
          <div className="bg-white/80 dark:bg-chocolate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gold-500/20 shadow-xl space-y-4">
            <h3 className="font-serif text-base font-bold text-chocolate-900 dark:text-cream-50">
              Transport & Commute Options
            </h3>

            {/* Tab Selector */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-cream-100 dark:bg-chocolate-950">
              <button
                type="button"
                onClick={() => setActiveTab("metro")}
                className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === "metro"
                    ? "bg-gold-500 text-chocolate-950 shadow-xs"
                    : "text-chocolate-600 dark:text-cream-300 hover:text-chocolate-900"
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                <span>Metro</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("drive")}
                className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === "drive"
                    ? "bg-gold-500 text-chocolate-950 shadow-xs"
                    : "text-chocolate-600 dark:text-cream-300 hover:text-chocolate-900"
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Car/Bike</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("bus")}
                className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === "bus"
                    ? "bg-gold-500 text-chocolate-950 shadow-xs"
                    : "text-chocolate-600 dark:text-cream-300 hover:text-chocolate-900"
                }`}
              >
                <Bus className="w-3.5 h-3.5" />
                <span>Bus</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("walk")}
                className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === "walk"
                    ? "bg-gold-500 text-chocolate-950 shadow-xs"
                    : "text-chocolate-600 dark:text-cream-300 hover:text-chocolate-900"
                }`}
              >
                <Footprints className="w-3.5 h-3.5" />
                <span>Walk</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-3.5 rounded-2xl bg-cream-50 dark:bg-chocolate-950/60 border border-gold-500/20 text-xs text-chocolate-700 dark:text-cream-200 leading-relaxed font-sans">
              {activeTab === "metro" && (
                <div className="space-y-1.5">
                  <strong className="block text-chocolate-900 dark:text-cream-50 font-bold">
                    Nearest Namma Metro Station: Chickpet (Green Line)
                  </strong>
                  <p>
                    Take the Green Line to <strong>Chickpet Metro Station</strong>. Liya's Bake is just 800m away (3-minute auto ride or 10-minute walk). You can also alight at <strong>KSR City Railway / Majestic Interchange</strong> (1.8 km).
                  </p>
                </div>
              )}

              {activeTab === "drive" && (
                <div className="space-y-1.5">
                  <strong className="block text-chocolate-900 dark:text-cream-50 font-bold">
                    By Car, Two-Wheeler, or Cab (Ola/Uber)
                  </strong>
                  <p>
                    Navigate via Mysore Road or Cottonpet Main Road onto PVR Road. Street parking and quick 5-minute pickup stopping space are available along Masjid Road.
                  </p>
                </div>
              )}

              {activeTab === "bus" && (
                <div className="space-y-1.5">
                  <strong className="block text-chocolate-900 dark:text-cream-50 font-bold">
                    By BMTC City Bus
                  </strong>
                  <p>
                    Take any bus heading to <strong>KR Market Bus Stand</strong> or <strong>Kempegowda Bus Station (Majestic)</strong>. From either hub, take an auto or short walk to Jolly Mohalla Masjid Road.
                  </p>
                </div>
              )}

              {activeTab === "walk" && (
                <div className="space-y-1.5">
                  <strong className="block text-chocolate-900 dark:text-cream-50 font-bold">
                    Walking Directions from Chickpet / Market
                  </strong>
                  <p>
                    Walk along Sultanpet or BVK Iyengar Road towards Jolly Mohalla. Follow the Masjid Road signboard to reach our bakery entrance.
                  </p>
                </div>
              )}
            </div>

            {/* Call support button */}
            <a
              href={`tel:${phone}`}
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-chocolate-800 border border-gold-500/30 text-gold-700 dark:text-gold-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-gold-500/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Need Help Finding Us? Call {phone}</span>
            </a>

          </div>

        </div>

      </div>
    </div>
  );
};
