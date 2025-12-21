import UserResume from "./UserResume";
import Status from "./Status";
import ShortListResume from "./ShortListResume";
import { myFetch } from "utils/myFetch";

export default async function ShortList() {
  const res = await myFetch("/application?status=SHORTLISTED");

  return (
    <div className="max-w-7xl mx-auto ">
      {/* status */}
      <Status />

      <div className="grid lg:grid-cols-[30%_70%] space-x-4">
        <div className="p-4">
          <ShortListResume data={res?.data} />
        </div>

        {/* resume */}
        <div className=" border p-3 rounded-md">
          <UserResume />
        </div>
      </div>
    </div>
  );
}
