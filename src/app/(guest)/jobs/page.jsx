
import { myFetch } from "../../../../utils/myFetch";
import Jobs from "./Jobs";


/* ================= component ================= */

const JobsPage = async () => {
  // Fetch favourites and initial jobs in parallel on the server
  const [favRes, jobsRes] = await Promise.all([
    myFetch("/favourite", {
      method: "GET",
      cache: "no-store",
      tags: ["favoritesList"],
    }),
    myFetch("/job-post/feed?page=1", {
      method: "GET",
    }),
  ]);

  const refineFavLists = favRes?.data?.map((item) => item?.post?._id) || [];

  return (
    <>
      <Jobs
        favoritesList={refineFavLists}
        initialJobs={jobsRes?.data || []}
        initialTotalPages={jobsRes?.pagination?.totalPage || 1}
      />
    </>
  );
};

export default JobsPage;

