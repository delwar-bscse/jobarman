"use client";
import React, { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import dayjs from "dayjs";
import { myFetch } from "../../../utils/myFetch";
import { useSocket } from "@/lib/SocketContext";

export default function Notifications({ date, id }) {
  const { socket } = useSocket();
  const [notifications, setNotificaitons] = useState(null);

  let url = `/notification`;

  if (date) {
    url = `/notification?date=${date}`;
  }

  useEffect(() => {
    async function fetchData() {
      const res = await myFetch(url);
      setNotificaitons(res?.data?.data);
    }
    fetchData();
  }, [url]);

  useEffect(() => {
    if (!id || !socket) return;

    const onSocketResponse = (data) => {
      setNotificaitons((prev) => [data, ...prev]);
    };

    const eventName = `get-notification::${id}`;
    socket.on(eventName, onSocketResponse);
    return () => {
      socket.off(eventName, onSocketResponse);
    };
  }, [socket, id]);

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
      {notifications?.map((item) => (
        <div
          key={item?._id}
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
