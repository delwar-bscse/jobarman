"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AutoApplying = () => {
  const router = useRouter();

  setTimeout(() => {
     router.push("/auto-process");
  }, 2000);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      {/* Main container */}
      <div className="text-center space-y-4">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-indigo-800">
          Auto-Applying...
        </h1>

        {/* Loading Circle */}
        <div className="inline-block">
          <div className="w-16 h-16 border-4 border-indigo-300  border-b-orange-500 rounded-full animate-spin" />
        </div>

        {/* Text */}
        <p className="text-xl font-semibold text-gray-700">
          We are auto-applying for the <br /> Data Analyst role at HealthPlus.
        </p>

        {/* Footer Text */}
        <p className="text-sm text-gray-500">
          Sit tight while we complete your application.
        </p>
      </div>
    </div>
  );
};

export default AutoApplying;
