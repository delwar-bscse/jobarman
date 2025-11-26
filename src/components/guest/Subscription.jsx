import SubscriptionCard from "../shared/SubscriptionCard";
import { myFetch } from "../../../utils/myFetch";

export default async function Subscription() {
  const res = await myFetch("/package");
  const subscriptions = res?.data;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-[#123499] mb-4 text-balance">
            Subscription Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptions?.map((plan, index) => (
            <SubscriptionCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
