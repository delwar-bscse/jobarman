"use client";
import { useSocket } from "@/lib/SocketContext";
import { se } from "date-fns/locale";
import { Bell, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { myFetch } from "utils/myFetch";
import { useClasses } from "utils/Navbar";

export default function NotificationMessageNavbar({ role, id }) {
  const router = useRouter();
  const { socket } = useSocket();
  const { iconClass } = useClasses();
  const [notification, setNotificaiton] = useState(0);


  async function fetchData() {
    const res = await myFetch("/notification", {
      method: "GET",
    });
    console.log("Notifications : ", res)
    setNotificaiton(res?.data?.unreadCount);
  }

  useEffect(() => {
    (async () => await fetchData())()
  }, []);

  const redirectToNotification = async () => {
    const read = await myFetch("/notification", {
      method: "PATCH",
    });
    console.log("Notifications Read All: ", read)
    setNotificaiton(0);
    router.push("/notifications");
  };

  useEffect(() => {
    if (!id || !socket) return;

    const onSocketResponse = (data) => {
      console.log("Socket Work", data);
      setNotificaiton((prev) => prev + 1);
    };

    const eventName = `get-notification::${id}`;
    socket.on(eventName, onSocketResponse);
    return () => {
      socket.off(eventName, onSocketResponse);
    };
  }, [socket, id]);

  return (
    <>
      {(role === "EMPLOYEE" || role === "RECRUITER") && (
        <button
          onClick={redirectToNotification}
          aria-label="Notifications"
          className={iconClass("/notifications") + " relative"}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs leading-none text-white text-[10px] bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {notification}
          </span>

        </button>
      )}
      {(role === "EMPLOYEE" || role === "RECRUITER") && (
        <Link href="/chat" aria-label="Messages" className={iconClass("/chat")}>
          <MessageCircle className="w-5 h-5" />
        </Link>
      )}
    </>
  );
}
