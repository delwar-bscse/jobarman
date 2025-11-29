"use client";
import { ChevronLeft } from "lucide-react";

export default function Circle({ value = 175, total = 200 }) {
  const percentage = (value / total) * 100;
  const size = 300; // width & height
  const strokeWidth = 44; // circle thickness
  const radius = (size - strokeWidth) / 2; // radius for perfect fit
  const circumference = 2 * Math.PI * radius;

  return (
    <div>
      <div className="flex items-center">
        <ChevronLeft
          className="cursor-pointer"
          onClick={() => history.back()}
        />
        <h1 className="text-[#123499] text-2xl font-semibold my-3">
          Auto Apply
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Progress</h2>

        <div className="relative" style={{ width: size, height: size }}>
          {/* Background Circle */}
          <svg width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#ddd" // background color
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#ff9800" // progress color
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${
                (percentage / 100) * circumference
              } ${circumference}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
            {value}/{total}
          </div>
        </div>
      </div>
    </div>
  );
}
