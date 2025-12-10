import Image from "next/image";
import React from "react";

export default function ShortListResume() {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-full max-w-md ">
      {/* Profile Image */}
      <Image
        src="/chat-user.jpg"
        className="w-20 h-20 sm:w-20 sm:h-20  object-cover flex-shrink-0 bg-muted"
        width={10}
        height={10}
        alt="ok"
        sizes="100vh"
      />
      {/* Details */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900">Marvin McKinney</h2>
        <p className="text-sm text-gray-700">Sr. UI/UX Designer</p>
        <p className="text-xs text-gray-500">5 Years Experience</p>

        <button className="mt-2 w-fit rounded-lg border border-blue-600 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition">
          Schedule: 01 Oct 2025 At 11 Am
        </button>
      </div>
    </div>
  );
}
