import { myFetch } from "utils/myFetch";
import ResumeDetails from "@/components/jobSeekerResume/ResumeDetails";
import ResumeList from "@/components/jobSeekerResume/ResumeList";
import { formatUrl } from "utils/formatUrl";
import PdfViewer from "@/components/cui/PdfViewer";

export default async function MyResume({ searchParams }) {
  const { id } = await searchParams;

  try {
    const resumeList = await myFetch("/resume", {
      method: "GET",
      tags: ["resume"],
    });

    // console.log("Resume List : ", resumeList);

    const resumeDetails = await myFetch(`/resume/${id}`);

    // console.log("Resume Details : ", resumeDetails);

    return (
      <div className="max-w-7xl mx-auto min-h-screen p-3 sm:p-4 lg:p-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-[#123499]">
          My Resume Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 ">
          <div className="lg:col-span-1 border-gray-200">
            <ResumeList data={resumeList?.data} />
          </div>

          <div className="lg:col-span-2">
            {resumeDetails?.data ? (
              <>{resumeDetails?.data?.is_external_resume ? <div><PdfViewer fileUrl={formatUrl(resumeDetails?.data?.pdf)} /></div> : <div><ResumeDetails resume={resumeDetails.data} /></div>}</>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-lg">
                  {resumeList?.data?.length > 0
                    ? "Select Any Resume"
                    : "No Data"}
                </p>
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
