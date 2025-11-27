"use client";

import { usePathname } from "next/navigation";

export default function useClasses() {
  const pathname = usePathname();

  const linkClass = (href) =>
    `${
      pathname === href
        ? "text-[#123499] font-semibold underline underline-offset-4 lg:underline-offset-8"
        : "text-gray-600"
    } hover:text-gray-900 transition-colors text-sm lg:text-base`;

  const btnClass = (href) =>
    `${
      pathname === href
        ? "bg-[#123499]"
        : "bg-gradient-to-r from-[#123499] to-[#2A57DE]"
    } px-4 py-2 lg:px-6 lg:py-2.5 text-sm lg:text-base text-white rounded-lg transition-all hover:shadow-md`;

  const iconClass = (href) =>
    `${
      pathname === href ? "text-[#123499]" : "text-gray-600"
    } hover:text-gray-900 transition-colors`;

  return { linkClass, btnClass, iconClass };
}
