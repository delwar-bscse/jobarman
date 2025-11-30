import React from "react";
import ResumeDetails from "@/components/jobSeekerResume/ResumeDetails";
import { myFetch } from "../../../../utils/myFetch";
import ResumeScorecard from "./ResumeScroeBoard";
const data = [
  {
    title: "Keyword Score",
    count: 20,
    des: "This score reflects the effectiveness of the keywords used in your resume. Your score is 0.",
  },
];
export default async function ScoreBoard() {
  const res = await myFetch("/resume", {
    tags: ["resume"],
  });

  const resume = res?.data;
  console.log("resume", resume);
  return (
    <div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:space-x-10 p-5 lg:p-0 ">
        <div className="lg:col-span-1 p-4">
          <ResumeScorecard />
          <h1 className="text-2xl font-semibold">Score Backdown</h1>
          {Array.from({ length: 5 }).map((_, i) => {
            let item = data[0];
            return (
              <div key={i} className="my-6  rounded-lg bg-white ">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">{item.title}</h1>
                  <h2 className="font-semibold text-xl">{item.count}</h2>
                </div>
                <p>{item.des}</p>
              </div>
            );
          })}
        </div>
        <div className="lg:col-span-2 bg-white  overflow-y-auto p-3">
          {Array.isArray(data) && resume?.length > 0 ? (
            <ResumeDetails resume={resume[0]} />
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
