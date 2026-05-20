"use server";

import { cookies } from "next/headers";

/**
 * Securely set authentication cookies on the server
 */
export async function setAuthCookies(accessToken, refreshToken, role) {
  const cookieStore = await cookies();

  // Set accessToken with HttpOnly, Secure, SameSite flags
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Set refreshToken
  cookieStore.set("refreshToken", refreshToken || accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Set role (accessible to client-side scripts to control user role views)
  cookieStore.set("role", role, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Securely clear authentication cookies
 */
export async function deleteAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("role");
}
