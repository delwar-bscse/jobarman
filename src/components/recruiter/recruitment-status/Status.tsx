"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Status() {
  const pathname = usePathname();

  const links = [
    { href: "/interviews", label: "Interviews" },
    { href: "/short-list", label: "Short Listed" },
    { href: "/post-insight", label: "Post Insight" },
  ];

  return (
    <div className="flex space-x-2 sm:space-x-4 post-insight">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link key={link.href} href={link.href}>
            <div
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-center rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {link.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
