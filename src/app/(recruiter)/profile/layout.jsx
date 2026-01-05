import EmployeeSidebar from "@/components/cui/EmployeeSidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="grid grid-cols-2">
      <div className="w-20 border border-red-600">
        <EmployeeSidebar />
      </div>
      <div className="flex">
        {children}
      </div>
    </div>
  );
}
