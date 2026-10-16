import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dangracif-secret-key-super-secure-change-in-production-2026";

const secretKey = new TextEncoder().encode(JWT_SECRET);
export const AUTH_COOKIE_NAME = "dangracif_admin_token";
export const LAST_ACTIVITY_COOKIE_NAME = "dangracif_admin_last_activity";

// Lifespans
export const AUTH_TOKEN_MAX_AGE = 60 * 60 * 2; // 2 hours in seconds
export const ADMIN_INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes in ms

export interface AdminSessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function signAdminToken(user: AdminSessionUser): Promise<string> {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey);
}

export async function verifyAdminToken(
  token: string
): Promise<AdminSessionUser | null> {
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

export async function getAdminSession(): Promise<AdminSessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}
