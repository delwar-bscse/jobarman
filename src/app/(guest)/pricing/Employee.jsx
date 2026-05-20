import SubscriptionCard from "@/components/shared/SubscriptionCard";
import React from "react";
import Modal from "./Modal";

export default function Employee({ data, enableSubscription }) {
  const targetRole = data?.[0]?.for
    ? data[0].for === "recruiter"
      ? "Recruiter"
      : "Job Seeker"
    : "";

  const headingText = targetRole ? `${targetRole} Subscription Plans` : "Subscription Plans";

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#123499] mb-12">
          {headingText}
        </h1>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {data?.map((plan, idx) => (
            <SubscriptionCard key={idx} plan={plan} enableSubscriptionId={enableSubscription?.package}/>
          ))}
        </div>

        {/* My Subscription button */}
        {enableSubscription?.package && <div className="mt-10 flex justify-center">
          <Modal
            trigger={
              <button className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-sm transition-colors">
                My Subscription
              </button>
            }
          />
        </div>}
      </div>
    </section>
  );
}
