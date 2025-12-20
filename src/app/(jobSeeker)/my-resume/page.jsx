import { myFetch } from "utils/myFetch";
import ResumeDetails from "@/components/jobSeekerResume/ResumeDetails";
import ResumeList from "@/components/jobSeekerResume/ResumeList";

export default async function MyResume({ searchParams }) {
  const { id } = await searchParams;

  try {
    const resumeList = await myFetch("/resume", {
      tags: ["resume"],
    });
    const resumeDetails = await myFetch(`/resume/${id}`);

    return (
      <div className="max-w-7xl mx-auto min-h-screen p-3 sm:p-4 lg:p-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-[#123499]">
          My Resume Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 ">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <ResumeList data={resumeList?.data} />
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {resumeDetails?.data ? (
              <ResumeDetails resume={resumeDetails.data} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-lg">Select a resume to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle error appropriately
    return (
      <div className="max-w-7xl mx-auto min-h-screen p-6 flex items-center justify-center">
        <p className="text-red-500">
          Failed to load resumes. Please try again.
        </p>
      </div>
    );
  }
}
