import { myFetch } from "../../../../utils/myFetch";
import Employee from "./Employee";

export default async function Pricing() {
  const res = await myFetch("/package");
  const subscriptions = res?.data;
  const res2 = await myFetch("/subscription/subscribe", { method: "GET" });
  console.log("All subs : ", res)
  console.log("Enable sub : ", res2)

  return (
    <main className="min-h-screen w-full bg-white">
      {/* Job Seeker Subscription */}
      <Employee data={subscriptions} enableSubscription={res2?.data} />

      {/* Recruiter Subscription */}
      {/* <Recuiter /> */}
    </main>
  );
}
