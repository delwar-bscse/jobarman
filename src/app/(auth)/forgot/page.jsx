"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { myFetch } from "../../../../utils/myFetch";

export default function ForgotPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await myFetch("/auth/forget-password", {
      method: "POST",
      body: { email },
    });

    if (res?.success) {
      localStorage.setItem("registeredEmail", email);
      router.push("/otp");
    } else {
      toast.success(res?.message ?? "Send OTP Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-4">
      {/* Back Button */}
      <Link
        href="/login"
        className="absolute top-10 left-20 text-gray-600 hover:text-gray-900 transition"
      >
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          {/* Left Side - Logo Section */}
          <div className="hidden md:flex flex-col items-center justify-center p-8">
            <Image
              src="/forgot.svg"
              alt="Jobarman Logo"
              width={425}
              height={585}
              className="mb-6"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center p-8 text-center md:text-left border-2 border-[#ACBDF0] rounded-lg">
            <h2 className="text-4xl text-[#123499] font-semibold text-center mb-8">
              Forgot Password
            </h2>
            <p className="text-center font-medium text-[#2F2F2F]">
              Enter your registered email to get password reset instructions
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#0F38B2] text-2xl hover:bg-blue-700 text-white font-semibold py-4 rounded-lg mt-6 transition duration-200 transform hover:scale-105"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
