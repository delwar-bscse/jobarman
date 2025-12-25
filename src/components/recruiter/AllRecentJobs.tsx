"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import JobPostCard from "../cui/PostCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function AllRecentJobs({ data }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { replace } = useRouter();
  const status = searchParams.get("status") || "active";

  const handleCloseJob = () => {
    const newStatus = status === "active" ? "closed" : "active";
    params.set("status", newStatus);
    replace(`?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-9 space-y-4">
      <div className="flex justify-between">
        <div
          className="flex items-center mb-3 cursor-pointer"
          onClick={() => history.back()}
        >
          <ChevronLeft />
          <p className="text-2xl text-blue-600 font-medium ">All Jobs</p>
        </div>
        <button
          type="button"
          onClick={handleCloseJob}
          className={`border-2  rounded-sm px-4 py-2 flex items-center font-semibold transition-colors duration-300 cursor-pointer ${
            status === "closed"
              ? "bg-red-400 text-gray-50 border-red-400"
              : "hover:bg-gray-100 text-gray-400 border-gray-300"
          }`}
        >
          Close Jobs
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((job) => (
          <Link href={`/my-job-details/${job?._id}`} key={job?._id}>
            <JobPostCard job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
}
