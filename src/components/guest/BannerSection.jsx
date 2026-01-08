import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  TrendingUp,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AutoApply from "./score-board/AutoApply";

export default function BannerSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#E1F6FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_3fr] gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm sm:text-base font-semibold text-orange-500 mb-2">
              AI-Powered Job Matching
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-snug sm:leading-tight lg:leading-tight text-balance">
              Land Your Dream Job
              <br />
              In <span className="text-blue-600">IT</span> &{" "}
              <span className="text-orange-500">Healthcare</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 text-balance">
              Our AI matches you with relevant IT and healthcare roles, so you can focus on opportunities that truly fit your skills and career goals.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 text-balance">
              Jobarman brings together IT and healthcare jobs from trusted employers and leading platforms, so you can search smarter, discover more opportunities, and apply with confidence from one place.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 text-balance">
              Apply directly on Jobarman for supported roles, or securely continue to the employer’s official website to complete your application—no guesswork, no wasted time.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 text-balance">
              Auto-Apply is currently available for jobs posted directly on Jobarman. External job listings may require you to complete your application on the employer’s website.

            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <AutoApply />
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm lg:text-base">
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
                <span>AI Job Matching</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <BadgeCheck className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                <span>Verified Company</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500" />
                <span>Fast Application</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-teal-500" />
                <span>Career Growth</span>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="">
            <Image
              src="/groupHome.svg"
              alt="Banner"
              width={1300}
              height={1100}
              className="rounded-lg w-full h-auto max-w-xs sm:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
