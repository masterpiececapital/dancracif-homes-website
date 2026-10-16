import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dangracif-secret-key-super-secure-change-in-production-2026";

const secretKey = new TextEncoder().encode(JWT_SECRET);
const AUTH_COOKIE_NAME = "dangracif_admin_token";
const LAST_ACTIVITY_COOKIE_NAME = "dangracif_admin_last_activity";
const AUTH_TOKEN_MAX_AGE = 60 * 60 * 2; // 2 hours in seconds
const ADMIN_INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes in ms

interface AdminTokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

async function verifyToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      id: (payload.id as string) || (payload.sub as string),
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const lastActiveStr = req.cookies.get(LAST_ACTIVITY_COOKIE_NAME)?.value;

  // Check 30-minute inactivity timeout
  let isTimedOutByInactivity = false;
  if (token && lastActiveStr) {
    const lastActive = parseInt(lastActiveStr, 10);
    if (!isNaN(lastActive) && Date.now() - lastActive > ADMIN_INACTIVITY_TIMEOUT_MS) {
      isTimedOutByInactivity = true;
    }
  }

  // Verify token if present and not timed out by inactivity
  const sessionUser = token && !isTimedOutByInactivity ? await verifyToken(token) : null;
  const isAuthenticated = Boolean(sessionUser);

  // 1. If accessing the login page while already authenticated, redirect to /admin
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      const redirectTarget = req.nextUrl.searchParams.get("redirect") || "/admin";
      // Ensure target is an internal safe path
      const safeTarget = redirectTarget.startsWith("/admin") ? redirectTarget : "/admin";
      return NextResponse.redirect(new URL(safeTarget, req.url));
    }
    return NextResponse.next();
  }

  // Helper to touch/refresh the last activity cookie
  const updateActivityCookie = (res: NextResponse) => {
    res.cookies.set(LAST_ACTIVITY_COOKIE_NAME, Date.now().toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: AUTH_TOKEN_MAX_AGE,
    });
  };

  // 2. Protect API routes: /api/admin/*
  if (pathname.startsWith("/api/admin")) {
    if (!isAuthenticated) {
      const response = NextResponse.json(
        {
          error: isTimedOutByInactivity
            ? "Session expired due to 30 minutes of inactivity. Please log in again."
            : "Unauthorized. Session expired or missing.",
        },
        { status: 401 }
      );
      if (token || isTimedOutByInactivity) {
        response.cookies.delete(AUTH_COOKIE_NAME);
        response.cookies.delete(LAST_ACTIVITY_COOKIE_NAME);
      }
      return response;
    }

    // Attach user tracking headers to API request
    const requestHeaders = new Headers(req.headers);
    if (sessionUser) {
      requestHeaders.set("x-admin-user-id", sessionUser.id);
      requestHeaders.set("x-admin-user-email", sessionUser.email);
      requestHeaders.set("x-admin-user-role", sessionUser.role);
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    updateActivityCookie(response);
    return response;
  }

  // 3. Protect all admin pages: /admin/*
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", req.url);
      if (isTimedOutByInactivity) {
        loginUrl.searchParams.set("reason", "inactivity");
      }
      // Preserve return destination for seamless login redirect
      const fullPath = pathname + (search || "");
      if (fullPath !== "/admin") {
        loginUrl.searchParams.set("redirect", fullPath);
      }

      const response = NextResponse.redirect(loginUrl);
      // Clear any invalid or expired cookie
      if (token || isTimedOutByInactivity) {
        response.cookies.delete(AUTH_COOKIE_NAME);
        response.cookies.delete(LAST_ACTIVITY_COOKIE_NAME);
      }
      return response;
    }

    // Forward authenticated user tracking headers downstream
    const requestHeaders = new Headers(req.headers);
    if (sessionUser) {
      requestHeaders.set("x-admin-user-id", sessionUser.id);
      requestHeaders.set("x-admin-user-email", sessionUser.email);
      requestHeaders.set("x-admin-user-name", sessionUser.name);
      requestHeaders.set("x-admin-user-role", sessionUser.role);
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Add security headers to admin responses
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    updateActivityCookie(response);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all admin routes and admin API routes
     * Exclude static files, images, etc.
     */
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
