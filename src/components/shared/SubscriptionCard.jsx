"use client";
import { Building2, Award, Crown, Check } from "lucide-react";
import { myFetch } from "../../../utils/myFetch";
import { useState } from "react";
import { toast } from "sonner";
import { getUserRole } from "../../../utils/getUserRoleClient";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// export enum PACKAGE_TYPE {
//   BRONZE = 'bronze',
//   SILVER = 'silver',
//   GOLD = 'gold',
//   PREMIUM = 'premium',
// }
const subscriptionPlanTypes = [
  {
    name: "Bronze",
    icon: "https://cdn-icons-png.flaticon.com/512/6130/6130708.png",
  },
  {
    name: "Silver",
    icon: "https://cdn-icons-png.freepik.com/512/7955/7955211.png",
  },
  {
    name: "Gold",
    icon: "https://static.tildacdn.com/tild3634-3435-4037-a235-313832613136/001-premium-quality.svg",
  },
  {
    name: "Premium",
    icon: "https://cdn-icons-png.flaticon.com/512/2583/2583296.png",
  },
];

export default function SubscriptionCard({ plan, enableSubscriptionId }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const getIcon = (planName) => {
    return (
      subscriptionPlanTypes.find(
        (item) => item.name.toLowerCase() === planName.toLowerCase()
      )?.icon || subscriptionPlanTypes[0].icon // fallback icon
    );
  };


  const buySubscription = async () => {

    if (loading) return; // ✅ prevent double clicks
    setLoading(true);

    const role = getUserRole();
    if (!role) {
      // toast.error("You are not logged in");
      router.push(`/login?callbackUrl=${pathname}`);
      return
    };

    try {
      const res = await myFetch(`/subscription/stripe`, {
        method: "POST",
        body: { receipt: plan?._id },
      });

      if (res?.success && res?.data) {
        // ✅ redirect
        window.location.href = res.data;
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to start subscription. Please try again.");
    } finally {
      // ⚠️ Will not run if redirect happens (which is fine)
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* Top Badge Icon */}
      <div className="flex justify-center w-full absolute -translate-y-1/2 top-0">
        <div className="bg-white border border-secondary rounded-full p-2">
          <Image
            src={getIcon(plan.name)}
            alt="plan icon"
            width={50}
            height={50}
            className="size-8"
          />
        </div>
      </div>

      {/* Header with price */}
      <div
        className={`bg-gradient-to-r ${plan.highlighted
          ? "from-[#1D4ED8] to-[#1E3A8A]"
          : "from-[#3B82F6] to-[#2563EB]"
          } text-white px-4 pt-6 pb-4 sm:px-5 sm:pt-7 sm:pb-5 md:px-6 md:pt-8 md:pb-6 text-center rounded-t-xl`}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-baseline gap-1 sm:gap-1.5 md:gap-2">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              ${plan.price}
            </span>
            <span className="text-xs sm:text-sm opacity-90">
              /month
            </span>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 flex-1">
        <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
              <Check className="w-4 h-4 sm:w-4.5 md:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer CTA */}
      <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5 sm:pt-2.5 md:px-6 md:pb-6 md:pt-3 bg-[#EEF6FB] rounded-b-xl">
        {enableSubscriptionId === plan._id ?
          <button
            className={`w-full py-2.5 text-sm sm:py-2.5 sm:text-base md:py-3 md:text-base rounded-md font-semibold transition-colors bg-blue-50 text-[#123499] border border-blue-600 hover:bg-blue-100`}
          >Enabled</button> : <button
            onClick={buySubscription}
            disabled={loading}
            className={`w-full py-2.5 text-sm sm:py-2.5 sm:text-base md:py-3 md:text-base rounded-md font-semibold transition-colors  ${loading ? "cursor-not-allowed opacity-60" : ""
              } ${loading
                ? "bg-blue-50 text-[#123499] border border-blue-300 hover:bg-blue-100"
                : "bg-[#123499] text-white hover:bg-blue-700"
              }`}
          >
            {/* {enableSubscriptionId===plan._id ? "Enabled" : "Buy Now"} */}
            {loading ? "Loading..." : "Buy Now"}
          </button>}
      </div>
    </div>
  );
}
