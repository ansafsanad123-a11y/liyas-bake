import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  Cake,
  Image as ImageIcon,
  MessageSquare,
  ClipboardList,
  Clock,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Upload,
  UserCheck,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Search,
  Key,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { ImageUploader } from "../components/ImageUploader";
import { Product, GalleryItem, Testimonial, SpecialOrderRequest, BusinessHours, ProductCategory, GalleryCategory } from "../types";

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isFirstLogin, logout, adminUser } = useAuth();
  const {
    adminStats,
    adminSpecialOrders,
    siteData,
    saveProduct,
    deleteProduct,
    deleteAllProducts,
    saveGalleryItem,
    deleteGalleryItem,
    deleteAllGalleryItems,
    updateSpecialOrderStatus,
    deleteSpecialOrder,
    deleteAllSpecialOrders,
    saveTestimonial,
    deleteTestimonial,
    deleteAllTestimonials,
    deleteAllData,
    updateHomepage,
    updateAbout,
    updateBusinessHours,
    updateSettings,
    refreshAdminDashboard,
  } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    } else if (isFirstLogin) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isFirstLogin, navigate]);

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "gallery" | "homepage" | "about" | "testimonials" | "special-orders" | "hours" | "media" | "settings" | "security"
  >("overview");

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // State forms for editing
  const [productForm, setProductForm] = useState<Partial<Product> | null>(null);
  const [galleryForm, setGalleryForm] = useState<Partial<GalleryItem> | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial> | null>(null);

  // Delete modal confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    name: string;
    type: "product" | "gallery" | "testimonial" | "special-order" | "all-products" | "all-gallery" | "all-testimonials" | "all-special-orders" | "all-data";
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Search/Filter state for Admin Products Manager
  const [adminProductSearch, setAdminProductSearch] = useState("");
  const [adminProductCategory, setAdminProductCategory] = useState("All");

  // Media Manager tab state
  const [mediaUploadImage, setMediaUploadImage] = useState("");

  const products = siteData?.products || [];
  const gallery = siteData?.gallery || [];
  const testimonials = siteData?.testimonials || [];
  const homepage = siteData?.homepage || {
    heroImage: "",
    heroTitle: "",
    tagline: "",
    welcomeTitle: "",
    welcomeSubtitle: "",
    welcomeStory: "",
    ctaText1: "",
    ctaText2: "",
    featuredSectionTitle: "",
  };
  const about = siteData?.about || {
    storyTitle: "",
    storyParagraphs: [],
    mission: "",
    vision: "",
    bakers: [],
    qualityPromises: [],
    timeline: [],
  };
  const hours = siteData?.businessHours || [];
  const settings = siteData?.settings || {
    siteName: "Liya's Bake",
    tagline: "",
    logoUrl: "",
    faviconUrl: "",
    phone: "",
    email: "",
    address: "",
    googleMapsUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    pinterestUrl: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    maintenanceMode: false,
    visitCount: 0,
  };

  // Form handling states
  const [homepageState, setHomepageState] = useState(homepage);
  const [aboutState, setAboutState] = useState(about);
  const [settingsState, setSettingsState] = useState(settings);
  const [hoursState, setHoursState] = useState<BusinessHours[]>(hours);

  useEffect(() => {
    if (siteData) {
      setHomepageState(siteData.homepage);
      setAboutState(siteData.about);
      setSettingsState(siteData.settings);
      setHoursState(siteData.businessHours);
    }
  }, [siteData]);

  // Security Credentials form
  const [securityUsername, setSecurityUsername] = useState(adminUser?.username || "admin");
  const [securityPassword, setSecurityPassword] = useState("");

  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!securityPassword || securityPassword.length < 6) {
      showToast("Error: Password must be at least 6 characters.");
      return;
    }
    const token = localStorage.getItem("liyas_admin_token");
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newUsername: securityUsername, newPassword: securityPassword }),
    });
    if (res.ok) {
      showToast("Admin credentials updated successfully!");
      setSecurityPassword("");
    } else {
      showToast("Failed to update security credentials.");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-chocolate-950 text-chocolate-900 dark:text-cream-50 pb-20">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-gold-500 text-chocolate-950 font-bold text-xs shadow-2xl border border-gold-300 animate-bounce">
          {toast}
        </div>
      )}

      {/* TOP DASHBOARD BAR */}
      <header className="bg-chocolate-900 text-cream-50 border-b border-gold-500/20 py-4 px-4 sm:px-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 text-chocolate-950 font-bold flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-cream-50">Admin Panel</h1>
              <p className="text-[10px] text-gold-400">Logged in as: {adminUser?.username || "admin"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 transition-colors hidden sm:inline-block"
            >
              View Live Website ↗
            </a>
            <button
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
              id="admin-logout-btn"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* TAB NAVIGATION SIDEBAR */}
        <aside className="lg:col-span-1 space-y-1 bg-white dark:bg-chocolate-900 p-3 rounded-3xl border border-gold-500/20 shadow-sm h-fit">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "products", label: "Products", icon: Cake },
            { id: "gallery", label: "Gallery", icon: ImageIcon },
            { id: "homepage", label: "Homepage", icon: HomeIcon },
            { id: "about", label: "About Page", icon: InfoIcon },
            { id: "testimonials", label: "Testimonials", icon: MessageSquare },
            { id: "special-orders", label: "Special Orders", icon: ClipboardList, badge: adminSpecialOrders.filter(s => s.status === "Pending").length },
            { id: "hours", label: "Business Hours", icon: Clock },
            { id: "media", label: "Media Manager", icon: Upload },
            { id: "settings", label: "SEO & Settings", icon: SettingsIcon },
            { id: "security", label: "Security", icon: Key },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                id={`admin-tab-${item.id}`}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-gold-500 text-chocolate-950 font-bold shadow-sm"
                    : "text-chocolate-800 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-chocolate-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* TAB CONTENT PANEL */}
        <main className="lg:col-span-4 bg-white dark:bg-chocolate-900 rounded-3xl p-6 sm:p-8 border border-gold-500/20 shadow-lg min-h-[600px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="border-b border-gold-500/20 pb-4">
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Dashboard Overview</h2>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">Statistics and bakery content performance.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/20 space-y-1">
                  <p className="text-xs text-chocolate-600 dark:text-cream-300 font-medium">Total Products</p>
                  <p className="font-serif text-3xl font-extrabold text-gold-600">{products.length}</p>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/20 space-y-1">
                  <p className="text-xs text-chocolate-600 dark:text-cream-300 font-medium">Gallery Images</p>
                  <p className="font-serif text-3xl font-extrabold text-gold-600">{gallery.length}</p>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/20 space-y-1">
                  <p className="text-xs text-chocolate-600 dark:text-cream-300 font-medium">Guest Testimonials</p>
                  <p className="font-serif text-3xl font-extrabold text-gold-600">{testimonials.length}</p>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/20 space-y-1">
                  <p className="text-xs text-chocolate-600 dark:text-cream-300 font-medium">Special Order Inquiries</p>
                  <p className="font-serif text-3xl font-extrabold text-rose-500">{adminSpecialOrders.length}</p>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/20 space-y-1 col-span-2 sm:col-span-1">
                  <p className="text-xs text-chocolate-600 dark:text-cream-300 font-medium">Total Website Visits</p>
                  <p className="font-serif text-3xl font-extrabold text-gold-600">{settings.visitCount || 1420}</p>
                </div>
              </div>

              {/* Pending Special Orders Action Notice */}
              {adminSpecialOrders.filter(s => s.status === "Pending").length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-xs text-rose-900 dark:text-rose-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>You have <strong>{adminSpecialOrders.filter(s => s.status === "Pending").length} pending special order inquiries</strong> awaiting review!</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("special-orders")}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
                  >
                    View Inquiries
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGER */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Manage Products</h2>
                  <p className="text-xs text-chocolate-600 dark:text-cream-300">Add, edit, hide, or delete products from the public catalog.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  {products.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          id: "all",
                          name: `All ${products.length} Products`,
                          type: "all-products",
                        })
                      }
                      id="admin-delete-all-products-btn"
                      className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete All Products ({products.length})</span>
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setProductForm({
                        name: "",
                        category: "Birthday Cakes",
                        description: "",
                        image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800",
                        availabilityBadge: "In Stock",
                        isFeatured: true,
                        isHidden: false,
                        ingredients: ["Organic Flour", "Butter", "Vanilla"],
                        allergens: ["Gluten", "Dairy"],
                      })
                    }
                    id="admin-add-product-btn"
                    className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-chocolate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Search & Category Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate-400" />
                  <input
                    type="text"
                    placeholder="Search products by name or category..."
                    value={adminProductSearch}
                    onChange={(e) => setAdminProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-xs text-chocolate-900 dark:text-cream-50"
                  />
                  {adminProductSearch && (
                    <button
                      onClick={() => setAdminProductSearch("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-chocolate-500 uppercase"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <select
                  value={adminProductCategory}
                  onChange={(e) => setAdminProductCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-xs font-semibold text-chocolate-900 dark:text-cream-50"
                >
                  <option value="All">All Categories ({products.length})</option>
                  <option value="Birthday Cakes">Birthday Cakes</option>
                  <option value="Wedding Cakes">Wedding Cakes</option>
                  <option value="Cupcakes">Cupcakes</option>
                  <option value="Cookies">Cookies</option>
                  <option value="Bread">Bread</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Seasonal Specials">Seasonal Specials</option>
                </select>
              </div>

              {/* Product Edit / Add Modal Form */}
              {productForm && (
                <div className="p-5 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border-2 border-gold-500/40 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-gold-500/20 pb-2">
                    <h3 className="font-serif text-lg font-bold">
                      {productForm.id ? `Edit Product: ${productForm.name}` : "Add New Product"}
                    </h3>
                    {productForm.id && (
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirm({
                            id: productForm.id!,
                            name: productForm.name || "Product",
                            type: "product",
                          })
                        }
                        className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
                        id="admin-modal-delete-product-btn"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete This Product</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1">Product Name</label>
                      <input
                        type="text"
                        value={productForm.name || ""}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Category</label>
                      <select
                        value={productForm.category || "Birthday Cakes"}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30"
                      >
                        <option value="Birthday Cakes">Birthday Cakes</option>
                        <option value="Wedding Cakes">Wedding Cakes</option>
                        <option value="Cupcakes">Cupcakes</option>
                        <option value="Cookies">Cookies</option>
                        <option value="Bread">Bread</option>
                        <option value="Pastries">Pastries</option>
                        <option value="Seasonal Specials">Seasonal Specials</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Availability Badge</label>
                      <select
                        value={productForm.availabilityBadge || "In Stock"}
                        onChange={(e) => setProductForm({ ...productForm, availabilityBadge: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Made to Order">Made to Order</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Sold Out">Sold Out</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <ImageUploader
                        label="Product Image"
                        value={productForm.image || ""}
                        onChange={(img) => setProductForm({ ...productForm, image: img })}
                        helpText="Upload a product photo directly from your computer or phone, pick a preset, or enter a URL."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-xs mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={productForm.description || ""}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30 text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-6 text-xs font-semibold">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!productForm.isFeatured}
                        onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                      />
                      <span>Feature on Homepage</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!productForm.isHidden}
                        onChange={(e) => setProductForm({ ...productForm, isHidden: e.target.checked })}
                      />
                      <span>Hide from Public Catalog</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-gold-500/20">
                    <button
                      type="button"
                      onClick={() => setProductForm(null)}
                      className="px-4 py-2 rounded-xl bg-gray-300 dark:bg-chocolate-700 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await saveProduct(productForm);
                        if (ok) {
                          showToast("Product saved successfully!");
                          setProductForm(null);
                        } else {
                          showToast("Error saving product.");
                        }
                      }}
                      className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-chocolate-950 text-xs font-bold shadow-md"
                    >
                      Save Product
                    </button>
                  </div>
                </div>
              )}

              {/* Products Table */}
              <div className="overflow-x-auto rounded-2xl border border-gold-500/20 bg-cream-50/50 dark:bg-chocolate-900/50">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gold-500/20 text-gold-600 dark:text-gold-400 uppercase tracking-wider bg-gold-500/5">
                      <th className="py-3 px-3">Image</th>
                      <th className="py-3 px-3">Name</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Badge</th>
                      <th className="py-3 px-3">Visibility</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter((p) => {
                        const matchesSearch =
                          p.name.toLowerCase().includes(adminProductSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(adminProductSearch.toLowerCase());
                        const matchesCat = adminProductCategory === "All" || p.category === adminProductCategory;
                        return matchesSearch && matchesCat;
                      })
                      .map((p) => (
                        <tr key={p.id} className="border-b border-gold-500/10 hover:bg-cream-100/60 dark:hover:bg-chocolate-800/40">
                          <td className="py-2 px-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-xl border border-gold-500/20" referrerPolicy="no-referrer" />
                          </td>
                          <td className="py-2 px-3 font-bold text-chocolate-900 dark:text-cream-50">{p.name}</td>
                          <td className="py-2 px-3">{p.category}</td>
                          <td className="py-2 px-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gold-500/15 text-gold-700 dark:text-gold-300 border border-gold-500/20">
                              {p.availabilityBadge}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            {p.isHidden ? (
                              <span className="text-rose-500 font-semibold flex items-center gap-1"><EyeOff className="w-3.5 h-3.5" /> Hidden</span>
                            ) : (
                              <span className="text-emerald-500 font-semibold flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Visible</span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-right space-x-2">
                            <button
                              onClick={() => setProductForm(p)}
                              title="Edit product"
                              className="px-2.5 py-1.5 rounded-xl bg-cream-200 dark:bg-chocolate-800 text-chocolate-900 dark:text-cream-100 hover:text-gold-600 dark:hover:text-gold-400 font-semibold inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  id: p.id,
                                  name: p.name,
                                  type: "product",
                                })
                              }
                              id={`admin-delete-product-${p.id}`}
                              title="Delete product"
                              className="px-2.5 py-1.5 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    {products.filter((p) => {
                      const matchesSearch =
                        p.name.toLowerCase().includes(adminProductSearch.toLowerCase()) ||
                        p.category.toLowerCase().includes(adminProductSearch.toLowerCase());
                      const matchesCat = adminProductCategory === "All" || p.category === adminProductCategory;
                      return matchesSearch && matchesCat;
                    }).length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-xs text-chocolate-500 dark:text-cream-300">
                          No products found matching your search or category filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: GALLERY MANAGER */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Gallery Manager</h2>
                  <p className="text-xs text-chocolate-600 dark:text-cream-300">Upload, categorize, or replace bakery showcase photos.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {gallery.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          id: "all",
                          name: `All ${gallery.length} Gallery Photos`,
                          type: "all-gallery",
                        })
                      }
                      id="admin-delete-all-gallery-btn"
                      className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete All Photos ({gallery.length})</span>
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setGalleryForm({
                        title: "",
                        category: "Cakes",
                        imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800",
                        description: "",
                      })
                    }
                    className="px-4 py-2 rounded-xl bg-gold-500 text-chocolate-950 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>

              {galleryForm && (
                <div className="p-5 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 space-y-4 text-xs">
                  <h3 className="font-serif text-lg font-bold">{galleryForm.id ? "Edit Photo" : "Upload Photo"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Title</label>
                      <input
                        type="text"
                        value={galleryForm.title || ""}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Category</label>
                      <select
                        value={galleryForm.category || "Cakes"}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as GalleryCategory })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30"
                      >
                        <option value="Cakes">Cakes</option>
                        <option value="Cookies">Cookies</option>
                        <option value="Bread">Bread</option>
                        <option value="Pastries">Pastries</option>
                        <option value="Events">Events</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <ImageUploader
                      label="Showcase Photo"
                      value={galleryForm.imageUrl || ""}
                      onChange={(img) => setGalleryForm({ ...galleryForm, imageUrl: img })}
                      helpText="Upload a photo directly from your device, or choose a preset."
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Caption / Description</label>
                    <input
                      type="text"
                      value={galleryForm.description || ""}
                      onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button onClick={() => setGalleryForm(null)} className="px-4 py-2 rounded-xl bg-gray-300 dark:bg-chocolate-700 font-bold">Cancel</button>
                    <button
                      onClick={async () => {
                        const ok = await saveGalleryItem(galleryForm);
                        if (ok) {
                          showToast("Gallery image saved!");
                          setGalleryForm(null);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-gold-500 text-chocolate-950 font-bold"
                    >
                      Save Photo
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-gold-500/20 bg-cream-100">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-chocolate-950/80 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-cream-50">
                      <div>
                        <span className="text-[10px] text-gold-400 font-bold">{g.category}</span>
                        <p className="font-serif text-xs font-bold">{g.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setGalleryForm(g)} className="p-1.5 rounded bg-gold-500 text-chocolate-950 font-bold text-xs">Edit</button>
                        <button
                          onClick={() => setDeleteConfirm({ id: g.id, name: g.title, type: "gallery" })}
                          className="p-1.5 rounded bg-rose-600 text-white font-bold text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HOMEPAGE MANAGER */}
          {activeTab === "homepage" && (
            <div className="space-y-6 text-xs">
              <div className="border-b border-gold-500/20 pb-4">
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Homepage Content</h2>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">Edit hero banner image, tagline, and story copy.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <ImageUploader
                    label="Hero Background Banner"
                    value={homepageState.heroImage || ""}
                    onChange={(img) => setHomepageState({ ...homepageState, heroImage: img })}
                    helpText="Upload a high-resolution hero banner image directly from your device."
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={homepageState.tagline || ""}
                    onChange={(e) => setHomepageState({ ...homepageState, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Welcome Section Title</label>
                  <input
                    type="text"
                    value={homepageState.welcomeTitle || ""}
                    onChange={(e) => setHomepageState({ ...homepageState, welcomeTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Welcome Story Paragraph</label>
                  <textarea
                    rows={4}
                    value={homepageState.welcomeStory || ""}
                    onChange={(e) => setHomepageState({ ...homepageState, welcomeStory: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gold-600 dark:text-gold-400">
                    Store Pickup & Collection Disclaimer Banner (Starting Page)
                  </label>
                  <textarea
                    rows={2}
                    value={homepageState.pickupNotice || ""}
                    onChange={(e) => setHomepageState({ ...homepageState, pickupNotice: e.target.value })}
                    placeholder="THE FOOD WILL NOT GET TO YOUR HOME IT SHOULD COME AND COLLECT FROM GIVEN ADDRESS"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 font-semibold"
                  />
                  <p className="text-[10px] text-chocolate-500 dark:text-cream-300 mt-1">
                    Displayed prominently across the hero and top of the starting page.
                  </p>
                </div>

                <button
                  onClick={async () => {
                    const ok = await updateHomepage(homepageState);
                    if (ok) showToast("Homepage settings saved!");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-chocolate-950 font-bold text-xs"
                >
                  Save Homepage Content
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: ABOUT PAGE MANAGER */}
          {activeTab === "about" && (
            <div className="space-y-6 text-xs">
              <div className="border-b border-gold-500/20 pb-4">
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">About Page Content</h2>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">Edit bakery story, mission, and vision.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Story Header Title</label>
                  <input
                    type="text"
                    value={aboutState.storyTitle || ""}
                    onChange={(e) => setAboutState({ ...aboutState, storyTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Mission Statement</label>
                  <textarea
                    rows={2}
                    value={aboutState.mission || ""}
                    onChange={(e) => setAboutState({ ...aboutState, mission: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Vision Statement</label>
                  <textarea
                    rows={2}
                    value={aboutState.vision || ""}
                    onChange={(e) => setAboutState({ ...aboutState, vision: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <button
                  onClick={async () => {
                    const ok = await updateAbout(aboutState);
                    if (ok) showToast("About page content saved!");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-chocolate-950 font-bold text-xs"
                >
                  Save About Content
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: TESTIMONIALS MANAGER */}
          {activeTab === "testimonials" && (
            <div className="space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Customer Testimonials</h2>
                  <p className="text-xs text-chocolate-600 dark:text-cream-300">Approve or moderate customer reviews.</p>
                </div>
                {testimonials.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteConfirm({
                        id: "all",
                        name: `All ${testimonials.length} Reviews`,
                        type: "all-testimonials",
                      })
                    }
                    id="admin-delete-all-testimonials-btn"
                    className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete All Reviews ({testimonials.length})</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold">{t.name}</strong>
                        <span className="text-[10px] text-gold-600 font-semibold">({t.rating} Stars - {t.occasion})</span>
                      </div>
                      <p className="italic text-chocolate-700 dark:text-cream-200">"{t.comment}"</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={async () => {
                          await saveTestimonial({ ...t, isApproved: !t.isApproved });
                          showToast(t.isApproved ? "Testimonial unapproved." : "Testimonial approved!");
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          t.isApproved ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500 text-white"
                        }`}
                      >
                        {t.isApproved ? "Approved ✓" : "Approve Review"}
                      </button>

                      <button
                        onClick={() => setDeleteConfirm({ id: t.id, name: `${t.name}'s review`, type: "testimonial" })}
                        className="p-1.5 rounded bg-rose-500/20 text-rose-600 hover:bg-rose-500 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SPECIAL ORDERS MANAGER */}
          {activeTab === "special-orders" && (
            <div className="space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Special Order Requests</h2>
                  <p className="text-xs text-chocolate-600 dark:text-cream-300">View and update statuses for custom cake/event inquiries.</p>
                </div>
                {adminSpecialOrders.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteConfirm({
                        id: "all",
                        name: `All ${adminSpecialOrders.length} Special Order Inquiries`,
                        type: "all-special-orders",
                      })
                    }
                    id="admin-delete-all-special-orders-btn"
                    className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete All Inquiries ({adminSpecialOrders.length})</span>
                  </button>
                )}
              </div>

              {adminSpecialOrders.length === 0 ? (
                <p className="text-chocolate-600 dark:text-cream-300 py-8 text-center">No special order requests received yet.</p>
              ) : (
                <div className="space-y-4">
                  {adminSpecialOrders.map((so) => (
                    <div key={so.id} className="p-5 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/20 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold-500/10 pb-2">
                        <div>
                          <h3 className="font-serif text-base font-bold text-chocolate-900 dark:text-cream-50">{so.customerName}</h3>
                          <p className="text-[11px] text-gold-600 font-semibold">{so.occasion} • {so.preferredDate} ({so.servingSize})</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase text-chocolate-500">{so.createdAt.split("T")[0]}</span>
                          <select
                            value={so.status}
                            onChange={async (e) => {
                              await updateSpecialOrderStatus(so.id, e.target.value);
                              showToast(`Status updated to ${e.target.value}`);
                            }}
                            className="px-2.5 py-1 rounded-xl bg-white dark:bg-chocolate-900 border border-gold-500/30 text-xs font-bold"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Review">In Review</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-chocolate-800 dark:text-cream-100"><strong>Contact:</strong> Phone: {so.phone} {so.email ? `| Email: ${so.email}` : ""}</p>
                        <p className="text-chocolate-800 dark:text-cream-100"><strong>Design & Flavor Details:</strong> {so.message}</p>
                        {so.specialRequirements && (
                          <p className="text-rose-600 dark:text-rose-400"><strong>Special Requirements:</strong> {so.specialRequirements}</p>
                        )}
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => setDeleteConfirm({ id: so.id, name: `Inquiry from ${so.customerName}`, type: "special-order" })}
                          className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-600 hover:bg-rose-500 hover:text-white font-bold"
                        >
                          Delete Inquiry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: BUSINESS HOURS MANAGER */}
          {activeTab === "hours" && (
            <div className="space-y-6 text-xs">
              <div className="border-b border-gold-500/20 pb-4">
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Business Hours</h2>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">Set weekly bakery opening and closing times.</p>
              </div>

              <div className="space-y-3">
                {hoursState.map((h, idx) => (
                  <div key={h.day} className="flex items-center gap-4 p-3 bg-cream-50 dark:bg-chocolate-800 rounded-xl border border-gold-500/10">
                    <span className="w-24 font-bold">{h.day}</span>
                    <input
                      type="text"
                      disabled={h.isClosed}
                      value={h.openTime}
                      onChange={(e) => {
                        const updated = [...hoursState];
                        updated[idx].openTime = e.target.value;
                        setHoursState(updated);
                      }}
                      className="px-2 py-1 rounded bg-white dark:bg-chocolate-900 border border-gold-500/20 text-center w-24"
                    />
                    <span>to</span>
                    <input
                      type="text"
                      disabled={h.isClosed}
                      value={h.closeTime}
                      onChange={(e) => {
                        const updated = [...hoursState];
                        updated[idx].closeTime = e.target.value;
                        setHoursState(updated);
                      }}
                      className="px-2 py-1 rounded bg-white dark:bg-chocolate-900 border border-gold-500/20 text-center w-24"
                    />
                    <label className="flex items-center gap-1.5 cursor-pointer ml-auto">
                      <input
                        type="checkbox"
                        checked={h.isClosed}
                        onChange={(e) => {
                          const updated = [...hoursState];
                          updated[idx].isClosed = e.target.checked;
                          setHoursState(updated);
                        }}
                      />
                      <span>Closed</span>
                    </label>
                  </div>
                ))}

                <button
                  onClick={async () => {
                    const ok = await updateBusinessHours(hoursState);
                    if (ok) showToast("Business hours saved!");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-chocolate-950 font-bold text-xs"
                >
                  Save Business Hours
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: MEDIA MANAGER */}
          {activeTab === "media" && (
            <div className="space-y-6 text-xs">
              <div className="border-b border-gold-500/20 pb-4">
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Direct Image Uploader & Media Manager</h2>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">Upload high-resolution images directly from your device without entering URLs.</p>
              </div>

              <div className="p-6 rounded-2xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 space-y-6 shadow-md">
                <ImageUploader
                  label="Direct Image File Upload"
                  value={mediaUploadImage}
                  onChange={(img) => setMediaUploadImage(img)}
                  helpText="Select or drag an image file directly from your computer or phone (PNG, JPG, WEBP, GIF, SVG)."
                />

                {mediaUploadImage && (
                  <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 space-y-3">
                    <p className="font-bold text-chocolate-900 dark:text-cream-50 text-xs">
                      What would you like to do with this uploaded image?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setProductForm({
                            name: "New Custom Bake",
                            category: "Birthday Cakes",
                            image: mediaUploadImage,
                            availabilityBadge: "In Stock",
                            description: "Freshly uploaded custom artisan bake.",
                          });
                          setActiveTab("products");
                          showToast("Created product with uploaded image!");
                        }}
                        className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-chocolate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add as New Product</span>
                      </button>

                      <button
                        onClick={() => {
                          setGalleryForm({
                            title: "New Bakery Showcase",
                            category: "Cakes",
                            imageUrl: mediaUploadImage,
                            description: "Freshly uploaded bakery showcase photo.",
                          });
                          setActiveTab("gallery");
                          showToast("Created gallery photo with uploaded image!");
                        }}
                        className="px-4 py-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-900 text-cream-50 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>Add to Gallery Showcase</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(mediaUploadImage);
                          showToast("Image data copied to clipboard!");
                        }}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-chocolate-700 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 font-bold text-xs"
                      >
                        Copy Image Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 10: SEO & SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 text-xs">
              <div className="border-b border-gold-500/20 pb-4">
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">SEO & Website Settings</h2>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">Configure brand contact, address, meta tags, and maintenance mode.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-bold block">Maintenance Mode</strong>
                    <span className="text-[11px] text-chocolate-600 dark:text-cream-300">When enabled, visitors will see a live maintenance notice banner.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!settingsState.maintenanceMode}
                      onChange={(e) => setSettingsState({ ...settingsState, maintenanceMode: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-chocolate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                  </label>
                </div>

                <div>
                  <ImageUploader
                    label="Official Bakery Brand Logo"
                    value={settingsState.logoUrl || "/src/assets/images/liyas_bake_logo_1786681257310.jpg"}
                    onChange={(img) => setSettingsState({ ...settingsState, logoUrl: img })}
                    helpText="Upload a circular or square brand logo to display in the navbar, footer, and hero."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Bakery Name</label>
                    <input
                      type="text"
                      value={settingsState.siteName || ""}
                      onChange={(e) => setSettingsState({ ...settingsState, siteName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={settingsState.phone || ""}
                      onChange={(e) => setSettingsState({ ...settingsState, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    value={settingsState.address || ""}
                    onChange={(e) => setSettingsState({ ...settingsState, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">SEO Title Meta Tag</label>
                  <input
                    type="text"
                    value={settingsState.seoTitle || ""}
                    onChange={(e) => setSettingsState({ ...settingsState, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">SEO Description Meta Tag</label>
                  <textarea
                    rows={2}
                    value={settingsState.seoDescription || ""}
                    onChange={(e) => setSettingsState({ ...settingsState, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <button
                  onClick={async () => {
                    const ok = await updateSettings(settingsState);
                    if (ok) showToast("Website settings saved!");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-chocolate-950 font-bold text-xs"
                >
                  Save Settings
                </button>

                <div className="pt-6 border-t border-rose-500/30 space-y-3">
                  <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
                      <Trash2 className="w-5 h-5" />
                      <span className="text-sm">Danger Zone: Wipe All Website Data</span>
                    </div>
                    <p className="text-chocolate-700 dark:text-cream-200">
                      Permanently delete all catalog products, gallery photos, customer reviews, and special order inquiries at once.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          id: "all",
                          name: "ALL Catalog Products, Gallery Photos, Customer Reviews, and Special Order Inquiries",
                          type: "all-data",
                        })
                      }
                      id="admin-delete-all-data-btn"
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Wipe All Website Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SECURITY & CREDENTIALS */}
          {activeTab === "security" && (
            <div className="space-y-6 text-xs max-w-md">
              <div className="border-b border-gold-500/20 pb-4">
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 dark:text-cream-50">Security & Credentials</h2>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">Change admin username and login password.</p>
              </div>

              <form onSubmit={handleUpdateSecurity} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Admin Username</label>
                  <input
                    type="text"
                    required
                    value={securityUsername}
                    onChange={(e) => setSecurityUsername(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">New Password (Min 6 chars)</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password"
                    value={securityPassword}
                    onChange={(e) => setSecurityPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-chocolate-950 font-bold text-xs"
                >
                  Update Credentials
                </button>
              </form>
            </div>
          )}

        </main>

      </div>

      {/* GLOBAL DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-chocolate-900 border-2 border-rose-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 relative">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-chocolate-900 dark:text-cream-50">
                  {deleteConfirm.type.startsWith("all-") ? "Confirm Bulk Delete All?" : `Delete ${
                    deleteConfirm.type === "product" ? "Product" : deleteConfirm.type === "gallery" ? "Gallery Image" : deleteConfirm.type === "testimonial" ? "Review" : "Inquiry"
                  }?`}
                </h3>
                <p className="text-xs text-chocolate-600 dark:text-cream-300">This action cannot be undone.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-chocolate-800 dark:text-cream-100 font-sans leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-rose-700 dark:text-rose-300 font-bold">"{deleteConfirm.name}"</strong>? {deleteConfirm.type.startsWith("all-") ? "All items in this collection will be cleared immediately." : "It will be removed from your store immediately."}
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-gold-500/20">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-chocolate-800 text-chocolate-800 dark:text-cream-100 text-xs font-bold hover:bg-gray-300 dark:hover:bg-chocolate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirm-delete-action-btn"
                onClick={async () => {
                  setIsDeleting(true);
                  if (deleteConfirm.type === "product") {
                    const ok = await deleteProduct(deleteConfirm.id);
                    setIsDeleting(false);
                    if (ok) {
                      showToast("Product deleted successfully!");
                      setDeleteConfirm(null);
                      if (productForm?.id === deleteConfirm.id) setProductForm(null);
                    } else {
                      showToast("Failed to delete product.");
                    }
                  } else if (deleteConfirm.type === "all-products") {
                    const ok = await deleteAllProducts();
                    setIsDeleting(false);
                    if (ok) {
                      showToast("All products deleted successfully!");
                      setDeleteConfirm(null);
                      setProductForm(null);
                    } else {
                      showToast("Failed to delete products.");
                    }
                  } else if (deleteConfirm.type === "gallery") {
                    const ok = await deleteGalleryItem(deleteConfirm.id);
                    setIsDeleting(false);
                    if (ok) {
                      showToast("Gallery image deleted.");
                      setDeleteConfirm(null);
                      if (galleryForm?.id === deleteConfirm.id) setGalleryForm(null);
                    } else {
                      showToast("Failed to delete gallery image.");
                    }
                  } else if (deleteConfirm.type === "all-gallery") {
                    const ok = await deleteAllGalleryItems();
                    setIsDeleting(false);
                    if (ok) {
                      showToast("All gallery photos deleted!");
                      setDeleteConfirm(null);
                      setGalleryForm(null);
                    } else {
                      showToast("Failed to delete gallery items.");
                    }
                  } else if (deleteConfirm.type === "testimonial") {
                    const ok = await deleteTestimonial(deleteConfirm.id);
                    setIsDeleting(false);
                    if (ok) {
                      showToast("Review deleted.");
                      setDeleteConfirm(null);
                      if (testimonialForm?.id === deleteConfirm.id) setTestimonialForm(null);
                    } else {
                      showToast("Failed to delete review.");
                    }
                  } else if (deleteConfirm.type === "all-testimonials") {
                    const ok = await deleteAllTestimonials();
                    setIsDeleting(false);
                    if (ok) {
                      showToast("All reviews deleted!");
                      setDeleteConfirm(null);
                      setTestimonialForm(null);
                    } else {
                      showToast("Failed to delete reviews.");
                    }
                  } else if (deleteConfirm.type === "special-order") {
                    const ok = await deleteSpecialOrder(deleteConfirm.id);
                    setIsDeleting(false);
                    if (ok) {
                      showToast("Inquiry deleted.");
                      setDeleteConfirm(null);
                    } else {
                      showToast("Failed to delete inquiry.");
                    }
                  } else if (deleteConfirm.type === "all-special-orders") {
                    const ok = await deleteAllSpecialOrders();
                    setIsDeleting(false);
                    if (ok) {
                      showToast("All special order inquiries deleted!");
                      setDeleteConfirm(null);
                    } else {
                      showToast("Failed to delete inquiries.");
                    }
                  } else if (deleteConfirm.type === "all-data") {
                    const ok = await deleteAllData();
                    setIsDeleting(false);
                    if (ok) {
                      showToast("All store data deleted successfully!");
                      setDeleteConfirm(null);
                      setProductForm(null);
                      setGalleryForm(null);
                      setTestimonialForm(null);
                    } else {
                      showToast("Failed to delete store data.");
                    }
                  }
                }}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? "Deleting..." : "Delete Permanently"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
