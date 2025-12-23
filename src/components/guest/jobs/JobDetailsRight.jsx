"use client";
import React, { useEffect, useMemo, useState } from "react";
import CustomImage from "../../../../shared/CustomImage";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { myFetch } from "../../../../utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "../../../../utils/revalidateTags";
import JobApplyModal from "./JobApplyModal";

export default function JobDetailsRight({ details }) {
  const [favoriteList, setFavoriteList] = useState(null);
  const [refreshFav, setRefreshFav] = useState(false);
  const [profile, setProfile] = useState(null);

  const favoratesList = useMemo(
    () => favoriteList?.map((item) => item.post._id),
    [favoriteList]
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/user/profile");
      setProfile(res?.data);
    };

    fetchData();
  }, []);

  // get favorate data
  useEffect(() => {
    const fetchFavoriateList = async () => {
      try {
        const res = await myFetch("/favourite", {
          tags: ["favoratesList"],
        });
        setFavoriteList(res?.data);
      } catch (error) {
        console.error("Failed to fetch favorite list:", error);
      }
    };

    fetchFavoriateList();
  }, [refreshFav]);

  const handleFavorateItem = async (id) => {
    try {
      const res = await myFetch("/favourite", {
        method: "POST",
        body: { post: id },
      });

      if (res.success) {
        toast.success(res.message || "favorite item add/remove successfully");
        setRefreshFav((prev) => !prev);
        revalidate("favoratesList");
      } else {
        toast.error(res.message || "Favorate list not added");
      }
    } catch (err) {
      toast.error(err.message || "Favorate Not Select Try Again");
    }
  };
  return (
    <div className="lg:col-span-2">
      {/* Job Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Logo + Title + Pills */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-gray-200">
              <CustomImage
                src={details?.recruiter?.image}
                title={`${details?.title} logo`}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {details?.title}
              </h1>
              <div className="mt-1 text-sm">
                <span className="text-gray-600">at</span>{" "}
                <Link
                  href={`#`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  {details?.recruiter?.name}
                </Link>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                  Job Type :
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                  {details?.job_type}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Save + Apply */}
          {profile?.role === "EMPLOYEE" && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleFavorateItem(details?._id)}
                className="rounded-full border border-gray-300 w-10 h-10 grid place-items-center hover:bg-gray-100"
              >
                <Heart
                  fill={
                    favoratesList?.includes(details?._id)
                      ? "currentColor"
                      : "none"
                  }
                  className={
                    favoratesList?.includes(details?._id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }
                />
              </button>

              <JobApplyModal
                details={details}
                trigger={
                  <span className="px-5 py-2 bg-blue-600 text-white text-nowrap rounded-lg hover:bg-blue-700 transition font-semibold inline-flex items-center gap-2">
                    Apply Now <ArrowRight size={18} />
                  </span>
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Job Description
        </h2>
        <p className="text-gray-700 leading-relaxed">{details?.description}</p>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
        <ul className="space-y-2">
          {details?.required_skills.map((req, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Responsibilities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Responsibilities
        </h2>
        <ul className="space-y-2">
          {/* {job.responsibilities.map((resp, index) => ( */}
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">description</span>
          </li>
          {/* ))} */}
        </ul>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Benefits & Perks
        </h2>
        <li className="flex items-start gap-2">
          <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
          <span className="text-gray-700">description</span>
        </li>
      </div>
    </div>
  );
}
