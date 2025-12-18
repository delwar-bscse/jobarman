import React from "react";
import ResumeDetails from "@/components/jobSeekerResume/ResumeDetails";
import { myFetch } from "../../../../utils/myFetch";
import ResumeScorecard from "./ResumeScroeBoard";
import PdfViewer from "@/components/cui/PdfViewer";
import { formatUrl } from "../../../../utils/formatUrl";
const data = [
  {
    title: "Keyword Score",
    count: 20,
    des: "This score reflects the effectiveness of the keywords used in your resume. Your score is 0.",
  },
];
export default async function ScoreBoard() {
  const res = await myFetch("/user/analyze-resume/69437eb15cfe53501f5139d0");

  const resume = res?.data;
  console.log("resume", resume?.filePath);

  return (
    <div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:space-x-10 p-5 lg:p-0 ">
        <div className="lg:col-span-1 p-4">
          <ResumeScorecard />
          <h1 className="text-2xl font-semibold">Score Backdown</h1>
          {res?.data?.analysis?.breakdown?.map((item, i) => {
            console.log("item", item);
            return (
              <div key={i} className="my-6  rounded-lg bg-white ">
                <div className="">
                  <div className="flex justify-between items-center mb-3">
                    <h1 className="text-lg font-semibold">{item?.title}</h1>
                    <p className="font-medium">{item?.score}</p>
                  </div>
                  <h2 className="font-medium text-sm">{item?.description}</h2>
                </div>
              </div>
            );
          })}
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
