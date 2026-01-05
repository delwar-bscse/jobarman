import EmployeeSidebar from "@/components/cui/EmployeeSidebar";

export default function EmployeeProfileLayout({ children }) {
  return (
    <div className="flex pb-4 gap-4">
      <div className="w-72 border border-red-600">
        <EmployeeSidebar />
      </div>
      <div className="flex-1 border border-yellow-600">
        {children}
      </div>
    </div>
  );
}
