import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainContent from "@/components/cui/MainContent";
import EmployeeSidebar from "@/components/cui/EmployeeSidebar";

export default function EditProfilePage() {
  return (
    <div className="w-full bg-[#FBFBFB]">
      <div className="grid md:grid-cols-2  mx-auto py-10">
        {/* Sidebar */}
        <EmployeeSidebar />
        {/* Main Content */}
        <MainContent />
      </div>
    </div>
  );
}
