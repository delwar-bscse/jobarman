"use client";

import React from "react";
import { useRouter } from "next/navigation"; // for navigation
import Link from "next/link";

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

  const handleReject = () => {
    console.log(`User ${userId} rejected`);
    // Add your API call or logic here
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleShortListed}
          className="bg-orange-500 text-white font-semibold px-4 py-2 rounded"
        >
          Short Listed
        </button>

        <button
          onClick={handleInterview}
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded"
        >
          Interview
        </button>

        <button
          onClick={handleReject}
          className="bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
      <div>
        <Link
          href={`/inbox/${userId}`}
          className="border border-blue-600 text-blue-600 font-semibold px-4 py-2 rounded text-center"
        >
          Message
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
