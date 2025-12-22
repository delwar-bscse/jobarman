import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainContent from "@/components/cui/MainContent";
import EmployeeSidebar from "@/components/cui/EmployeeSidebar";

export default function EditProfilePage() {
  return (
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <EmployeeSidebar />
        {/* Main Content */}
        <MainContent />
      </div>
    </div>
  );
}
