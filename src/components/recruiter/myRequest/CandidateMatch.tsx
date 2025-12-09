import { useState } from "react";

const data = [
  { label: "150 Candidate", value: "150" },
  { label: "70% Match", value: "70" },
  { label: "80% Match", value: " 80 " },
  { label: "90% Match", value: "90" },
];

export default function CandidateMatch() {
  const [activeMatch, setActiveMatch] = useState("70");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center s">
        <h2 className="text-xl font-bold text-gray-900"></h2>

        <div className="flex space-x-8">
          {data?.map((match) => (
            <div
              key={match.value}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setActiveMatch(match.value)}
            >
              <p
                className={`text-sm ${
                  activeMatch === match.value
                    ? "text-black font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {match.label}
              </p>

              {/* underline */}
              <div
                className={`h-[2px] w-full mt-1 transition-all duration-200 ${
                  activeMatch === match.value ? "bg-black" : "bg-transparent"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
