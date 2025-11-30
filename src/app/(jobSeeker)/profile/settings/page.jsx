// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// import {
//   Heart,
//   FileText,
//   Star,
//   Settings,
//   LogOut,
//   Lock,
//   HelpCircle,
//   Trash2,
//   User,
// } from "lucide-react";
// import FavoriteListPage from "@/components/jobSeeker/settings/Favourite";

// const menuItems = [
//   { icon: User, label: "My Profile", href: "/profile/myProfile" },
//   { icon: Heart, label: "Favorite List" },
//   // { icon: FileText, label: "Payment History", href: "/profile/payment" },
//   // { icon: Star, label: "Platform Review", href: "/profile/platformReview" },
//   // {
//   //   icon: Settings,
//   //   label: "Settings",
//   //   subItems: [
//   //     {
//   //       icon: Lock,
//   //       label: "Change Password",
//   //       href: "/profile/settings/changePassword",
//   //     },
//   //     {
//   //       icon: HelpCircle,
//   //       label: "Help and Support",
//   //       href: "/profile/settings/helpSupport",
//   //     },
//   //     {
//   //       icon: Trash2,
//   //       label: "Delete Account",
//   //       href: "/profile/settings/deleteAccount",
//   //     },
//   //   ],
//   // },
//   // { icon: LogOut, label: "Log Out", href: "/profile/logout" },
// ];

// export default function SidebarProfile() {
//   const router = useRouter();

//   const [isSettingsOpen, setIsSettingsOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState("Change Password");
//   const handleSubMenuClick = (href, label) => {
//     setActiveMenu(label);
//     // router.push(href);
//   };
//   const handleMenuClick = (label) => {
//     if (label === "Settings") {
//       setIsSettingsOpen(!isSettingsOpen);
//     } else {
//       setActiveMenu(label);
//       setIsSettingsOpen(false);
//     }
//   };

//   return (
//     <div className="w-72 bg-white rounded-xl p-6 flex flex-col">
//       {/* Profile Card */}
//       <div className="text-center mb-8">
//         <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
//           <span className="text-4xl">👤</span>
//         </div>
//         <h2 className="text-xl font-bold text-gray-900">Atiqur Rifat</h2>
//         <p className="text-sm text-gray-600">UX Designer</p>
//         <div className="flex items-center justify-center gap-1 mt-2">
//           <Image
//             src="/premiumplan.svg"
//             width={24}
//             height={24}
//             alt="Profile"
//             className="w-6 h-6 rounded-full"
//           />
//           <span className="text-sm font-semibold text-[#FF8F27]">
//             Premium Plan
//           </span>
//         </div>
//       </div>

//       {/* Menu Items */}
//       <nav className="space-y-2 flex-1">
//         {menuItems.map((item, index) => (
//           <div key={index}>
//             <button
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${
//                 activeMenu === item.label
//                   ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
//                   : ""
//               }`}
//               onClick={() => handleMenuClick(item.label)}
//             >
//               <item.icon
//                 className={`w-5 h-5 ${
//                   activeMenu === item.label ? "text-white" : "text-black"
//                 }`}
//               />
//               <span className="text-sm font-medium">{item.label}</span>
//               {item.label === "Settings" && (
//                 <span className="ml-auto text-gray-400">
//                   {isSettingsOpen ? "⌄" : "›"}
//                 </span>
//               )}
//             </button>
//             {item.label === "Settings" && isSettingsOpen && (
//               <div className="ml-6 mt-2 space-y-2">
//                 {item.subItems.map((subItem, subIndex) => (
//                   <button
//                     key={subIndex}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${
//                       activeMenu === subItem.label
//                         ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       handleSubMenuClick(subItem.href, subItem.label)
//                     }
//                   >
//                     <subItem.icon
//                       className={`w-5 h-5 ${
//                         activeMenu === subItem.label
//                           ? "text-white"
//                           : "text-black"
//                       }`}
//                     />
//                     <span className="text-sm font-medium">{subItem.label}</span>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>

//       {/* condional renderaing */}
//       {activeMenu === "Favorite List" && <FavoriteListPage />}
//     </div>
//   );
// }
