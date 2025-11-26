import NotificationDetails from "@/components/notifications/NotificationDetails";
import Notifications from "@/components/notifications/Notifications";

const items = [
  {
    id: 1,
    text: "Prime Works Ltd has started following your profile. Visit their page to see their latest job postings and company updates just now.",
    pill: { label: "Message", color: "gray" },
    time: "2025-10-04T15:15:00.000Z",
  },
  {
    id: 2,
    text: "Your resume has been successfully submitted for Tech Nova Inc.check out your dashboard for real time status updates",
    pill: { label: "Apply Result", color: "green" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 3,
    text: "Your profile is almost complete! Add a few more details to increase your visibility to employers and get personalized job suggestions.",
    pill: { label: "Message", color: "gray" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 4,
    text: "Your resume has been successfully submitted for the ‘Product Design’ position at Global Crop Solution. We’ll keep you updated on the next steps.",
    pill: { label: "Apply Result", color: "green" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 5,
    text: "Google's service, offered free of charge, instantly translates words, phrases, and web pages between English and over 100 other languages.",
    pill: { label: "Messages", color: "gray" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 6,
    text: "Exciting opportunity! A 'Digital Marketing Specialist' role has just been posted at Bright Solutions Group. Check your dashboard for more  information and apply now.",
    pill: { label: "New job", color: "blue" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 7,
    text: "Google's service, offered free of charge, instantly translates words, phrases, and web pages between English and over 100 other languages.",
    pill: { label: "New job", color: "blue" },
    time: "2025-10-04T22:14:00.000Z",
  },
  {
    id: 8,
    text: "Your resume has been successfully submitted for the ‘Product Design’ position at Global Crop Solution. We’ll keep you updated on the next steps.",
    pill: { label: "Apply Result", color: "green" },
    time: "2025-10-04T22:14:00.000Z",
  },
];

export default function NotificationsPage() {
  return (
    <main className="w-full bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* notificaitons details */}
        <NotificationDetails />

        {/* notifications content */}
        <Notifications />
      </section>
    </main>
  );
}
