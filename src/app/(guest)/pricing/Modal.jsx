"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useEffect } from "react";
import { myFetch } from "../../../../utils/myFetch";
import { formatUrl } from "../../../../utils/formatUrl";
import dayjs from "dayjs";

export default function Modal({ trigger }) {
  const [subscription, setSubscription] = React.useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const res = await myFetch("/subscription/subscribe", { method: "GET" });

      if (res?.success) {
        setSubscription(res?.data);
      }
    };

    fetchSubscription();
  }, []);

  const handleRenewSubscription = async () => {
    const res = await myFetch(`/subscription/stripe/renew`, {
      method: "POST",
    });

    if (res?.success && res?.data) {
      window.location.href = res?.data;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="px-6 pt-8 pb-6">
          <div className="flex flex-col items-center text-center">
            <Image
              src={formatUrl(subscription?.user?.image)}
              alt="Profile"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border border-gray-200"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              {subscription?.user?.name}
            </h2>
            <p className="text-sm text-gray-500">
              {subscription?.user?.designation}
            </p>
            <p className="mt-1 text-sm font-medium text-orange-600">
              {subscription?.name}
            </p>
          </div>

          {/* Details */}
          <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">Pack Name</span>
              <span className="text-sm font-medium text-gray-900">
                {subscription?.name}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">Price</span>
              <span className="text-sm font-medium text-gray-900">
                ${subscription?.price}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">Start Date</span>
              <span className="text-sm font-medium text-gray-900">
                {dayjs(subscription?.startDate).format("DD MMMM YYYY")}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">End Date</span>
              <span className="text-sm font-medium text-gray-900">
                {dayjs(subscription?.endDate).format("DD MMMM YYYY")}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">Remaining Days</span>
              <span className="text-sm font-medium text-gray-900">
                {subscription?.remainingDays} Days
              </span>
            </div>
          </div>

          {/* Renew button */}
          <div className="mt-6">
            <button
              onClick={handleRenewSubscription}
              type="button"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Renew Pack
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
