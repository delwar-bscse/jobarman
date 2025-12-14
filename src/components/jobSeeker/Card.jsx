import React from "react";
import JobDetails from "./JobDetails";
import CustomImage from "../../../shared/CustomImage";

const statusStyles = {
  pending: "border-yellow-400 text-yellow-600",
  approved: "border-green-400 text-green-600",
  rejected: "border-red-400 text-red-600",
};

export default function Card({ data }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((job) => (
        <div
          key={job._id}
          className="rounded-xl border border-gray-200 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="p-3">
            <CustomImage
              src={job?.user?.image}
              title="We are Hiring"
              width={112}
              height={112}
              className="w-full h-28 sm:h-36 md:h-28 object-cover rounded-md"
            />
          </div>

          <div className="px-4 pb-4">
            <p className="text-base font-semibold">{job.title}</p>

            <a
              href="#"
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              {job.user.name}
            </a>

            <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
              {/* <Image
                src="/globe.svg"
                width={12}
                height={12}
                alt="location"
                className="w-4 h-4"
              /> */}
              <span>{job?.post?.location}</span>
            </div>

            <JobDetails
              job={job}
              trigger={
                <button
                  className={`mt-3 w-full rounded-md border bg-white text-xs py-1 ${
                    statusStyles[job.status]
                  }`}
                >
                  {job.status}
                </button>
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
