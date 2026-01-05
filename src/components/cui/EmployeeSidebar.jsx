/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import {
  Heart,
  FileText,
  Star,
  Settings,
  LogOut,
  Lock,
  HelpCircle,
  Trash2,
  User,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { myFetch } from "../../../utils/myFetch";
import { formatUrl } from "../../../utils/formatUrl";

const EmployeeSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const fetchProfile = async () => {
    const res = await myFetch(`/user/profile`);
    setProfileData(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ============================
  // ACTIVE MENU (Parent)
  // ============================
  const getActiveMenu = () => {
    if (pathname.startsWith("/profile/myProfile")) return "My Profile";
    else if (pathname.startsWith("/profile/favorite")) return "Favorite List";
    else if (pathname.startsWith("/profile/payment")) return "Payment History";
    else if (pathname.startsWith("/profile/platformReview"))
      return "Platform Review";
    else if (pathname.startsWith("/profile/settings")) return "Settings";
    else if (pathname.startsWith("/profile/logout")) return "Log Out";
    else return "";
  };

  // ============================
  // ACTIVE SUB MENU
  // ============================
  const getActiveSubMenu = () => {
    if (pathname === "/profile/settings/changePassword")
      return "Change Password";
    if (pathname === "/profile/settings/helpSupport") return "Help and Support";
    if (pathname === "/profile/settings/deleteAccount") return "Delete Account";
    return "";
  };

  const menuItems = [
    { icon: User, label: "My Profile", route: "/profile/myProfile" },
    { icon: Heart, label: "Favorite List", route: "/profile/favorite" },
    { icon: FileText, label: "Payment History", route: "/profile/payment" },
    { icon: Star, label: "Platform Review", route: "/profile/platformReview" },
    {
      icon: Settings,
      label: "Settings",
      subItems: [
        {
          icon: Lock,
          label: "Change Password",
          route: "/profile/settings/changePassword",
        },
        {
          icon: HelpCircle,
          label: "Help and Support",
          route: "/profile/settings/helpSupport",
        },
        {
          icon: Trash2,
          label: "Delete Account",
          route: "/profile/settings/deleteAccount",
        },
      ],
    },
    { icon: LogOut, label: "Log Out", route: "/profile/logout" },
  ];

  // Handle parent menu click
  const handleMenuClick = (item) => {
    if (item.label === "Settings") {
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

  return (
    <div className="mb-5 sm:mb-0 px-2">
      <div className="max-w-7xl mx-auto -mb-10">
        <div
          onClick={() => history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-7 h-7" />
        </div>
      </div>
      <div className=" bg-white rounded-xl">
        {/* Profile Card */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
            {profileData?.image ? (
              <Image
                src={formatUrl(profileData?.image)}
                width={24}
                height={24}
                alt="Logo"
                className="w-24 h-24 rounded-full object-cover"
                sizes="100vh"
              />
            ) : (
              <p>No Image</p>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {profileData?.name}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {profileData?.designation}
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
              <div key={index}>
                <button
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${isActiveParent
                      ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white w-full px-2"
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

export default EmployeeSidebar;
