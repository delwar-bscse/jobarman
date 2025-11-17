"use client";

import { useEffect, useState } from "react";
import SubscriptionCard from "@/components/shared/SubscriptionCard";
import Image from "next/image";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [plansRecruiter, setPlansRecruiter] = useState([]);
  // add modal open state
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch("/subscription-plans.json");
        if (!res.ok) return;
        const data = await res.json();
        setPlans(data);
      } catch (e) {
        // silent fail
      }
    };
    loadPlans();

    const loadPlansRecruiter = async () => {
      try {
        const res = await fetch("/subscription-plans-recruiter.json");
        if (!res.ok) return;
        const data = await res.json();
        setPlansRecruiter(data);
      } catch (e) {
        // silent fail
      }
    };
    loadPlansRecruiter();
  }, []);

  return (
    <main className="w-full bg-white">
    {/* Job Seeker Subscription */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#123499] mb-12">
            Subscription Plan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <SubscriptionCard key={idx} plan={plan} />
            ))}
          </div>

          {/* My Subscription button */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-sm transition-colors"
            >
              My Subscription
            </button>
          </div>
        </div>
      </section>

      {/* Recruiter Subscription */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#123499] mb-12">
            Subscription Plan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plansRecruiter.map((plan, idx) => (
              <SubscriptionCard key={idx} plan={plan} />
            ))}
          </div>

          {/* My Subscription button */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-sm transition-colors"
            >
              My Subscription
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-xl bg-white shadow-xl">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="px-6 pt-8 pb-6">
              {/* Avatar and header */}
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/avatars/kristin.svg"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full border border-gray-200"
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">Shakir Ahmed</h2>
                <p className="text-sm text-gray-500">UI/UX Designer</p>
                <p className="mt-1 text-sm font-medium text-orange-600">Premium Plan</p>
              </div>

              {/* Details */}
              <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-600">Pack Name</span>
                  <span className="text-sm font-medium text-gray-900">Premium Plan</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-600">Price</span>
                  <span className="text-sm font-medium text-gray-900">$19.99</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <span className="text-sm font-medium text-gray-900">01 January 2025</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-600">End Date</span>
                  <span className="text-sm font-medium text-gray-900">31 January 2025</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-600">Remaining Days</span>
                  <span className="text-sm font-medium text-gray-900">25 Days</span>
                </div>
              </div>

              {/* Renew button */}
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Renew Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
