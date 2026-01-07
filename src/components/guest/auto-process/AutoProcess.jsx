"use client";
import { useEffect, useState } from "react";
import Circle from "./Circle";
import JobList from "./JobList";
import { useSocket } from "@/lib/SocketContext";
import { useRouter } from "next/navigation";

export default function AutoProcess() {
  const router = useRouter();
  const { socket } = useSocket();

  const [score, setScore] = useState({
    completed: 0,
    total: 0,
  });
  const [autoApplyData, setAutoApplyData] = useState([]);
  console.log("ai", autoApplyData);

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
          <div className="text-2xl">
            {autoApplyData.length === 0 ? <div className="flex flex-col items-center gap-4">
              <p className="text-2xl text-gray-500">No Job Match</p>
              <button onClick={() => router.push("/auto-apply")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go Back</button>
            </div> : "AI Analizing..."}
          </div>
        </div>
      )}
    </div>
  );
}
