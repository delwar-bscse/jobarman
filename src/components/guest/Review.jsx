import React from "react";
import ReviewCard from "../shared/ReviewCard";
import Link from "next/link";
import { myFetch } from "../../../utils/myFetch";

export default async function Review() {
  const res = await myFetch("/review");
  console.log(res);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Join over 1,000,000 professionals
          </h2>
          <p className="text-xl text-gray-600 mb-4 text-balance">
            already using Jobarman.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            Explore Personalized Career Opportunities In Your Field With Our
            AI-Driven Platform, Designed To Connect You With The Right Roles
            That Match Your Skills And Ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {res?.data?.map((t, index) => (
            <ReviewCard
              key={index}
              name={t.user.name}
              role={t.role}
              rating={t.rating}
              text={t.comment}
              image={t.user.image}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/reviews">
            <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
              View All Reviews
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
