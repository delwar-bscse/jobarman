"use client";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import CustomImage from "../../../../shared/CustomImage";
import { myFetch } from "../../../../utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "../../../../utils/revalidateTags";
import { toUnCapilizeSentence } from "../../../../utils/textFormat";
import Image from "next/image";

export default function JobCard({ job, favoratesList,fetchFavList }) {

  const handleFavorateItem = async (id) => {
    try {
      const res = await myFetch("/favourite", {
        method: "POST",
        body: { post: id },
      });

      if (res.success) {
        toast.success(res.message || "favorite item add/remove successfully");
        revalidate("favoratesList");
        fetchFavList();
      } else {
        toast.error(res.message || "Favorate list not added");
      }
    } catch (err) {
      toast.error(err.message || "Favorate Not Select Try Again");
    }
  };

  return (
    <Link
      href={!job?._id ? job?.job_url : `/jobs/${job?._id}`}
      target="_blank"
      rel="noopener noreferrer"
      className=" bg-white min-h-40 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex cursor-pointer"
    >
      {/* Left Side Image */}
      <div className="flex items-start justify-center p-2 pt-4">
        {job?.thumbnail ? <Image
          src={job?.thumbnail}
          alt={`${job.recruiter_company} image`}
          width={800}
          height={600}
          unoptimized
          className="object-contain w-28 sm:w-40 h-24 sm:h-32"
        /> :
        <p className="w-28 sm:w-40 h-24 sm:h-32 text-sm font-semibold text-gray-600">{job?.recruiter_company}</p>}
      </div>

      {/* Right Side Text and Details */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-start gap-2 flex-1">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            </div>
            <div>
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
                  className={`${favoratesList?.includes(job?._id)
                      ? "text-red-500 "
                      : "text-gray-400"
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            {job.location}
          </div>

          {/* Job Details */}
          <div className="grid lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className=" text-gray-400 text-xs font-semibold rounded">
                  {toUnCapilizeSentence(job.job_type)}
                </span>
              </div>
            </div>
            <div className="">
              {/* <Calendar1 className="text-[#FF8F27]" /> */}
              <span className="text-[#FF8C00] text-sm font-semibold rounded">
                {job?.post_date?.slice(0, 10)}
              </span>
            </div>
          </div>

          {
              <p className="text-gray-400 text-sm mt-1">
                Job Board :{" "}
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                  {job?.job_board ?? "Jobarman"}
                </span>
              </p>
            }
          <p>
            {job?.is_applied === true && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-200 text-green-700 border border-green-200">
                Applied
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
