import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Key, User, Lock, AlertCircle, Info, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const AdminLogin: React.FC = () => {
  const { login, isAuthenticated, isFirstLogin, token, updateAdminInfo } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("8431126242");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Force Password Change Form States
  const [newUsername, setNewUsername] = useState("admin");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forceChangeSuccess, setForceChangeSuccess] = useState<string | null>(null);

  // Handle Initial Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Login failed. Please check credentials.");
        return;
      }

      login(data.token, data.admin);

      if (data.admin.isFirstLogin) {
        // Stay on page to force password change!
        setNewUsername(data.admin.username);
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  // Handle Forced Password Change
  const handleForcePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newUsername, newPassword }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Password update failed.");
        return;
      }

      setForceChangeSuccess("Credentials updated! Redirecting to Admin Dashboard...");
      updateAdminInfo(data.admin);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-chocolate-900 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-gold-500/30 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-gold-400/80 shadow-md bg-cream-50 flex items-center justify-center">
            <img
              src="/src/assets/images/liyas_bake_logo_1786681257310.jpg"
              alt="Liya's Bake Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-chocolate-900 dark:text-cream-50">
            {isAuthenticated && isFirstLogin ? "Security Setup Required" : "Admin Panel Access"}
          </h1>
          <p className="text-xs text-chocolate-600 dark:text-cream-200">
            {isAuthenticated && isFirstLogin
              ? "You are logged in with default credentials. Please create a new password before continuing."
              : "Liya's Bake Management Suite"}
          </p>
        </div>

        {/* DEFAULT CREDENTIALS HINT */}
        {!isAuthenticated && (
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-chocolate-800/80 border border-gold-500/30 text-xs text-chocolate-800 dark:text-cream-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-gold-600 dark:text-gold-400">
              <Info className="w-4 h-4" />
              <span>Default Credentials</span>
            </div>
            <p><strong>Username:</strong> <code className="bg-cream-200 dark:bg-chocolate-950 px-1.5 py-0.5 rounded text-gold-700 dark:text-gold-300">admin</code></p>
            <p><strong>Password:</strong> <code className="bg-cream-200 dark:bg-chocolate-950 px-1.5 py-0.5 rounded text-gold-700 dark:text-gold-300">Admin@123</code></p>
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Notice */}
        {forceChangeSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{forceChangeSuccess}</span>
          </div>
        )}

        {/* CONDITION 1: INITIAL LOGIN FORM */}
        {!isAuthenticated && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-chocolate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="admin-username-input"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-chocolate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="admin-password-input"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="admin-login-submit-btn"
              className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-chocolate-950 font-bold text-xs tracking-wide shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>{loading ? "Authenticating..." : "Login to Dashboard"}</span>
            </button>
          </form>
        )}

        {/* CONDITION 2: MANDATORY FORCE PASSWORD CHANGE FORM */}
        {isAuthenticated && isFirstLogin && (
          <form onSubmit={handleForcePasswordChange} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs">
              <strong>Mandatory First-Time Password Change:</strong> You must change your default password before accessing the website settings.
            </div>

            <div>
              <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                id="force-username-input"
                className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                New Password (Min 6 chars)
              </label>
              <input
                type="password"
                required
                placeholder="Enter new strong password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="force-new-password-input"
                className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-chocolate-900 dark:text-cream-200 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="force-confirm-password-input"
                className="w-full px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-chocolate-800 border border-gold-500/30 text-chocolate-900 dark:text-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              id="force-password-submit-btn"
              className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-chocolate-950 font-bold text-xs tracking-wide shadow-md transition-colors"
            >
              {loading ? "Updating Credentials..." : "Update Password & Proceed"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
