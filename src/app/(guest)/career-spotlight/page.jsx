"use client";

import { myFetch } from "../../../../utils/myFetch";
import CustomImage from "../../../../shared/CustomImage";
import Link from "next/link";
import RecentAdsModal from "@/components/guest/recentAdsModal/RecentAdsModal";
import { useEffect, useState } from "react";

export default function CareerSpotlight() {
  const [spotLights, setSpotLights] = useState([]);
  const [activeAds, setActiveAds] = useState(0);
  const [pendingAds, setPendingAds] = useState(0);
  const [stats, setStats] = useState(null);
  
  
  useEffect(() => {
    async function fetchData() {
      let url = `/spotlight`;
      if(stats) url = `/spotlight?status=${stats}`
      // console.log("URL : ",url)

      const res = await myFetch(url);
      // console.log("Spotlishts : ", res?.data)
      setSpotLights(res?.data?.spotlights);
      setActiveAds(res?.data?.stats?.activeSpotlights);
      setPendingAds(res?.data?.stats?.pendingSpotlights);
    }
    fetchData();
  }, [stats]);

  const statusStyle = (s) =>
    s === "pending"
      ? "border border-green-200 bg-green-100 text-green-700"
      : "border border-orange-200 bg-orange-100 text-orange-700";

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Header */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Career Spotlight
            </h1>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div onClick={()=>setStats("approved")} className="rounded-xl border border-green-200 bg-green-50 hover:bg-green-100 transition-colors duration-300 p-6 flex items-center justify-center cursor-pointer">
              <div>
                <p className="text-4xl font-bold text-green-600 ml-9">
                  {activeAds}
                </p>
                <p className="mt-2 font-medium text-gray-800">Active Ads</p>
              </div>
            </div>
            <div onClick={()=>setStats("pending")} className="rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors duration-300 p-6 flex items-center justify-center cursor-pointer">
              <div>
                <p className="text-4xl font-bold text-orange-500 ml-9">
                  {pendingAds}
                </p>
                <p className="mt-2 font-medium text-gray-800">
                  Pending Approval
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Add */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Add
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotLights?.map((ad) => (
              <div
                key={ad?._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <RecentAdsModal
                  ad={ad}
                  trigger={
                    <div>
                      <CustomImage
                        src={ad.cover_image}
                        alt={ad.title}
                        width={100}
                        height={40}
                        className="w-full h-40 object-cover cursor-pointer"
                      />
                    </div>
                  }
                />
                <div className="p-4 flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold">
                      {ad.organization_name}
                    </p>
                    <p className="text-sm text-gray-700">{ad.focus_area}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-lg whitespace-nowrap ${statusStyle(
                      ad.status
                    )}`}
                  >
                    {ad.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <Link href="/career-spotlight-form">
              <button className="px-10 py-3 bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white rounded-lg font-semibold">
                Create Add
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
