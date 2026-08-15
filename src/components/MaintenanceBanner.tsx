import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const MaintenanceBanner: React.FC = () => {
  const { siteData } = useData();
  const { isAuthenticated } = useAuth();

  if (!siteData?.settings?.maintenanceMode) return null;

  return (
    <div className="bg-amber-600 text-white px-4 py-2.5 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-inner z-50">
      <AlertTriangle className="w-4 h-4 shrink-0" />
      <span>
        <strong>Maintenance Mode Active:</strong> We are currently updating our oven schedule & artisanal catalog.
      </span>
      {isAuthenticated && (
        <Link
          to="/admin/dashboard"
          className="ml-2 underline font-semibold text-amber-100 hover:text-white flex items-center gap-1"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Controls</span>
        </Link>
      )}
    </div>
  );
};
