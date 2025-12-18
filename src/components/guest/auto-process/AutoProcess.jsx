/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Circle from "./Circle";
import JobList from "./JobList";
import { myFetch } from "../../../../utils/myFetch";
import { useSocket } from "@/lib/SocketContext";

export default function AutoProcess({ value = 175, total = 200 }) {                         // track if user was near bottom before updates
  const { socket } = useSocket();

  const [score, setScore] = useState({
    completed: 0,
    total: 0
  });
  const [autoApplyData, setAutoApplyData] = useState([]);

  useEffect(() => {
    console.log("Score State: ", score)
    console.log("Auto Apply State : ", autoApplyData)
  }, [score?.completed, score?.total, autoApplyData]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("autoApplyDataId"));
    console.log("Auto apply data id : ", id);

    if (!id || !socket) return;

    const eventName = "auto-apply-progress::" + id;

    const onSocketResponse = (socketRes) => {
      console.log("Auto apply progress : ", socketRes);
      if (socketRes) {
        setScore({
          completed: socketRes?.completed || 0,
          total: socketRes?.total || 0
        })
        setAutoApplyData(socketRes?.posts);
      }
    };

    socket.on(eventName, onSocketResponse);
    return () => {
      socket.off(eventName, onSocketResponse);
    };
  }, [socket]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto p-6">
      <Circle value={score?.completed} total={score?.total} />
      {/* card */}
      {autoApplyData.length > 0 && <JobList autoApplyData={autoApplyData} />}
    </div>
  );
}
