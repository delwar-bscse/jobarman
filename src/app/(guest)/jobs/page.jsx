import Image from "next/image";
import FilterSide from "@/components/employee/jobs/FilterSide";
import JobCard from "@/components/employee/jobs/JobCard";

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <Image
          className="bg-gradient-to-r from-[#123499] to-[#2A57DE]"
          width={1621}
          height={264}
          src="/alljobs.png"
          alt="Job Image"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <FilterSide />

          {/* Job Cards Grid */}
          <JobCard />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
