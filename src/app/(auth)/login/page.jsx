"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    router.push("/")

  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-4">
      {/* Back Button */}
      <Link href="/" className="absolute top-10 left-20 text-gray-600 hover:text-gray-900 transition">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          
          {/* Left Side - Logo Section */}
          <div className="hidden md:flex flex-col items-center justify-center p-8">
            <Image 
              src="/authlogo.svg" 
              alt="Jobarman Logo"
              width={425}
              height={585}
              className="mb-6"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center p-8 text-center md:text-left border-2 border-[#ACBDF0] rounded-lg">
            <h2 className="text-4xl text-[#123499] font-semibold text-center mb-8">Log In</h2>

            <form onSubmit={handleLogin} className="space-y-6">
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

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#123499] transition"
                  >
                    {showPassword ? <Eye className="w-7 h-7" /> : <EyeOff className="w-7 h-7" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link href="/forgot" className="text-[#21419F] hover:text-blue-800 font-medium transition">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#0F38B2] text-2xl hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Log In
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                Don&apos;t Have An Account?{" "}
                <Link href="/signupques" className="text-[#21419F] hover:text-blue-800 font-bold transition">
                  Sign Up
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-600 font-medium">Or Continue With</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4">
              <button 
                type="button"
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 py-3 rounded-xl transition hover:bg-gray-50"
              >
                <FcGoogle className="w-9 h-9" />
              </button>
              <button 
                type="button"
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 py-3 rounded-xl transition hover:bg-gray-50"
              >
                <Image src="/linkedin.svg" alt="LinkedIn" width={36} height={36} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}