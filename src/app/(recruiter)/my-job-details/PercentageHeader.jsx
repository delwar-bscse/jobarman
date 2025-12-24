"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { label: "100 Candidates", value: "10-100" },
  { label: "70% Match", value: "50-70" },
  { label: "80% Match", value: "70-80" },
  { label: "90% Match", value: "80-90" },
  { label: "99% Match", value: "90-99", hideOnMobile: true },
];

export default function PercentageHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("match");

  const handleClick = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("match", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 sm:gap-6 border-b border-gray-200">
      {OPTIONS.map(({ label, value, hideOnMobile }) => {
        const isActive = active === value;

        return (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={`
              px-4 py-2 border-b-2 transition-colors duration-200
              ${hideOnMobile ? "hidden sm:inline" : ""}
              ${
                isActive
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-blue-600"
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
