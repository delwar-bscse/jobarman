/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // for navigation
import Link from "next/link";
import CancelInterview from "../recruiter/recruitment-status/interviews/CancelInterview";
import InterviewScheduleModal from "../recruiter/recruitment-status/InterviewSheduleModal";
import { myFetch } from "../../../utils/myFetch";
import { toast } from "sonner";

const ActionButtons = ({ userId }) => {
  const router = useRouter();
  const [applicationDetails, setApplicationDetails] = React.useState(null);

  const fetchApplicationDetails = async () => {
    const res = await myFetch(`/application/${userId}`,{
      revalidate: "application-details"
    });
    console.log("Get application details : ", res?.data);
    setApplicationDetails(res?.data);
  };

  useEffect(() => {
    fetchApplicationDetails()
  }, []);

  const handleShortListed = async () => {
    console.log(`User ${userId} shortlisted`);
    try {
      const res = await myFetch(`/application/${applicationDetails._id}`, {
        method: "PATCH",
        body: { status: "SHORTLISTED" },
      });

      console.log("Short List res : ", res?.data);

      if (res?.success) {
        toast.success(res?.message || "Application shortlisted successfully");
      } else {
        toast.error(res.message || "failed");
      }
    } catch (error) {
      toast.error(error.message || "failed");
    }
  };

  return (
    <div className="max-w-[600px] mx-auto space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleShortListed}
          className="bg-orange-500 text-white font-semibold px-4 py-2 rounded"
        >
          Short Listed
        </button>
        <InterviewScheduleModal
          item={applicationDetails}
          trigger={
            <button
              className="w-full block bg-green-600 text-white font-semibold px-4 py-2 rounded"
            >
              Interview
            </button>
          }
        />
        <CancelInterview
          item={applicationDetails?._id}
          trigger={
            <button
              className="w-full block bg-red-600 text-white font-semibold px-4 py-2 rounded"
            >
              Reject
            </button>
          }
        />
      </div>
      <div className="w-full">
        <Link
          href={`/inbox/${userId}`}
          className="w-full block border border-blue-600 text-blue-600 font-semibold px-4 py-2 rounded text-center"
        >
          Message
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
