import React from "react";
import JobCategoryCard from "../shared/JobCategoryCard";
import Link from "next/link";

import {
  Code,
  Palette,
  Users,
  Stethoscope,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";

const jobCategories = [
  { icon: Stethoscope, label: "Healthcare", count: "2.5k jobs" },
  { icon: Code, label: "IT Jobs", count: "5.2k jobs" },
  { icon: Palette, label: "UX Designer", count: "1.8k jobs" },
  { icon: Users, label: "Management", count: "3.1k jobs" },
  { icon: Stethoscope, label: "Healthcare", count: "2.5k jobs" },
  { icon: UtensilsCrossed, label: "Restaurant", count: "1.2k jobs" },
];

export default function Categories() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 text-balance">
          Job Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobCategories.map((category, index) => (
            <JobCategoryCard
              key={index}
              icon={category.icon}
              label={category.label}
              count={category.count}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/allCategory">
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
