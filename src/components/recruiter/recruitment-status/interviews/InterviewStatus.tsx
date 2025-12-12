"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function StatusToggle() {
  const [activeStatus, setActiveStatus] = useState("upcoming");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleParams = (status) => {
    setActiveStatus(status);
    const params = new URLSearchParams(searchParams);
    params.set("status", status);
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex items-center gap-2 p-8">
      <button
        onClick={() => handleParams("INTERVIEW")}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          activeStatus === "INTERVIEW"
            ? "bg-orange-500 text-white shadow-md"
            : "bg-white text-gray-600 border border-gray-300"
        }`}
      >
        Upcoming
      </button>
      <button
        onClick={() => handleParams("REJECTED")}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          activeStatus === "REJECTED"
            ? "bg-orange-500 text-white shadow-md"
            : "bg-white text-gray-600 border border-gray-300"
        }`}
      >
        Completed
      </button>
    </div>
  );
}
