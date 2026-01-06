"use client";

import { RecentApplicants } from "./recent-applicants";
import Status from "./Status";
import Chart from "./Chart";

export default function ChartSection({ data }) {
  const card = [
    {
      label: "Application",
      value: data?.summary?.total,
      color: "text-orange-500",
    },
    {
      label: "Qualified",
      value: data?.summary?.qualified,
      color: "text-green-500",
    },
    {
      label: "Engagement",
      value: data?.summary?.engaged,
      color: "text-blue-500",
    },
    {
      label: "Rejected",
      value: data?.summary?.rejected,
      color: "text-red-500",
    },
  ];

  const handleParams = () => {};
  return (
    <div className="max-w-7xl mx-auto py-10">
      {/* status */}
      <Status />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 py-4">
        {card?.map((item, index) => (
          <div
            key={index}
            className="bg-card rounded-lg p-4 sm:p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`text-3xl sm:text-4xl font-bold mb-2 ${item.color}`}
            >
              {item.value}
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* chat bar */}
      <Chart />

      {/* Recent Applicant and Qualified */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {data?.recentApplications.length > 0 ? (
          <RecentApplicants
            title=" Recent Applications"
            recent={data?.recentApplications}
          />
        ) : (
          <p className="text-center mt-[10%]">Data Not Found</p>
        )}
        {data?.recentQualifiedApplications.lenth > 0 ? (
          <RecentApplicants
            title="Qualified Applications "
            recent={data?.recentQualifiedApplications}
          />
        ) : (
          <p className="text-center mt-[10%]">Data Not Found</p>
        )}
      </div>
    </div>
  );
}
