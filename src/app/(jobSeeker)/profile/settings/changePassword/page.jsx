"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

import { Input } from "@/components/ui/input";
import { myFetch } from "../../../../../../utils/myFetch";
import { toast } from "sonner";
import SidebarProfile from "@/components/jobSeeker/profile/Sidebar";
import EmployeeSidebar from "@/components/cui/EmployeeSidebar";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = password;

    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all password fields",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "New Password and Confirm Password do not match",
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password must be at least 8 characters long",
      });
      return;
    }

    try {
      const res = await myFetch("/auth/change-password", {
        method: "POST",
        body: password,
      });

      if (res.success) {
        toast.success("password update successfully");
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      toast.error(err?.message || "password update failed");
    }

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Password updated successfully",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    });
  };

  return (
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* <SidebarProfile /> */}
        <EmployeeSidebar />

        <div className="flex-1 ml-8 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full border border-gray-200">
            <h2 className="text-2xl text-center font-bold text-[#123499] mb-8">
              Change Password
            </h2>

            <form onSubmit={handleUpdatePassword}>
              {/* CURRENT PASSWORD */}
              <div className="mb-4 relative">
                <label className="block mb-1 font-medium">
                  Current Password
                </label>
                <Input
                  type={show.current ? "text" : "password"}
                  value={password.currentPassword}
                  placeholder="current password"
                  onChange={(e) =>
                    setPassword((p) => ({
                      ...p,
                      currentPassword: e.target.value,
                    }))
                  }
                />
                <span
                  className="absolute top-9 right-3 cursor-pointer"
                  onClick={() =>
                    setShow((s) => ({ ...s, current: !s.current }))
                  }
                >
                  {show.current ? <EyeOff /> : <Eye />}
                </span>
              </div>

              {/* NEW PASSWORD */}
              <div className="mb-4 relative">
                <label className="block mb-1 font-medium">New Password</label>
                <Input
                  type={show.new ? "text" : "password"}
                  value={password.newPassword}
                  placeholder="new password"
                  onChange={(e) =>
                    setPassword((p) => ({ ...p, newPassword: e.target.value }))
                  }
                />
                <span
                  className="absolute top-9 right-3 cursor-pointer"
                  onClick={() => setShow((s) => ({ ...s, new: !s.new }))}
                >
                  {show.new ? <EyeOff /> : <Eye />}
                </span>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-6 relative">
                <label className="block mb-1 font-medium">
                  Confirm Password
                </label>
                <Input
                  type={show.confirm ? "text" : "password"}
                  value={password.confirmPassword}
                  placeholder="confirm password"
                  onChange={(e) =>
                    setPassword((p) => ({
                      ...p,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                <span
                  className="absolute top-9 right-3 cursor-pointer"
                  onClick={() =>
                    setShow((s) => ({ ...s, confirm: !s.confirm }))
                  }
                >
                  {show.confirm ? <EyeOff /> : <Eye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2670] hover:to-[#1f42b8] text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
