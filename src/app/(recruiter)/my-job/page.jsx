import Link from "next/link";
import React from "react";
import { myFetch } from "../../../../utils/myFetch";
import JobPostCard from "@/components/cui/PostCard";
import { Search } from "lucide-react";
import MyJobTop from "./MyJobTop";

const JobPost = async ({ searchParams }) => {
  const {searchTerm} = await searchParams;
  console.log("My Job SearchTerm : ", searchTerm)
  let url = "/job-post/feed/user";
  if(searchTerm) url = `/job-post/feed/user?searchTerm=${searchTerm}`
  const res = await myFetch(url, {
    method: "GET",
    tags: ["job-post"],
  });

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <MyJobTop />
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
