"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { adminLogoutAction } from "@/app/actions/admin-auth";
import toast from "react-hot-toast";
import { ADMIN_ACTIVITY_STORAGE_KEY } from "@/constants/admin";

const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes
const CHECK_INTERVAL_MS = 15 * 1000; // check every 15 seconds
const THROTTLE_ACTIVITY_MS = 5 * 1000; // write to localStorage at most once every 5s

export function AdminInactivityTracker() {
  const router = useRouter();
  const isLoggingOutRef = React.useRef(false);
  const lastWriteRef = React.useRef(0);

  const triggerLogout = React.useCallback(async () => {
    if (isLoggingOutRef.current) return;
    isLoggingOutRef.current = true;

    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(ADMIN_ACTIVITY_STORAGE_KEY);
      }
      await adminLogoutAction();
    } catch (err) {
      console.error("Inactivity logout error:", err);
    } finally {
      toast.error("You have been signed out due to 30 minutes of inactivity.", {
        id: "inactivity-logout-toast",
        duration: 6000,
      });
      router.push("/admin/login?reason=inactivity");
      router.refresh();
    }
  }, [router]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize or verify current timestamp
    const existing = localStorage.getItem(ADMIN_ACTIVITY_STORAGE_KEY);
    const now = Date.now();
    if (!existing) {
      localStorage.setItem(ADMIN_ACTIVITY_STORAGE_KEY, now.toString());
    } else {
      const parsed = parseInt(existing, 10);
      if (!isNaN(parsed) && now - parsed >= INACTIVITY_LIMIT_MS) {
        triggerLogout();
        return;
      }
    }

    // Record activity (throttled)
    const recordActivity = () => {
      const currentTime = Date.now();
      if (currentTime - lastWriteRef.current > THROTTLE_ACTIVITY_MS) {
        lastWriteRef.current = currentTime;
        localStorage.setItem(ADMIN_ACTIVITY_STORAGE_KEY, currentTime.toString());
      }
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, recordActivity, { passive: true });
    });

    // Check timer periodically
    const interval = setInterval(() => {
      const stored = localStorage.getItem(ADMIN_ACTIVITY_STORAGE_KEY);
      const currentTime = Date.now();
      if (stored) {
        const last = parseInt(stored, 10);
        if (!isNaN(last) && currentTime - last >= INACTIVITY_LIMIT_MS) {
          triggerLogout();
        }
      }
    }, CHECK_INTERVAL_MS);

    // Sync across browser tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === ADMIN_ACTIVITY_STORAGE_KEY && e.newValue) {
        const last = parseInt(e.newValue, 10);
        if (!isNaN(last) && Date.now() - last >= INACTIVITY_LIMIT_MS) {
          triggerLogout();
        }
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, recordActivity);
      });
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [triggerLogout]);

  return null;
}
