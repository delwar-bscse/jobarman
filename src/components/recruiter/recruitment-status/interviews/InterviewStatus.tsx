"use client";
import { useState } from "react";

export default function StatusToggle() {
  const [activeStatus, setActiveStatus] = useState("upcoming");

  return (
    <div className="flex items-center gap-2 p-8">
      <button
        onClick={() => setActiveStatus("upcoming")}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          activeStatus === "upcoming"
            ? "bg-orange-500 text-white shadow-md"
            : "bg-white text-gray-600 border border-gray-300"
        }`}
      >
        Upcoming
      </button>
      <button
        onClick={() => setActiveStatus("complete")}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          activeStatus === "complete"
            ? "bg-orange-500 text-white shadow-md"
            : "bg-white text-gray-600 border border-gray-300"
        }`}
      >
        Complete
      </button>
    </div>
  );
}
