import SubscriptionCard from "@/components/shared/SubscriptionCard";
import React from "react";
import Modal from "./Modal";

export default function Employee({ data }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#123499] mb-12">
          Subscription Plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.map((plan, idx) => (
            <SubscriptionCard key={idx} plan={plan} />
          ))}
        </div>

        {/* My Subscription button */}
        <div className="mt-10 flex justify-center">
          <Modal
            trigger={
              <button className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-sm transition-colors">
                My Subscription
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
