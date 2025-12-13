import { MapPin } from "lucide-react";
import { getRemainingDays } from "utils/remainingDays";
import InterviewUserDetails from "./InterviewUserDetails";
import InterviewRejectUserDetails from "./InterviewRejectUserDetails";

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
        {data?.status === "INTERVIEW" && <InterviewUserDetails data={data} />}
        {data?.status === "REJECTED" && (
          <InterviewRejectUserDetails data={data} />
        )}
      </div>
    </div>
  );
}
