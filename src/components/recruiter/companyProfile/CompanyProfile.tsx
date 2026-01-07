/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RecruiterSidebar from "@/components/cui/RecruiterSidebar";

import Jobs from "@/components/recruiter/companyProfile/Jobs";
import Home from "@/components/recruiter/companyProfile/Home";
import About from "@/components/recruiter/companyProfile/About";
import BannerHero from "@/components/recruiter/companyProfile/BannerHero";
import { myFetch } from "utils/myFetch";
import { formatUrl } from "utils/formatUrl";
import { toCapitalizeSentence } from "../../../../utils/textFormat";

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [profileData, setProfileData] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);

  const fetchProfile = async () => {
    const res = await myFetch(`/user/profile`);
    setProfileData(res.data);
  };

  const fetchGallery = async () => {
    const res = await myFetch(`/user/gallery`);

    if (res.data) {
      const oldGallery = res.data.map((item) => {
        return {
          id: item?._id,
          image: formatUrl(item.image),
        };
      });

      setGalleryPreview(oldGallery);
    }
  };

  useEffect(() => {
    fetchGallery();
    fetchProfile();
  }, []);

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-4">
      <div className="flex-1 px-4 lg:px-0">
        <div className="">
          {/* Company Header Image */}
          <div className="relative lg:h-64 lg:mb-6 rounded-lg overflow-hidden">
            <BannerHero />
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {["Home", "About", "Jobs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-lg font-semibold transition-colors ${activeTab === tab
                    ? "bg-[#FF8C00] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full max-w-[1000px] mx-auto">
            {activeTab === "Home" && (
              <Home
                profileData={profileData}
                galleryPreview={galleryPreview}
              />
            )}

            {activeTab === "About" && (
              <About
                profileData={profileData}
                toCapitalizeSentence={toCapitalizeSentence}
              />
            )}

            {activeTab === "Jobs" && <Jobs />}
          </div>

          {/* Edit Profile Button */}
          <div className="w-full flex items-center justify-center">
            {activeTab === "Home" && (
              <Link href="/profile/edit-home">
                <button className="w-[240px] mt-8 bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg">
                  Edit Home
                </button>
              </Link>
            )}
            {activeTab === "About" && (
              <Link href="/profile/edit-about">
                <button className="w-[300px] sm:w-[240px] mt-8 bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg">
                  Edit About
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
