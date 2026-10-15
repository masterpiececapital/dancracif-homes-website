"use server";

import "reflect-metadata";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getDatabaseConnection } from "@/lib/db/data-source";
import { User, UserSchema } from "@/lib/db/entities/User";
import { signAdminToken, AUTH_COOKIE_NAME, getAdminSession } from "@/lib/auth";

export async function adminLoginAction(formData: {
  email?: string;
  password?: string;
}) {
  const email = formData.email?.trim().toLowerCase();
  const password = formData.password?.trim();

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  try {
    const dataSource = await getDatabaseConnection();
    const userRepo = dataSource.getRepository(UserSchema);

    const user = await userRepo.findOne({
      where: { email },
    });

    if (!user || !user.isActive) {
      return { success: false, error: "Invalid email or password." };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, error: "Invalid email or password." };
    }

    const token = await signAdminToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (err: unknown) {
    console.error("Login error:", err);
    return {
      success: false,
      error: "An unexpected error occurred during login. Please try again.",
    };
  }
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return { success: true };
}

export async function getCurrentAdmin() {
  return await getAdminSession();
}

export async function updateAdminPasswordAction(formData: {
  currentPassword?: string;
  newPassword?: string;
}) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in." };
  }

  const currentPassword = formData.currentPassword?.trim();
  const newPassword = formData.newPassword?.trim();

  if (!currentPassword || !newPassword) {
    return { success: false, error: "Both current and new password are required." };
  }

  if (newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters." };
  }

  try {
    const dataSource = await getDatabaseConnection();
    const userRepo = dataSource.getRepository(UserSchema);

    const user = await userRepo.findOne({
      where: { id: session.id },
    });

    if (!user) {
      return { success: false, error: "User account not found." };
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return { success: false, error: "Current password is incorrect." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await userRepo.save(user);

    return { success: true };
  } catch (err: unknown) {
    console.error("Password update error:", err);
    return { success: false, error: "Failed to update password." };
  }
}
