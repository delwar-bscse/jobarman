import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { myFetch } from "../../../utils/myFetch";
import CustomImage from "../../../shared/CustomImage";

export default async function RecentJobRequest() {
  const myProfile = await myFetch("/user/profile");
  const res = await myFetch("/application/recent-applications");

  const role = myProfile?.data?.role === "EMPLOYEE" ? "/jobs" : "all-jobs";

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3 text-balance">
          Recent Job Request
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-balance">
          Discover Jobs That Truly Match Your Skills And Goals. Connect With Top
          Employers And Take The Next Step In Your Career Effortlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {res?.data?.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4 items-start"
            >
              <CustomImage
                src={item.user.image}
                alt={item.user.name}
                width={10}
                height={10}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-gray-900 font-semibold">{item.user.name}</p>
                <p className="text-sm text-gray-700">{item.user.designation}</p>
                <p className="text-xs text-gray-500">
                  {item.year_of_experience}
                </p>
                <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                  {item.user.bio}
                </p>
              </div>
              <span className="absolute top-4 right-4 text-xs font-semibold text-green-600">
                {item.jobMatch}% Match
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href={role}>
            <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center gap-2">
              Brows All
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
