import EmployeeSidebar from "@/components/cui/EmployeeSidebar";

export default function EmployeeProfileLayout({ children }) {
  return (
    <div className="flex py-4 gap-4">
      <div className="w-72">
        <EmployeeSidebar />
      </div>
      <div className="flex-1 bg-white px-4">
        {children}
      </div>
    </div>
  );
}
