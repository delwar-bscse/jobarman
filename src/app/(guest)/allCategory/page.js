import JobCategoryCard from "@/components/shared/JobCategoryCard";
import {
  Stethoscope,
  Code,
  Palette,
  Users,
  UtensilsCrossed,
  ChevronLeft,
} from "lucide-react";
import { myFetch } from "../../../../utils/myFetch";
import GlobalBackButton from "../../../../shared/GlobalBackButton";

const jobCategories = [
  { icon: Stethoscope, label: "Healthcare", count: "2.5k jobs" },
  { icon: Code, label: "IT Jobs", count: "5.2k jobs" },
  { icon: Palette, label: "UX Designer", count: "1.8k jobs" },
  { icon: Users, label: "Management", count: "3.1k jobs" },
  { icon: UtensilsCrossed, label: "Restaurant", count: "1.2k jobs" },
];

const AllCategory = async () => {
  const res = await myFetch("/job-category");
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 flex items-center text-balance">
          <GlobalBackButton />
          <span className="text-blue-600">All Category</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {res?.data?.map((category, index) => (
            <JobCategoryCard
              key={index}
              icon={category.image}
              label={category.name}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCategory;
