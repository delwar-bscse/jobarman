import NotificationDetails from "@/components/notifications/NotificationDetails";
import Notifications from "@/components/notifications/Notifications";

export default async function NotificationsPage({ searchParams }) {
  const { date } = await searchParams;

  return (
    <main className="w-full bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notificaitons Top */}
        <NotificationDetails />

        {/* Notifications content */}
        <Notifications date={date} />
      </section>
    </main>
  );
}
