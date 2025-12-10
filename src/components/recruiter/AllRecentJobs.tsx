"use client";
import { ArrowBigRight, Calendar, ChevronLeft, MapPin } from "lucide-react";
import Link from "next/link";
import CustomPagination from "@/components/cui/CustomPagination";
import CustomImage from "shared/CustomImage";

export default function AllRecentJobs({ data }) {
  return (
    <div className="max-w-7xl mx-auto py-9">
      <div
        className="flex items-center mb-3 cursor-pointer"
        onClick={() => history.back()}
      >
        <ChevronLeft />
        <h1 className="text-2xl text-blue-600 font-medium ">All Jobs</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4"
          >
            <CustomImage
              src={job.thumbnail}
              title={job.title}
              width={30}
              height={30}
              className="w-32 h-32 rounded-lg"
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
                <span className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full inline-block mr-2"></span>
                  {job.job_type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
