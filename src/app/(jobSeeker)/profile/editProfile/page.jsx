<<<<<<< HEAD
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Heart, FileText, Star, Settings, LogOut, Lock, HelpCircle, Trash2, User, Calendar, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainContent from "@/components/cui/MainContent";

export default function EditProfilePage() {
  const [activeMenu, setActiveMenu] = useState("Edit Profile"); // Default to Edit Profile
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  const menuItems = [
    { icon: User, label: "My Profile", path: "/profile/myProfile" },
    { icon: Heart, label: "Favorite List", path: "/profile/favourite" }, // Updated to /profile/favourite
    { icon: FileText, label: "Payment History", path: "/profile/payment" },
    { icon: Star, label: "Platform Review", path: "/profile/platformReview" },
    {
      icon: Settings, label: "Settings", subItems: [
        { icon: Lock, label: "Change Password", path: "/profile/settings/changePassword" },
        { icon: HelpCircle, label: "Help and Support", path: "/profile/settings/helpSupport" },
        { icon: Trash2, label: "Delete Account", path: "/profile/settings/deleteAccount" },
      ]
    },
    { icon: LogOut, label: "Log Out", path: "/profile/logout" },
  ];

  // Update activeMenu based on the current route
  useEffect(() => {
    const xyz = () => {
      const currentPath = pathname;
      const matchingItem = menuItems.find((item) =>
        item.path === currentPath || (item.subItems && item.subItems.some((sub) => sub.path === currentPath))
      );
      if (matchingItem) {
        setActiveMenu(matchingItem.label);
        if (matchingItem.label === "Settings") {
          setIsSettingsOpen(true);
        } else {
          setIsSettingsOpen(false);
        }
      } else if (currentPath === "/profile/editProfile") {
        setActiveMenu("Edit Profile"); // Custom label for Edit Profile page
      }
    }
    xyz();
  }, [pathname]);

  const handleMenuClick = (label) => {
    if (label === "Settings") {
      setIsSettingsOpen(!isSettingsOpen);
    } else {
      setActiveMenu(label);
      setIsSettingsOpen(false);
    }
  };

  return (
    <div className="w-full bg-[#FBFBFB]">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto -mb-10 pt-10">
        <Link href="/profile/myProfile">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-5 h-5" />
            {/* Added text for clarity */}
          </button>
        </Link>
      </div>
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <div className="w-72 bg-white rounded-xl p-6 flex flex-col">
          {/* Profile Card */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Atiqur Rifat</h2>
            <p className="text-sm text-gray-600">UX Designer</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Image src="/premiumplan.svg" width={24} height={24} alt="Profile" className="w-6 h-6 rounded-full" />
              <span className="text-sm font-semibold text-[#FF8F27]">Premium Plan</span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <Link href={item.path || "#"}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${activeMenu === item.label || (activeMenu === "Edit Profile" && item.label === "My Profile") ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white" : ""
                      }`}
                    onClick={() => handleMenuClick(item.label)}
                  >
                    <item.icon className={`w-5 h-5 ${activeMenu === item.label || (activeMenu === "Edit Profile" && item.label === "My Profile") ? "text-white" : "text-black"}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.label === "Settings" && (
                      <span className="ml-auto text-gray-400">{isSettingsOpen ? "⌄" : "›"}</span>
                    )}
                  </button>
                </Link>
                {item.label === "Settings" && isSettingsOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.path}>
                        <button
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${activeMenu === subItem.label ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white" : ""
                            }`}
                          onClick={() => setActiveMenu(subItem.label)}
                        >
                          <subItem.icon className={`w-5 h-5 ${activeMenu === subItem.label ? "text-white" : "text-black"}`} />
                          <span className="text-sm font-medium">{subItem.label}</span>
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <MainContent />

      </div>
=======
import EditProfilePage from "@/components/myProfile/EditProfile";
import React from "react";
import { myFetch } from "../../../../../utils/myFetch";

export default async function page() {
  const res = await myFetch("/user/profile");
  return (
    <div>
      <EditProfilePage data={res?.data} />
>>>>>>> e7ba260d1515df50b28eebc19717fbdc21a1ecfc
    </div>
  );
}
