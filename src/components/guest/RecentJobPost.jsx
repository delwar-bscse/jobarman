import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { myFetch } from "../../../utils/myFetch";
import JobPostCard from "@/components/cui/PostCard";

export default async function RecentJobPost() {
  const res = await myFetch("/job-post/recent-posts");
  console.log("Recent Jobs : ", res.data);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3 text-balance">
          Recent Job Post
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-balance">
          Discover Jobs That Truly Match Your Skills And Goals. Connect With Top
          Employers And Take The Next Step In Your Career Effortlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {res?.data?.map((job) => (
            <JobPostCard key={job._id} job={job} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/all-jobs">
            <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center gap-2">
              Brows All
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
