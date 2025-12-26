import Link from "next/link";
import React from "react";
import { myFetch } from "../../../../utils/myFetch";
import JobPostCard from "@/components/cui/PostCard";

const JobPost = async () => {
  const res = await myFetch("/job-post/feed/user", {
    method: "GET",
    tags: ["job-post"],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* <div className="my-6">
        <h2 className="text-2xl font-bold">My Job Post</h2>
        <Status />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {res?.data?.length > 0 ? (
          res?.data?.map((job) => (
            <Link href={`/my-job-details/${job?._id}`} key={job?._id}>
              <JobPostCard job={job} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No data found
          </p>
        )}
      </div>
    </div>
  );
};

export default JobPost;
