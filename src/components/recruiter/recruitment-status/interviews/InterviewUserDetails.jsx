"use client";
import { MapPin, Download, FileText } from "lucide-react";
import CancelInterview from "./CancelInterview";
import { getRemainingDays } from "utils/remainingDays";
import CustomImage from "shared/CustomImage";
import InterviewButton from "./InterviewButton";
import Link from "next/link";
import dayjs from "dayjs";
import { myFetch } from "utils/myFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FeedbackForm from "./FeedbackCard";
export default function InterviewUserDetails({ data }) {
  const router = useRouter();

  const createChatAndRedirectToChatBox = async () => {
    const res = await myFetch(`/chat/${data?.user?._id}`, {
      method: "POST",
    });

    if (!res.data) {
      toast.error(res.message);
      return;
    }

    router.push(`/chat?id=${res?.data?._id}`);
  };
  return (
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
            Schedule: {dayjs(data?.post?.deadline).format()}
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
            <a
              href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Download />
            </a>
          </button>
        </div>
      </div>

      {data?.inteviewStatus !== "cancelled" && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <CancelInterview
            item={data?._id}
            trigger={
              <div className="flex-1 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
                Cancel Interview
              </div>
            }
          />

          {/* interview */}
          <InterviewButton item={data?._id} />
        </div>
      )}

      <button
        onClick={createChatAndRedirectToChatBox}
        className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition"
      >
        Message
      </button>

      <FeedbackForm
        id={data?._id}
        trigger={
          <button className="w-full border-2 mt-4 border-green-700 text-green-700 font-semibold py-3 rounded-lg hover:bg-blue-50 transition">
            Feedback
          </button>
        }
      />
    </div>
  );
}
