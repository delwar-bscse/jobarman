"use client";
import { Bell, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useClasses } from "utils/Navbar";

export default function NotificationMessageNavbar({ role }) {
  const { iconClass } = useClasses();
  return (
    <>
      {(role === "EMPLOYEE" || role === "RECRUITER") && (
        <Link
          href="/notifications"
          aria-label="Notifications"
          className={iconClass("/notifications")}
        >
          <Bell className="w-5 h-5" />
        </Link>
      )}
      {(role === "EMPLOYEE" || role === "RECRUITER") && (
        <Link href="/chat" aria-label="Messages" className={iconClass("/chat")}>
          <MessageCircle className="w-5 h-5" />
        </Link>
      )}
    </>
  );
}
