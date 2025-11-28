"use client";
import ResumeDetails from "@/components/jobSeekerResume/ResumeDetails";
import ResumeList from "@/components/jobSeekerResume/ResumeList";
import { resumeData } from "@/lib/resume-data";
import { myFetch } from "../../../../utils/myFetch";
import { useEffect, useState } from "react";

const MyResume = () => {
  const [selectResume, setSelectResume] = useState(null);
  const selectedResume = resumeData.find((r) => r.id === "uiux");
  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/resume", {
        tags: ["resume"],
      });
      setData(res?.data);
    };

    fetchData();
  }, []);

  const findResume = data?.find((resume) => resume?._id === selectResume);

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-3 sm:p-4 lg:p-6">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-[#123499]">
        My Resume Dashboard
      </h1>

      {/* Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-[75vh] lg:h-[80vh] lg:max-h-screen">
        {/* Left: Resume List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ResumeList data={data} setSelectResume={setSelectResume} />
        </div>

        {/* Right: Resume Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {findResume ? (
            <ResumeDetails resume={findResume} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-lg">Select a resume to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyResume;
