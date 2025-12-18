/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const jobData = {
  title: "Sr. UI/UX Designer",
  company: "UX Analysis Company Ltd.",
  location: "San Francisco",
  progress: "95%",
  status: "Applying",
  image: "/job.png", // update with your image path
};

export default function JobList({ autoApplyData }) {
  // Create an array of 5 copies of jobData
  const jobsArray = Array.from({ length: 5 }, () => ({ ...jobData }));

  useEffect(() => {
    console.log("Auto apply data in Component : ", autoApplyData);
  }, []);

  return (
    <div className="space-y-4">
      {autoApplyData.map((job, index) => (
        <div
          key={index}
          className="w-full bg-white rounded-xl shadow-sm p-4 my-8 flex items-center justify-between gap-4"
        >
          {/* Job Image */}
          <div className="sm:flex sm:space-x-4">
            <Image
              src="/auto-process.png"
              alt="Job"
              width={70}
              height={70}
              className="rounded-md"
            />

            <div className="">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.companyName}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-end gap-2">
            <p className="text-lg font-bold">{job.jobMatch || 0}%</p>
            <button className="bg-[#123499] text-white text-sm px-5 py-2 rounded-full">
              Applied
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
