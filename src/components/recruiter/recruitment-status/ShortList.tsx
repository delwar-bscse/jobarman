import Image from "next/image";
import UserResume from "./UserResume";
import Status from "./Status";
import ShortListResume from "./ShortListResume";

export default function ShortList() {
  return (
    <div className="max-w-7xl mx-auto ">
      {/* status */}
      <Status />

      <div className="grid grid-cols-3 space-x-4">
        <div className="col-span-1">
          <ShortListResume />
        </div>

        {/* resume */}
        <div className="col-span-2 border p-3 rounded-md">
          <UserResume />
        </div>
      </div>
    </div>
  );
}
