"use client";
import { ChevronLeft } from "lucide-react";
import CustomImage from "shared/CustomImage";
import CandidateMatch from "./CandidateMatch";

export default function MyRequest({ res }) {
  return (
    <div className="max-w-7xl mx-auto my-9">
      <div
        className="flex items-center mb-3 cursor-pointer"
        onClick={() => history.back()}
      >
        <ChevronLeft />
        <h1 className="text-2xl text-blue-600 font-medium ">All Request</h1>
      </div>

      <CandidateMatch />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {res?.data?.map((item) => (
          <div
            key={item._id}
            className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4 items-start"
          >
            <CustomImage
              src={item.user.image}
              title={item.user.name}
              width={10}
              height={10}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-gray-900 font-semibold">{item.user.name}</p>
              <p className="text-sm text-gray-700">{item.user.designation}</p>
              <p className="text-xs text-gray-500">{item.year_of_experience}</p>
              <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                {item.user.bio}
              </p>
            </div>
            <span className="absolute top-4 right-4 text-xs font-semibold text-green-600">
              {item.jobMatch}% Match
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
