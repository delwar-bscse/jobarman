import JobsDetailsLeft from "@/components/guest/jobs/JobsDetailsSidebar";
import JobDetailsRight from "@/components/guest/jobs/JobDetailsRight";
import { myFetch } from "../../../../../utils/myFetch";
import HeroBanner from "@/components/cui/HeroBaner";
import { formatUrl } from "../../../../../utils/formatUrl";

export default async function JobDetailsPage({ params }) {
  const { id } = await params;

  const res = await myFetch(`/job-post/${id}`, {
    method: "GET",
    tags: ["edit-job"],
  });

  console.log("get  post data", res);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section to match provided screenshots */}
      <HeroBanner hiroImage={formatUrl(res?.data?.thumbnail)}/>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: job details */}
          <JobDetailsRight details={res?.data} />
          {/* left side */}
          <JobsDetailsLeft details={res?.data} />
        </div>
      </div>
    </div>
  );
}
