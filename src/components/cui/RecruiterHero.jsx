import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Plus,
  Search
} from "lucide-react";

export default function RecruiterHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 py-16 sm:py-24 lg:py-28 min-h-[calc(100vh-90px)] flex items-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* AI Recruitment Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 text-[#123499] text-xs sm:text-sm font-semibold tracking-wide w-fit mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>AI-Powered Talent Matching for Employers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight sm:leading-tight lg:leading-[1.15] mb-6 text-balance">
              Find Your Perfect Match in{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#123499] to-[#2A57DE]">
                Talent & Opportunity
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl text-balance leading-relaxed">
              Connect with verified candidates faster through Jobarman's advanced, AI-driven recruitment and screening tools designed for IT & Healthcare.
            </p>

            {/* Action Buttons (CTAs) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Link
                href="/job-post"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#1b43bc] hover:to-[#3b6bf5] text-white text-base font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Post a New Job
              </Link>
              <Link
                href="/seeker-resume"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-base font-semibold shadow-sm hover:shadow hover:border-slate-300 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Search className="w-5 h-5 text-slate-500" />
                Browse Candidates
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/80">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">10k+</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Active Talents</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">98%</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Match Accuracy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">24h</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Avg. Time to Hire</div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Illustration */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl flex items-center justify-center p-4">
              {/* Ambient background glow behind the illustration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl transform rotate-6 scale-90 pointer-events-none" />
              
              <div className="relative w-full h-auto transition-all duration-500 hover:scale-[1.02] hover:translate-y-[-4px]">
                <Image
                  src="/recruiter_hero.png"
                  alt="AI Recruitment Matching Illustration"
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(30,64,175,0.15)]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

