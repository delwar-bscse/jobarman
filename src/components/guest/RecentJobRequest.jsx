import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { myFetch } from "../../../utils/myFetch";
import CustomImage from "../../../shared/CustomImage";
import MyRequest from "../recruiter/myRequest/MyRequest";
import MyRequestCard from "../recruiter/myRequest/MyRequestCard";

export default async function RecentJobRequest() {
  const myProfile = await myFetch("/user/profile");
  const res = await myFetch("/application/recent-applications");

  const role = myProfile?.data?.role === "EMPLOYEE" ? "/jobs" : "/my-request";

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

        <MyRequestCard res={res} />

        <div className="flex justify-center mt-8">
          <Link href={role}>
            <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center gap-2">
              Browse All
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
