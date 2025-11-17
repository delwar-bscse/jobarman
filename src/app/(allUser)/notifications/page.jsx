"use client";

import dayjs from "dayjs";
import { GoStarFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

const items = [
  {
    id: 1,
    text:
      "Prime Works Ltd has started following your profile. Visit their page to see their latest job postings and company updates just now.",
    pill: { label: "Message", color: "gray" },
    time: "2025-10-04T15:15:00.000Z",
  },
  {
    id: 2,
    text:
      "Your resume has been successfully submitted for Tech Nova Inc.check out your dashboard for real time status updates",
    pill: { label: "Apply Result", color: "green" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 3,
    text:
      "Your profile is almost complete! Add a few more details to increase your visibility to employers and get personalized job suggestions.",
    pill: { label: "Message", color: "gray" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 4,
    text:
      "Your resume has been successfully submitted for the ‘Product Design’ position at Global Crop Solution. We’ll keep you updated on the next steps.",
    pill: { label: "Apply Result", color: "green" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 5,
    text:
      "Google's service, offered free of charge, instantly translates words, phrases, and web pages between English and over 100 other languages.",
    pill: { label: "Messages", color: "gray" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 6,
    text:
      "Exciting opportunity! A 'Digital Marketing Specialist' role has just been posted at Bright Solutions Group. Check your dashboard for more  information and apply now.",
    pill: { label: "New job", color: "blue" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 7,
    text:
      "Google's service, offered free of charge, instantly translates words, phrases, and web pages between English and over 100 other languages.",
    pill: { label: "New job", color: "blue" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 8,
    text:
      "Your resume has been successfully submitted for the ‘Product Design’ position at Global Crop Solution. We’ll keep you updated on the next steps.",
    pill: { label: "Apply Result", color: "green" },
    time: "2025-10-04T22:14:00.000Z",
  },
];


const Pill = ({ label, color }) => {
  const styles =
    color === "green"
      ? "bg-green-50 text-green-700 border border-green-200"
      : color === "blue"
        ? "bg-blue-50 text-blue-700 border border-blue-200"
        : "bg-gray-50 text-gray-700 border border-gray-200";
  return (
    <span className={`text-xs px-2 py-1 rounded ${styles}`}>{label}</span>
  );
};

export default function NotificationsPage() {
  return (
    <main className="w-full bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div onClick={() => history.back()} className="flex items-center text-gray-800 hover:text-gray-700 gap-2 mb-6 cursor-pointer">
          <IoIosArrowBack className="text-2xl sm:text-3xl font-bold" />
          <h1 className="text-2xl sm:text-3xl font-semibold">Notifications</h1>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-md border border-gray-200 bg-white p-2 sm:p-3 md:p-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="flex-1 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-[94%]">{item.text}</p>
                  <GoStarFill className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-500 transition-colors duration-300" />
                </div>
                <div className="mt-3 w-full flex items-center justify-between">
                  <Pill label={item.pill.label} color={item.pill.color} />
                  <span className="text-xs text-gray-400">{dayjs(item.time).format('MMMM D, YYYY h:mm A')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}