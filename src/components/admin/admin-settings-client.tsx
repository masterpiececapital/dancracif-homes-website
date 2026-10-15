"use client";

import * as React from "react";
import {
  ShieldCheck,
  User,
  KeyRound,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  Globe,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import { AdminSessionUser } from "@/lib/auth";
import { updateAdminPasswordAction } from "@/app/actions/admin-auth";

interface AdminSettingsClientProps {
  user: AdminSessionUser;
}

export function AdminSettingsClient({ user }: AdminSettingsClientProps) {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Please fill in both current and new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await updateAdminPasswordAction({
        currentPassword,
        newPassword,
      });

      if (!res.success) {
        toast.error(res.error || "Failed to update password");
        return;
      }

      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Portal Settings &amp; Security
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your executive credentials, security configuration, and portal preferences.
        </p>
      </div>

      {/* Grid of Profile & Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0754C6] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Administrator Profile
              </h2>
              <p className="text-xs text-slate-400">
                Your authenticated account credentials
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">
                Full Name
              </label>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 font-semibold text-slate-900">
                {user.name}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">
                Email Address
              </label>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 font-semibold text-slate-900">
                {user.email}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Access Level
                </label>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 font-semibold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0754C6]" />
                  <span className="capitalize">{user.role}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Session Status
                </label>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 font-semibold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Update Password
              </h2>
              <p className="text-xs text-slate-400">
                Keep your executive access protected
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6]"
              />
            </div>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#0754C6] hover:bg-[#0648AB] text-white text-xs font-bold tracking-wide shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isChangingPassword ? "Updating..." : "Update Password"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* System Preferences & Operational Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Executive Portal Operational Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider">
              Environment
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Globe className="w-3.5 h-3.5 text-[#0754C6]" />
              <span>Live Production</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Fidelis Court Real-Time Data
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider">
              Timezone Reference
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>West Africa Time (GMT+1)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Lagos, Nigeria Headquarters
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider">
              Portal Security
            </span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted Session Tokens</span>
            </div>
            <p className="text-[11px] text-slate-500">
              HTTP-only secure cookie standard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
