/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { MapPin, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RecruiterSidebar from "@/components/cui/RecruiterSidebar";
import { myFetch } from "../../../../../utils/myFetch";
import { formatUrl } from "../../../../../utils/formatUrl";
import { toCapitalizeSentence } from "../../../../../utils/textFormat";
import CustomImage from "../../../../../shared/CustomImage";

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [activeJobTab, setActiveJobTab] = useState("Active Jobs");
  const [profileData, setProfileData] = useState(null);

  const [galleryPreview, setGalleryPreview] = useState([]);

  const jobs = [
    {
      id: 1,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 2,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 3,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 4,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 5,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 6,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
  ];

  const fetchProfile = async () => {
    const res = await myFetch(`/user/profile`);
    console.log("profile get res :", res.data);
    setProfileData(res.data);
  };

  const fetchGallery = async () => {
    const res = await myFetch(`/user/gallery`);
    console.log("gallery get res :", res.data);

    if (res.data) {
      const oldGallery = res.data.map((item) => {
        return {
          id: item._id,
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
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <RecruiterSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="max-w-5xl mx-auto">
            {/* Company Header Image */}
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              <CustomImage
                src={formatUrl(profileData?.cover)}
                alt="Company Office"
                width={1200}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setActiveTab("Home")}
                className={`px-8 py-2.5 rounded-lg font-semibold transition-colors ${
                  activeTab === "Home"
                    ? "bg-[#FF8C00] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("About")}
                className={`px-8 py-2.5 rounded-lg font-semibold transition-colors ${
                  activeTab === "About"
                    ? "bg-[#FF8C00] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("Jobs")}
                className={`px-8 py-2.5 rounded-lg font-semibold transition-colors ${
                  activeTab === "Jobs"
                    ? "bg-[#FF8C00] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Jobs
              </button>
            </div>

            {/* Tab Content */}
            <div className="w-full max-w-[1000px] mx-auto">
              {activeTab === "Home" && (
                <div className="space-y-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Overview
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {profileData?.company_overview}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">
                        Gallery
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                        {galleryPreview.map((item) => (
                          <div
                            key={item.id}
                            className="aspect-square rounded-lg overflow-hidden"
                          >
                            <Image
                              src={item.image}
                              alt={`Gallery Image ${item.id}`}
                              width={150}
                              height={150}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "About" && (
                <>
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        About Us
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {profileData?.about_us}
                      </p>
                    </div>

                    <div className="">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Mission
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {profileData?.mission}
                      </p>
                    </div>

                    {/* Company History */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Company History
                      </h3>
                      <div>
                        {typeof profileData?.overview === "object" &&
                          Object.entries(profileData?.overview)?.map(
                            ([key, value]) => {
                              if (!value) return null;
                              if (key === "_id") return null;
                              return (
                                <div key={key} className="flex gap-2">
                                  <h3 className="text-gray-800 leading-relaxed w-40">
                                    {toCapitalizeSentence(key)}
                                  </h3>
                                  <p className="text-gray-700 leading-relaxed">
                                    : {value}
                                  </p>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Contact Information
                      </h3>
                      <div>
                        {typeof profileData?.overview === "object" &&
                          Object.entries(profileData?.contactInfo)?.map(
                            ([key, value]) => {
                              if (!value) return null;
                              if (key === "_id") return null;
                              return (
                                <div key={key} className="flex gap-2">
                                  <h3 className="text-gray-800 leading-relaxed w-20">
                                    {toCapitalizeSentence(key)}
                                  </h3>
                                  <p className="text-gray-700 leading-relaxed">
                                    : {value}
                                  </p>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Jobs" && (
                <div className="col-span-2">
                  {/* Active/Close Jobs Toggle */}
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setActiveJobTab("Active Jobs")}
                      className={`flex-1 font-semibold py-3 rounded-full transition-colors ${
                        activeJobTab === "Active Jobs"
                          ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Active Jobs
                    </button>
                    <button
                      onClick={() => setActiveJobTab("Close Jobs")}
                      className={`flex-1 font-semibold py-3 rounded-full transition-colors ${
                        activeJobTab === "Close Jobs"
                          ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Close Jobs
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Recent Job Post
                  </h3>

                  {/* Job Cards Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <div className="flex">
                          {/* Job Image */}
                          <div className="w-32 flex-shrink-0">
                            <Image
                              src={job.image}
                              alt={job.title}
                              width={128}
                              height={160}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Job Details */}
                          <div className="flex-1 p-4 relative">
                            {/* Action Icons */}
                            <div className="absolute top-3 right-3 flex gap-2">
                              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">
                                <MapPin className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">
                                <Trash className="w-4 h-4 text-red-600" />
                              </button>
                            </div>

                            <h4 className="text-base font-bold text-gray-900 mb-1 pr-20">
                              {job.title}
                            </h4>
                            <p className="text-sm text-[#147FC7] font-semibold mb-2">
                              {job.company}
                            </p>

                            <div className="flex items-center text-xs text-gray-600 mb-3">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  <span className="text-gray-400 text-xs font-medium">
                                    {job.type}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                  <span className="text-gray-400 text-xs font-medium">
                                    {job.workMode}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[#FF8C00] text-xs font-semibold">
                                {job.daysRemaining}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Edit Profile Button */}
            <div className="w-full flex items-center justify-center">
              {activeTab === "Home" && (
                <Link href="/profile/edit-home">
                  <button className="w-[240px] mt-8 bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg">
                    Edit Profile
                  </button>
                </Link>
              )}
              {activeTab === "About" && (
                <Link href="/profile/edit-about">
                  <button className="w-[240px] mt-8 bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg">
                    Edit Profile
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
