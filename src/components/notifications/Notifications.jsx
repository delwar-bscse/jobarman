import React from "react";
import { GoStarFill } from "react-icons/go";
import dayjs from "dayjs";
import { myFetch } from "../../../utils/myFetch";

export default async function Notifications({ date }) {
  const res = await myFetch(`/notification?date=${date}`);

  const Pill = ({ label, color }) => {
    const styles =
      color === "green"
        ? "bg-green-50 text-green-700 border border-green-200"
        : color === "blue"
        ? "bg-blue-50 text-blue-700 border border-blue-200"
        : "bg-gray-50 text-gray-700 border border-gray-200";
    return (
      <span className={`text-xs px-2 py-1 rounded ${styles}`}>{label}</span>
    );
  };

  return (
    <div className="space-y-4">
      {res?.data?.data?.map((item) => (
        <div
          key={item._id}
          className="rounded-md border border-gray-200 bg-white p-2 sm:p-3 md:p-4 flex items-start justify-between"
        >
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="flex-1 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-[94%]">
                {item.message}
              </p>
              <GoStarFill className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-500 transition-colors duration-300" />
            </div>
            <div className="mt-3 w-full flex items-center justify-between">
              {/* <Pill label={item.pill.label} color={item.pill.color} /> */}
              <span className="text-xs text-gray-400">
                {dayjs(item.time).format("MMMM D, YYYY h:mm A")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
