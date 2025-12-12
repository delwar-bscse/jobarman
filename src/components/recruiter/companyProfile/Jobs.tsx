"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CustomImage from "shared/CustomImage";

export default function Jobs({ res }) {
  const [activeJobTab, setActiveJobTab] = useState("Active Jobs");
  return (
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

      <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Job Post</h3>

      {/* Job Cards Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {res?.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4"
          >
            <CustomImage
              src={job.thumbnail}
              title={job.title}
              width={30}
              height={30}
              className="w-10 h-10 rounded-lg"
            />
            <div className="flex-1">
              <Link
                href={`/jobs/${job.id}`}
                className="text-gray-900 font-semibold hover:text-blue-600"
              >
                {job.title}
              </Link>
              <div className="text-sm mt-1">
                <Link href="#" className="text-blue-600 hover:underline">
                  {job.company}
                </Link>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>{job.location}</span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                  {job.type}
                </span>
                <span className="flex items-center text-gray-700">
                  {/* <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span> */}
                  {job.remote ? "Remote" : "Onsite"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
