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
          {res?.data?.length > 0 ? (
            <ShortListResume data={res?.data} />
          ) : (
            <p className="text-center">No Data</p>
          )}
        </div>

        {/* resume */}
        <div className=" border p-3 rounded-md">
          <UserResume data={res?.data} />
        </div>
      </div>
    </div>
  );
}
