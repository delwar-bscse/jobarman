"use client";
import { Heart, MapPin, Pen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import CustomImage from "../../../../shared/CustomImage";
import CustomPagination from "@/components/cui/CustomPagination";
import { myFetch } from "../../../../utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "../../../../utils/revalidateTags";

export default function JobCard({ data, pagination, favoratesList }) {
  const handleFavorateItem = async (id) => {
    try {
      const res = await myFetch("/favourite", {
        method: "POST",
        body: { post: id },
      });

      if (res.success) {
        toast.success(res.message || "favorite item add/remove successfully");
        revalidate("favoratesList");
      } else {
        toast.error(res.message || "Favorate list not added");
      }
    } catch (err) {
      toast.error(err.message || "Favorate Not Select Try Again");
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 lg:px-0">
        {data?.map((job) => (
          <Link
            key={job._id}
            href={`/jobs/${job._id}`}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex cursor-pointer"
          >
            {/* Left Side Image */}
            <div className="w-52">
              <CustomImage
                src={job.thumbnail}
                alt={`${job.title} image`}
                width={150}
                height={150}
                className="object-cover w-40 h-40 "
                size="100vh"
              />
            </div>

            {/* Right Side Text and Details */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2 flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleFavorateItem(job?._id);
                    }}
                    className={` hover:text-red-500 transition flex-shrink-0 `}
                  >
                    <Heart
                      fill="currentColor"
                      className={`${
                        favoratesList?.includes(job?._id)
                          ? "text-red-500 "
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1 flex-shrink-0" />
                  {job.location}
                </div>

                {/* Job Details */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span className=" text-gray-400 text-xs font-semibold rounded">
                        {job.job_type}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span className=" text-gray-400 text-xs font-semibold rounded">
                        {job.type}
                      </span> */}
                    {/* </div> */}
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    {/* <Calendar1 className="text-[#FF8F27]" /> */}
                    <span className="text-[#FF8C00] text-sm font-semibold rounded">
                      {job?.deadline?.slice(0, 10)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div>
        <CustomPagination totalPages={pagination?.totalPage} />
      </div>
    </div>
  );
}
