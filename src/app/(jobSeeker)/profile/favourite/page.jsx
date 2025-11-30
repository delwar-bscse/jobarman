"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  FileText,
  Star,
  Settings,
  LogOut,
  X,
  Lock,
  HelpCircle,
  Trash2,
  User,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarProfile from "../settings/SidebarProfile";

export default function FavoriteListPage() {
  const [activeMenu, setActiveMenu] = useState("Favorite List"); // Default active menu
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Track Settings submenu toggle
  const pathname = usePathname(); // Get the current route

  const menuItems = [
    { icon: User, label: "My Profile", path: "/profile/myProfile" },
    { icon: Heart, label: "Favorite List", path: "/profile/favourite" },
    { icon: FileText, label: "Payment History", path: "/profile/payment" },
    { icon: Star, label: "Platform Review", path: "/profile/platformReview" },
    {
      icon: Settings,
      label: "Settings",
      subItems: [
        {
          icon: Lock,
          label: "Change Password",
          path: "/profile/settings/changePassword",
        },
        {
          icon: HelpCircle,
          label: "Help and Support",
          path: "/profile/settings/helpSupport",
        },
        {
          icon: Trash2,
          label: "Delete Account",
          path: "/profile/settings/deleteAccount",
        },
      ],
    },
    { icon: LogOut, label: "Log Out", path: "/profile/logout" },
  ];

  // Update activeMenu based on the current route
  useEffect(() => {
    const currentPath = pathname;
    const matchingItem = menuItems.find(
      (item) =>
        item.path === currentPath ||
        (item.subItems && item.subItems.some((sub) => sub.path === currentPath))
    );
    if (matchingItem) {
      setActiveMenu(matchingItem.label);
      if (matchingItem.label === "Settings") {
        setIsSettingsOpen(true);
      } else {
        setIsSettingsOpen(false);
      }
    }
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
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-5 h-5" />
          </div>
        </Link>
      </div>

      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <SidebarProfile />

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="max-w-5xl mx-auto">
            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Card 1 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex">
                <div className="w-52">
                  <Image
                    src="/cardpic.png"
                    alt="Sr. UX Designer image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Sr. UX Designer
                          </h3>
                          <p className="text-sm text-gray-600">Design Lab</p>
                        </div>
                      </div>
                      <div className="text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      California, United States
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            Full Time
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            80-120k
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/calendar.svg"
                          alt="Calendar icon"
                          width={13}
                          height={16}
                          className="mr-1 inline-block"
                        />
                        <span className="text-[#FF8C00] text-xs font-semibold rounded">
                          10 Oct 25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex">
                <div className="w-52">
                  <Image
                    src="/cardpic.png"
                    alt="Sr. UI Designer image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Sr. UI Designer
                          </h3>
                          <p className="text-sm text-gray-600">
                            Creative Studio
                          </p>
                        </div>
                      </div>
                      <div className="text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      New York, United States
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            Full Time
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            70-100k
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/calendar.svg"
                          alt="Calendar icon"
                          width={13}
                          height={16}
                          className="mr-1 inline-block"
                        />
                        <span className="text-[#FF8C00] text-xs font-semibold rounded">
                          12 Oct 25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 3 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex">
                <div className="w-52">
                  <Image
                    src="/cardpic.png"
                    alt="Jr. Web Developer image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Jr. Web Developer
                          </h3>
                          <p className="text-sm text-gray-600">Tech Innovate</p>
                        </div>
                      </div>
                      <div className="text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      Texas, United States
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            Full Time
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            50-70k
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/calendar.svg"
                          alt="Calendar icon"
                          width={13}
                          height={16}
                          className="mr-1 inline-block"
                        />
                        <span className="text-[#FF8C00] text-xs font-semibold rounded">
                          15 Oct 25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 4 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex">
                <div className="w-52">
                  <Image
                    src="/cardpic.png"
                    alt="Product Manager image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Product Manager
                          </h3>
                          <p className="text-sm text-gray-600">
                            Innovate Solutions
                          </p>
                        </div>
                      </div>
                      <div className="text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      Florida, United States
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            Full Time
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            90-130k
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/calendar.svg"
                          alt="Calendar icon"
                          width={13}
                          height={16}
                          className="mr-1 inline-block"
                        />
                        <span className="text-[#FF8C00] text-xs font-semibold rounded">
                          18 Oct 25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 5 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex">
                <div className="w-52">
                  <Image
                    src="/cardpic.png"
                    alt="Graphic Designer image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Graphic Designer
                          </h3>
                          <p className="text-sm text-gray-600">Art Vision</p>
                        </div>
                      </div>
                      <div className="text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      Oregon, United States
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            Part Time
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            40-60k
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/calendar.svg"
                          alt="Calendar icon"
                          width={13}
                          height={16}
                          className="mr-1 inline-block"
                        />
                        <span className="text-[#FF8C00] text-xs font-semibold rounded">
                          20 Oct 25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 6 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex">
                <div className="w-52">
                  <Image
                    src="/cardpic.png"
                    alt="Frontend Developer image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Frontend Developer
                          </h3>
                          <p className="text-sm text-gray-600">Web Crafters</p>
                        </div>
                      </div>
                      <div className="text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      Washington, United States
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            Full Time
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            60-90k
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/calendar.svg"
                          alt="Calendar icon"
                          width={13}
                          height={16}
                          className="mr-1 inline-block"
                        />
                        <span className="text-[#FF8C00] text-xs font-semibold rounded">
                          22 Oct 25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 7 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex">
                <div className="w-52">
                  <Image
                    src="/cardpic.png"
                    alt="Backend Developer image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Backend Developer
                          </h3>
                          <p className="text-sm text-gray-600">Code Masters</p>
                        </div>
                      </div>
                      <div className="text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      Illinois, United States
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            Full Time
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            65-95k
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/calendar.svg"
                          alt="Calendar icon"
                          width={13}
                          height={16}
                          className="mr-1 inline-block"
                        />
                        <span className="text-[#FF8C00] text-xs font-semibold rounded">
                          25 Oct 25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 8 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex">
                <div className="w-52">
                  <Image
                    src="/cardpic.png"
                    alt="Data Analyst image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Data Analyst
                          </h3>
                          <p className="text-sm text-gray-600">Analytics Hub</p>
                        </div>
                      </div>
                      <div className="text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      Colorado, United States
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            Full Time
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400 text-xs font-semibold rounded">
                            55-80k
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/calendar.svg"
                          alt="Calendar icon"
                          width={13}
                          height={16}
                          className="mr-1 inline-block"
                        />
                        <span className="text-[#FF8C00] text-xs font-semibold rounded">
                          26 Oct 25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
