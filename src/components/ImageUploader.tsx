import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Link as LinkIcon, Sparkles, Check, Camera, RefreshCw } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helpText?: string;
  className?: string;
}

// Curated bakery preset images for quick selection
const BAKERY_PRESETS = [
  {
    name: "Rosé Velvet Cake",
    category: "Cakes",
    url: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Gold Wedding Tier",
    category: "Wedding",
    url: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Artisan Croissants",
    category: "Pastries",
    url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Macaron Palette",
    category: "Pastries",
    url: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Fresh Sourdough",
    category: "Bread",
    url: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Chocolate Cookies",
    category: "Cookies",
    url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Berry Cupcakes",
    category: "Cupcakes",
    url: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Bakery Counter",
    category: "Interior",
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  },
];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = "Image",
  helpText = "Upload an image directly from your device, pick a preset, or enter an image URL.",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"file" | "presets" | "url">("file");
  const [urlInput, setUrlInput] = useState(value || "");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to resize/compress large images on client side before setting base64
  const processImageFile = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        setUploadError("Failed to read image file.");
        setIsProcessing(false);
        return;
      }

      // If image is reasonable size (< 800KB), use data URL directly
      if (file.size < 800 * 1024) {
        onChange(result);
        setIsProcessing(false);
        return;
      }

      // Resize large image via Canvas to keep base64 string lightweight
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          onChange(compressedDataUrl);
        } else {
          onChange(result);
        }
        setIsProcessing(false);
      };

      img.onerror = () => {
        onChange(result);
        setIsProcessing(false);
      };

      img.src = result;
    };

    reader.onerror = () => {
      setUploadError("Error reading image file.");
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label Header */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-chocolate-900 dark:text-cream-100 uppercase tracking-wider">
          {label}
        </label>
        {value && (
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" /> Image Selected
          </span>
        )}
      </div>

      {/* CURRENT IMAGE PREVIEW CARD */}
      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-cream-100 dark:bg-chocolate-950 p-2 flex items-center gap-4 shadow-sm">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-chocolate-900 shrink-0 border border-gold-500/30 relative">
            <img
              src={value}
              alt="Selected Preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 min-w-0 text-xs">
            <p className="font-bold text-chocolate-900 dark:text-cream-50 truncate">
              {value.startsWith("data:") ? "Direct Uploaded Image" : value.split("/").pop() || "Image Preview"}
            </p>
            <p className="text-[10px] text-chocolate-600 dark:text-cream-300 mt-0.5">
              {value.startsWith("data:") ? "Stored directly as base64 data" : "Linked via Web URL"}
            </p>
            
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-lg bg-gold-500 hover:bg-gold-600 text-chocolate-950 text-[10px] font-bold flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setUrlInput("");
                }}
                className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* UPLOADER / MODE SWITCHER TABS */}
      <div className="bg-cream-100/80 dark:bg-chocolate-800/80 rounded-2xl p-1.5 border border-gold-500/20 flex gap-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("file")}
          className={`flex-1 py-1.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "file"
              ? "bg-[#3E2723] text-white dark:bg-gold-500 dark:text-chocolate-950 shadow-sm"
              : "text-chocolate-800 dark:text-cream-200 hover:bg-white/40 dark:hover:bg-chocolate-700/50"
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("presets")}
          className={`flex-1 py-1.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "presets"
              ? "bg-[#3E2723] text-white dark:bg-gold-500 dark:text-chocolate-950 shadow-sm"
              : "text-chocolate-800 dark:text-cream-200 hover:bg-white/40 dark:hover:bg-chocolate-700/50"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Preset Library</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`flex-1 py-1.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "url"
              ? "bg-[#3E2723] text-white dark:bg-gold-500 dark:text-chocolate-950 shadow-sm"
              : "text-chocolate-800 dark:text-cream-200 hover:bg-white/40 dark:hover:bg-chocolate-700/50"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Image URL</span>
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* TAB 1: DIRECT FILE UPLOAD DROPZONE */}
      {activeTab === "file" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-gold-500 bg-gold-500/10 scale-[0.99]"
              : "border-gold-500/30 hover:border-gold-500/60 bg-white/50 dark:bg-chocolate-900/50 hover:bg-white/80 dark:hover:bg-chocolate-900/80"
          }`}
        >
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400 flex items-center justify-center mx-auto border border-gold-500/30">
              {isProcessing ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-chocolate-900 dark:text-cream-50">
                {isProcessing
                  ? "Processing Image File..."
                  : "Click to browse or drag & drop an image here"}
              </p>
              <p className="text-[10px] text-chocolate-600 dark:text-cream-300 mt-1">
                Supports PNG, JPG, WEBP, GIF, SVG (No external URL needed)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRESET GALLERY */}
      {activeTab === "presets" && (
        <div className="space-y-2 bg-white/40 dark:bg-chocolate-900/40 rounded-2xl p-3 border border-gold-500/20">
          <p className="text-[10px] font-bold text-chocolate-600 dark:text-cream-300 uppercase tracking-wider">
            Select From Bakery Stock Presets:
          </p>
          <div className="grid grid-cols-4 gap-2">
            {BAKERY_PRESETS.map((preset, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => onChange(preset.url)}
                className={`relative group aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  value === preset.url
                    ? "border-gold-500 ring-2 ring-gold-500/50 scale-105"
                    : "border-gold-500/20 hover:border-gold-500/60"
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-chocolate-950/60 opacity-0 group-hover:opacity-100 transition-opacity p-1 flex items-end">
                  <span className="text-[9px] font-bold text-white truncate">{preset.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: IMAGE URL INPUT */}
      {activeTab === "url" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://images.unsplash.com/photo-..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30 text-xs text-chocolate-900 dark:text-cream-50"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-chocolate-950 text-xs font-bold transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400">{uploadError}</p>
      )}

      {helpText && (
        <p className="text-[10px] text-chocolate-500 dark:text-cream-300 leading-snug">
          {helpText}
        </p>
      )}
    </div>
  );
};
