"use client";
import React, { useEffect, useMemo, useState } from "react";
import { myFetch } from "../../../../utils/myFetch";
import ResumeScorecard from "./ResumeScroeBoard";
import PdfViewer from "@/components/cui/PdfViewer";
import { formatUrl } from "../../../../utils/formatUrl";
import { useSocket } from "@/lib/SocketContext";

export default function ScoreBoard({ id }) {
  const { socket } = useSocket();
  const [isCompleted, setIsCompleted] = useState(false);
  const [resume, setResume] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await myFetch(`/user/analyze-resume/${id}`);
      setResume(res.data);
    }
    fetchData();
  }, [id, isCompleted]);

  useEffect(() => {
    if (!id || !socket) return;

    const onSocketResponse = () => {
      setIsCompleted((prev) => !prev);
    };

    const eventName = `resume-analysis::${id}`;
    socket.on(eventName, onSocketResponse);
    return () => {
      socket.off(eventName, onSocketResponse);
    };
  }, [id, socket]);

  return (
    <div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:space-x-10 p-5 lg:p-0 ">
        {resume?.analysis?.breakdown?.length > 0 ? (
          <div className="lg:col-span-1 p-4">
            <ResumeScorecard score={resume?.analysis?.totalScore || 0} />
            <h1 className="text-2xl font-semibold">Score Backdown</h1>

            {resume.analysis.breakdown.map((item, i) => (
              <div key={i} className="my-6 rounded-lg bg-white p-4">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-lg font-semibold">{item?.title}</h1>
                  <p className="font-medium">{item?.score}</p>
                </div>
                <h2 className="font-medium text-sm">{item?.description}</h2>
              </div>
            ))}

            <div>
              <h2 className="text-xl font-medium mb-3">Improvements</h2>

              <ul className="space-y-2 list-disc list-inside text-gray-700">
                {resume?.analysis?.improvements?.map((item, index) => (
                  <li key={index} className="pl-5 -indent-5 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="flex items-center justify-center text-center text-gray-500 py-6 text-2xl">
            AI Analizing...
          </p>
        )}
        <div className="lg:col-span-2 bg-white  overflow-y-auto p-3">
          {resume?.filePath ? (
            // <ResumeDetails resume={resume[0]} />
            <PdfViewer fileUrl={resume?.filePath} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-lg">Select a resume to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
