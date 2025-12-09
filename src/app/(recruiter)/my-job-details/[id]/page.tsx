import { myFetch } from "utils/myFetch";
import CandidateCard from "../candidate-card";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Briefcase,
  Eye,
  Trash2,
} from "lucide-react";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const res = await myFetch("/application/recent-applications");
  const getCompanyDetails = await myFetch(`/application/${id}`);

  const candidates = [
    {
      id: 1,
      name: "Ronald Richards",
      title: "Sr. UX Designer",
      match: 80,
      image: "/professional-man-portrait.jpg",
      description:
        "A dedicated and reliable professional with strong technical background and proven track record in delivering quality results.",
    },
    {
      id: 2,
      name: "Albert Flores",
      title: "Sr. UX Designer",
      match: 70,
      image: "/professional-man-portrait-2.jpg",
      description:
        "A dedicated and reliable professional with strong technical background and proven track record in delivering quality results.",
    },
  ];

  console.log("getCompanyDetails", getCompanyDetails);

  return (
    <main className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Sr. UIUX Designer</span>
          </button>
        </div>
      </div>

      {/* Job Header Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 shadow-lg p-6 sm:p-8 rounded-lg border border-gray-200">
          {/* Left Content */}
          <div className="flex gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex-shrink-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg">We</span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Sr. UIUX Designer
              </h1>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>California, United State.</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                    <Clock className="w-3 h-3" />
                    Full Time
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                    <Briefcase className="w-3 h-3" />
                    Remote
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col sm:items-end gap-4">
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center border border-green-600 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4 text-green-600" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-red-600 rounded-lg hover:bg-gray-50 transition-colors">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 mb-1">Time Remaining</p>
              <p className="text-lg sm:text-xl font-bold text-orange-500">
                20 Days Remaining
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
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
              Interview
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
              Short Listed
            </button>
          </div>
        </div>

        <div>
          {/* Candidates Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {res?.data?.map((candidate: any) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
