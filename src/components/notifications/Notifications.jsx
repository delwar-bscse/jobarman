"use client";
import React, { useEffect, useState } from "react";
// import { GoStarFill } from "react-icons/go";
import dayjs from "dayjs";
import { myFetch } from "../../../utils/myFetch";
import { useSocket } from "@/lib/SocketContext";
import { useRouter } from "next/navigation";

const NotificationType = {
  Application: "application",
  User: "user",
  Post: "post",
  Spotlight: "spotlight",
  General: "general",
  Subscription: "subscription",
};

export default function Notifications({ date, id }) {
  const router = useRouter();
  const { socket } = useSocket();
  const [notifications, setNotificaitons] = useState([]);

  let url = `/notification`;

  if (date) {
    url = `/notification?date=${date}`;
  }

  useEffect(() => {
    async function fetchData() {
      const res = await myFetch(url);
      //console.log("Notifications : ", res)
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

  const handleClick = async (item) => {
    //console.log("Notification Clicked : ", item)
    if (item?.filePath === NotificationType.Application) {
      router.push(`/my-request/${item?.referenceId}`);
    }
  };

  return (
    <div className="space-y-4">
      {notifications?.map((item) => (
        <div onClick={() => handleClick(item)}
          key={item?._id}
          className="rounded-md border border-gray-200 hover:bg-gray-50 transition-colors duration-300 bg-white p-2 sm:p-3 md:p-4 flex items-start justify-between cursor-pointer"
        >
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="flex-1 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-[94%]">
                {item.message}
              </p>
              {/* <GoStarFill className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-500 transition-colors duration-300" /> */}
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
