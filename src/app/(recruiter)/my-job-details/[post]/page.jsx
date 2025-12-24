import { myFetch } from "utils/myFetch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import MyRequestCard from "@/components/recruiter/myRequest/MyRequestCard";
import PercentageHeader from "../PercentageHeader";
import PostJobDetails from "../PostJobDetails";

export default async function page({ params, searchParams }) {
  const { post } = await params;
  const { match } = await searchParams;

  const getCompanyDetails = await myFetch(
    `/application?post=${post}&match=${match}`
  );
  const postJobDetails = await myFetch(`/job-post/${post}`);

  return (
    <main className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">
              {postJobDetails?.data?.title}
            </span>
          </button>
        </div>
      </div>

      {/* Job Header Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* post job details header */}
        <PostJobDetails postJobDetails={postJobDetails} />

        {/* Stats and Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6">
          <PercentageHeader />
          <div className="flex gap-2">
            <Link href="/interviews">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                Interviews
              </button>
            </Link>
            <Link href="/short-list">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                Short Listed
              </button>
            </Link>
          </div>
        </div>

        <div>
          {/* Candidates Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <MyRequestCard res={getCompanyDetails} />
          </div>
        </div>
      </div>
    </main>
  );
}
