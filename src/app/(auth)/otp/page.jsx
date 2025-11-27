"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { myFetch } from "../../../../utils/myFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
    }
  };

  const resendOTP = async () => {
    const res = await myFetch("/auth/forget-password", {
      method: "POST",
      body: { email: localStorage.getItem("registeredEmail") },
    });

    if (res?.data) {
      toast.success("OTP Resent Successfully");
    } else {
      toast.success(res?.message ?? "Resend OTP Failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("registeredEmail");

    const res = await myFetch("/auth/verify-email", {
      method: "POST",
      body: { email, oneTimeCode: Number(otp.join("")) },
    });

    if (res?.success && res?.data) {
      localStorage.removeItem("registeredEmail");
      router.push("/setnewpass");
    } else if (res?.success) {
      localStorage.removeItem("registeredEmail");
      router.push("/login");
    } else {
      toast.success(res?.message ?? "OTP Verification Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-4">
      {/* Back Button */}
      <Link
        href="/forgot"
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
              src="/otp.svg"
              alt="Jobarman Logo"
              width={425}
              height={585}
              className="mb-6"
            />
          </div>

          {/* Right Side - OTP Form */}
          <div className="flex flex-col justify-center p-8 text-center md:text-left border-2 border-[#ACBDF0] rounded-lg">
            <h2 className="text-4xl text-[#123499] font-semibold text-center mb-8">
              OTP Verification
            </h2>
            <p className="text-center font-medium text-[#2F2F2F] mb-6">
              OTP Code has been sent to your registered email
            </p>

            {/* OTP Input Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-16 h-16 text-center text-lg font-medium border-2 border-[#ACBDF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                ))}
              </div>

              {/* Resend OTP */}
              <p className="text-end mb-6 text-gray-500">
                Didn &nbsp; t receive a code?{" "}
                <span
                  onClick={() => resendOTP()}
                  className="text-[#0F38B2] font-semibold hover:underline cursor-pointer"
                >
                  Resend
                </span>
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#123499] hover:bg-[#0F38B2] text-white font-semibold py-4 mt-4 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
