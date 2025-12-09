import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import CustomImage from "../../../../shared/CustomImage";
import { myFetch } from "../../../../utils/myFetch";

const JobPost = async () => {
  const res = await myFetch("/job-post/recent-posts");

  console.log("res", res);
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="my-6">
        <h2 className="text-2xl font-bold">My Job Post</h2>
        <div className="flex space-x-4 mt-5 md:mt-5">
          {/* Secondary Button */}
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition">
            Interview
          </button>

          {/* Secondary Button */}
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition">
            Short Listed
          </button>

          {/* Primary Button */}
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Post Insight
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {res?.data?.map((job) => (
          <Link href={`/my-job-details/${job._id}`} key={job._id}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4">
              <CustomImage
                src={job.thumbnail}
                title={job.title}
                width={30}
                height={30}
                className="w-32 h-32 rounded-lg"
              />
              <div className="flex-1">
                <h1 className="text-gray-900 font-semibold hover:text-blue-600">
                  {job.title}
                </h1>
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
          </Link>
        ))}
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobData.map((job, index) => (
          <Link
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
            key={index}
          >
            <div className="job-image">
              <img src="cardpic.png" alt="Job" className="w-full h-auto" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-600">{job.location}</p>
              <div className="flex space-x-2 mt-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {job.type}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {job.remote}
                </span>
              </div>
              <p className="text-orange-500 font-bold mt-2">
                {job.daysRemaining}
              </p>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default JobPost;
