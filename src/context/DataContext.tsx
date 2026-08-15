import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  FullSiteData,
  Product,
  GalleryItem,
  Testimonial,
  SpecialOrderRequest,
  HomepageContent,
  AboutContent,
  BusinessHours,
  SiteSettings,
} from "../types";
import { useAuth } from "./AuthContext";

interface DataContextType {
  siteData: FullSiteData | null;
  loading: boolean;
  error: string | null;
  refreshPublicData: () => Promise<void>;
  refreshAdminDashboard: () => Promise<void>;
  submitSpecialOrder: (order: Partial<SpecialOrderRequest>) => Promise<{ success: boolean; message: string }>;
  submitTestimonial: (review: Partial<Testimonial>) => Promise<{ success: boolean; message: string }>;
  
  // Admin Methods
  adminStats: any | null;
  adminSpecialOrders: SpecialOrderRequest[];
  saveProduct: (productData: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  deleteAllProducts: () => Promise<boolean>;
  saveGalleryItem: (galleryData: Partial<GalleryItem>) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;
  deleteAllGalleryItems: () => Promise<boolean>;
  updateSpecialOrderStatus: (id: string, status: string) => Promise<boolean>;
  deleteSpecialOrder: (id: string) => Promise<boolean>;
  deleteAllSpecialOrders: () => Promise<boolean>;
  saveTestimonial: (testimonialData: Partial<Testimonial>) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  deleteAllTestimonials: () => Promise<boolean>;
  deleteAllData: () => Promise<boolean>;
  updateHomepage: (content: Partial<HomepageContent>) => Promise<boolean>;
  updateAbout: (content: Partial<AboutContent>) => Promise<boolean>;
  updateBusinessHours: (hours: BusinessHours[]) => Promise<boolean>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [siteData, setSiteData] = useState<FullSiteData | null>(null);
  const [adminStats, setAdminStats] = useState<any | null>(null);
  const [adminSpecialOrders, setAdminSpecialOrders] = useState<SpecialOrderRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/site-data");
      if (!res.ok) throw new Error("Failed to load bakery data.");
      const data = await res.json();
      setSiteData((prev) => ({
        ...prev,
        ...data,
      }));
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAdminDashboard = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load admin dashboard.");
      const data = await res.json();
      setAdminStats(data.stats);
      setAdminSpecialOrders(data.specialOrders || []);
      setSiteData({
        homepage: data.homepage,
        about: data.about,
        products: data.products,
        gallery: data.gallery,
        testimonials: data.testimonials,
        businessHours: data.businessHours,
        settings: data.settings,
        specialOrders: data.specialOrders,
      });
    } catch (err: any) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchPublicData();
  }, [fetchPublicData]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminDashboard();
    }
  }, [isAuthenticated, fetchAdminDashboard]);

  // Submit Special Order Inquiry (Public)
  const submitSpecialOrder = async (order: Partial<SpecialOrderRequest>) => {
    try {
      const res = await fetch("/api/special-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const json = await res.json();
      if (!res.ok) return { success: false, message: json.error || "Submission failed." };
      return { success: true, message: json.message };
    } catch (e: any) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // Submit Testimonial (Public)
  const submitTestimonial = async (review: Partial<Testimonial>) => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      const json = await res.json();
      if (!res.ok) return { success: false, message: json.error || "Submission failed." };
      return { success: true, message: json.message };
    } catch (e: any) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // Admin Methods
  const saveProduct = async (productData: Partial<Product>) => {
    if (!token) return false;
    try {
      const isEdit = !!productData.id;
      const url = isEdit ? `/api/admin/products/${productData.id}` : `/api/admin/products`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteProduct = async (id: string) => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        await fetchPublicData();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteAllProducts = async () => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        await fetchPublicData();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const saveGalleryItem = async (galleryData: Partial<GalleryItem>) => {
    if (!token) return false;
    try {
      const isEdit = !!galleryData.id;
      const url = isEdit ? `/api/admin/gallery/${galleryData.id}` : `/api/admin/gallery`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(galleryData),
      });
      if (res.ok) {
        await fetchAdminDashboard();
        await fetchPublicData();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        await fetchPublicData();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteAllGalleryItems = async () => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        await fetchPublicData();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const updateSpecialOrderStatus = async (id: string, status: string) => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/admin/special-orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteSpecialOrder = async (id: string) => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/admin/special-orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteAllSpecialOrders = async () => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/special-orders", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const saveTestimonial = async (testimonialData: Partial<Testimonial>) => {
    if (!token || !testimonialData.id) return false;
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(testimonialData),
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteAllTestimonials = async () => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteAllData = async () => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/all-data", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAdminDashboard();
        await fetchPublicData();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const updateHomepage = async (content: Partial<HomepageContent>) => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const updateAbout = async (content: Partial<AboutContent>) => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const updateBusinessHours = async (hours: BusinessHours[]) => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/business-hours", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hours }),
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const updateSettings = async (settings: Partial<SiteSettings>) => {
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        await fetchAdminDashboard();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        siteData,
        loading,
        error,
        refreshPublicData: fetchPublicData,
        refreshAdminDashboard: fetchAdminDashboard,
        submitSpecialOrder,
        submitTestimonial,
        adminStats,
        adminSpecialOrders,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
