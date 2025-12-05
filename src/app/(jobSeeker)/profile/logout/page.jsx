"use client"

import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import EmployeeSidebar from "@/components/cui/EmployeeSidebar"

export default function LogoutPage() {
  const router = useRouter()

  const handleLogoutConfirm = (confirmed) => {
    if (confirmed) {
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        text: "You have been logged out. Redirecting to home page...",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        router.push("/")
      })
    }
  }

  return (
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <EmployeeSidebar />

        {/* Main Content - Logout Confirmation Modal */}
        <div className="flex-1 ml-8 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Are you sure you want to log out?</h2>

            <div className="flex gap-4">
              <button
                onClick={() => handleLogoutConfirm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                No
              </button>
              <button
                onClick={() => handleLogoutConfirm(true)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
