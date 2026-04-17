
import { myFetch } from "../../../../utils/myFetch";
import Jobs from "./Jobs";


/* ================= component ================= */

const JobsPage = async () => {
  const res = await myFetch("/favourite", {
    method: "GET",
    cache: "no-store",
    tags: ["favoritesList"],
  });

  // console.log("Favlist : ", res?.data);
  const refineFavLists = res?.data?.map((item) => item?.post?._id) || [];

  return (
    <>
      <Jobs favoritesList={refineFavLists} />
    </>
  );
};

export default JobsPage;

