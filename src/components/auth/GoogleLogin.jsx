"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { setCookie } from "cookies-next";

export default function GoogleLogin() {
  const searchParams = useSearchParams();
  const role = searchParams.get("type") || "EMPLOYEE";
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const GOOGLE_SIGN_IN_URL = `${baseUrl}/auth/google-sign-in?role=${role}`;

  const handleGoogleLogin = () => {
    // Save callbackUrl to redirect the user back to their original page after Google authentication
    setCookie("callbackUrl", callbackUrl, { maxAge: 60 * 10, path: "/" });
    
    // Redirect user to backend Google OAuth endpoint
    window.location.href = GOOGLE_SIGN_IN_URL;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 py-3 rounded-xl transition hover:bg-gray-50"
    >
      <FcGoogle className="w-9 h-9" />
    </button>
  );
}
