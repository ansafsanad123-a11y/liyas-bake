import React, { createContext, useContext, useEffect, useState } from "react";
import { AdminUser } from "../types";

interface AuthContextType {
  token: string | null;
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  updateAdminInfo: (updatedUser: AdminUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("liyas_admin_token"));
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem("liyas_admin_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (newToken: string, user: AdminUser) => {
    setToken(newToken);
    setAdminUser(user);
    localStorage.setItem("liyas_admin_token", newToken);
    localStorage.setItem("liyas_admin_user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem("liyas_admin_token");
    localStorage.removeItem("liyas_admin_user");
  };

  const updateAdminInfo = (updatedUser: AdminUser) => {
    setAdminUser(updatedUser);
    localStorage.setItem("liyas_admin_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        adminUser,
        isAuthenticated: !!token,
        isFirstLogin: adminUser?.isFirstLogin || false,
        login,
        logout,
        updateAdminInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
