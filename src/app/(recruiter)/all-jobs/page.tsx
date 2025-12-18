import AllRecentJobs from "@/components/recruiter/AllRecentJobs";
import { myFetch } from "utils/myFetch";

export default async function page({ searchParams }) {
  const allSearchParams = await searchParams;
  const status = allSearchParams.status || "active";
  const res = await myFetch(`/job-post/recent-posts?status=${status}`);

  return (
    <div>
      <AllRecentJobs
        data={res?.data}
        // pagination={res?.pagination}
        // favoratesList={favoratesList}
      />
    </div>
  );
}
