/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CancelInterview from "../recruiter/recruitment-status/interviews/CancelInterview";
import InterviewScheduleModal from "../recruiter/recruitment-status/InterviewSheduleModal";
import { myFetch } from "../../../utils/myFetch";
import { toast } from "sonner";
import RejectInterView from "../recruiter/recruitment-status/interviews/RejectInterView";
import { revalidate } from "../../../utils/revalidateTags";

const ActionButtons = ({ applicationDetails }) => {
  const router = useRouter();

  const handleShortListed = async () => {
    try {
      const res = await myFetch(`/application/${applicationDetails?._id}`, {
        method: "PATCH",
        body: { status: "SHORTLISTED" },
      });

      if (res?.success) {
        toast.success(res?.message || "Application shortlisted successfully");
        await revalidate("application-details");
      } else {
        toast.error(res.message || "failed");
      }
    } catch (error) {
      toast.error(error.message || "failed");
    }
  };

  const handleMessage = async () => {
    try {
      const res = await myFetch(`/chat/${applicationDetails?.user?._id}`, {
        method: "POST",
      });

      if (res?.success) {
        router.push(`/chat?id=${res?.data?._id}`);
      } else {
        toast.error(res.message || "failed");
      }
    } catch (error) {
      toast.error(error.message || "failed");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-4">
      <div
        className={`grid ${applicationDetails?.status !== "SHORTLIST"
          ? "grid-cols-2"
          : "grid-cols-3"
          } gap-3`}
      >
        {applicationDetails?.status !== "SHORTLISTED" &&
          applicationDetails?.status !== "INTERVIEW" && (
            <button
              onClick={handleShortListed}
              className="bg-orange-500 text-white font-semibold px-4 py-2 rounded"
            >
              Short Listed
            </button>
          )}
        {applicationDetails && (
          <InterviewScheduleModal
            item={applicationDetails}
            trigger={
              <button className="w-full block bg-green-600 text-white font-semibold px-4 py-2 rounded">
                Interview
              </button>
            }
          />
        )}
        {applicationDetails?.status !== "REJECTED" && (
          <RejectInterView
            item={applicationDetails?._id}
            trigger={
              <button className="w-full block bg-red-600 text-white font-semibold px-4 py-2 rounded">
                Reject
              </button>
            }
          />
        )}
      </div>
      <div className="w-full">
        <button
          onClick={handleMessage}
          // href={`/chat?id=69203f5ee2a0a7e1b08de15d`}
          // href={`/chat?id=${applicationDetails?.user?._id}`}
          className="w-full block border border-blue-600 text-blue-600 font-semibold px-4 py-2 rounded text-center"
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
