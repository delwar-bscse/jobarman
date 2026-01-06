import EmployeeSidebar from "@/components/cui/EmployeeSidebar";

export default function EmployeeProfileLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row py-4 gap-4">
      <div className="w-full md:w-72">
        <EmployeeSidebar />
      </div>
      <div className="flex-1 bg-white xl:px-4">
        {children}
      </div>
    </div>
  );
}
