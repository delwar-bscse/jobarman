"use client";

import { Heart, MapPin, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarProfile from "@/components/jobSeeker/profile/Sidebar";

export default function FavoriteListPage({ data }) {
  console.log("favorate data", data);
  return (
    <div className="w-full bg-[#FBFBFB]">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto -mb-10 pt-10">
        <Link href="/profile/myProfile">
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-5 h-5" />
          </div>
        </Link>
      </div>

      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <SidebarProfile />

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="max-w-5xl mx-auto">
            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Card 1 */}
              {data?.map((item) => (
                <div
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex"
                  key={item?._id}
                >
                  <div className="w-52">
                    <Image
                      src="/cardpic.png"
                      alt="Sr. UX Designer image"
                      width={150}
                      height={150}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-start gap-2 flex-1">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {item?.post?.title}
                            </h3>
                            <p className="text-sm text-gray-600">Design Lab</p>
                          </div>
                        </div>
                        <div className="text-red-500">
                          <Heart size={20} fill="currentColor" />
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin size={16} className="mr-1 flex-shrink-0" />
                        {item?.post?.location}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <div className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            <span className="text-gray-400 text-xs font-semibold rounded">
                              {item?.post?.job_type}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* <span className="w-3 h-3 bg-blue-500 rounded-full"></span> */}
                            <span className="text-gray-400 text-xs font-semibold rounded">
                              {item?.post?.min_salar} {item?.max_salar}
                            </span>
                          </div>
                        </div>
                        <div>
                          <Image
                            src="/calendar.svg"
                            alt="Calendar icon"
                            width={13}
                            height={16}
                            className="mr-1 inline-block"
                          />
                          <span className="text-[#FF8C00] text-xs font-semibold rounded">
                            {item?.deadline?.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
