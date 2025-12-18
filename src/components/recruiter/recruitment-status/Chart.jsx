"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { myFetch } from "utils/myFetch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const chartData = [
  {
    day: "Sun",
    Application: 1000,
    Qualified: 1200,
    Engagement: 800,
    Reject: 500,
  },
  {
    day: "Mon",
    Application: 1500,
    Qualified: 1800,
    Engagement: 1200,
    Reject: 600,
  },
  {
    day: "Tue",
    Application: 2000,
    Qualified: 2200,
    Engagement: 1500,
    Reject: 700,
  },
  {
    day: "Wed",
    Application: 1800,
    Qualified: 2000,
    Engagement: 1800,
    Reject: 800,
  },
  {
    day: "Thu",
    Application: 2500,
    Qualified: 2800,
    Engagement: 2200,
    Reject: 900,
  },
  {
    day: "Fri",
    Application: 3200,
    Qualified: 3500,
    Engagement: 2800,
    Reject: 1000,
  },
  {
    day: "Sat",
    Application: 3500,
    Qualified: 3800,
    Engagement: 3200,
    Reject: 1100,
  },
];

const statuses = [
  { color: "bg-orange-500", label: "Application" },
  { color: "bg-green-500", label: "Qualified" },
  { color: "bg-blue-500", label: "Engagement" },
  { color: "bg-red-500", label: "Reject" },
];

const options = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export default function Chart() {
  const [timeframe, setTimeframe] = useState("week");
  const [recentJobs, setRecentJobs] = useState(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const id = searchParams.get("id") || "";

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/job-post/recent-posts");
      setRecentJobs(res?.data);
    };
    fetchData();
  }, []);

  const handlePamas = (title) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", title);
    return router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="bg-card rounded-lg p-4 sm:p-6 border border-border shadow-sm mb-6 sm:mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Select onValueChange={handlePamas} value={id}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {recentJobs?.map((item) => (
                  <SelectItem value={item._id} key={item._id}>
                    {item?.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          {statuses.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${item.color}`}
              ></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {options.map((opt) => {
            const active = timeframe === opt.value;

            return (
              <button
                key={opt.value}
                onClick={() => setTimeframe(opt.value)}
                className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 sm:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="day"
              stroke="var(--muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Line
              type="monotone"
              dataKey="Application"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Qualified"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Engagement"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Reject"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
