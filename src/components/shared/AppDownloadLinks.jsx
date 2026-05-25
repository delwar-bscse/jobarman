"use client";

import { useState } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Smartphone, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AppDownloadLinks() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      {/* App Store Buttons */}
      <div className="space-y-3 mb-8">
        <a
          href="#"
          onClick={handleClick}
          className="flex items-center gap-3 bg-white text-gray-900 rounded-xl px-4 py-3 hover:bg-gray-50 shadow-sm transition-colors duration-200 cursor-pointer"
        >
          <FaApple className="w-6 h-6 text-gray-900" />
          <div className="text-left">
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Download On The</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900">Apple Store</p>
          </div>
        </a>

        <a
          href="#"
          onClick={handleClick}
          className="flex items-center gap-3 bg-white text-gray-900 rounded-xl px-4 py-3 hover:bg-gray-50 shadow-sm transition-colors duration-200 cursor-pointer"
        >
          <FaGooglePlay className="w-6 h-6 text-gray-900" />
          <div className="text-left">
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Get it On</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900">Google Play</p>
          </div>
        </a>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-gray-100 rounded-3xl p-8 overflow-hidden shadow-2xl">
          {/* Accent Blobs for premium glassmorphism/gradient feel */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Animated Icon Container */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/35 transform hover:rotate-6 transition-transform duration-300">
                <Smartphone className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-white rounded-full p-1.5 shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Title & Description */}
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Coming Soon!
              </DialogTitle>
              <p className="text-sm sm:text-base text-gray-500 max-w-sm leading-relaxed">
                We're currently developing our official mobile app to provide a faster, more seamless experience on iOS and Android devices.
              </p>
            </DialogHeader>

            {/* Feature Teasers */}
            <div className="w-full bg-gray-50/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 my-6 space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold mt-0.5 flex-shrink-0">✓</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Instant Push Notifications</p>
                  <p className="text-xs text-gray-500 leading-normal">Get notified instantly about job applications, interview updates, and messages.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold mt-0.5 flex-shrink-0">✓</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">One-Tap Job Search & Apply</p>
                  <p className="text-xs text-gray-500 leading-normal">Browse thousands of local jobs and apply directly with your saved resume on the go.</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all duration-150"
            >
              Great, I'll wait!
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
