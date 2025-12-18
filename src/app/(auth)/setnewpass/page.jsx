"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next/client";
import { myFetch } from "../../../../utils/myFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SetNewPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie("token");
    const res = await myFetch("/auth/reset-password", {
      method: "POST",
      token,
      body: { newPassword: password, confirmPassword: confirmPassword },
    });

    if (res?.success) {
      deleteCookie("token");
      router.push("/login");
    } else {
      toast.success(res?.message ?? "Password Reset Failed");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-4">
      {/* Back Button */}
      <Link
        href="/otp"
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
              src="/reset.svg"
              alt="Jobarman Logo"
              width={425}
              height={585}
              className="mb-6"
            />
          </div>

          {/* Right Side - Form */}
          <div className="flex flex-col w-[617px] justify-center p-8 text-center border-2 border-[#ACBDF0] rounded-lg">
            <h2 className="text-4xl text-[#123499] font-semibold text-center mb-8">
              Set New Password
            </h2>
            <p className="text-center font-medium text-[#2F2F2F] mb-6">
              Create a strong new password to secure your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div>
                <label className="block text-start text-gray-700 mb-2">
                  New Password
                </label>
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
                    {showPassword ? (
                      <Eye className="w-7 h-7" />
                    ) : (
                      <EyeOff className="w-7 h-7" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-start text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#123499] transition"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-7 h-7" />
                    ) : (
                      <EyeOff className="w-7 h-7" />
                    )}
                  </button>
                </div>
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className="w-full bg-[#0F38B2] text-2xl hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center relative">
            {/* Close Button (Cross) */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Success SVG */}
            <Image
              src="/congo.svg"
              alt="Success"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />

            {/* Modal Content */}
            <h3 className="text-2xl font-semibold text-[#123499] mb-4">
              Congratulations!
            </h3>
            <p className="text-[#2F2F2F] mb-6">
              Your password has been updated. Start using the app now.
            </p>
            <Link href="/login">
              <button className="w-full bg-[#0F38B2] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105">
                Proceed to Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
