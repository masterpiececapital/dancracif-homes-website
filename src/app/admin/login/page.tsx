"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Clock } from "lucide-react";
import { adminLoginAction } from "@/app/actions/admin-auth";
import toast from "react-hot-toast";
import { ADMIN_ACTIVITY_STORAGE_KEY } from "@/constants/admin";

const SLIDER_IMAGES = [
  {
    src: "/fidelis-court/Building Toward the Mountain Ridge.png",
    alt: "Fidelis Court Superstructure Toward Mountain Ridge",
  },
  {
    src: "/fidelis-court/Vibrant Mid-Rise Construction Site.png",
    alt: "Fidelis Court Mid-Rise Structural Framing",
  },
  {
    src: "/fidelis-court/Apartment Building Under Construction.png",
    alt: "Fidelis Court Apartment Wing Elevation",
  },
  {
    src: "/fidelis-court/Bright Renovation Room with Window Views.png",
    alt: "Fidelis Court Interior Living Room with Views",
  },
  {
    src: "/fidelis-court/Sunlit Construction Site Under Dramatic Clouds.png",
    alt: "Fidelis Court Estate Panorama",
  },
  {
    src: "/fidelis-court/Urban Construction Under Dramatic Skies.png",
    alt: "Fidelis Court Architectural Façade",
  },
  {
    src: "/fidelis-court/Scaffolded Window to Sunny Hillside View.png",
    alt: "Fidelis Court Hillside View",
  },
];

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

  // Slide state for left-hand side images
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await adminLoginAction({ email, password });
      if (res.success) {
        localStorage.setItem(ADMIN_ACTIVITY_STORAGE_KEY, Date.now().toString());
        toast.success("Welcome back.");
        const safeTarget = redirectTo.startsWith("/admin") ? redirectTo : "/admin";
        router.push(safeTarget);
        router.refresh();
      } else {
        setError(res.error || "Invalid email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* ─── LEFT: SLIDING IMAGES FROM /fidelis-court ─── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
        {SLIDER_IMAGES.map((img, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                sizes="50vw"
                className="object-cover"
              />
            </div>
          );
        })}

        {/* Subtle bottom gradient overlay for indicator dots */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />

        {/* Slide pagination dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {SLIDER_IMAGES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                idx === currentSlide
                  ? "w-7 bg-white shadow-sm"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── RIGHT: SIMPLE CLEAN FORM ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Logo (Centered & Large) */}
          <div className="flex justify-center mb-6">
            <div className="relative w-56 sm:w-64 h-20 sm:h-22">
              <Image
                src="/images/logo.png"
                alt="Dangracif Homes"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Enter your credentials to access the admin portal.
            </p>
          </div>

          {/* Inactivity Notice */}
          {redirectTo && searchParams.get("reason") === "inactivity" && !error && (
            <div className="mb-5 p-3 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>You were signed out due to inactivity.</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
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
                placeholder="admin@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
             

              <button
                type="button"
                onClick={() =>
                  toast(
                    "Contact the portal administrator to reset your password.",
                    { icon: "ℹ️" }
                  )
                }
                className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-[#0754C6] hover:bg-[#0648AB] active:bg-[#053D91] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center cursor-pointer disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
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
