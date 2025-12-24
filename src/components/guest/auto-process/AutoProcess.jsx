"use client";
import { useEffect, useState } from "react";
import Circle from "./Circle";
import JobList from "./JobList";
import { useSocket } from "@/lib/SocketContext";

export default function AutoProcess({ value = 175, total = 200 }) {
  // track if user was near bottom before updates
  const { socket } = useSocket();

  const [score, setScore] = useState({
    completed: 0,
    total: 0,
  });
  const [autoApplyData, setAutoApplyData] = useState([]);

  // useEffect(() => {}, [score?.completed, score?.total, autoApplyData]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("autoApplyDataId"));

    if (!id || !socket) return;

    const eventName = "auto-apply-progress::" + id;

    const onSocketResponse = (socketRes) => {
      if (socketRes) {
        setScore({
          completed: socketRes?.completed || 0,
          total: socketRes?.total || 0,
        });
        setAutoApplyData(socketRes?.posts);
      }
    };

    socket.on(eventName, onSocketResponse);
    return () => {
      socket.off(eventName, onSocketResponse);
    };
  }, [socket]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto p-6 min-h-[60vh]">
      {autoApplyData.length > 0 ? (
        <>
          <Circle value={score?.completed} total={score?.total} />
          <JobList autoApplyData={autoApplyData} />
        </>
      ) : (
        <div className="col-span-full flex items-center justify-center">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </div>
  );
}
