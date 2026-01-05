import RecruiterSidebar from "@/components/cui/RecruiterSidebar";

export default function EmployeeProfileLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row py-4 gap-4">
      <div className="w-full md:w-72">
        <RecruiterSidebar />
      </div>
      <div className="flex-1 bg-white">
        {children}
      </div>
    </div>
  );
}
