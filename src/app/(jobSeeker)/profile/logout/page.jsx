"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { deleteCookie } from "cookies-next";
import EmployeeSidebar from "@/components/cui/EmployeeSidebar";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogoutConfirm = () => {
    Swal.fire({
      icon: "success",
      title: "Logged Out Successfully",
      text: "You have been logged out. Redirecting to login page...",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("role");
      router.push("/login");
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB]">
      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] py-10 gap-6">
        {/* Sidebar */}
        <div>
          <EmployeeSidebar />
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg w-full max-w-md">
            <h2 className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Are you sure you want to log out?
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => router.back()}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition"
              >
                No
              </button>

              <button
                onClick={handleLogoutConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
