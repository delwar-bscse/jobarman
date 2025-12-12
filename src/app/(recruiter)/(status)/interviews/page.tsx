import CalendarPage from "@/components/recruiter/recruitment-status/Calendar";
import Interviews from "@/components/recruiter/recruitment-status/interviews/Interviews";
import StatusToggle from "@/components/recruiter/recruitment-status/interviews/InterviewStatus";
import Status from "@/components/recruiter/recruitment-status/Status";
import { myFetch } from "utils/myFetch";

export default async function page({ searchParams }) {
  const status = (await searchParams)?.status || "INTERVIEW";
  const date = (await searchParams)?.interview_date || "";

  const res = await myFetch(
    `/application?status=${status}&interview_date=${date}`
  );

  console.log("res", res);

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex justify-between items-center">
        <Status />
        <StatusToggle />
      </div>

      <div className="flex space-x-12 my-10">
        <div>
          <CalendarPage />
        </div>
        <div>
          <Interviews data={res?.data} />
        </div>
      </div>
    </div>
  );
}
