"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const GOOGLE_SIGN_IN_URL =
  "https://shariful5001.binarybards.online/api/v1/auth/google-sign-in?role=EMPLOYEE";

export default function GoogleLogin() {
  const handleGoogleLogin = () => {
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
      {/* <span className="text-sm font-medium">Continue with Google</span> */}
    </button>
  );
}
