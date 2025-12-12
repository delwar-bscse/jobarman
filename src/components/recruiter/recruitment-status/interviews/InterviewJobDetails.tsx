import { MapPin, Download, FileText } from "lucide-react";
import CancelInterview from "./CancelInterview";
import { getRemainingDays } from "utils/remainingDays";
import CustomImage from "shared/CustomImage";
import InterviewButton from "./InterviewButton";

export default function InterviewJobDetails({ data }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex gap-4 mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-red-900 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <p className="text-white text-sm font-bold">We are</p>
                <p className="text-red-500 text-2xl font-bold">Hiring</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {data?.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{data?.post?.location}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Full Time
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Remote
                </span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-orange-500 text-xl font-semibold">
              {getRemainingDays(data.createdAt)} Days Remaining
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex gap-4 mb-6">
            <CustomImage
              src={data?.user?.image}
              title="Cameron Williamson"
              className="w-20 h-20 rounded-xl object-cover"
              width={10}
              height={10}
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {data?.user?.name}
              </h3>
              <p className="text-sm text-gray-600">{data?.title}</p>
              <p className="text-sm text-gray-500">
                {data?.year_of_experience} Years Experience
              </p>
              <p className="text-sm text-gray-500">
                Schedule: 01 Oct 2025 At 09 Am
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Interview Type
            </label>
            <div className="border border-blue-500 rounded-lg p-3 flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-gray-900">
                {data?.interviewDetails?.interview_type || "No Type"}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-500" />
                {data?.resume && (
                  <span className="text-gray-900 text-sm">Resume.Pdf</span>
                )}
              </div>
              <button className="text-gray-600 hover:text-gray-900">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <CancelInterview
              item={data?._id}
              trigger={
                <div className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
                  Cancel Interview
                </div>
              }
            />

            {/* interview */}
            <InterviewButton item={data?._id} />
          </div>

          <button className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition">
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
