import {
  Briefcase,
  Calendar,
  DollarSign,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { idRecruiter } from "../../../../utils/matchUserRole";

export default async function JobsDetailsLeft({ details }) {
  return (
    <div className="lg:col-span-1">
      {/* Profile Match + Location */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-2 divide-x">
          <div className="pr-6">
            <p className="text-base font-medium text-gray-800">Profile Match</p>
            <p className="text-2xl font-bold text-green-600 mt-1">70%</p>
          </div>
          <div className="pl-6 flex flex-col items-center text-center">
            <MapPin size={28} className="text-blue-600 mb-2" />
            <p className="text-base font-medium text-gray-800">Job Location</p>
            <p className="text-gray-600 mt-1">{details?.location}</p>
          </div>
        </div>
      </div>

      {/* Job Overview */}
      <div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Job Overview</h3>
          {/* Top row: 3 columns */}
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="flex flex-col items-start p-3">
              <Calendar size={24} className="text-blue-600 mb-2" />
              <span className="text-gray-600">Job Expire In:</span>
              <span className="font-semibold text-gray-900">
                {details?.deadline?.slice(0, 10)}
              </span>
            </div>
            <div className="flex flex-col items-start p-3">
              <Briefcase size={24} className="text-blue-600 mb-2" />
              <span className="text-gray-600">Job Level:</span>
              <span className="font-semibold text-gray-900">
                {details?.job_level}
              </span>
            </div>
          </div>
          {/* Bottom row: 2 columns */}
          <div className="mt-4 grid grid-cols-2 gap-8 text-sm">
            <div className="flex flex-col items-start p-3">
              <DollarSign size={24} className="text-blue-600 mb-2" />
              <span className="text-gray-600">Salary</span>
              <span className="font-semibold text-gray-900">
                ${details?.min_salary}- ${details?.max_salary}
              </span>
            </div>
            <div className="flex flex-col items-start p-3">
              <GraduationCap size={24} className="text-blue-600 mb-2" />
              <span className="text-gray-600">Education</span>
              <span className="font-semibold text-gray-900">Graduation</span>
            </div>
          </div>
        </div>
        {(await idRecruiter()) && (
          <Link
            href={`/job-post?id=${details?._id}`}
            className="block bg-green-600 w-full text-white font-semibold py-3 px-4 rounded-lg text-center"
          >
            Edit Job Post
          </Link>
        )}
      </div>
    </div>
  );
}
