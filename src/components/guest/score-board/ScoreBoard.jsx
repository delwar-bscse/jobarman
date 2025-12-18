"use client";
import React, { useEffect, useMemo, useState } from "react";
import { myFetch } from "../../../../utils/myFetch";
import ResumeScorecard from "./ResumeScroeBoard";
import PdfViewer from "@/components/cui/PdfViewer";
import { formatUrl } from "../../../../utils/formatUrl";
import { io } from "socket.io-client";

export default function ScoreBoard({ id }) {
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_IMAGE_URL), []);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resume, setResume] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await myFetch(`/user/analyze-resume/${id}`);
      setResume(res.data);
    }
    fetchData();
  }, [id, isCompleted]);

  socket.on(`resume-analysis::${id}`, () => {
    setIsCompleted(!isCompleted);
  });

  return (
    <div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:space-x-10 p-5 lg:p-0 ">
        <div className="lg:col-span-1 p-4">
          <ResumeScorecard score={resume?.analysis?.totalScore || 0} />
          <h1 className="text-2xl font-semibold">Score Backdown</h1>
          {resume?.analysis?.breakdown?.length > 0 ? (
            // Render breakdown items
            resume.analysis.breakdown.map((item, i) => (
              <div key={i} className="my-6 rounded-lg bg-white p-4">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-lg font-semibold">{item?.title}</h1>
                  <p className="font-medium">{item?.score}</p>
                </div>
                <h2 className="font-medium text-sm">{item?.description}</h2>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">AI Analizing...</p>
          )}
        </div>
        <div className="lg:col-span-2 bg-white  overflow-y-auto p-3">
          {resume?.filePath ? (
            // <ResumeDetails resume={resume[0]} />
            <PdfViewer fileUrl={formatUrl(resume?.filePath)} />
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
