"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
} from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { myFetch } from "../../../../../../utils/myFetch";
import { toast } from "sonner";

export default function HelpSupportPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const menuItems = [
    { icon: User, label: "My Profile", href: "/profile/myProfile" },
    { icon: Heart, label: "Favorite List", href: "/profile/favourite" },
    { icon: FileText, label: "Payment History", href: "/profile/payment" },
    { icon: Star, label: "Platform Review", href: "/profile/platformReview" },
    {
      icon: Settings,
      label: "Settings",
      subItems: [
        {
          icon: Lock,
          label: "Change Password",
          href: "/profile/settings/changePassword",
        },
        {
          icon: HelpCircle,
          label: "Help and Support",
          href: "/profile/settings/helpSupport",
        },
        {
          icon: Trash2,
          label: "Delete Account",
          href: "/profile/settings/deleteAccount",
        },
      ],
    },
    { icon: LogOut, label: "Log Out", href: "/profile/logout" },
  ];

  const isMenuActive = (href) => {
    if (href === "/profile" && pathname === "/profile") return true;
    if (href !== "/profile" && pathname.startsWith(href)) return true;
    return false;
  };

  const isSubMenuActive = (href) => {
    return pathname === href;
  };

  const handleMenuClick = (item) => {
    if (item.label === "Settings") {
      setIsSettingsOpen(!isSettingsOpen);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const handleSubMenuClick = (href) => {
    router.push(href);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim() || !description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please Fill All Fields",
        text: "Both reason and message are required.",
      });
      return;
    }

    try {
      const res = await myFetch("/support", {
        method: "POST",
        body: { reason, description },
      });

      if (res.success) {
        toast.success("support create successfully");
      } else {
        toast.error(res.error || "support create failed");
      }
    } catch (err) {
      console.error(err.message || "support create failed");
    }

    setReason("");
    setDescription("");
  };

  return (
    <div className="w-full bg-[#FBFBFB]">
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
              <Image
                src="/premiumplan.svg"
                width={24}
                height={24}
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-semibold text-[#FF8F27]">
                Premium Plan
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${
                    isMenuActive(item.href)
                      ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                      : ""
                  }`}
                  onClick={() => handleMenuClick(item)}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isMenuActive(item.href) ? "text-white" : "text-black"
                    }`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.label === "Settings" && (
                    <span className="ml-auto text-gray-400">
                      {isSettingsOpen ? "⌄" : "›"}
                    </span>
                  )}
                </button>
                {item.label === "Settings" && isSettingsOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${
                          isSubMenuActive(subItem.href)
                            ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                            : ""
                        }`}
                        onClick={() => handleSubMenuClick(subItem.href)}
                      >
                        <subItem.icon
                          className={`w-5 h-5 ${
                            isSubMenuActive(subItem.href)
                              ? "text-white"
                              : "text-black"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {subItem.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              GET IN TOUCH
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reason Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  placeholder="Enter Your Message"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg transition-all"
              >
                Contact Us
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
