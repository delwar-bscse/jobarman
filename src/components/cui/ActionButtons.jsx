"use client";

import React from "react";
import { useRouter } from "next/navigation"; // for navigation
import Link from "next/link";
import CancelInterview from "../recruiter/recruitment-status/interviews/CancelInterview";
import InterviewScheduleModal from "../recruiter/recruitment-status/InterviewSheduleModal";

const ActionButtons = ({ userId }) => {
  const router = useRouter();

  const handleShortListed = () => {
    console.log(`User ${userId} shortlisted`);
    // Add your API call or logic here
  };

  const handleInterview = () => {
    console.log(`User ${userId} marked for interview`);
    // Add your API call or logic here
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

        {/* <button
          onClick={handleInterview}
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded"
        >
          Interview
        </button> */}
        <InterviewScheduleModal
          item={userId}
          trigger={
            <button className="w-full block bg-green-600 text-white font-semibold px-4 py-2 rounded">
              Interview
            </button>
          }
        />
        <CancelInterview
          item={userId}
          trigger={
            <button className="w-full block bg-red-600 text-white font-semibold px-4 py-2 rounded">
              Reject
            </button>
          }
        />
      </div>
      <div className="w-full">
        <Link
          href={`/chat?id/${userId}`}
          className="w-full block border border-blue-600 text-blue-600 font-semibold px-4 py-2 rounded text-center"
        >
          Message
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
