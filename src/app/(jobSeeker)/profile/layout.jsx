import EmployeeSidebar from "@/components/cui/EmployeeSidebar";
import { myFetch } from "../../../../utils/myFetch";

export default async function EmployeeProfileLayout({ children }) {

  const res = await myFetch(`/user/profile`, {
    method: "GET",
    tags: ["profile"],
  });

  return (
    <div className="flex flex-col md:flex-row py-4 gap-4">
      <div className="w-full md:w-72">
        <EmployeeSidebar data={res.data} />
      </div>
      <div className="flex-1 bg-white xl:px-4">
        {children}
      </div>
    </div>
  );
}
