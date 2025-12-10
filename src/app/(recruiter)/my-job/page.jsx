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
          <Link href="/post-insight">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Post Insight
            </button>
          </Link>
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
    </div>
  );
};

export default JobPost;
