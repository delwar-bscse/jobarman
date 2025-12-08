import AllRecentJobs from "@/components/recruiter/AllRecentJobs";
import { myFetch } from "utils/myFetch";

export default async function page() {
  const res = await myFetch("/application/recent-applications");

  return (
    <div>
      <AllRecentJobs
        data={res?.data}
        pagination={res?.pagination}
        // favoratesList={favoratesList}
      />
    </div>
  );
}
