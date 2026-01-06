import { myFetch } from "../../../../utils/myFetch";
import Employee from "./Employee";

export default async function Pricing() {
  const res = await myFetch("/package");
  const subscriptions = res?.data;

  return (
    <main className="min-h-screen w-full bg-white">
      {/* Job Seeker Subscription */}
      <Employee data={subscriptions} />

      {/* Recruiter Subscription */}
      {/* <Recuiter /> */}
    </main>
  );
}
