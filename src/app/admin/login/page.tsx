"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Clock } from "lucide-react";
import { adminLoginAction } from "@/app/actions/admin-auth";
import toast from "react-hot-toast";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await adminLoginAction({ email, password });
      if (res.success) {
        toast.success("Welcome back.");
        const safeTarget = redirectTo.startsWith("/admin") ? redirectTo : "/admin";
        router.push(safeTarget);
        router.refresh();
      } else {
        setError(res.error || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-6 sm:p-8 lg:p-10 xl:p-14">
      {/* SVG ClipPath Definition with Smooth S-Curves matching the Concept */}
      <svg className="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="concept-frame-clip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0.22, 0
                L 0.94, 0
                C 0.975, 0 1.0, 0.025 1.0, 0.06
                L 1.0, 0.81
                C 1.0, 0.845 0.975, 0.865 0.94, 0.865
                L 0.86, 0.865
                C 0.825, 0.865 0.80, 0.89 0.80, 0.925
                L 0.80, 0.94
                C 0.80, 0.975 0.775, 1.0 0.74, 1.0
                L 0.06, 1.0
                C 0.025, 1.0 0, 0.975 0, 0.94
                L 0, 0.19
                C 0, 0.155 0.025, 0.135 0.06, 0.135
                L 0.14, 0.135
                C 0.175, 0.135 0.20, 0.11 0.20, 0.075
                L 0.20, 0.06
                C 0.20, 0.025 0.22, 0 0.22, 0
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      {/* Main Content: Wider Form and Frame brought close together */}
      <div className="w-full max-w-[1220px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 xl:gap-12">
        {/* ─── LEFT SIDE: Login Form (Increased to max-w-[500px]) ─── */}
        <div className="w-full max-w-[480px] lg:max-w-[500px] shrink-0">
          {/* Brand Logo: Centered */}
          <div className="flex justify-center">
            <div className="relative w-48 sm:w-56 h-20 sm:h-24">
              <Image
                src="/images/logo.png"
                alt="Dangracif Homes Limited"
                fill
                sizes="240px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Heading & Subtitle: Centered */}
          <div className="mt-8 mb-8 text-center">
            <h1 className="text-3xl sm:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
              Let&apos;s login to grab amazing deal
            </p>
          </div>

          {/* Inactivity Notice */}
          {redirectTo && searchParams.get("reason") === "inactivity" && !error && (
            <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold text-center flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>You were signed out after 30 minutes of inactivity.</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field with Inset Label */}
            <div className="bg-[#F4F5F7] rounded-xl px-4.5 pt-3 pb-3 border border-transparent focus-within:border-[#0754C6] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0754C6]/15 transition-all">
              <label
                htmlFor="email"
                className="block text-[11px] font-medium text-slate-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dangracifhomes.com"
                className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none pt-0.5"
              />
            </div>

            {/* Password Field with Inset Label & Eye Toggle */}
            <div className="bg-[#F4F5F7] rounded-xl px-4.5 pt-3 pb-3 border border-transparent focus-within:border-[#0754C6] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0754C6]/15 transition-all flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-2">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-medium text-slate-400"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none pt-0.5"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#00ABF0] focus:ring-[#00ABF0] cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() =>
                  toast(
                    "Contact portal administrator to reset executive password.",
                    { icon: "ℹ️" }
                  )
                }
                className="text-slate-900 font-semibold hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-4 px-4 rounded-xl bg-[#0754C6] hover:bg-[#0648AB] active:bg-[#053D91] text-white font-bold text-sm tracking-wide shadow-md shadow-[#0754C6]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Footer note: Centered */}
          <div className="mt-8 text-center text-xs text-slate-400 font-medium">
            <span>Don&apos;t have an account? </span>
            <Link
              href="/"
              className="text-slate-900 font-bold hover:underline"
            >
              Contact Admin
            </Link>
          </div>
        </div>

        {/* ─── RIGHT SIDE: Framed Image (Increased to max-w-[620px]) ─── */}
        <div className="w-full max-w-[580px] lg:max-w-[620px] shrink-0">
          <div
            className="w-full h-[550px] sm:h-[620px] lg:h-[690px] relative overflow-hidden shadow-2xl transition-all duration-300"
            style={{
              clipPath: "url(#concept-frame-clip)",
              WebkitClipPath: "url(#concept-frame-clip)",
            }}
          >
            {/* Framed Image: Ready for your provided image */}
            <Image
              src="/images/admin-login-hero.jpg"
              alt="Dangracif Homes Estate"
              fill
              className="object-cover object-center"
              priority
            />

            {/* Top-Right Text Overlay: Strictly 2 Lines with whitespace-nowrap */}
            <div className="absolute top-8 sm:top-10 right-8 sm:right-10 z-10 text-right">
              <p className="text-white font-extrabold text-[16px] sm:text-[18px] leading-snug tracking-tight drop-shadow-md">
                <span className="block whitespace-nowrap">Browse thousands of properties to buy, sell,</span>
                <span className="block whitespace-nowrap">or rent with trusted agents.</span>
              </p>
            </div>

            {/* Subtle Gradient Overlays for High-Contrast Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/35 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#0754C6] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginFormInner />
    </React.Suspense>
  );
}
