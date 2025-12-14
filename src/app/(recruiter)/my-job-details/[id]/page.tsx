import { myFetch } from "utils/myFetch";
import CandidateCard from "../../../../components/recruiter/Candidate-card";
import { ChevronLeft, MapPin, Briefcase, Eye, Trash2 } from "lucide-react";
import CustomImage from "shared/CustomImage";
import Link from "next/link";
import MyRequestCard from "@/components/recruiter/myRequest/MyRequestCard";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const res = await myFetch("/application/recent-applications");
  const getCompanyDetails = await myFetch(`/job-post/${id}`);

  const { title, thumbnail, location, job_type, deadline } =
    getCompanyDetails?.data;

  const deadlines = new Date(deadline);
  const today = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = deadlines.getTime() - today.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <main className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{title}</span>
          </button>
        </div>
      </div>

      {/* Job Header Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 shadow-lg p-6 sm:p-8 rounded-lg border border-gray-200">
          {/* Left Content */}
          <div className="flex gap-4">
            <CustomImage
              src={thumbnail}
              className="w-16 h-16 object-cover"
              title={title}
            />

            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {title}
              </h1>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                    <Briefcase className="w-3 h-3" />
                    {job_type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col sm:items-end gap-4">
            <div className="flex gap-2">
              <Link href={`/jobs/${id}`}>
                {" "}
                <button className="w-10 h-10 flex items-center justify-center border border-green-600 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4 text-green-600" />
                </button>
              </Link>
              <button className="w-10 h-10 flex items-center justify-center border border-red-600 rounded-lg hover:bg-gray-50 transition-colors">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 mb-1">Time Remaining</p>
              <p className="text-lg sm:text-xl font-bold text-orange-500">
                {daysDifference} Days Remaining
              </p>
            </div>
          </div>
        </div>

        {/* Stats and Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6">
          <div className="flex gap-4 sm:gap-6 text-sm">
            {/* Tab Navigation */}
            <div className="flex gap-4 sm:gap-6 border-b border-gray-200">
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 focus:text-blue-600 border-b-2 border-transparent focus:border-blue-600 transition-colors duration-200">
                100 Candidates
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 focus:text-blue-600 border-b-2 border-transparent focus:border-blue-600 transition-colors duration-200">
                70% Match
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 focus:text-blue-600 border-b-2 border-transparent focus:border-blue-600 transition-colors duration-200">
                80% Match
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 focus:text-blue-600 border-b-2 border-transparent focus:border-blue-600 transition-colors duration-200">
                90% Match
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 focus:text-blue-600 border-b-2 border-transparent focus:border-blue-600 transition-colors duration-200 hidden sm:inline">
                99% Match
              </button>
            </div>
          </div>
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
            <MyRequestCard res={res} />
          </div>
        </div>
      </div>
    </main>
  );
}
