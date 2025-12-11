"use client";

import { useState } from "react";
import Link from "next/link";
import RecruiterSidebar from "@/components/cui/RecruiterSidebar";
import About from "./About";
import Home from "./Home";
import Jobs from "./Jobs";
import BannerHero from "./BannerHero";

export default function CompanyProfilePage({ res }) {
  const [activeTab, setActiveTab] = useState("Home");

  const companyInfo = {
    aboutUs:
      "Dependopolis Is A Full-Service Integrated Marketing Agency Specializing In 360-Degree Marketing, Branding, Digital Transformation, And Digital Presence. Since 2021, We Have Partnered With Businesses To Create Tailored Strategies That Drive Sustainable Growth. Our Approach Combines Marketing Expertise With Innovative Digital Solutions, Translating Business Objectives Into Measurable Results. We Work With Both Emerging Ventures And Established Brands, Offering A Comprehensive Suite Of Services Designed To Enhance Brand Impact And Market Positioning.",
    specialties:
      "Brand And Creative, Branding & Identity, Digital Presence, Integrated Marketing, Digital Marketing",
    industry: "Marketing",
    companySize: "11-50 employees",
    headquarters: "Dhaka",
    type: "Public Company",
    founded: "2021",
    specialtiesList: "Digital Marketing, Paid Ads, Branding, and Creative",
  };

  return (
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <RecruiterSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="max-w-5xl mx-auto">
            {/* Company Header Image with Navigation */}
            <BannerHero />

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
              {["Home", "About", "Jobs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-lg font-semibold transition-colors ${
                    activeTab === tab
                      ? "bg-[#FF8C00] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div
              className="grid gap-8"
              style={{ gridTemplateColumns: "536px 1fr" }}
            >
              {activeTab === "Home" && <Home companyInfo={companyInfo} />}

              {activeTab === "About" && <About companyInfo={companyInfo} />}

              {activeTab === "Jobs" && <Jobs res={res} />}
            </div>

            {/* Edit Profile Button */}
            <Link href="/profile/edit-home">
              <button className="w-full mt-8 bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
