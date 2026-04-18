/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import {
  FileText,
  Settings,
  LogOut,
  Lock,
  HelpCircle,
  Trash2,
  User,
  ArrowLeft,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { myFetch } from "../../../utils/myFetch";
import { formatUrl } from "../../../utils/formatUrl";
import { deleteCookie } from "cookies-next";
import { revalidate } from "utils/revalidateTags";
import { toast } from "sonner";

const RecruiterSidebar = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const fetchProfile = async () => {
    setProfileData(data);
  };

  useEffect(() => {
    fetchProfile();
  }, [data]);

  // ============================
  // ACTIVE MENU (Parent)
  // ============================
  const getActiveMenu = () => {
    if (pathname.startsWith("/profile/companyProfile"))
      return "Company Profile";
    else if (pathname.startsWith("/profile/companyPayment"))
      return "Payment History";
    else if (pathname.startsWith("/profile/companySettings")) return "Settings";
    else return "";
  };

  // ============================
  // ACTIVE SUB MENU
  // ============================
  const getActiveSubMenu = () => {
    if (pathname === "/profile/companySettings/changePassword")
      return "Change Password";
    if (pathname === "/profile/companySettings/helpSupport")
      return "Help and Support";
    if (pathname === "/profile/companySettings/deleteAccount")
      return "Delete Account";
    return "";
  };

  const menuItems = [
    { icon: User, label: "Company Profile", route: "/profile/companyProfile" },
    {
      icon: FileText,
      label: "Payment History",
      route: "/profile/companyPayment",
    },
    {
      icon: Settings,
      label: "Settings",
      subItems: [
        {
          icon: Lock,
          label: "Change Password",
          route: "/profile/companySettings/changePassword",
        },
        {
          icon: HelpCircle,
          label: "Help and Support",
          route: "/profile/companySettings/helpSupport",
        },
        {
          icon: Trash2,
          label: "Delete Account",
          route: "/profile/companySettings/deleteAccount",
        },
      ],
    },
    { icon: LogOut, label: "Log Out", route: "/" },
  ];

  // Handle parent menu click
  const handleMenuClick = (item) => {
    if (item.label === "Log Out") {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("role");
      router.push("/login");
    } else if (item.label === "Settings") {
      setIsSettingsOpen(!isSettingsOpen);
    } else if (item.route) {
      router.replace(item.route, { scroll: false });
    }
  };

  // Handle sub menu click
  const handleSubMenuClick = (subItem) => {
    if (subItem.route) {
      router.push(subItem.route);
    }
  };

  const activeMenu = getActiveMenu();
  const activeSubMenu = getActiveSubMenu();

  const handleProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await myFetch("/user/profile", {
      method: "PATCH",
      body: formData,
    });

    if (res.success) {
      await revalidate("profile");
      router.refresh();
      toast.success("Profile image updated successfully");
    };
  };

  return (
    <div className="bg-white ">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto -mb-10">
        <div onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-7 h-7" />
        </div>
      </div>
      <div className="rounded-xl mb-5 sm:mb-0">
        {/* Profile Card */}
        <div className="text-center mb-8">
          {/* Profile Image Edit*/}
          <div className="flex justify-center my-8">
            <div className="">
              <div className="relative w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                <Image
                  src={profileData?.image ? formatUrl(profileData.image) : "/default.webp"}
                  width={96}
                  height={96}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div onClick={() =>
                  document.getElementById("takeEmployeeProfileImage").click()
                } className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm cursor-pointer">
                  <Camera className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <input
                id="takeEmployeeProfileImage"
                onChange={handleProfileImage}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {profileData?.name}
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-sm">
            {profileData?.bio}
          </p>

          <div className="flex items-center justify-center gap-1 mt-2">
            <Image
              src="/premiumplan.svg"
              width={24}
              height={24}
              alt="Premium"
              className="w-6 h-6"
            />
            <span className="text-sm font-semibold text-[#FF8F27]">
              {profileData?.subscription}
            </span>
          </div>
        </div>


        {/* Menu Items */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item, index) => {
            const isActiveParent = activeMenu === item.label;

            return (
              <div key={index} className="px-2">
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${isActiveParent
                    ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                    : ""
                    }`}
                  onClick={() => handleMenuClick(item)}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActiveParent ? "text-white" : "text-black"
                      }`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>

                  {item.label === "Settings" && (
                    <span className="ml-auto text-gray-400">
                      <IoIosArrowForward
                        className={`text-gray-400 ${isSettingsOpen ? "rotate-90" : ""
                          } transition-transform duration-200`}
                      />
                    </span>
                  )}
                </button>

                {/* Submenu */}
                {item.label === "Settings" && isSettingsOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => {
                      const isActiveSub = activeSubMenu === subItem.label;

                      return (
                        <button
                          key={subIndex}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${isActiveSub
                            ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                            : ""
                            }`}
                          onClick={() => handleSubMenuClick(subItem)}
                        >
                          <subItem.icon
                            className={`w-5 h-5 ${isActiveSub ? "text-white" : "text-black"
                              }`}
                          />
                          <span className="text-sm font-medium">
                            {subItem.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
